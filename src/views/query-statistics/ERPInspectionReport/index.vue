<template>
  <PageWrapper dense contentFullHeight>
    <div class="overflow-auto flex-grow h-87vh">
      <BasicTable @register="registerTable">
        <template #toolbar>
          <a-button type="primary" @click="handleExport" :loading="buttonLoading">导出</a-button>
        </template>
      </BasicTable>
    </div>

    <div class="flex justify-end bg-white mx-5 mt-3">
      <a-pagination
        @change="handlePageChange"
        @show-size-change="handleSizeChange"
        size="small"
        show-size-changer
        show-quick-jumper
        v-model:current="pager.current"
        :total="pager.total"
      />
    </div>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';
  import { columns, searchFormSchema } from './report.data';
  import { PageWrapper } from '@/components/Page';
  import { getERPInspectionReportList } from '@/api/query-statistics/ERP';
  import { reactive, ref } from 'vue';
  import { Pagination } from 'ant-design-vue';
  import { Range } from 'xlsx';
  import { doExportMultipleTable } from '@/components/Excel/src/Export2Excel';
  import { useRouter } from 'vue-router';

  defineOptions({ name: 'ERPInspectionReport' });

  const { currentRoute } = useRouter();
  const APagination = Pagination;

  const pager = reactive({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [registerTable, { reload, getRawDataSource, getForm }] = useTable({
    api: getERPInspectionReportList,
    beforeFetch: (params) => {
      return {
        ...params,
        currPage: pager.current,
        pageSize: pager.pageSize,
      };
    },
    afterFetch: (data) => {
      const _data = getRawDataSource();
      pager.total = _data.totalCount;
      pager.pageSize = _data.pageSize;
      pager.current = _data.currPage;

      const res: any[] = [];

      data.forEach((item) => {
        item.titerDetailList.forEach((it, i) => {
          res.push({
            ...item,
            ...it,
            rowSpan: i === 0 ? item.titerDetailList.length : 0,
          });
        });
      });

      return res;
    },
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
    pagination: false,
    showIndexColumn: false,
    size: 'small',
    striped: false,
    useSearchForm: true,
    bordered: true,
  });

  function handlePageChange(e) {
    pager.current = e;

    reload();
  }

  function handleSizeChange(_, size) {
    pager.pageSize = size;

    reload();
  }

  let buttonLoading = ref(false);
  async function handleExport() {
    buttonLoading.value = true;
    const result = (
      await getERPInspectionReportList({
        ...getForm().getFieldsValue(),
        currPage: '1',
        pageSize: '999',
      })
    ).result!;
    buttonLoading.value = false;

    let data: any[] = [columns.map((it) => it.title)];
    let merges: Range[] = [];
    result.forEach((item) => {
      Array.from({ length: 6 }).forEach((_, i) => {
        merges.push({
          s: { r: data.length, c: i },
          e: { r: data.length - 1 + item.titerDetailList!.length, c: i },
        });
      });
      data = data.concat(
        item.titerDetailList!.map((it) => [
          item.batchNo,
          item.batchNoFromErp,
          item.recheckAt,
          item.collectBeginAt,
          item.collectEndAt,
          item.materialNo,
          it.plasmaType,
          it.titerType,
          it.totalQualified,
          it.qualifiedNetWeight,
          it.totalUnqualified,
          it.unqualifiedNetWeight,
        ]),
      );
    });

    doExportMultipleTable(
      data,
      currentRoute.value.meta.title,
      currentRoute.value.meta.title,
      merges,
    );
  }
</script>
