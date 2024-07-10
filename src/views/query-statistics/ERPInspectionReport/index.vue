<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable">
      <template #totalUnqualified="{ record }">
        <span
          :class="
            !record?.totalUnqualified
              ? 'pointer-events-none'
              : 'text-blue-500 underline cursor-pointer'
          "
          @click.stop.self="handleOpenDetail(record)"
        >
          {{ record?.totalUnqualified }}
        </span>
      </template>
      <template #toolbar>
        <a-button
          type="primary"
          @click="handleExport"
          :loading="buttonLoading"
          v-auth="SearchManager.ERPReportExport"
        >
          导出
        </a-button>
      </template>
    </BasicTable>

    <unqualified-modal @register="registerModal" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { SearchManager } from '@/enums/authCodeEnum';
  import { BasicTable, useTable } from '@/components/Table';
  import { columns, searchFormSchema } from './report.data';
  import { PageWrapper } from '@/components/Page';
  import { getERPInspectionReportList } from '@/api/query-statistics/ERP';
  import { ref } from 'vue';
  import { message } from 'ant-design-vue';
  import { formatData, getHeader, jsonToSheetXlsx } from '@/components/Excel/src/Export2Excel';
  import { useRouter } from 'vue-router';
  import { useGlobalApiStoreWithOut } from '@/store/modules/globalApi';
  import { useModal } from '@/components/Modal';
  import UnqualifiedModal from '@/views/query-statistics/ERPInspectionReport/UnqualifiedModal.vue';

  const globalApiStore = useGlobalApiStoreWithOut();
  defineOptions({ name: 'ERPInspectionReport' });

  const { currentRoute } = useRouter();

  const [registerModal, { openModal }] = useModal();

  const [registerTable, { getForm }] = useTable({
    api: getERPInspectionReportList,
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
    showIndexColumn: true,
    size: 'small',
    striped: false,
    useSearchForm: true,
    bordered: true,
    immediate: false,
  });

  let buttonLoading = ref(false);
  async function handleExport() {
    buttonLoading.value = true;
    try {
      const pageSize = (await globalApiStore.getSysParamsValue('maxPageSize')) as string;
      const data = await getERPInspectionReportList({
        ...getForm().getFieldsValue(),
        currPage: '1',
        pageSize: pageSize,
      });

      if ((data.totalCount || 0) > Number(pageSize))
        return message.warning('最多只能导出【' + pageSize + '】条数据');

      const { rows, merges: headerMerge, lastLevelCols } = getHeader(columns);
      const { result, merge: bodyMerge } = formatData(
        lastLevelCols,
        data.result || [],
        rows.length,
      );
      jsonToSheetXlsx({
        data: [...rows, ...result],
        json2sheetOpts: { skipHeader: true },
        merges: [...headerMerge, ...bodyMerge],
        filename: currentRoute.value.meta.title + '.xlsx',
      });
    } finally {
      buttonLoading.value = false;
    }
  }

  function handleOpenDetail(record) {
    openModal(true, {
      record,
    });
  }
</script>
