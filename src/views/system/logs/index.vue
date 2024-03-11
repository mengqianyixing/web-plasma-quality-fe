<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';
  import { columns, searchFormSchema } from './data';
  import { PageWrapper } from '@/components/Page';
  import { getListApi, getSelectListApi } from '@/api/sys/logs';
  import { onMounted } from 'vue';

  defineOptions({ name: 'Logs' });

  const [registerTable, { getForm }] = useTable({
    api: getListApi,
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
    size: 'small',
    striped: false,
    useSearchForm: true,
    bordered: true,
  });
  onMounted(() => {
    const { updateSchema, setFieldsValue } = getForm();
    async function moduleNameChange(moduleName) {
      if (!moduleName) {
        setFieldsValue({ optName: void 0 });
        return updateSchema({ field: 'optName', componentProps: { options: [] } });
      }
      const list = await getSelectListApi({ moduleName });
      setFieldsValue({ optName: void 0 });
      updateSchema({
        field: 'optName',
        componentProps: { options: list.map((it) => ({ value: it, label: it })) },
      });
    }
    updateSchema({ field: 'moduleName', componentProps: { onChange: moduleNameChange } });
  });
</script>
