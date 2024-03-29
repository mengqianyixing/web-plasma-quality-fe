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
  import { useMessage } from '@/hooks/web/useMessage';

  import { cloneDeep, isEmpty } from 'lodash-es';

  const globalApiStore = useGlobalApiStoreWithOut();

  defineOptions({ name: 'PlasmaQuery' });

  const { currentRoute } = useRouter();
  const { createMessage } = useMessage();

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

  const [registerTable, { getForm, reload }] = useTable({
    api: getPlasmaQueryList,
    columns,
    formConfig: {
      schemas: searchFormSchema,
      submitFunc,
      alwaysShowLines: 7,
      submitOnReset: true,
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

  function deleteInvalidProperties(obj, strict = true) {
    if (!obj) return obj;
    const copyObj = cloneDeep(obj);
    Object.entries(obj).forEach(([key, value]) => {
      if (value && typeof value === 'object') {
        copyObj[key] = deleteInvalidProperties(value, strict);
        value = copyObj[key];
      }
      if (isEmpty(value)) {
        delete copyObj[key];
      }
    });
    return copyObj;
  }

  async function submitFunc() {
    const searchForm = getForm().getFieldsValue();

    const _searchForm = deleteInvalidProperties(searchForm);
    console.log(_searchForm, '_searchForm');

    if (Object.keys(_searchForm).length === 0) {
      createMessage.error('请至少输入一个查询条件');
    } else {
      await reload();
    }
  }

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
