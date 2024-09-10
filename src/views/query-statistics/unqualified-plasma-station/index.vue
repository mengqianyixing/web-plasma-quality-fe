<template>
  <PageWrapper dense contentFullHeight class="root" content-class="relative">
    <div class="absolute w-full h-full pb-16px">
      <div style="height: calc(100% - 45px)">
        <BasicTable @register="registerTable" :columns="columnsRef" ref="tableRef">
          <template #toolbar>
            <a-button
              v-auth="SearchManager.UnqualifiedPlasmaByStationExport"
              type="primary"
              @click="handleExport"
              :loading="loading"
            >
              导出
            </a-button>
          </template>
          <template
            v-for="(slotName, index) in columnsCustomTemplate"
            :key="index"
            #[slotName]="{ record }"
          >
            <span
              :class="
                !record[slotName] ? 'pointer-events-none' : 'text-blue-500 underline cursor-pointer'
              "
              @click.stop.self="handleDetail(record, slotName)"
            >
              {{ record[slotName] }}
            </span>
          </template>
        </BasicTable>
      </div>
      <div class="bg-white mb-10px pb-6px pr-16px m-6px h-45px" v-if="pagerLeft.total > 0">
        <a-pagination
          class="float-right mt-2"
          @change="handlePageChange"
          @show-size-change="handleSizeChange"
          size="small"
          show-size-changer
          show-quick-jumper
          v-model:current="pagerLeft.current"
          v-model:pageSize="pagerLeft.pageSize"
          :total="pagerLeft.total"
          :show-total="(total) => `共 ${total} 条数据`"
        />
      </div>
    </div>

    <DetailModal @register="registerModal" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { BasicColumn, BasicTable, useTable } from '@/components/Table';
  import { columns, searchFormSchema } from './station.data';
  import { PageWrapper } from '@/components/Page';
  import {
    getUnqualifiedPlasmaCountTotal,
    getUnqualifiedPlasmaStation,
  } from '@/api/query-statistics/batch-statistics';
  import { reactive, ref, computed } from 'vue';
  import { formatData, getHeader, jsonToSheetXlsx } from '@/components/Excel/src/Export2Excel';
  import { useSticky } from '@/hooks/web/useSticky';
  import DetailModal from './DetailModal.vue';
  import { SearchManager } from '@/enums/authCodeEnum';

  import { useGlobalApiStoreWithOut } from '@/store/modules/globalApi';
  import { useRouter } from 'vue-router';
  import { Pagination as APagination, message } from 'ant-design-vue';
  import {
    GetApiSearchBatchCountTotalRequest,
    GetApiSearchBatchCountTotalResponse,
  } from '@/api/type/queryStatistics';
  import { debounce } from 'lodash-es';
  import { useModal } from '@/components/Modal';

  const tableRef = ref();
  const totalStyle = useSticky(tableRef);
  const [registerModal, { openModal }] = useModal();

  const globalApiStore = useGlobalApiStoreWithOut();
  const { currentRoute } = useRouter();
  const columnsRef = ref<BasicColumn[]>(columns);
  const columnsCustomTemplate = computed(() => {
    const res: string[] = [];
    columnsRef.value.map((it: any) => {
      if (it.children) {
        it.children.map((child) => {
          if (
            child.slots &&
            child.slots.customRender &&
            !['合计', '比率'].some((it) => child.title.includes(it))
          ) {
            res.push(child.slots.customRender as unknown as string);
          }
        });
      }
    });

    return res;
  });
  const totalData = ref<GetApiSearchBatchCountTotalResponse>({});
  const pagerLeft = reactive({
    current: 1,
    pageSize: 30,
    total: 0,
  });

  defineOptions({ name: 'UnqualifiedPlasmaByStation' });

  let _reloadTable: () => Promise<void>;

  const [registerTable, { getForm, getRawDataSource, reload }] = useTable({
    api: getUnqualifiedPlasmaStation,
    formConfig: {
      schemas: searchFormSchema,
      submitFunc: () => _reloadTable(),
      resetFunc: resetFunc,
      submitOnReset: true,
    },
    beforeFetch: (params) => {
      return {
        ...params,
        currPage: pagerLeft.current,
        pageSize: pagerLeft.pageSize,
      };
    },
    afterFetch: async (data) => {
      const _data = getRawDataSource();

      pagerLeft.total = _data.totalCount;
      pagerLeft.pageSize = _data.pageSize;
      pagerLeft.current = _data.currPage;

      totalData.value = await getUnqualifiedPlasmaCountTotal(
        getForm().getFieldsValue() as GetApiSearchBatchCountTotalRequest,
      );

      const nullCols: string[] = [];
      if (data.length > 0) {
        for (const key in data[0]) {
          if (data[0][key] === null) {
            nullCols.push(key);
          }
        }
      }

      columnsRef.value = columns.map((it) => {
        if (it.children) {
          return {
            ...it,
            children: (
              it.children.filter(
                (child) => !nullCols.includes(child.dataIndex as unknown as string),
              ) as any
            ).map((it) => ({
              ...it,
              slots: {
                customRender: it.dataIndex,
              },
            })),
          };
        }
        return it;
      });

      if (!data.length) {
        return [];
      }

      return [
        ...data.map((it, idx) => ({ ...it, index: idx + 1 })),
        { ...totalData.value, index: '合计' },
      ];
    },
    showIndexColumn: false,
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
    pagination: false,
    isCanResizeParent: true,
  });

  _reloadTable = debounce(reload, 300) as () => Promise<void>;
  async function resetFunc() {
    pagerLeft.current = 1;

    await _reloadTable();
  }

  const loading = ref(false);
  async function handleExport() {
    try {
      loading.value = true;
      const pageSize = (await globalApiStore.getSysParamsValue('maxPageSize')) as string;

      let OriginData: any[];
      const stationRes = await getUnqualifiedPlasmaStation({
        ...getForm().getFieldsValue(),
        currPage: '1',
        pageSize: pageSize,
        exportFlag: true,
      });

      const totalData = await getUnqualifiedPlasmaCountTotal(
        getForm().getFieldsValue() as GetApiSearchBatchCountTotalRequest,
      );

      OriginData = stationRes.result!.map((it, idx) => ({ ...it, index: idx + 1 }));
      OriginData.push({ ...totalData, index: '合计' });
      if ((stationRes.totalCount || 0) > Number(pageSize))
        return message.warning('最多只能导出【' + pageSize + '】条数据');
      const { rows, merges: headerMerge, lastLevelCols } = getHeader(columnsRef.value);
      const { result, merge: bodyMerge } = formatData(lastLevelCols, OriginData || [], rows.length);
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
  async function handlePageChange(e) {
    pagerLeft.current = e;

    await reload();
  }

  async function handleSizeChange(_, size) {
    pagerLeft.pageSize = size;

    await reload();
  }

  function handleDetail(record: Recordable, flag: string) {
    const field = flag.replace(new RegExp(`Num$`), '');
    const unqualifiedCode = record?.[field + 'Code'];

    openModal(true, {
      unqualifiedCode,
      batchNo: record?.batchNo,
      stationNo: record?.stationNo,
      ...getForm().getFieldsValue(),
    });
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
