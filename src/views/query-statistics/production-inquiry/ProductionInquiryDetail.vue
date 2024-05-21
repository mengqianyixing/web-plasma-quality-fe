<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="投产准备明细"
    width="80%"
    :minHeight="650"
    :showOkBtn="false"
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
  import { getForPlasmaListApi } from '@/api/stockout/production-plan';
  import { productionInquiryDetailColumns } from '@/views/query-statistics/production-inquiry/inquiry.data';
  import { useServerConfig } from '@/hooks/common/useServerConfig';

  const { boxText } = useServerConfig();
  defineEmits(['register']);

  const orderNo = ref('');
  const [registerTable, { reload }] = useTable({
    api: getForPlasmaListApi,
    columns: productionInquiryDetailColumns,
    formConfig: {
      schemas: [
        {
          field: 'plasmaBatchNo',
          label: '血浆批号',
          component: 'Input',
        },
        {
          field: 'boxNo',
          label: '血浆' + boxText,
          component: 'Input',
        },
        {
          field: 'plasmaNo',
          label: '血浆编号',
          component: 'Input',
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
    beforeFetch: (params) => {
      return {
        ...params,
        orderNo: orderNo.value,
      };
    },
    scroll: {
      x: 0,
    },
    size: 'small',
    striped: false,
    useSearchForm: true,
    bordered: true,
    showIndexColumn: false,
    isCanResizeParent: true,
    inset: true,
    immediate: false,
  });

  const [register] = useModalInner((data) => {
    orderNo.value = data.record.orderNo;

    reload();
  });
</script>
