<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleAdd"> 新增 </a-button>
        <a-button type="primary" @click="handleEdit"> 编辑 </a-button>
        <a-button type="primary" @click="handleDelete"> 撤销 </a-button>
        <a-button type="primary" @click="handleLabelPrint"> 标签打印 </a-button>
      </template>
    </BasicTable>

    <BoxModal @register="registerBoxModal" @success="handleSuccess" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';
  import { columns, searchFormSchema } from './boxes.data';
  import { useModal } from '@/components/Modal';
  import { useMessage } from '@/hooks/web/useMessage';

  import { ref } from 'vue';
  import PageWrapper from '@/components/Page/src/PageWrapper.vue';
  import BoxModal from '@/views/nonconformity/boxes/BoxModal.vue';
  import { deleteBox, nonconformityBoxList } from '@/api/nonconformity/manage';

  const { createMessage, createConfirm } = useMessage();

  defineOptions({ name: 'NonconformityBoxes' });

  const selectedRowsRef = ref<Recordable>([]);
  const [registerTable, { reload, clearSelectedRowKeys }] = useTable({
    title: '不合格库房管理列表',
    api: nonconformityBoxList,
    columns,
    formConfig: {
      labelWidth: 120,
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
    size: 'large',
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

  const [registerBoxModal, { openModal: openBoxModal }] = useModal();

  function handleAdd() {
    openBoxModal(true, {
      isUpdate: false,
    });
  }

  function handleEdit() {
    if (!selectedRowsRef.value.length) {
      createMessage.warn('请选择一条记录');
      return;
    }

    openBoxModal(true, {
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
      content: '确认撤销该箱号？',
      iconType: 'warning',
      onOk: async () => {
        await deleteBox(selectedRowsRef.value[0].boxNo);

        handleSuccess();
      },
    });
  }

  function handleLabelPrint() {}

  function handleSuccess() {
    clearSelectedRowKeys();
    reload();
  }
</script>
