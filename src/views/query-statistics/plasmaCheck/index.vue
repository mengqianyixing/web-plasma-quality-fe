<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <div>
      <BasicTable @register="registerTable" style="padding-bottom: 0" />
    </div>
    <Tabs
      v-model:activeKey="activeKey"
      class="flex-1 bg-white pb-16px m-16px"
      type="card"
      size="small"
    >
      <TabPane key="1" tab="检测结果">
        <BasicTable @register="registerCheckTable" />
      </TabPane>
      <TabPane key="2" tab="效价结果">
        <BasicTable @register="registerCheckTable" />
      </TabPane>
      <TabPane key="3" tab="续追踪不合格">
        <BasicTable @register="registerCheckTable" />
      </TabPane>
    </Tabs>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';
  import { checkColumns, searchFormSchema } from './data';
  import { PageWrapper } from '@/components/Page';
  import { TabPane, Tabs } from 'ant-design-vue';

  import { ref } from 'vue';

  const activeKey = ref('1');

  const [registerTable] = useTable({
    emptyDataIsShowTable: false,
    formConfig: { schemas: searchFormSchema },
    size: 'small',
    useSearchForm: true,
  });
  const [registerCheckTable] = useTable({
    api: () => Promise.resolve({ result: [{}] }),
    columns: checkColumns,
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
    bordered: true,
  });
</script>
