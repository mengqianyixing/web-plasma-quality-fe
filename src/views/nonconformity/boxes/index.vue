<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable">
      <template #unqReason="{ record }"> {{ formatUnqReason(record) }} </template>
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

  import { ref, onMounted } from 'vue';
  import { PageWrapper } from '@/components/Page';
  import BoxModal from '@/views/nonconformity/boxes/BoxModal.vue';
  import { deleteBox, nonconformityBoxList } from '@/api/nonconformity/box-manage';
  import { getPrintRecord } from '@/api/tag/printRecord';
  import {
    DictionaryEnum,
    DictionaryItemKeyEnum,
    getSysSecondaryDictionary,
  } from '@/api/_dictionary';

  const { createMessage, createConfirm } = useMessage();

  defineOptions({ name: 'NonconformityBoxes' });

  const plasmaUnqualifiedDictionary = ref<Recordable[] | undefined>([]);

  onMounted(async () => {
    plasmaUnqualifiedDictionary.value = await getSysSecondaryDictionary({
      dataKey: DictionaryEnum.PlasmaFailedItem,
      dictNos: [
        DictionaryItemKeyEnum.Accept,
        DictionaryItemKeyEnum.Track,
        DictionaryItemKeyEnum.Test,
        DictionaryItemKeyEnum.Quarantine,
        DictionaryItemKeyEnum.Other,
      ],
    });
  });

  const selectedRowsRef = ref<Recordable>([]);
  const [registerTable, { reload, clearSelectedRowKeys }] = useTable({
    api: nonconformityBoxList,
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

  const [registerBoxModal, { openModal: openBoxModal }] = useModal();

  function handleAdd() {
    openBoxModal(true, {
      isUpdate: false,
      unqReasonOptions: plasmaUnqualifiedDictionary.value!.map((it) => ({
        label: it.label,
        value: it.value,
      })),
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
      unqReasonOptions: plasmaUnqualifiedDictionary.value!.map((it) => ({
        label: it.label,
        value: it.value,
      })),
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

  async function handleLabelPrint() {
    const res = await getPrintRecord({
      labelType: 'PLAIN_BOX',
      bissNo: selectedRowsRef.value[0].boxNo,
    });
    console.log(res);
  }

  function handleSuccess() {
    clearSelectedRowKeys();
    reload();
  }

  function formatUnqReason(record: Recordable) {
    return (
      plasmaUnqualifiedDictionary.value?.find((it) => it.value === record.unqReason)?.label ??
      record.unqReason
    );
  }
</script>
