<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable">
      <template #donorNo="{ record }: { record: Recordable }">
        <span class="text-blue-500 underline cursor-pointer" @click.stop.self="handleJump(record)">
          {{ record.cardNo }}
        </span>
      </template>
      <template #toolbar>
        <a-button
          type="primary"
          @click="handleExport"
          v-auth="SearchManager.SampleQueryExport"
          :loading="loading"
        >
          导出
        </a-button>
      </template>
    </BasicTable>
    <DonorModel @register="registerDonorModal" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';
  import { columns, searchFormSchema } from './data';
  import { PageWrapper } from '@/components/Page';
  import { getListApi } from '@/api/query-statistics/sampleQuery';
  import { message } from 'ant-design-vue';
  import { useRouter } from 'vue-router';
  import { jsonToSheetXlsx, formatData, getHeader } from '@/components/Excel/src/Export2Excel';
  import { useGlobalApiStoreWithOut } from '@/store/modules/globalApi';
  import { ref } from 'vue';
  import { SearchManager } from '@/enums/authCodeEnum';
  import DonorModel from '@/__components/donor/donorModel.vue';
  import { useModal } from '@/components/Modal';

  const [registerDonorModal, { openModal }] = useModal();
  const globalApiStore = useGlobalApiStoreWithOut();
  const { currentRoute } = useRouter();
  const loading = ref(false);

  defineOptions({ name: 'SampleQuery' });

  const [registerTable, { getForm, reload, setPagination, setProps }] = useTable({
    immediate: false,
    api: getListApi,
    columns,
    formConfig: {
      schemas: searchFormSchema,
      submitFunc: () => {
        const values = getForm().getFieldsValue();
        const isNotEmptyObject = Object.keys(values).some(
          (key) => values[key] || values[key] === 0,
        );
        if (isNotEmptyObject) {
          setPagination({ current: 1 });
          reload();
          return Promise.resolve();
        }
        message.warning('请输入条件后进行查询');
        return Promise.reject();
      },
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
    sortFn: (e) => {
      setProps({ searchInfo: { orderBy: e.order && e.field, sort: e?.order?.slice(0, -3) } });
    },
  });
  function handleJump(row: Recordable) {
    openModal(true, { cardNo: row.cardNo });
  }
  async function handleExport() {
    try {
      loading.value = true;
      const { getFieldsValue } = getForm();
      const pageSize = (await globalApiStore.getSysParamsValue('maxPageSize')) as string;

      const data = await getListApi({ ...getFieldsValue(), currPage: 1, pageSize } as any);
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
      loading.value = false;
    }
  }
</script>
