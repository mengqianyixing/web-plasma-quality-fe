<template>
  <div>
    <a-tabs
      class="mt-2"
      default-active-key="outStockProd"
      v-model:activeKey="currentKey"
      type="card"
      size="small"
    >
      <a-tab-pane v-for="item in tabList" :key="item.key" :tab="item.label">
        <BasicTable
          :api="item.api"
          @register="item.instance[0]"
          :columns="item.columns"
          :formConfig="item.formConfig"
          :immediate="false"
        >
          <template #dlvNo="{ record }">
            <span
              class="text-blue-500 underline cursor-pointer"
              @click.stop.self="handleDlvNoClick(record?.dlvNo)"
            >
              {{ record?.dlvNo }}
            </span>
          </template>
          <template #toolbar>
            <a-button
              v-auth="SearchManager.ERPOutStoreExport"
              type="primary"
              @click="handleExport(item.api, item.label, item.columns, item.instance)"
              :loading="loading"
            >
              导出
            </a-button>
          </template>
        </BasicTable>
      </a-tab-pane>
    </a-tabs>

    <DetailModal @register="registerModal" />
  </div>
</template>
<script lang="ts" setup>
  import {
    BasicColumn,
    BasicTable,
    type FormProps,
    useTable,
    BasicTableProps,
  } from '@/components/Table';
  import {
    prodERPColumns,
    notProdERPColumns,
    searchFormSchemaByProd,
    searchFormSchemaByNotProd,
  } from './out.data';
  import { Tabs, message } from 'ant-design-vue';
  import { SearchManager } from '@/enums/authCodeEnum';

  import DetailModal from './DetailModal.vue';
  import { ref } from 'vue';
  import { getERPOutNotProdList, getERPOutProdList } from '@/api/query-statistics/ERP';
  import { useModal } from '@/components/Modal';
  import { formatData, getHeader, jsonToSheetXlsx } from '@/components/Excel/src/Export2Excel';
  import { useGlobalApiStoreWithOut } from '@/store/modules/globalApi';
  import {
    GetApiCoreBankErpOutNonProdRequest,
    GetApiCoreBankErpOutNonProdResponse,
    GetApiProductPrepareErpOutProdRequest,
    GetApiProductPrepareErpOutProdResponse,
  } from '@/api/type/queryStatistics';

  const globalApiStore = useGlobalApiStoreWithOut();

  defineOptions({ name: 'ERPOutStore' });
  const [registerModal, { openModal }] = useModal();

  const ATabs = Tabs;
  const ATabPane = Tabs.TabPane;

  const currentKey = ref('outStockProd');

  type ApiFunction<TParams, TResult> = (params: TParams) => Promise<TResult>;
  const tableProps: BasicTableProps = {
    immediate: false,
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    clickToRowSelect: false,
    size: 'small',
    striped: false,
    useSearchForm: true,
    bordered: true,
    showIndexColumn: false,
  };
  const tabList: {
    key: string;
    label: string;
    columns: BasicColumn[];
    api:
      | ApiFunction<GetApiProductPrepareErpOutProdRequest, GetApiProductPrepareErpOutProdResponse>
      | ApiFunction<GetApiCoreBankErpOutNonProdRequest, GetApiCoreBankErpOutNonProdResponse>;
    formConfig: Partial<FormProps>;
    instance: any;
  }[] = [
    {
      key: 'outStockProd',
      label: '投产出库',
      columns: prodERPColumns,
      api: getERPOutProdList,

      formConfig: {
        schemas: searchFormSchemaByProd,
        submitOnReset: true,
        transformDateFunc(date) {
          return date ? date.format('YYYY-MM-DD') : '';
        },
      },
      instance: useTable(tableProps),
    },
    {
      instance: useTable(tableProps),
      key: 'notOutStockProd',
      label: '其他出库',
      columns: notProdERPColumns,
      api: getERPOutNotProdList,
      formConfig: {
        schemas: searchFormSchemaByNotProd,
        submitOnReset: true,
        transformDateFunc(date) {
          return date ? date.format('YYYY-MM-DD') : '';
        },
      },
    },
  ];

  function handleDlvNoClick(dlvNo: string) {
    openModal(true, {
      dlvNo,
    });
  }

  const loading = ref(false);
  async function handleExport(
    api:
      | ApiFunction<GetApiProductPrepareErpOutProdRequest, GetApiProductPrepareErpOutProdResponse>
      | ApiFunction<GetApiCoreBankErpOutNonProdRequest, GetApiCoreBankErpOutNonProdResponse>,
    fileName: string,
    columns: BasicColumn[],
    instance: any,
  ) {
    loading.value = true;
    try {
      const pageSize = (await globalApiStore.getSysParamsValue('maxPageSize')) as string;
      const OriginData = await api({
        ...instance[1].getForm().getFieldsValue(),
        currPage: '1',
        pageSize,
        exportFlag: true,
      } as GetApiProductPrepareErpOutProdRequest & GetApiCoreBankErpOutNonProdRequest);

      if ((OriginData.totalCount || 0) > Number(pageSize))
        return message.warning('最多只能导出【' + pageSize + '】条数据');
      const { rows, merges: headerMerge, lastLevelCols } = getHeader(columns);
      const { result, merge: bodyMerge } = formatData(
        lastLevelCols,
        OriginData.result || [],
        rows.length,
      );
      jsonToSheetXlsx({
        data: [...rows, ...result],
        json2sheetOpts: { skipHeader: true },
        merges: [...headerMerge, ...bodyMerge],
        filename: fileName + '.xlsx',
      });
    } finally {
      loading.value = false;
    }
  }
</script>
<style scoped>
  :deep(.vben-basic-table-form-container) {
    padding: 0;
  }
</style>
