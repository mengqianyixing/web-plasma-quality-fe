<template>
  <BasicModal
    width="55%"
    :centered="false"
    v-bind="$attrs"
    @register="registerModal"
    :min-height="500"
    :title="getTitle"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm">
      <template #menu="{ model, field }">
        <div class="tree-wrapper">
          <div class="option-tree">
            <BasicTree
              v-model:checkedKeys="model[field]"
              :treeData="treeData"
              :fieldNames="{ title: 'title', key: 'id' }"
              checkable
              @check="handleTreeSelect"
              title="菜单/权限分配"
              ref="previewTreeRef"
            />
          </div>
        </div>
      </template>
      <template #users="{ model, field }">
        <Select
          v-model:value="model[field]"
          mode="multiple"
          allowClear
          showSearch
          placeholder="请选择用户"
          style="width: 100%"
          :filter-option="filterOption"
        >
          <SelectOption
            v-for="option in userOptions"
            :key="option.label + option.value"
            :value="option.value"
          >
            {{ option.label }}
          </SelectOption>
        </Select>
      </template>
    </BasicForm>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicForm, useForm } from '@/components/Form';
  import { formSchema } from './role.data';
  import { filterRoutes } from './dataTransfer';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicTree, TreeActionType, TreeItem } from '@/components/Tree';
  import { Select, SelectOption } from 'ant-design-vue';
  import { modulesRouteList } from '@/router/routes';
  import {
    getCasDoorAllUsers,
    addCasDoorRole,
    // getRoleDomainAuth,
    setCasDoorRole,
  } from '@/api/oauth/auth';
  import { intersection, xor } from 'lodash-es';

  const emit = defineEmits(['success', 'register']);
  const isUpdate = ref(true);
  const treeData = ref<TreeItem[]>([]);
  const roleId = ref('');
  const userOptions = ref<any[]>([]);
  const previewTreeRef = ref<Nullable<TreeActionType>>(null);

  getCasDoorAllUsers().then((res) => {
    userOptions.value = res.map((item) => {
      return {
        label: item.name + '(' + (item.displayName || item.name) + ')',
        value: item.owner + '/' + item.name,
      };
    });
  });

  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 90,
    baseColProps: { span: 24 },
    schemas: formSchema,
    showActionButtonGroup: false,
  });

  function generateCheckedAndHalfChecked(treeData, userPermissions) {
    let checked: string[] = [];
    let halfChecked: string[] = [];

    function traverse(node) {
      let isChecked = userPermissions.includes(String(node.id));
      let allChildrenChecked = true;
      let anyChildChecked = false;

      if (node.children && node.children.length > 0) {
        node.children.forEach((child) => {
          const childResult = traverse(child);
          if (!childResult.isChecked && !childResult.isHalfChecked) {
            allChildrenChecked = false;
          }
          if (childResult.isChecked || childResult.isHalfChecked) {
            anyChildChecked = true;
          }
        });

        //父节点half勾选判断
        if (allChildrenChecked) {
          isChecked = true;
        } else if (anyChildChecked) {
          halfChecked.push(node.id);
          isChecked = false;
        }
      }

      if (isChecked) {
        checked.push(node.id);
      }

      return {
        id: node.id,
        isChecked: isChecked,
        isHalfChecked: halfChecked.includes(node.id),
      };
    }

    treeData.forEach((node) => traverse(node));

    return {
      checked: checked,
      halfChecked: halfChecked,
    };
  }

  function structureTreeIdMap(treeData) {
    const res: {
      id: string;
      title: string;
    }[] = [];

    function traverse(node) {
      res.push({
        id: node.id,
        title: node.title,
      });
      if (node.children && node.children.length > 0) {
        node.children.forEach((child) => {
          traverse(child);
        });
      }
    }

    treeData.forEach((node) => traverse(node));

    return res;
  }

  const cacheInnerData: any = {};
  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    await resetFields();
    setModalProps({ confirmLoading: false });
    // 需要在setFieldsValue之前先填充treeData，否则Tree组件可能会报key not exist警告
    if (unref(treeData).length === 0) {
      treeData.value = filterRoutes(modulesRouteList);
      console.log(treeData.value, 'value');
    }
    isUpdate.value = !!data?.isUpdate;

    if (unref(isUpdate)) {
      const domains = generateCheckedAndHalfChecked(treeData.value, data.record.domains);

      roleId.value = data.record.name;
      cacheInnerData.domains = domains;
      cacheInnerData.users = data.record.users;
      await setFieldsValue({
        ...data.record,
        domains,
        oldName: data.record.name,
      });
    }
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增角色' : '编辑角色'));

  const filterOption = (input: string, option: any) => {
    return option.key.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };

  const halfCheck = ref([]);
  function handleTreeSelect(_, nodes) {
    halfCheck.value = nodes.halfCheckedKeys;
  }

  async function handleSubmit() {
    const authArr = structureTreeIdMap(treeData.value);

    try {
      const values = await validate();
      if (!values.users) {
        values.users = [];
      }
      console.log('values--', values);
      if (treeData.value.length === 0) {
        closeModal();
        emit('success');
        return;
      }
      const domains = values?.domains?.checked ?? values?.domains ?? [];
      // loading
      setModalProps({ confirmLoading: true });
      try {
        if (unref(isUpdate)) {
          const users = values.users.map((item) => item.split('/')[1]);
          const cacheUsers = cacheInnerData.users.map((item) => item.split('/')[1]);

          const intersectionUser = intersection(users, cacheUsers);
          const addMsg = xor(users, intersectionUser).join(',')
            ? `绑定了用户[${xor(users, intersectionUser).join(',')}]`
            : '';
          const removeMsg = xor(cacheUsers, intersectionUser).join(',')
            ? `解绑了用户[${xor(cacheUsers, intersectionUser).join(',')}]`
            : '';

          const curDomains = [...domains, ...halfCheck.value];
          const cacheDomains = [
            ...cacheInnerData.domains.checked,
            ...cacheInnerData.domains.halfChecked,
          ];

          const intersectionDomains = intersection(curDomains, cacheDomains);

          const addAuth = xor(curDomains, intersectionDomains)
            .map((item) => {
              const auth = authArr.find((auth) => auth.id === item);
              return auth!.title;
            })
            .join(',')
            ? `绑定了菜单权限[${xor(curDomains, intersectionDomains)
                .map((item) => {
                  const auth = authArr.find((auth) => auth.id === item);
                  return auth!.title;
                })
                .join(',')}]`
            : '';

          const removeAuth = xor(cacheDomains, intersectionDomains)
            .map((item) => {
              const auth = authArr.find((auth) => auth.id === item);
              return auth!.title;
            })
            .join(',')
            ? `解绑了菜单权限[${xor(cacheDomains, intersectionDomains)
                .map((item) => {
                  const auth = authArr.find((auth) => auth.id === item);
                  return auth!.title;
                })
                .join(',')}]`
            : '';

          await setCasDoorRole({
            ...values,
            domains: [...domains, ...halfCheck.value],
            oldName: roleId.value,
            logMsg: `${addMsg},${removeMsg},${addAuth},${removeAuth}`,
          });
        } else {
          const users = values.users.map((item) => item.split('/')[1]).join(',');
          const authMsg = [...domains, ...halfCheck.value]
            .map((item) => {
              const auth = authArr.find((auth) => auth.id === item);
              return auth!.title;
            })
            .join(',');
          const logMsg = `绑定了用户[${users}], 绑定了菜单权限[${authMsg}]`;
          await addCasDoorRole({
            ...values,
            domains: [...domains, ...halfCheck.value],
            logMsg,
          });
        }
      } catch (e) {
        console.log(e);
      }
      setModalProps({ confirmLoading: false });
      closeModal();
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>

<style lang="scss">
  .option-tree {
    .auth-element-tree-node {
      flex-direction: row-reverse;

      .vben-tree__title {
        justify-content: end;
      }

      .ant-tree-checkbox.ant-tree-checkbox-checked ~ .ant-tree-node-content-wrapper {
        .vben-tree__title {
          font-weight: bolder;
        }
      }
    }
  }

  .preview-tree {
    .vben-basic-title {
      color: #007bff;
      font-weight: bolder;
    }

    .vben-tree__title {
      color: #28a745;
      font-weight: bolder;
    }

    .auth-element-tree-node {
      .vben-tree__title {
        font-weight: bolder;
      }
    }
  }

  .auth-element-tree-node {
    .vben-tree__title {
      color: chocolate;
    }
  }

  .tree-wrapper {
    display: flex;
    width: 100%;

    div {
      flex: auto;
    }

    .divider {
      align-self: stretch;
      max-width: 1px;
      margin: 0 50px;
      background-color: #e6e6e6;
    }
  }
</style>
