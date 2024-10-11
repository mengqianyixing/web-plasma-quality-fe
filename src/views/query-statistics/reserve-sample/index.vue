<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button
          type="primary"
          @click="handleExport"
          :loading="loading"
          v-auth="SearchManager.CallbackBatchExport"
        >
          导出
        </a-button>
      </template>
      <template #packNum="{ record }">
        <span
          :class="
            !record?.packNum ? 'pointer-events-none' : 'text-blue-500 underline cursor-pointer'
          "
          @click.stop.self="handleOpenPackDetail(record)"
        >
          {{ record?.packNum }}
        </span>
      </template>
      <template #sampleNum="{ record }">
        <span
          :class="
            !record?.sampleNum ? 'pointer-events-none' : 'text-blue-500 underline cursor-pointer'
          "
          @click.stop.self="handleOpenSampleBatchDetail(record)"
        >
          {{ record?.sampleNum }}
        </span>
      </template>
    </BasicTable>
    <PackDetailModal @register="registerPackDetailModal" />
    <SampleBatchDetailModal @register="registerSampleBatchDetailModal" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';
  import { mainRetainColumns, searchMainRetainColumnsFormSchema } from './reserver.data';
  import { PageWrapper } from '@/components/Page';

  import { formatData, getHeader, jsonToSheetXlsx } from '@/components/Excel/src/Export2Excel';
  import { useRouter } from 'vue-router';
  import { ref } from 'vue';
  import { SearchManager } from '@/enums/authCodeEnum';
  import { useGlobalApiStoreWithOut } from '@/store/modules/globalApi';
  import { message } from 'ant-design-vue';
  import { getRetainBatchList } from '@/api/query-statistics/reserve-sample';
  import { useModal } from '@/components/Modal';
  import PackDetailModal from '@/views/query-statistics/reserve-sample/PackDetailModal.vue';
  import SampleBatchDetailModal from '@/views/query-statistics/reserve-sample/SampleBatchDetailModal.vue';

  const globalApiStore = useGlobalApiStoreWithOut();

  defineOptions({ name: 'ReserveSample' });

  const { currentRoute } = useRouter();

  const [registerPackDetailModal, { openModal: openPackDetailModal }] = useModal();
  const [registerSampleBatchDetailModal, { openModal: openSampleDetailModal }] = useModal();

  const [registerTable, { getForm }] = useTable({
    api: getRetainBatchList,
    columns: mainRetainColumns,
    formConfig: {
      schemas: searchMainRetainColumnsFormSchema,
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
    immediate: false,
  });

  const loading = ref(false);
  async function handleExport() {
    loading.value = true;
    try {
      const pageSize = (await globalApiStore.getSysParamsValue('maxPageSize')) as string;
      const OriginData: any = await getRetainBatchList({
        ...getForm().getFieldsValue(),
        currPage: '1',
        pageSize,
        exportFlag: true,
      });
      loading.value = false;
      if ((OriginData.totalCount || 0) > Number(pageSize))
        return message.warning('最多只能导出【' + pageSize + '】条数据');
      const { rows, merges: headerMerge, lastLevelCols } = getHeader(mainRetainColumns);
      const { result, merge: bodyMerge } = formatData(
        lastLevelCols,
        OriginData.result || [],
        rows.length,
      );
      jsonToSheetXlsx({
        data: [...rows, ...result],
        json2sheetOpts: { skipHeader: true },
        merges: [...headerMerge, ...bodyMerge],
        filename: currentRoute.value.meta.title + '.xlsx',
      });
    } finally {
      loading.value = false;
    }
  }

  function handleOpenPackDetail(record) {
    openPackDetailModal(true, {
      record,
    });
  }

  function handleOpenSampleBatchDetail(record) {
    openSampleDetailModal(true, {
      record,
    });
  }
</script>
