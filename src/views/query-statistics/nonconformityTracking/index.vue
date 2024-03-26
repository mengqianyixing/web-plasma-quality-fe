<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button
          type="primary"
          @click="handleEdit"
          :loading="reportLoading"
          v-auth="QuarantineButtonEnum.NonconformityTrackingReport"
        >
          追踪记录/报告
        </a-button>
      </template>
      <template #donorNo="{ record }: { record: Recordable }">
        <span class="text-blue-500 underline cursor-pointer" @click.stop.self="handleJump(record)">
          {{ record.donorNo }}
        </span>
      </template>
    </BasicTable>
    <ReportModal @register="registerReportModal" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';
  import { columns, searchFormSchema } from './nonconformityTracking.data';
  import { PageWrapper } from '@/components/Page';
  import { getNonconformityTrackingList } from '@/api/query-statistics/nonconformityTracking';
  import { getReportApi } from '@/api/report';
  import ReportModal from '@/components/ReportModal/index.vue';
  import { ref } from 'vue';
  import { useModal } from '@/components/Modal';
  import { QuarantineButtonEnum } from '@/enums/authCodeEnum';
  import { message } from 'ant-design-vue';
  import { useRouter } from 'vue-router';

  defineOptions({ name: 'NonconformityTracking' });
  const reportLoading = ref(false);
  const { push } = useRouter();

  const [registerReportModal, { openModal: openReportModal }] = useModal();
  const [registerTable, { getSelectRows }] = useTable({
    api: getNonconformityTrackingList,
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
    rowSelection: { type: 'radio' },
    size: 'small',
    striped: false,
    useSearchForm: true,
    bordered: true,
  });
  async function handleEdit() {
    try {
      const rows = getSelectRows();
      if (!rows.length) return message.warning('请选择数据');
      const [record] = rows;
      reportLoading.value = true;
      const res = await getReportApi({
        reportKey: record.blockBy === 'S' ? 'PLASMA_TRACK' : 'FACTORY_TRACK',
        contentKey: record.dbId,
      });
      openReportModal(true, window.URL.createObjectURL(res));
    } finally {
      reportLoading.value = false;
    }
  }
  function handleJump(row: Recordable) {
    push({ name: 'DonorQuery', query: { donorNo: row.donorNo } });
  }
</script>
