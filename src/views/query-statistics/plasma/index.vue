<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable" class="tableHeight">
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
  import { DictionaryReasonEnum, getSysSecondaryDictionary } from '@/api/_dictionary';
  import { formatData, getHeader, jsonToSheetXlsx } from '@/components/Excel/src/Export2Excel';
  import { useRouter } from 'vue-router';
  import { useGlobalApiStoreWithOut } from '@/store/modules/globalApi';
  import { useMessage } from '@/hooks/web/useMessage';
  import { message } from 'ant-design-vue';

  import { cloneDeep, isNull, isEqual } from 'lodash-es';

  const globalApiStore = useGlobalApiStoreWithOut();

  defineOptions({ name: 'PlasmaQuery' });

  const { currentRoute } = useRouter();
  const { createMessage } = useMessage();

  const plasmaUnqualifiedDictionary = ref<Recordable[] | undefined>([]);
  onMounted(async () => {
    plasmaUnqualifiedDictionary.value = await getSysSecondaryDictionary({
      dataKey: DictionaryReasonEnum.PlasmaFailedReason,
      dictItemTypes: [],
      show: 123,
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

  function isEmptyValue(value) {
    return !(
      isEqual(value, {}) || // 空对象
      typeof value === 'undefined' || // undefined
      isNull(value) || // null
      value === '' || // 空字符串
      (Array.isArray(value) && value.length === 0)
    );
  }

  function deleteInvalidProperties(obj, strict = true) {
    if (!obj) return obj;
    const copyObj = cloneDeep(obj);
    Object.entries(obj).forEach(([key, value]) => {
      if (value && typeof value === 'object') {
        copyObj[key] = deleteInvalidProperties(value, strict);
        value = copyObj[key];
      }
      if (!isEmptyValue(value)) {
        delete copyObj[key];
      }
    });
    return copyObj;
  }

  async function submitFunc() {
    const searchForm = getForm().getFieldsValue();

    const _searchForm = deleteInvalidProperties(searchForm);

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
<style scoped lang="less">
  .tableHeight :deep(thead tr th) {
    padding: 5px !important;
  }
</style>
