<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable">
      <template #testCount="{ record }: { record: Recordable }">
        <span
          class="text-blue-500 underline cursor-pointer"
          @click.stop.self="openModal(true, record)"
        >
          {{ record.testCount }}
        </span>
      </template>
    </BasicTable>
    <TabelModal @register="registerModal" />
    <UnTabelModal @register="registerUnModal" />
  </PageWrapper>
</template>
<script lang="tsx" setup>
  import { BasicTable, useTable } from '@/components/Table';
  import { columns, searchFormSchema } from './data';
  import { PageWrapper } from '@/components/Page';
  import { getListApi } from '@/api/query-statistics/checkResult';
  import TabelModal from './tabelModal.vue';
  import UnTabelModal from './unTabelModal.vue';
  import { get } from 'lodash-es';
  import { useModal } from '@/components/Modal';

  defineOptions({ name: 'CheckResult' });

  const [registerModal, { openModal }] = useModal();
  const [registerUnModal, { openModal: openUnModal }] = useModal();

  const [registerTable] = useTable({
    api: getListApi,
    columns: columns(({ record, key, label }) => {
      if (record.isCount) return get(record, key);
      return (
        <span
          class="text-blue-500 underline cursor-pointer"
          onClick={() => cellClick(key.split('.')[1], label, record)}
        >
          {get(record, key)}
        </span>
      );
    }),
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

  function cellClick(filedReason: string | null, title: string, record: Recordable) {
    openUnModal(true, {
      filedReason: filedReason === 'count' ? void 0 : filedReason,
      title,
      ...record,
    });
  }
</script>
