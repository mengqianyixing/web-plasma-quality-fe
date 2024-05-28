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
  import { SERVER_ENUM } from '@/enums/serverEnum';
  import { useStation } from '@/hooks/common/useStation';
  import { useServerEnumStoreWithOut } from '@/store/modules/serverEnums';

  const emit = defineEmits(['success', 'register']);

  const selectedRow = ref<Recordable>([]);
  const { createMessage } = useMessage();
  const { stationOptions } = useStation();
  const serverEnumStore = useServerEnumStoreWithOut();

  const [registerTable, { reload, clearSelectedRowKeys }] = useTable({
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
        title: '样本类型',
        dataIndex: 'sampleType',
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
          field: 'sampleType',
          label: '样本类型',
          component: 'Select',
          componentProps: {
            options: serverEnumStore
              .getServerEnum(SERVER_ENUM.SampleType)
              .filter((it) => it.value === 'PER'),
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
          field: '[acceptBeginAt, acceptEndAt]',
          label: '接收时间',
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
