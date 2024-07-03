<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable">
      <template v-for="slot in slots" :key="slot.name" #[slot.name]="{ value, record }">
        <span
          class="text-blue-500 underline cursor-pointer"
          @click.stop.self="openModal(true, { record, slot })"
        >
          {{ value || 0 }}
        </span>
      </template>
    </BasicTable>
    <TabelModal @register="registerModal" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';
  import { columns, searchFormSchema } from './data';
  import { PageWrapper } from '@/components/Page';
  import { getListApi } from '@/api/query-statistics/sampleStat';
  import { useModal } from '@/components/Modal';
  import TabelModal from './tabelModal.vue';

  defineOptions({ name: 'SampleStatistics' });

  const slots = columns
    .filter((col) => col.slots)
    .map((it) => ({ ...it, name: it.slots?.customRender }));
  const [registerModal, { openModal }] = useModal();

  const [registerTable] = useTable({
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
    immediate: false,
  });
</script>
