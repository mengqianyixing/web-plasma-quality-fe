<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="样本批次列表"
    width="80%"
    :min-height="650"
    @ok="handleSelect"
  >
    <div class="relative h-inherit max-h-inherit min-h-inherit">
      <div class="absolute flex flex-col w-full h-full">
        <BasicTable @register="registerTable" />
      </div>
    </div>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { ref } from 'vue';
  import { BasicTable, useTable } from '@/components/Table';
  import { useMessage } from '@/hooks/web/useMessage';
  import { sampleReceiveStatusMap } from '@/enums/sampleEnum';
  import { getKeepPackBatchList } from '@/api/sample-manage/reserve-sample-destory';
  import { useStation } from '@/hooks/common/useStation';

  const emit = defineEmits(['success', 'register']);

  const selectedRow = ref<Recordable>([]);
  const { createMessage } = useMessage();
  const { stationOptions } = useStation();

  const [registerTable, { reload, clearSelectedRowKeys, getForm }] = useTable({
    api: getKeepPackBatchList,
    columns: [
      {
        title: '采浆公司',
        dataIndex: 'stationName',
      },
      {
        title: '样本批号',
        dataIndex: 'batchNo',
      },
      {
        title: '样本数量',
        dataIndex: 'sampleCount',
      },
      {
        title: '状态',
        dataIndex: 'acceptState',
        format: (text) => {
          return sampleReceiveStatusMap.get(text as any) as string;
        },
      },
    ],
    formConfig: {
      labelWidth: 120,
      schemas: [
        {
          field: 'batchNo',
          label: '样本批号',
          component: 'Input',
          colProps: { span: 8 },
        },
        {
          field: 'stationNo',
          label: '采浆公司',
          component: 'Select',
          colProps: { span: 8 },
          componentProps: {
            options: stationOptions,
          },
        },
        {
          field: 'acceptState',
          label: '接收状态',
          component: 'Select',
          defaultValue: ['W', 'R'],
          componentProps: {
            mode: 'multiple',
            options: [...sampleReceiveStatusMap].map(([value, label]) => ({ value, label })),
          },
        },
        {
          field: '[acceptBeginDate, acceptEndDate]',
          label: '接收日期',
          component: 'RangePicker',
        },
      ],
      transformDateFunc(date) {
        return date ? date.format('YYYY-MM-DD') : '';
      },
    },
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    clickToRowSelect: true,
    clearSelectOnPageChange: true,
    rowSelection: {
      type: 'radio',
      onChange: (_, selectedRows: any) => {
        selectedRow.value = selectedRows;
      },
    },
    size: 'small',
    striped: false,
    useSearchForm: true,
    bordered: true,
    showIndexColumn: false,
    inset: true,
    isCanResizeParent: true,
    immediate: false,
  });

  const [register, { closeModal }] = useModalInner((data) => {
    getForm()?.resetFields();

    if (data.reload) reload();
  });

  function handleSelect() {
    if (selectedRow.value.length === 0) {
      createMessage.warn('请选择一条数据');
      return;
    }
    emit('success', selectedRow.value[0]);
    clearSelectedRowKeys();
    closeModal();
  }
</script>
