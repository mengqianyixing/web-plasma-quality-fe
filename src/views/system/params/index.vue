<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleAdd"> 新增 </a-button>
        <a-button type="primary" @click="handleEdit"> 编辑 </a-button>
        <a-button type="primary" @click="handleDelete"> 撤销 </a-button>
      </template>
    </BasicTable>

    <EditParamsModal @register="registerParamsModal" @success="handleSuccess" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';
  import { columns, searchFormSchema } from './params.data';
  import { useModal } from '@/components/Modal';
  import { useMessage } from '@/hooks/web/useMessage';

  import { ref } from 'vue';
  import { PageWrapper } from '@/components/Page';
  import EditParamsModal from '@/views/system/params/EditParamsModal.vue';
  import { deleteSysParams, getSysParamsList } from '@/api/systemServer/params';

  const { createMessage, createConfirm } = useMessage();

  defineOptions({ name: 'NonconformityBoxes' });

  const selectedRowsRef = ref<Recordable>([]);
  const [registerTable, { reload, clearSelectedRowKeys }] = useTable({
    api: getSysParamsList,
    columns,
    formConfig: {
      schemas: searchFormSchema,
    },
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    clickToRowSelect: true,
    rowSelection: {
      type: 'radio',
      onChange(_, selectedRows) {
        selectedRowsRef.value = selectedRows;
      },
    },
    size: 'small',
    striped: false,
    useSearchForm: true,
    showTableSetting: true,
    tableSetting: {
      size: false,
      redo: false,
      setting: false,
    },
    bordered: true,
    showIndexColumn: false,
    canResize: true,
  });

  const [registerParamsModal, { openModal: openParamsModal }] = useModal();

  function handleAdd() {
    openParamsModal(true, {
      isUpdate: false,
    });
  }

  function handleEdit() {
    if (!selectedRowsRef.value.length) {
      createMessage.warn('请选择一条记录');
      return;
    }

    openParamsModal(true, {
      isUpdate: true,
      record: selectedRowsRef.value[0],
    });
  }

  async function handleDelete() {
    if (!selectedRowsRef.value.length) {
      createMessage.warn('请选择一条记录');
      return;
    }

    createConfirm({
      title: '撤销',
      content: '确认撤销该系统参数？',
      iconType: 'warning',
      onOk: async () => {
        await deleteSysParams(selectedRowsRef.value[0].id);
        handleSuccess();
      },
    });
  }

  function handleSuccess() {
    clearSelectedRowKeys();
    reload();
  }
</script>
