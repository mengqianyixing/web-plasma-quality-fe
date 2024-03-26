<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <div class="flex p-2 pt-4 mx-5 my-2 bg-white">
      <BasicForm @register="registerBasicForm" :schemas="formSchema" />
    </div>
    <a-tabs
      class="flex-1 bg-white mx-5 my-2"
      default-active-key="outStockProd"
      v-model:activeKey="currentKey"
      type="card"
      size="small"
    >
      <a-tab-pane v-for="item in tabList" :key="item.key" :tab="item.label">
        <BasicTable :api="item.api" @register="registerTable" :columns="item.columns">
          <template #dlvNo="{ record }">
            <span
              class="text-blue-500 underline cursor-pointer"
              @click.stop.self="handleDlvNoClick(record?.dlvNo)"
            >
              {{ record?.dlvNo }}
            </span>
          </template>
        </BasicTable>
      </a-tab-pane>
    </a-tabs>
  </PageWrapper>

  <DetailModal @register="registerModal" />
</template>
<script lang="ts" setup>
  import { BasicColumn, BasicTable, useTable } from '@/components/Table';
  import { BasicForm, useForm } from '@/components/Form';
  import {
    prodERPColumns,
    notProdERPColumns,
    searchFormSchemaByProd,
    searchFormSchemaByNotProd,
  } from './out.data';
  import { Tabs } from 'ant-design-vue';

  import DetailModal from './DetailModal.vue';
  import { PageWrapper } from '@/components/Page';
  import { computed, ref } from 'vue';
  import { getERPOutNotProdList, getERPOutProdList } from '@/api/query-statistics/ERP';
  import { PlasmaOutboundTypeValueEnum } from '@/enums/plasmaEnum';
  import { useModal } from '@/components/Modal';

  defineOptions({ name: 'ERPOutStore' });
  const [registerModal, { openModal }] = useModal();

  const ATabs = Tabs;
  const ATabPane = Tabs.TabPane;

  const currentKey = ref('outStockProd');

  const tabList: {
    key: string;
    label: string;
    columns: BasicColumn[];
    api: (params: any) => Promise<any>;
  }[] = [
    {
      key: 'outStockProd',
      label: '投产出库',
      columns: prodERPColumns,
      api: getERPOutProdList,
    },
    {
      key: 'notOutStockProd',
      label: '未投产出库',
      columns: notProdERPColumns,
      api: getERPOutNotProdList,
    },
  ];

  const formSchema = computed(() =>
    currentKey.value === 'outStockProd' ? searchFormSchemaByProd : searchFormSchemaByNotProd,
  );
  const [registerBasicForm, { getFieldsValue, setFieldsValue }] = useForm({
    submitFunc: formSubmit,
    submitOnReset: true,
    actionColOptions: {
      flex: '1 1 auto',
      push: 6,
    },
    compact: true,
  });

  const [registerTable, { reload }] = useTable({
    beforeFetch: (params) => {
      if (currentKey.value === 'notOutStockProd' && !params.dlvType) {
        params.dlvType = PlasmaOutboundTypeValueEnum.RMT;
      }
      setFieldsValue({ dlvType: PlasmaOutboundTypeValueEnum.RMT });

      return { ...params };
    },
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    scroll: {
      x: 0,
    },
    clickToRowSelect: false,
    size: 'small',
    striped: false,
    useSearchForm: false,
    bordered: true,
    showIndexColumn: false,
    immediate: true,
  });

  async function formSubmit() {
    await reload({
      searchInfo: {
        ...getFieldsValue(),
      },
    });
  }

  function handleDlvNoClick(dlvNo) {
    openModal(true, {
      dlvNo,
    });
  }
</script>
<style scoped>
  .root :deep(.ant-form-item-control-input-content) {
    margin-left: 20px;
  }
</style>
