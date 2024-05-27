<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable">
      <template #donorNo="{ record }: { record: Recordable }">
        <span class="text-blue-500 underline cursor-pointer" @click.stop.self="handleJump(record)">
          {{ record.donorNo }}
        </span>
      </template>
    </BasicTable>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';
  import { columns, searchFormSchema } from './data';
  import { PageWrapper } from '@/components/Page';
  import { getListApi } from '@/api/query-statistics/sampleQuery';
  import { message } from 'ant-design-vue';
  import { useRouter } from 'vue-router';

  defineOptions({ name: 'SampleQuery' });
  const { push } = useRouter();

  const [registerTable, { getForm, reload, setPagination }] = useTable({
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
  });
  function handleJump(row: Recordable) {
    push({ name: 'DonorQuery', query: { donorNo: row.donorNo } });
  }
</script>
