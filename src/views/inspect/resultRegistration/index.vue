<template>
  <PageWrapper dense contentFullHeight fixedHeight class="flex flex-col bg-white p-16px">
    <div class="title">
      基本信息
      <div class="float-right">
        <a-button class="mr-15px" type="primary" size="small" @click="handleSelect">选择</a-button>
        <a-button
          class="mr-15px"
          type="primary"
          size="small"
          @click="handleAddItem"
          :disabled="!bsNo"
        >
          新增检测项目
        </a-button>
        <a-button
          class="mr-15px"
          type="primary"
          size="small"
          @click="registration"
          :disabled="!bsNo"
          >登记完成</a-button
        >
        <a-button type="primary" size="small" @click="unRegistration" :disabled="!bsNo">
          撤销登记
        </a-button>
      </div>
    </div>
    <CellWapper :data="rowData" cell-width="16.66%" :cell-list="cellList" :gap="0" />
    <div class="title">血浆信息</div>
    <CellWapper
      :data="countData"
      :cell-width="100 / plasmaCellList.length + '%'"
      :cell-list="plasmaCellList"
      :gap="0"
      :style="`width: ${(plasmaCellList.length / cellList.length) * 100}%`"
    />
    <Tabs v-model:activeKey="activeKey" class="flex-1 bg-white" size="small">
      <TabPane key="1" tab="检测明细">
        <CheckPage :bs-no="bsNo" @reload="saveReload" />
      </TabPane>
      <TabPane key="2" tab="效价明细">
        <TiterPage :bs-no="bsNo" @reload="saveReload" />
      </TabPane>
    </Tabs>
    <BatchDrawer @register="registerDrawer" @confirm="confirm" />
    <CheckItemDrawer @register="registerCIDrawer" @confirm="confirm2" />
  </PageWrapper>
</template>

<script setup lang="ts">
  import { PageWrapper } from '@/components/Page';
  import { CellWapper, Cell } from '@/components/CellWapper';
  import { cellList } from './resultRegistration.data';
  import { TabPane, Tabs, Modal } from 'ant-design-vue';
  import { ref, unref } from 'vue';
  import CheckPage from './check/index.vue';
  import TiterPage from './titer/index.vue';
  import BatchDrawer from './batchDrawer.vue';
  import CheckItemDrawer from './checkItemDrawer.vue';
  import { useDrawer } from '@/components/Drawer';
  import {
    getPlasmaCountApi,
    submitRegistrationApi,
    sumbitRevokeRegistrationApi,
  } from '@/api/inspect/resultRegistration';

  const activeKey = ref('1');
  const bsNo = ref('');
  const rowData = ref({});
  const countData = ref({});
  const plasmaCellList = ref<Cell[]>([]);
  const reloadMap = ref<Map<string, Function>>(new Map());

  const [registerDrawer, { openDrawer: openDrawer }] = useDrawer();
  const [registerCIDrawer, { openDrawer: openCIDrawer }] = useDrawer();

  function handleSelect() {
    openDrawer(true, {});
  }
  function handleAddItem() {
    openCIDrawer(true, { bsNo: unref(bsNo) });
  }
  async function confirm([row]) {
    bsNo.value = row.bsNo;
    rowData.value = row;
    openDrawer(false);
    const res = await getPlasmaCountApi({ bsNo: row.bsNo });
    const initValue: { list: Cell[]; data: Record<number, number> } = {
      list: [],
      data: {},
    };
    const { list, data } = res.reduce((t, row, i) => {
      t.list.push({ field: i.toString(), label: row.plasmaType });
      t.data[i] = row.count;
      return t;
    }, initValue);
    countData.value = data;
    plasmaCellList.value = list;
  }
  function registration() {
    submitRegistrationApi({ bsNo: bsNo.value });
  }
  function unRegistration() {
    Modal.confirm({
      content: '确认撤销' + bsNo.value + '?',
      onOk: async () => {
        await sumbitRevokeRegistrationApi({ bsNo: bsNo.value });
        confirm([rowData.value]);
      },
      onCancel: () => Modal.destroyAll(),
    });
  }
  function confirm2() {
    openCIDrawer(false);
    reloadMap.value.forEach((fn) => fn());
  }
  function saveReload(fn: Function, activeKey: string) {
    bsNo.value && fn();
    reloadMap.value.set(activeKey, fn);
  }
</script>
<style scoped lang="less">
  .title {
    display: flex;
    position: relative;
    align-items: center;
    justify-content: space-between;
    margin: 14px 0;
    margin-left: 10px;
    color: #000;
    font-size: 16px;

    &::after {
      content: '';
      display: block;
      position: absolute;
      top: 20%;
      left: -10px;
      width: 2px;
      height: 60%;
      background: @primary-color;
    }
  }
</style>
