<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';
  import { columns, searchFormSchema } from './data';
  import { PageWrapper } from '@/components/Page';
  import { getListApi } from '@/api/query-statistics/sampleQuery';
  import { message } from 'ant-design-vue';

  defineOptions({ name: 'SampleQuery' });

  const [registerTable, { getForm, reload }] = useTable({
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
  });
</script>
