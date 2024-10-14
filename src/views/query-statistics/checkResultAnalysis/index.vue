<template>
  <PageWrapper dense contentFullHeight content-class="relative">
    <div class="absolute w-full h-full pb-16px">
      <div style="height: calc(100% - 45px)">
        <BasicTable @register="registerTable" ref="tableRef">
          <template #toolbar>
            <a-button
              type="primary"
              @click="handlePrint"
              :loading="reportLoading"
              v-auth="SearchManager.CheckResultAnalysisPrint"
            >
              导出
            </a-button>
          </template>
          <template #testTotal="{ text, record }">
            <span
              v-if="record.stationName !== '合计'"
              class="text-blue-500 underline cursor-pointer"
              @click.stop.self="handleDetails(record)"
            >
              {{ text }}
            </span>
            <span v-else>
              {{ text }}
            </span>
          </template>
        </BasicTable>
      </div>
      <div class="bg-white mb-10px pb-6px pr-16px m-6px h-45px">
        <a-pagination
          class="float-right mt-2"
          @change="handlePageChange"
          @show-size-change="handleSizeChange"
          size="small"
          show-size-changer
          show-quick-jumper
          v-model:current="pagerLeft.currPage"
          v-model:pageSize="pagerLeft.pageSize"
          :total="pagerLeft.total"
          :show-total="(total) => `共 ${total} 条数据`"
        />
      </div>
    </div>
    <ReportModal @register="registerReportModal" />

    <TabelModal @register="registerModal" />
  </PageWrapper>
</template>
<script lang="tsx" setup>
  import { BasicTable, useTable } from '@/components/Table';
  import { columns, searchFormSchema } from './data';
  import { PageWrapper } from '@/components/Page';
  import { getListApi, getListCountApi } from '@/api/query-statistics/checkResultAnalysis';
  import TabelModal from './tabelModal.vue';
  import { useModal } from '@/components/Modal';
  import { ref, reactive } from 'vue';
  import { useSticky } from '@/hooks/web/useSticky';
  import { Pagination as APagination } from 'ant-design-vue';
  import { getReportApi } from '@/api/report';
  import ReportModal from '@/components/ReportModal/index.vue';
  import { SearchManager } from '@/enums/authCodeEnum';

  defineOptions({ name: 'CheckResultAnalysis' });
  const tableRef = ref();
  const reportLoading = ref(false);

  const totalStyle = useSticky(tableRef);

  const pagerLeft = reactive({
    currPage: 1,
    pageSize: 30,
    total: 0,
  });
  const [registerReportModal, { openModal: openReportModal }] = useModal();
  const [registerModal, { openModal }] = useModal();
  const [registerTable, { reload, getForm }] = useTable({
    immediate: false,
    api: (p) => getData({ ...p, ...pagerLeft }),
    columns: columns,
    formConfig: {
      schemas: searchFormSchema,
    },
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    size: 'small',
    striped: false,
    useSearchForm: true,
    bordered: true,
    pagination: false,
    isCanResizeParent: true,
    showIndexColumn: false,
  });

  async function handlePageChange(e) {
    pagerLeft.currPage = e;

    await reload();
  }

  async function handleSizeChange(_, size) {
    pagerLeft.pageSize = size;

    await reload();
  }

  function getData(p) {
    return new Promise((rs, rj) => {
      Promise.all([getListApi(p), getListCountApi(p)])
        .then((resList) => {
          pagerLeft.total = resList[0].totalCount!;
          pagerLeft.pageSize = resList[0].pageSize!;
          pagerLeft.currPage = resList[0].currPage!;

          resList[0].result?.push({ ...resList[1], stationName: '合计' });
          rs(resList[0]);
        })
        .catch(rj);
    });
  }
  function handleDetails(record: Recordable) {
    const values = getForm().getFieldsValue();
    openModal(true, {
      ...values,
      stationNo: record.stationNo || values.stationNo,
      batchNo: record.batchNo || values.batchNo,
    });
  }

  async function handlePrint() {
    try {
      reportLoading.value = true;
      const res = await getReportApi({
        reportKey: 'LAB_SAMPLE_PARALLEL',
        contentKey: 'invalid information',
        params: encodeURIComponent(
          JSON.stringify({
            ...getForm().getFieldsValue(),
            ...pagerLeft,
          }),
        ),
      } as any);
      openReportModal(true, window.URL.createObjectURL(res));
    } finally {
      reportLoading.value = false;
    }
  }
</script>
<style scoped lang="scss">
  :deep(.ant-table-tbody tr:last-child) {
    position: v-bind('totalStyle.position');
    z-index: 9;
    top: v-bind('totalStyle.top');
    bottom: v-bind('totalStyle.bottom');
    background-color: #f5f5f5;

    & > td {
      background-color: #f5f5f5;
    }
  }
</style>
