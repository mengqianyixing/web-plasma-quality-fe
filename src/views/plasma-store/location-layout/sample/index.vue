<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    showFooter
    title="样本货位详情"
    width="1000px"
    :show-ok-btn="false"
    cancelText="关闭"
    :min-height="600"
    @ok="handleSubmit"
    @cancel="close"
  >
    <div class="relative h-inherit max-h-inherit min-h-inherit">
      <div class="absolute w-full h-full">
        <div class="mt-10px mb-10px">
          <CellWapper :data="cellData" labelWidth="80px" :cell-list="cellList" :gap="0" />
        </div>
        <div class="w-full" style="height: calc(100% - 66px)">
          <Tabs
            v-model:activeKey="activeKey"
            @change="change"
            class="h-full bg-white tabs"
            type="card"
            size="small"
          >
            <TabPane v-for="item in tabList" :key="item.key" :tab="item.title">
              <component
                :is="componentMap[item.key]"
                @register="tableInstanceMap.get(item.key)[0]"
              />
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
  import { ref, markRaw, reactive } from 'vue';
  import { tabKey, tabList, optionMap, cellList } from './data';
  import { BasicTable, useTable } from '@/components/Table';
  import { CellWapper } from '@/components/CellWapper';
  import { getSummayrApi } from '@/api/plasmaStore/locationLayout/index';

  const activeKey = ref(tabKey.batch);
  const state = reactive({ trayNo: '', trayType: 'PER' });
  const cellData = reactive({});
  const initComponent = () =>
    tabList.reduce((t, c) => {
      t[c.key] = 'div';
      return t;
    }, {});
  const componentMap = ref(initComponent());
  const [registerModal, { setModalProps }] = useModalInner(async (data) => {
    setModalProps({ loading: true });
    getSummayrApi(data)
      .then((res) => {
        Object.assign(cellData, res);
        state.trayNo = res.trayNo as string;
        componentMap.value[tabKey.batch] = markRaw(BasicTable) as any;
      })
      .finally(() => {
        setModalProps({ loading: false });
      });
  });
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
      columns: optionMap[c.key].cloumns,
      size: 'small',
      bordered: true,
      beforeFetch: (p) => ({ ...p, ...state }),
      useSearchForm: !!optionMap[c.key].searchSchema.length,
      formConfig: {
        schemas: optionMap[c.key].searchSchema,
      },
    });
    t.set(c.key, tableInstance);
    return t;
  }, new Map());
  function change(activeKey) {
    componentMap.value[activeKey] = markRaw(BasicTable);
  }
  function handleSubmit() {}
  function close() {
    activeKey.value = tabKey.batch;
    componentMap.value = initComponent();
  }
</script>
<style scoped>
  .tabs :deep(.ant-tabs-content) {
    height: 100%;
  }
</style>
