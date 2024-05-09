<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable">
      <template #mesId="{ record }">
        <span
          :class="!record?.mesId ? 'pointer-events-none' : 'text-blue-500 underline cursor-pointer'"
          @click.stop.self="handleMesIdClick(record)"
        >
          {{ record?.mesId }}
        </span>
      </template>
    </BasicTable>

    <ProductionInquiryDetail @register="registerModal" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { useModal } from '@/components/Modal';
  import { BasicTable, useTable } from '@/components/Table';
  import { columns, searchFormSchema } from './inquiry.data';
  import { PageWrapper } from '@/components/Page';
  import { getProductionInquiry } from '@/api/query-statistics/production';

  import ProductionInquiryDetail from './ProductionInquiryDetail.vue';

  defineOptions({ name: 'ProductionInquiry' });

  const [registerModal, { openModal }] = useModal();

  const [registerTable] = useTable({
    api: getProductionInquiry,
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

  function handleMesIdClick(record) {
    openModal(true, {
      record,
    });
  }
</script>
