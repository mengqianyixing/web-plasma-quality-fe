<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="50%"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicForm, useForm } from '@/components/Form';
  import { formSchema } from './menu.data';
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';

  import { addMenu, editMenu, getMenuTree } from '@/api/systemServer/system';
  import { PostApiSysMenuRequest, PutApiSysMenuRequest } from '@/api/type/menuManage';

  defineOptions({ name: 'MenuDrawer' });

  const emit = defineEmits(['success', 'register']);

  const isUpdate = ref(true);
  const menuId = ref('');

  const [registerForm, { resetFields, setFieldsValue, updateSchema, validate }] = useForm({
    labelWidth: 100,
    schemas: formSchema,
    showActionButtonGroup: false,
    baseColProps: { lg: 12, md: 24 },
  });

  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    resetFields();
    setDrawerProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;

    if (unref(isUpdate)) {
      menuId.value = data.record.menuId;
      setFieldsValue({
        ...data.record,
      });
    }
    const treeData = await getMenuTree();
    updateSchema({
      field: 'parentId',
      componentProps: { treeData },
    });
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增菜单' : '编辑菜单'));

  async function handleSubmit() {
    try {
      const values = await validate();
      setDrawerProps({ confirmLoading: true });

      if (unref(isUpdate)) {
        await editMenu({
          ...values,
          menuId: menuId.value,
        } as PutApiSysMenuRequest);
        closeDrawer();
      } else {
        await addMenu(values as PostApiSysMenuRequest);
        closeDrawer();
      }
      emit('success');
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }
</script>
