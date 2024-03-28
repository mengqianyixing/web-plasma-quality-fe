<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleExport" :loading="loading"> 导出 </a-button>
      </template>
    </BasicTable>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';
  import { columns, searchFormSchema } from './plasma.data';

  import { PageWrapper } from '@/components/Page';
  import { getPlasmaQueryList } from '@/api/query-statistics/plasma';
  import { onMounted, ref } from 'vue';
  import {
    DictionaryItemKeyEnum,
    DictionaryReasonEnum,
    getSysSecondaryDictionary,
  } from '@/api/_dictionary';
  import { formatData, getHeader, jsonToSheetXlsx } from '@/components/Excel/src/Export2Excel';
  import { useRouter } from 'vue-router';
  import { useGlobalApiStoreWithOut } from '@/store/modules/globalApi';

  const globalApiStore = useGlobalApiStoreWithOut();
  defineOptions({ name: 'PlasmaQuery' });

  const { currentRoute } = useRouter();

  const plasmaUnqualifiedDictionary = ref<Recordable[] | undefined>([]);
  onMounted(async () => {
    plasmaUnqualifiedDictionary.value = await getSysSecondaryDictionary({
      dataKey: DictionaryReasonEnum.PlasmaFailedReason,
      dictItemTypes: [
        DictionaryItemKeyEnum.PlasmaFailed,
        DictionaryItemKeyEnum.Track,
        DictionaryItemKeyEnum.Test,
        DictionaryItemKeyEnum.Quarantine,
        DictionaryItemKeyEnum.Sample,
        DictionaryItemKeyEnum.Other,
      ],
    });

    await getForm().updateSchema({
      field: 'plasmaUnqualifiedReason',
      componentProps: {
        options: plasmaUnqualifiedDictionary.value.map((item) => {
          return {
            label: item.label,
            value: item.dictItemId,
          };
        }),
      },
    });
  });

  const [registerTable, { getForm }] = useTable({
    api: getPlasmaQueryList,
    columns,
    formConfig: {
      schemas: searchFormSchema,
      alwaysShowLines: 7,
      showAdvancedButton: true,
      transformDateFunc(date) {
        return date ? date.format('YYYY-MM-DD') : '';
      },
    },
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
    canResize: true,
    immediate: false,
  });

  const loading = ref(false);
  async function handleExport() {
    try {
      loading.value = true;
      const pageSize = (await globalApiStore.getSysParamsValue('maxPageSize')) as string;
      const data = await getPlasmaQueryList({
        ...getForm().getFieldsValue(),
        currPage: 1,
        pageSize,
      } as any);
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
