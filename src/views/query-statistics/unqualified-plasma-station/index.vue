<template>
  <PageWrapper dense contentFullHeight class="root">
    <BasicTable @register="registerTable" :columns="columnsRef">
      <template #toolbar>
        <a-button type="primary" @click="handleExport" :loading="loading"> 导出 </a-button>
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

    <div
      class="flex justify-end items-center bg-white absolute bottom-0 right-6 mt-2"
      v-if="pagerLeft.total > 0"
    >
      <span class="mr-2">共{{ pagerLeft.total }}条数据</span>
      <a-pagination
        @change="handlePageChange"
        @show-size-change="handleSizeChange"
        size="small"
        show-size-changer
        show-quick-jumper
        v-model:current="pagerLeft.current"
        v-model:pageSize="pagerLeft.pageSize"
        :total="pagerLeft.total"
      />
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
  import { reactive, ref, watch, computed } from 'vue';
  import { formatData, getHeader, jsonToSheetXlsx } from '@/components/Excel/src/Export2Excel';
  import { PositionType } from 'ant-design-vue/es/image/style';

  import DetailModal from './DetailModal.vue';

  import { useGlobalApiStoreWithOut } from '@/store/modules/globalApi';
  import { useRouter } from 'vue-router';
  import { Pagination as APagination, message } from 'ant-design-vue';
  import {
    GetApiSearchBatchCountTotalRequest,
    GetApiSearchBatchCountTotalResponse,
  } from '@/api/type/queryStatistics';
  import { debounce } from 'lodash-es';
  import { useModal } from '@/components/Modal';

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
  const totalStyle = ref<{
    position: PositionType;
    top: number | string;
    bottom: number | string;
  }>({
    position: 'sticky',
    top: 0,
    bottom: 0,
  });

  watch(
    () => totalData.value,
    () => {
      setTimeout(() => {
        const bodyDom = document.getElementsByClassName('ant-table-tbody')[0];
        const containerDom = document.getElementsByClassName('ant-table-container')[0];
        const headerDom = document.getElementsByClassName('ant-table-thead')[0];

        const length = getDataSource().length;
        const filterPx = (str: string) => str.replace(/px/g, '');

        const bodyH = Number(filterPx(getComputedStyle(bodyDom).height));
        const containerH = Number(filterPx(getComputedStyle(containerDom).height));
        const headerH = Number(filterPx(getComputedStyle(headerDom).height));

        if (bodyH < containerH - headerH) {
          totalStyle.value.position = 'relative';
          totalStyle.value.top = containerH - 38 * length - headerH - 10 + 'px';
          totalStyle.value.bottom = '';
        } else {
          totalStyle.value.position = 'sticky';
          totalStyle.value.bottom = 0;
          totalStyle.value.top = '';
        }
      }, 200);
    },
  );

  defineOptions({ name: 'UnqualifiedPlasmaByStation' });

  let _reloadTable: () => Promise<void>;

  const [registerTable, { getForm, getDataSource, getRawDataSource, reload }] = useTable({
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
<style scoped>
  .root :deep(.ant-table-tbody tr:last-child) {
    position: v-bind('totalStyle.position');
    top: v-bind('totalStyle.top');
    bottom: v-bind('totalStyle.bottom');
    background-color: #f5f5f5;
  }
</style>
