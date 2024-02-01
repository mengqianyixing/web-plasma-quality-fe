<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    title="选择准备号"
    @ok="handleSubmit"
    @cancel="resetField"
    :destroyOnClose="true"
    :maskClosable="false"
    width="85%"
  >
    <BasicTable @register="registerTable" />
  </BasicModal>
</template>

<script setup lang="ts">
  import { useModalInner } from '@/components/Modal';
  import { BasicTable, useTable } from '@/components/Table';
  import { FormSchema } from '@/components/Form';
  import { ref } from 'vue';
  import BasicModal from '@/components/Modal/src/BasicModal.vue';
  import { getPrepareList } from '@/api/stockout/production-preparation.js';
  import {
    operationMap,
    operationValueEnum,
    prepareStateMap,
    prepareStateValueEnum,
    pickModeMap,
    pickModeValueEnum,
  } from '@/enums/stockoutEnum';
  import dayjs from 'dayjs';
  import { useMessage } from '@/hooks/web/useMessage';

  const { createMessage } = useMessage();
  const { warning } = createMessage;

  const emit = defineEmits(['success', 'register']);
  const [registerModal, { closeModal }] = useModalInner(async (data) => {
    console.log(data);
  });

  const columns = [
    {
      title: '投产准备号',
      dataIndex: 'prepareNo',
      width: 180,
    },
    {
      title: '投产类型',
      dataIndex: 'prodType',
      width: 100,
      format(text) {
        return `${operationMap.get(text as operationValueEnum)}`;
      },
    },
    {
      title: '挑浆模式',
      dataIndex: 'pickMode',
      format(text) {
        return `${pickModeMap.get(text as pickModeValueEnum)}`;
      },
    },
    {
      title: '批次数量',
      dataIndex: 'batchCount',
      customRender: ({ record }) => {
        if (record.summary && record.summary.batchCount !== null) {
          return record.summary.batchCount;
        }
        return '';
      },
    },
    {
      title: '分拣血浆数量',
      dataIndex: 'pickBagCount',
      customRender: ({ record }) => {
        if (record.summary && record.summary.pickBagCount !== null) {
          return record.summary.pickBagCount;
        }
        return '';
      },
    },
    {
      title: '投产血浆数量',
      dataIndex: 'prodBagCount',
      customRender: ({ record }) => {
        if (record.summary && record.summary.prodBagCount !== null) {
          return record.summary.prodBagCount;
        }
        return '';
      },
    },
    {
      title: '浆员数量',
      dataIndex: 'donorCount',
      customRender: ({ record }) => {
        if (record.summary && record.summary.donorCount !== null) {
          return record.summary.donorCount;
        }
        return '';
      },
    },
    {
      title: '准备人',
      dataIndex: 'creator',
    },
    {
      title: '准备时间',
      dataIndex: 'createAt',
      format(text) {
        return text ? dayjs(text).format('YYYY-MM-DD HH:mm:ss') : '-';
      },
    },
    {
      title: '状态',
      dataIndex: 'prepareState',
      width: 100,
      format(text) {
        return `${prepareStateMap.get(text as prepareStateValueEnum)}`;
      },
    },
  ];

  const searchFormSchema: FormSchema[] = [
    {
      field: 'prepareNo',
      label: '投产准备号',
      component: 'Input',
      colProps: { span: 4 },
    },
    {
      field: 'prodType',
      label: '投产类型',
      component: 'Select',
      colProps: { span: 5 },
      defaultValue: [],
      componentProps: {
        options: [...operationMap.entries()].map(([key, value]) => ({
          value: key,
          label: `${value}`,
        })),
      },
    },
    {
      field: 'prepareState',
      label: '状态',
      component: 'Select',
      colProps: { span: 5 },
      defaultValue: [],
      componentProps: {
        options: [...prepareStateMap.entries()].map(([key, value]) => ({
          value: key,
          label: `${value}`,
        })),
      },
    },
  ];
  // 表格选中行
  const selectedRow = ref<any>([]);

  const [registerTable, { clearSelectedRowKeys }] = useTable({
    api: getPrepareList,
    columns,
    formConfig: {
      labelWidth: 90,
      schemas: searchFormSchema,
    },
    immediate: true,
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    clickToRowSelect: false,
    rowSelection: {
      type: 'radio',
      onChange: (_, selectedRows: any) => {
        selectedRow.value = selectedRows;
      },
    },
    size: 'small',
    striped: false,
    useSearchForm: true,

    handleSearchInfoFn(info) {
      return info;
    },
    bordered: true,
    showIndexColumn: false,
    canResize: false,
  });

  // 确认选择
  async function handleSubmit() {
    if (!selectedRow.value.length) {
      warning('请先选择一条数据!');
      return;
    }
    const firstSelectedItem = selectedRow.value[0];
    emit('success', firstSelectedItem);
    resetField();
  }

  function resetField() {
    closeModal();
    clearSelectedRowKeys();
  }
</script>
