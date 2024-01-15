<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="500px"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm">
      <template #menu="{ model, field }">
        <BasicTree
          v-model:checkedKeys="model[field]"
          :treeData="treeData"
          :fieldNames="{ title: 'title', key: 'id' }"
          checkable
          checkStrictly
          @check="handleTreeSelect"
          title="菜单/权限分配"
        />
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
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicForm, useForm } from '@/components/Form';
  import { formSchema } from './role.data';
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { BasicTree, TreeItem } from '@/components/Tree';
  import { Select, SelectOption } from 'ant-design-vue';
  import { modulesRouteList } from '@/router/routes';
  import {
    getCasDoorUsers,
    addCasDoorRole,
    // getRoleDomainAuth,
    setCasDoorRoles,
  } from '@/api/oauth/menu';

  const emit = defineEmits(['success', 'register']);
  const isUpdate = ref(true);
  const treeData = ref<TreeItem[]>([]);
  const roleId = ref('');
  const userOptions = ref<any[]>([]);

  getCasDoorUsers().then((res) => {
    console.log({ res });
    userOptions.value = res.map((item) => {
      return {
        label: item.owner + '/' + item.name + '(' + item.displayName + ')',
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

  const filterRoutes = (routes: any[]): any[] => {
    const filteredRoutes: any[] = [];

    routes.forEach((item: any) => {
      if (item.id && !item.children && !item.authElements) {
        if (`${item?.id}`.includes('E_')) {
          item.class = 'auth-element-tree-node';
        }
        filteredRoutes.push({
          ...item,
          title: item?.meta?.title ?? item.title ?? item.name,
        });
        return;
      }
      if (item.children) {
        const filteredChildren = filterRoutes(item.children);
        if (filteredChildren.length > 0) {
          item.children = filteredChildren;
          filteredRoutes.push({
            ...item,
            title: item?.meta?.title ?? item.title ?? item.name,
          });
        }
        return;
      }
      if (item.authElements) {
        const filteredChildren = filterRoutes(item.authElements);
        if (filteredChildren.length > 0) {
          // 将 authElements 导入到菜单
          item.children = filteredChildren;
          filteredRoutes.push({
            ...item,
            title: item?.meta?.title ?? item.title ?? item.name,
          });
        }
        return;
      }
    });

    return filteredRoutes.sort((a, b) => {
      return (b?.menuWeight || 0) - (a?.menuWeight || 0);
    });
  };

  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    resetFields();
    setDrawerProps({ confirmLoading: false });
    // 需要在setFieldsValue之前先填充treeData，否则Tree组件可能会报key not exist警告
    if (unref(treeData).length === 0) {
      treeData.value = filterRoutes(modulesRouteList);
      console.log({ treeData, modulesRouteList });
    }
    isUpdate.value = !!data?.isUpdate;

    if (unref(isUpdate)) {
      roleId.value = data.record.name;
      // let res: any = [];
      // try {
      //   res = await getRoleDomainAuth({ name: data.record.name });
      // } catch (e) {
      //   res = [];
      // }
      setFieldsValue({
        // ...res,
        ...data.record,
        domains: (data?.record?.domains ?? []).map((it) => (isNaN(Number(it)) ? it : Number(it))),
        oldName: data.record.name,
      });
    }
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增角色' : '编辑角色'));

  const filterOption = (input: string, option: any) => {
    console.log(input, option);
    return option.key.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };

  function handleTreeSelect(keys, nodes) {
    console.log({ keys, nodes });
    // @TODO 半选父组件
  }

  async function handleSubmit() {
    try {
      const values = await validate();
      const domains = values?.domains?.checked ?? [];
      // loading
      setDrawerProps({ confirmLoading: true });
      try {
        if (unref(isUpdate)) {
          await setCasDoorRoles({
            ...values,
            domains,
            oldName: roleId.value,
          });
        } else {
          await addCasDoorRole({
            ...values,
            domains,
          });
        }
      } catch (e) {
        console.log(e);
      }
      setDrawerProps({ confirmLoading: false });
      closeDrawer();
      emit('success');
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }
</script>

<style lang="scss">
  .auth-element-tree-node {
    flex-direction: row-reverse;

    .vben-tree__title {
      justify-content: end;
      color: chocolate;
    }

    .ant-tree-checkbox.ant-tree-checkbox-checked ~ .ant-tree-node-content-wrapper {
      .vben-tree__title {
        font-weight: bolder;
      }
    }
  }
</style>
