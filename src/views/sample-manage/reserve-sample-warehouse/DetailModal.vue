<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    showFooter
    title="样本明细"
    width="80%"
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
      },
      {
        title: '样本批号',
        dataIndex: 'batchNo',
      },
      {
        title: '样本袋号',
        dataIndex: 'packNo',
      },
      {
        title: '箱号',
        dataIndex: 'boxNo',
      },
      {
        title: '样本编号',
        dataIndex: 'sampleNo',
      },
      {
        title: '采集日期',
        dataIndex: 'collectAt',
        format(text) {
          return text ? dayjs(text).format('YYYY-MM-DD') : '';
        },
      },
      {
        title: '浆员编号',
        dataIndex: 'donorNo',
      },
      {
        title: '浆员姓名',
        dataIndex: 'donorName',
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
          colProps: {
            span: 6,
          },
        },
        {
          label: '样本批号',
          field: 'batchNo',
          component: 'Input',
          colProps: {
            span: 6,
          },
        },
        {
          label: '箱号',
          field: 'boxNo',
          component: 'Input',
          colProps: {
            span: 6,
          },
        },
        {
          label: '样本袋号',
          field: 'packNo',
          component: 'Input',
          colProps: {
            span: 6,
          },
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
