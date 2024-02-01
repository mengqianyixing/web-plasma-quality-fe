<!--
 * @Descripttion: 
 * @version: 
 * @Author: zcc
 * @Date: 2024-01-17 11:13:40
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-23 09:47:09
-->
<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    showFooter
    :title="`投产计划-${state.disabled ? '详情' : '血浆挑选'}`"
    width="1200px"
    :show-ok-btn="false"
    cancelText="关闭"
    :min-height="600"
    @ok="handleSubmit"
    @cancel="close"
  >
    <div class="relative h-inherit max-h-inherit min-h-inherit">
      <div class="absolute flex flex-col w-full h-full">
        <div class="flex justify-end mb-10px" v-if="!state.disabled">
          <a-button
            type="primary"
            class="mr-15px"
            @click="openModal(true, { type: TAB.PREPARE, orderNo: state.orderNo })"
            >准备号挑选
          </a-button>
          <a-button
            type="primary"
            @click="openModal(true, { type: TAB.BOX, orderNo: state.orderNo })"
          >
            血浆箱挑选
          </a-button>
          <a-button
            v-show="activeKey === TAB.BOX || activeKey === TAB.PREPARE"
            type="primary"
            class="ml-15px"
            :loading="state.loading"
            @click="handlerRemove"
          >
            血浆移除
          </a-button>
        </div>
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
    <PickingModal @register="registerPickingModal" @confim="comfim" />
  </BasicModal>
</template>
<script setup lang="ts">
  import { BasicModal, useModalInner, useModal } from '@/components/Modal';
  import { message, TabPane, Tabs } from 'ant-design-vue';
  import { ref, markRaw, reactive, nextTick } from 'vue';
  import { CellWapper } from '@/components/CellWapper';
  import { cellList, tabList, tableColumns, TAB } from './production-plan.data';
  import { BasicTable, useTable } from '@/components/Table';
  import {
    getDtApi,
    submitBoxCancelApi,
    submitPrepareCancelApi,
  } from '@/api/stockout/production-plan';
  import PickingModal from './picking-moda.vue';

  const emit = defineEmits(['close']);
  const [registerPickingModal, { openModal }] = useModal();
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
      rowSelection: c.checkbox ? { type: 'checkbox' } : void 0,
      size: 'small',
      bordered: true,
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

  const [registerModal] = useModalInner(async ({ orderNo, disabled }) => {
    state.orderNo = orderNo;
    state.disabled = disabled;
    change(activeKey.value);
    getData();
  });
  async function change(activeKey) {
    componentMap.value.set(activeKey, markRaw(BasicTable) as any);
    await nextTick();
    const tableInstance = tableInstanceMap.get(activeKey);
    const item = tabList.find((_) => _.key === activeKey);
    if (!item) return;
    tableInstance[1].setProps({
      rowSelection: item.checkbox && !state.disabled ? { type: 'checkbox' } : void 0,
    });
  }
  function handleSubmit() {}
  function close() {
    activeKey.value = tabList[0].key;
    componentMap.value = initComponent();
    emit('close');
  }
  function reloadData() {
    tabList.forEach((_) => {
      if (componentMap.value.get(_.key) !== 'div') {
        tableInstanceMap.get(_.key)[1].reload();
      }
    });
    getData();
  }
  function getData() {
    getDtApi({ orderNo: state.orderNo }).then((res) => {
      cellData.value = res;
    });
  }
  function comfim() {
    openModal(false);
    reloadData();
  }
  async function handlerRemove() {
    const rows: Recordable[] = tableInstanceMap.get(activeKey.value)[1].getSelectRows();
    if (rows.length === 0) return message.warning('请选择数据');
    const prodPrepares = rows.map((_) => _.ppNo);
    const boxNos = rows.map((_) => _.boxNo);
    try {
      state.loading = true;
      if (activeKey.value === TAB.PREPARE) {
        await submitPrepareCancelApi({
          orderNo: state.orderNo,
          prodPrepares,
          bagCount: rows.reduce((t, c) => ((t += c.prodBagCount), t), 0),
        });
      } else {
        await submitBoxCancelApi({
          orderNo: state.orderNo,
          boxNos,
          bagCount: rows.reduce((t, c) => ((t += c.prodBagCount), t), 0),
        });
      }
      reloadData();
      message.success('移除成功');
    } finally {
      state.loading = false;
    }
  }
</script>
<style scoped>
  .tabs :deep(.ant-tabs-content) {
    height: 100%;
  }
</style>
