<template>
  <PageWrapper dense contentFullHeight fixedHeight class="p-16px">
    <div class="flex flex-col h-full bg-white p-10px">
      <div class="title">
        基本信息
        <div class="float-right">
          <a-button class="mr-15px" type="primary" @click="handleSelect">选择</a-button>
          <a-button class="mr-15px" type="primary" @click="handleAddItem" :disabled="!bsNo">
            新增检测项目
          </a-button>
          <a-button
            class="mr-15px"
            type="primary"
            @click="registration"
            :disabled="!bsNo"
            :loading="registrationLoading"
            >登记完成</a-button
          >
          <a-button
            type="primary"
            @click="unRegistration"
            :loading="unregistrationLoading"
            :disabled="!bsNo"
          >
            撤销登记
          </a-button>
        </div>
      </div>
      <CellWapper :data="rowData" cell-width="16.66%" :cell-list="cellList" :gap="0" />
      <div class="title">血浆信息</div>
      <CellWapper :data="countData" :cell-list="plasmaCellList" :gap="0" />
      <Tabs v-model:activeKey="activeKey" class="flex-1 bg-white">
        <TabPane key="1" tab="检测明细">
          <CheckPage :bs-no="bsNo" @reload="saveReload" />
        </TabPane>
        <TabPane key="2" tab="效价明细">
          <TiterPage :bs-no="bsNo" @reload="saveReload" />
        </TabPane>
      </Tabs>
      <BatchModal @register="registerModal" @confirm="confirm" />
      <CheckItemModal @register="registerCIModal" @confirm="confirm2" />
    </div>
  </PageWrapper>
</template>

<script setup lang="ts">
  import { PageWrapper } from '@/components/Page';
  import { CellWapper, Cell } from '@/components/CellWapper';
  import { cellList } from './resultRegistration.data';
  import { TabPane, Tabs, Modal, message } from 'ant-design-vue';
  import { ref, unref } from 'vue';
  import CheckPage from './check/index.vue';
  import TiterPage from './titer/index.vue';
  import BatchModal from './batchDrawer.vue';
  import CheckItemModal from './checkItemDrawer.vue';
  import { useModal } from '@/components/Modal';
  import {
    getPlasmaCountApi,
    submitRegistrationApi,
    sumbitRevokeRegistrationApi,
  } from '@/api/inspect/resultRegistration';
  import { PLASMA_TYPE_TEXT } from '@/enums/inspectEnum';

  const activeKey = ref('1');
  const bsNo = ref('');
  const registrationLoading = ref(false);
  const unregistrationLoading = ref(false);
  const rowData = ref({});
  const countData = ref({});
  const plasmaCellList = ref<Cell[]>([]);
  const reloadMap = ref<Map<string, Function>>(new Map());

  const [registerModal, { openModal: openModal }] = useModal();
  const [registerCIModal, { openModal: openCIModal }] = useModal();

  function handleSelect() {
    openModal(true, {});
  }
  function handleAddItem() {
    openCIModal(true, { bsNo: unref(bsNo) });
  }
  async function confirm(row: Recordable) {
    bsNo.value = row.bsNo;
    rowData.value = row;
    openModal(false);
    const res = await getPlasmaCountApi({ bsNo: row.bsNo });
    const initValue: { list: Cell[]; data: Record<number, number> } = {
      list: [],
      data: {},
    };
    const { list, data } = res.reduce((t, row, i) => {
      t.list.push({ field: i.toString(), label: PLASMA_TYPE_TEXT[row.plasmaType] });
      t.data[i] = row.count;
      return t;
    }, initValue);
    countData.value = data;
    plasmaCellList.value = list;
  }
  function registration() {
    registrationLoading.value = true;
    submitRegistrationApi({ bsNo: bsNo.value })
      .then(() => {
        message.success('登记成功');
      })
      .finally(() => {
        registrationLoading.value = false;
      });
  }

  function unRegistration() {
    Modal.confirm({
      content: '确认撤销' + bsNo.value + '?',
      onOk: async () => {
        try {
          unregistrationLoading.value = true;
          await sumbitRevokeRegistrationApi({ bsNo: bsNo.value });
          confirm(rowData.value);
        } finally {
          unregistrationLoading.value = false;
          reloadMap.value.forEach((fn) => fn());
        }
      },
      onCancel: () => Modal.destroyAll(),
    });
  }
  function confirm2() {
    openCIModal(false);
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
    color: #333;
    font-size: 16px;
    font-weight: 600;

    &::after {
      content: '';
      display: block;
      position: absolute;
      top: 50%;
      left: -10px;
      width: 2px;
      height: 16px;
      margin-top: -8px;
      background: @primary-color;
    }
  }
</style>
