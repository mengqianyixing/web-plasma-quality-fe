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
          v-model:value="model[field]"
          :treeData="treeData"
          :checkedKeys="checkedKeys"
          :fieldNames="{ title: 'menuName', key: 'menuId' }"
          checkable
          checkStrictly
          toolbar
          title="菜单分配"
        />
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

  import { editRole, getRoleDetail, getMenuList, addRole } from '@/api/systemServer/system';
  import {
    GetApiSysRoleIdResponse,
    PostApiSysRoleRequest,
    PutApiSysRoleRequest,
  } from '@/api/type/roleManage';

  const emit = defineEmits(['success', 'register']);
  const isUpdate = ref(true);
  const treeData = ref<TreeItem[]>([]);
  const checkedKeys = ref<Array<string>>([]);
  const roleId = ref('');

  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 90,
    baseColProps: { span: 24 },
    schemas: formSchema,
    showActionButtonGroup: false,
  });

  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    resetFields();
    setDrawerProps({ confirmLoading: false });
    // 需要在setFieldsValue之前先填充treeData，否则Tree组件可能会报key not exist警告
    if (unref(treeData).length === 0) {
      treeData.value = (await getMenuList({})) as any as TreeItem[];
    }
    isUpdate.value = !!data?.isUpdate;

    if (unref(isUpdate)) {
      roleId.value = data.record.roleId;
      const res = (await getRoleDetail(roleId.value)).menuTree;
      checkedKeys.value = flattenTreeArr(res, []);
      setFieldsValue({
        ...data.record,
      });
    }
  });

  function flattenTreeArr(tree: GetApiSysRoleIdResponse['menuTree'], arr: any): Array<string> {
    if (tree) {
      tree.forEach((item) => {
        const { children, ...props } = item;
        props.check && arr.push(props.menuId);
        if (children && children.length != 0) {
          flattenTreeArr(children as unknown as GetApiSysRoleIdResponse['menuTree'], arr);
        }
      });
    }
    return arr;
  }

  const getTitle = computed(() => (!unref(isUpdate) ? '新增角色' : '编辑角色'));

  async function handleSubmit() {
    try {
      const values = await validate();
      setDrawerProps({ confirmLoading: true });
      if (unref(isUpdate)) {
        await editRole({
          ...values,
          roleId: roleId.value,
          menuIds: values.menuIds.checked,
        } as PutApiSysRoleRequest);
      } else {
        await addRole({
          ...values,
          menuIds: values.menuIds.checked,
        } as PostApiSysRoleRequest);
      }
      closeDrawer();
      emit('success');
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }
</script>
