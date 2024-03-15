<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    showFooter
    title="投产出库-详情"
    width="1400px"
    :show-ok-btn="false"
    cancelText="关闭"
    :min-height="600"
    @ok="handleSubmit"
    @cancel="close"
  >
    <div class="relative h-inherit max-h-inherit min-h-inherit">
      <div class="absolute flex flex-col w-full h-full">
        <CellWapper :data="cellData" :cell-list="cellList" :gap="0" />
        <div class="flex-1 w-full">
          <Tabs
            type="card"
            size="small"
            v-model:activeKey="activeKey"
            @change="change"
            class="h-full bg-white tabs"
          >
            <TabPane v-for="tab in tabList" :key="tab.key" :tab="tab.label">
              <div style="height: calc(100% - 20px)">
                <component
                  :is="componentMap.get(tab.key)"
                  @register="tableInstanceMap.get(tab.key)[0]"
                />
              </div>
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  </BasicModal>
</template>
<script setup lang="ts">
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { TabPane, Tabs } from 'ant-design-vue';
  import { ref, markRaw, reactive, nextTick } from 'vue';
  import { CellWapper } from '@/components/CellWapper';
  import { cellList, tabList, tableColumns } from './production-plan.data';
  import { BasicTable, useTable } from '@/components/Table';
  import { getDtApi } from '@/api/stockout/production-plan';

  const emit = defineEmits(['close', 'register']);
  const activeKey = ref(tabList[0].key);
  const state = reactive({
    orderNo: '',
    disabled: '',
    loading: false,
  });
  const cellData = ref(cellList.reduce((t, c) => ((t[c.field] = ''), t), {}));
  const initComponent = () => tabList.reduce((t, c) => (t.set(c.key, 'div'), t), new Map());
  const componentMap = ref(initComponent());

  const tableInstanceMap = tabList.reduce((t, c) => {
    const tableInstance = useTable({
      api: c.api,
      inset: true,
      isCanResizeParent: true,
      fetchSetting: {
        pageField: 'currPage',
        sizeField: 'pageSize',
        totalField: 'totalCount',
        listField: 'result',
      },
      columns: tableColumns[c.key],
      size: 'small',
      bordered: true,
      scroll: {
        x: 0,
      },
      pagination: !!c.pagination,
      beforeFetch: (p) => ({ ...p, orderNo: state.orderNo }),
      afterFetch: (res) => {
        tableInstance[1].clearSelectedRowKeys();
        return res;
      },
    });
    t.set(c.key, tableInstance);
    return t;
  }, new Map());

  const [registerModal] = useModalInner(async (data) => {
    state.orderNo = data.record.orderNo;
    await change(activeKey.value);
    getData();
  });
  async function change(activeKey) {
    componentMap.value.set(activeKey, markRaw(BasicTable) as any);
    await nextTick();
  }
  function handleSubmit() {}
  function close() {
    activeKey.value = tabList[0].key;
    componentMap.value = initComponent();
    emit('close');
  }
  function getData() {
    getDtApi({ orderNo: state.orderNo }).then((res) => {
      cellData.value = res;
    });
  }
</script>
<style scoped>
  .tabs :deep(.ant-tabs-content) {
    height: 100%;
  }
</style>
