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
              title="菜单/权限分配"
              ref="previewTreeRef"
            >
              <template #title="node">
                <span @click="checkChange(node.id)">
                  <Checkbox
                    class="mr-10px"
                    :checked="nodeCheckState(node.id).checked"
                    :indeterminate="nodeCheckState(node.id).halfChecked"
                  />
                </span>
                {{ node.title }}
              </template>
            </BasicTree>
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
  import { Select, SelectOption, Checkbox } from 'ant-design-vue';
  import { modulesRouteList } from '@/router/routes';
  import {
    getCasDoorAllUsers,
    addCasDoorRole,
    // getRoleDomainAuth,
    setCasDoorRole,
  } from '@/api/oauth/auth';
  import { intersection, xor } from 'lodash-es';
  import { treeFlatArray } from '@/utils';

  const emit = defineEmits(['success', 'register']);
  const isUpdate = ref(true);
  const treeData = ref<TreeItem[]>([]);
  const roleId = ref('');
  const userOptions = ref<any[]>([]);
  const previewTreeRef = ref<Nullable<TreeActionType>>(null);
  const treeNodeMap: Map<number | string, TreeItem> = new Map();
  const nodeCheckMap = ref<Map<string | number, { checked: boolean; halfChecked: boolean }>>(
    new Map(),
  );
  const nodeCheckState = computed(
    () => (id: string | number) =>
      nodeCheckMap.value.get(String(id)) || { checked: false, halfChecked: false },
  );

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

  function checkChange(id: string) {
    const node: TreeItem = treeNodeMap.get(id)!;
    const { checked, halfChecked } = nodeCheckState.value(node.id);
    if (!checked || halfChecked) {
      nodeCheckMap.value.set(node.id, { checked: true, halfChecked: false });
    } else {
      nodeCheckMap.value.set(node.id, { checked: false, halfChecked: false });
    }
    setParentPathNode(node);
    setChildrenNode(node, nodeCheckMap.value.get(node.id)!.checked);
  }
  function generateCheckedAndHalfChecked2(userPermissions: (string | number)[]) {
    const map = new Map();
    const userPermissionsMap = new Map();
    userPermissions.forEach((it) => {
      map.set(String(it), { checked: true, halfChecked: false });
      userPermissionsMap.set(String(it), String(it));
    });
    nodeCheckMap.value = map;
    userPermissions.forEach((it) => {
      const node = treeNodeMap.get(it);
      if (!node) return;
      const { parentId, children = [] } = node;
      if (!parentId) return;
      if (children.length) {
        const allChindNotCheck = children.every((it) => {
          const checkState = nodeCheckState.value(it.id);
          return !checkState.checked && !checkState.halfChecked;
        });
        const childId = children[0].id;
        allChindNotCheck && setParentPathNode(treeNodeMap.get(childId)!);
      } else {
        setParentPathNode(node);
      }
    });
  }
  const statusMap = { checked: 2, halfChecked: 1, other: 0 };
  function setParentPathNode(node: TreeItem) {
    const { parentId } = node;
    const parentNode = treeNodeMap.get(parentId);
    if (!parentNode) return;
    // 子节点被选中
    const checked = parentNode.children!.every((it) => {
      const checkNode = nodeCheckMap.value.get(it.id);
      return checkNode && checkNode.checked;
    });
    // 子节点存在不确定
    const statusSet: Set<number> = new Set();
    parentNode.children!.forEach((it) => {
      const checkNode = nodeCheckMap.value.get(it.id);
      if (!checkNode) return statusSet.add(statusMap.other);
      const { checked, halfChecked } = checkNode!;
      if (checked) statusSet.add(statusMap.checked);
      else if (halfChecked) statusSet.add(statusMap.halfChecked);
      else statusSet.add(statusMap.other);
    });
    let halfChecked = false;
    if (statusSet.size === 1 && !statusSet.has(statusMap.checked)) {
      halfChecked = true;
    } else if (statusSet.size !== 1) {
      halfChecked = true;
    }
    console.log(checked, halfChecked, parentNode.title);
    nodeCheckMap.value.set(parentNode.id, {
      checked: checked,
      halfChecked: halfChecked,
    });
    setParentPathNode(parentNode);
  }
  function setChildrenNode(node: TreeItem, checked: boolean) {
    const nodes = [...(node.children || [])];
    let childNode = nodes.pop();
    while (childNode) {
      nodeCheckMap.value.set(childNode!.id, { checked, halfChecked: false });
      nodes.push(...(childNode!.children || []));
      childNode = nodes.pop();
    }
  }

  const cacheInnerData: any = {};
  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    await resetFields();
    setModalProps({ confirmLoading: false });
    // 需要在setFieldsValue之前先填充treeData，否则Tree组件可能会报key not exist警告
    if (unref(treeData).length === 0) {
      treeData.value = filterRoutes(modulesRouteList);
      const list = treeFlatArray<TreeItem>(treeData.value);
      list.forEach((it) => treeNodeMap.set(String(it.id), it));
    }
    isUpdate.value = !!data?.isUpdate;

    if (unref(isUpdate)) {
      const domains = data.record.domains.map((it) => String(it));
      generateCheckedAndHalfChecked2(domains);

      roleId.value = data.record.name;
      cacheInnerData.domains = domains;
      cacheInnerData.users = data.record.users;
      await setFieldsValue({
        ...data.record,
        oldName: data.record.name,
      });
    }
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增角色' : '编辑角色'));

  const filterOption = (input: string, option: any) => {
    return option.key.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };

  async function handleSubmit() {
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
      const domains: (string | number)[] = [];
      for (const [key, checkState] of nodeCheckMap.value) {
        if (checkState.checked || checkState.halfChecked) domains.push(key);
      }
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

          const curDomains = [...domains];
          const cacheDomains = [...cacheInnerData.domains];

          const intersectionDomains = intersection(curDomains, cacheDomains);

          const addAuth = xor(curDomains, intersectionDomains)
            .map((id) => treeNodeMap.get(id)!.title)
            .join(',')
            ? `绑定了菜单权限[${xor(curDomains, intersectionDomains)
                .map((id) => treeNodeMap.get(id)!.title)
                .join(',')}]`
            : '';

          const removeAuth = xor(cacheDomains, intersectionDomains)
            .map((id) => treeNodeMap.get(id)!.title)
            .join(',')
            ? `解绑了菜单权限[${xor(cacheDomains, intersectionDomains)
                .map((id) => treeNodeMap.get(id)!.title)
                .join(',')}]`
            : '';

          await setCasDoorRole({
            ...values,
            domains: domains,
            oldName: roleId.value,
            logMsg: `${addMsg},${removeMsg},${addAuth},${removeAuth}`,
          });
        } else {
          const users = values.users.map((item) => item.split('/')[1]).join(',');
          const authMsg = domains.map((id) => treeNodeMap.get(id)!.title).join(',');
          const logMsg = `绑定了用户[${users}], 绑定了菜单权限[${authMsg}]`;
          await addCasDoorRole({
            ...values,
            domains: domains,
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
