<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="不合格血浆详情列表"
    width="80%"
    :minHeight="650"
    :showOkBtn="false"
    @fullscreen="redoHeight"
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
  import { getERPInspectionReportDetail } from '@/api/query-statistics/ERP';
  import { detailColumns } from '@/views/query-statistics/ERPInspectionReport/report.data';

  defineEmits(['register']);

  const batchNo = ref('');
  const titerType = ref('');
  const [registerTable, { reload, redoHeight }] = useTable({
    api: getERPInspectionReportDetail,
    columns: detailColumns,
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    beforeFetch: (params) => {
      return {
        ...params,
        batchNo: batchNo.value,
        titerType: titerType.value,
      };
    },
    size: 'small',
    striped: false,
    useSearchForm: false,
    bordered: true,
    showIndexColumn: false,
    isCanResizeParent: true,
    inset: true,
    immediate: false,
  });

  const [register] = useModalInner((data) => {
    batchNo.value = data.record.batchNo;
    titerType.value = data.record.titerType;

    reload();
  });
</script>
