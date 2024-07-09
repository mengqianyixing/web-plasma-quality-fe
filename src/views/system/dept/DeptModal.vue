<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form';
  import { formSchema } from './dept.data';

  import { addDept, editDept, getDeptList } from '@/api/systemServer/system';
  import { PutApiSysCasdoorGroupRequest } from '@/api/type/departmentManagement';

  defineOptions({ name: 'DeptModal' });

  const emit = defineEmits(['success', 'register']);

  const isUpdate = ref(true);
  const name = ref('');

  const [registerForm, { resetFields, setFieldsValue, updateSchema, validate }] = useForm({
    labelWidth: 100,
    baseColProps: { span: 24 },
    schemas: formSchema,
    showActionButtonGroup: false,
  });

  function findParentKey(tree, targetKey) {
    function findParentKeyRecursive(node, targetKey, parentKey = null) {
      if (node.key === targetKey) {
        return parentKey;
      }

      if (node.children) {
        for (let child of node.children) {
          const result = findParentKeyRecursive(child, targetKey, node.key);
          if (result !== null) {
            return result;
          }
        }
      }

      return null;
    }

    // 在顶层数组中遍历每个节点
    for (let node of tree) {
      const result = findParentKeyRecursive(node, targetKey);
      if (result !== null) {
        return result;
      }
    }

    return null;
  }

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    await resetFields();
    setModalProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;
    const treeData = await getDeptList({ withTree: true });

    if (unref(isUpdate)) {
      name.value = data.record.key;
      const currKey = data.record.key;

      const parentKey = findParentKey(treeData, currKey);

      await setFieldsValue({
        ...data.record,
        parentId: parentKey,
      });

      await updateSchema({
        field: 'parentId',
        show: Boolean(parentKey),
      });
    } else {
      await updateSchema({
        field: 'parentId',
        show: true,
      });
    }
    await updateSchema({
      field: 'parentId',
      componentProps: { treeData },
    });
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增部门' : '编辑部门'));

  async function handleSubmit() {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });
      if (isUpdate.value) {
        await editDept({ ...values, name: name.value, displayName: values.title });
      } else {
        await addDept({
          ...values,
          displayName: values.title,
        } as PutApiSysCasdoorGroupRequest);
      }
      closeModal();
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
