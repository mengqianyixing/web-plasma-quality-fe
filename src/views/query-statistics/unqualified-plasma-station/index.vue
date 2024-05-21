<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable" :columns="columnsRef">
      <template #toolbar>
        <a-button type="primary" @click="handleExport" :loading="loading"> 导出 </a-button>
      </template>
    </BasicTable>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { BasicColumn, BasicTable, useTable } from '@/components/Table';
  import { columns, searchFormSchema } from './station.data';
  import { PageWrapper } from '@/components/Page';
  import { getUnqualifiedPlasmaStation } from '@/api/query-statistics/batch-statistics';
  import { ref } from 'vue';
  import { formatData, getHeader, jsonToSheetXlsx } from '@/components/Excel/src/Export2Excel';

  import { useGlobalApiStoreWithOut } from '@/store/modules/globalApi';
  import { useRouter } from 'vue-router';
  import { message } from 'ant-design-vue';

  const globalApiStore = useGlobalApiStoreWithOut();
  const { currentRoute } = useRouter();
  const columnsRef = ref<BasicColumn[]>(columns);

  defineOptions({ name: 'UnqualifiedPlasmaByStation' });

  const [registerTable, { getForm }] = useTable({
    api: getUnqualifiedPlasmaStation,
    columns,
    formConfig: {
      schemas: searchFormSchema,
    },
    afterFetch: (data) => {
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
            children: it.children.filter(
              (child) => !nullCols.includes(child.dataIndex as unknown as string),
            ) as any,
          };
        }
        return it;
      });
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
    try {
      loading.value = true;
      const pageSize = (await globalApiStore.getSysParamsValue('maxPageSize')) as string;

      const OriginData = await getUnqualifiedPlasmaStation({
        ...getForm().getFieldsValue(),
        currPage: '1',
        pageSize: pageSize,
      });
      if ((OriginData.totalCount || 0) > Number(pageSize))
        return message.warning('最多只能导出【' + pageSize + '】条数据');
      const { rows, merges: headerMerge, lastLevelCols } = getHeader(columnsRef.value);
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
</script>
