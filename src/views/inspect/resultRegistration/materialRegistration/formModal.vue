<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    showFooter
    title="新增"
    :minHeight="520"
    width="1200px"
    @fullscreen="redoHeight"
    @ok="handleSubmit"
  >
    <div class="relative h-inherit max-h-inherit min-h-inherit">
      <div class="absolute w-full h-full"> <BasicTable @register="registerTable" /> </div
    ></div>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { reactive, nextTick } from 'vue';
  import { columns } from './data';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicTable, useTable } from '@/components/Table';
  import { message } from 'ant-design-vue';
  import {
    getTiterItemMaterialApi,
    getTiterItemsApi,
    submitMaterialApi,
  } from '@/api/inspect/resultRegistration';

  const emit = defineEmits(['success', 'register']);
  defineOptions({ name: 'FormModel' });

  const state = reactive({ bsNo: '', projectId: '' });

  const [registerTable, { getSelectRows, clearSelectedRowKeys, getForm, redoHeight, reload }] =
    useTable({
      immediate: false,
      api: getTiterItemMaterialApi,
      columns: columns,
      size: 'small',
      pagination: false,
      useSearchForm: true,
      bordered: true,
      showIndexColumn: false,
      isCanResizeParent: true,
      inset: false,
      rowSelection: { type: 'radio' },
      formConfig: {
        showActionButtonGroup: false,
        autoSubmitOnEnter: true,
        schemas: [
          {
            label: '检验项目',
            component: 'Select',
            field: 'projectId',
            componentProps: {
              allowClear: false,
              onChange: async () => {
                await nextTick();
                reload();
              },
            },
          },
        ],
      },
      beforeFetch: (p) => {
        state.projectId = p.projectId;
        return p;
      },
      afterFetch: (res) => {
        clearSelectedRowKeys();
        return res;
      },
    });
  const [registerModal, { setModalProps, closeModal }] = useModalInner(async ({ bsNo }) => {
    state.bsNo = bsNo;
    clearSelectedRowKeys();
    const { updateSchema, setFieldsValue } = getForm();
    const res = await getTiterItemsApi({ bsNo });
    if (res.length === 0) return;
    updateSchema({ field: 'projectId', componentProps: { options: res } });
    setFieldsValue({ projectId: res[0].value });
  });
  async function handleSubmit() {
    try {
      const rows = getSelectRows();
      if (rows.length === 0) return message.warning('请选择数据');
      setModalProps({ confirmLoading: true });
      await submitMaterialApi({ fkProjectId: state.projectId, bsNo: state.bsNo, id: rows[0].id });
      message.success('添加成功');
      setModalProps({ confirmLoading: false });
      closeModal();
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
