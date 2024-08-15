<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    showFooter
    title="样本明细"
    width="1200px"
    :minHeight="650"
    @fullscreen="redoHeight"
    :showOkBtn="false"
  >
    <div class="relative h-inherit max-h-inherit min-h-inherit">
      <div class="absolute w-full h-full">
        <BasicTable @register="registerTable" />
      </div>
    </div>
  </BasicModal>
</template>
<script setup lang="ts">
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicTable, useTable } from '@/components/Table';
  import { keepPackDetail } from '@/api/sample-manage/reserve-sample-destory';
  import dayjs from 'dayjs';
  import { useStation } from '@/hooks/common/useStation';

  defineEmits(['register']);
  const { stationOptions } = useStation();

  const [registerTable, { reload, redoHeight, getForm }] = useTable({
    api: keepPackDetail,
    inset: true,
    isCanResizeParent: true,
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    columns: [
      {
        title: '采浆公司',
        dataIndex: 'stationName',
        width: 80,
      },
      {
        title: '样本批号',
        dataIndex: 'batchNo',
        width: 140,
        ellipsis: false,
      },
      {
        title: '样本袋号',
        dataIndex: 'packNo',
        width: 140,
        ellipsis: false,
      },
      {
        title: '箱号',
        dataIndex: 'boxNo',
        width: 140,
        ellipsis: false,
      },
      {
        title: '样本编号',
        dataIndex: 'sampleNo',
        width: 140,
        ellipsis: false,
      },
      {
        title: '采集日期',
        dataIndex: 'collectAt',
        format(text) {
          return text ? dayjs(text).format('YYYY-MM-DD') : '';
        },
        width: 100,
      },
      {
        title: '浆员编号',
        dataIndex: 'cardNo',
        width: 100,
        ellipsis: false,
      },
      {
        title: '浆员姓名',
        dataIndex: 'donorName',
        width: 100,
        ellipsis: false,
      },
    ],
    useSearchForm: true,
    formConfig: {
      schemas: [
        {
          label: '采浆公司',
          field: 'stationNo',
          component: 'Select',
          componentProps: {
            options: stationOptions,
            disabled: true,
          },
        },
        {
          label: '样本批号',
          field: 'batchNo',
          component: 'Input',
        },
        {
          label: '箱号',
          field: 'boxNo',
          component: 'Input',
        },
        {
          label: '样本袋号',
          field: 'packNo',
          component: 'Input',
        },
      ],
      transformDateFunc(date) {
        return date ? date.format('YYYY-MM-DD') : '';
      },
    },
    bordered: true,
  });

  const [registerModal, { setModalProps }] = useModalInner(async (data) => {
    setModalProps({ confirmLoading: false });

    await getForm().setFieldsValue({
      stationNo: data.stationNo,
      batchNo: data.batchSampleNo,
      packNo: data.sampleBagNo,
    });
    await reload();
  });
</script>
