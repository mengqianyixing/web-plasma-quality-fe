<template>
  <PageWrapper dense contentFullHeight fixedHeight class="p-16px">
    <div class="flex flex-col h-full bg-white p-10px">
      <div class="title">
        基本信息
        <div class="float-right">
          <a-button
            class="mr-15px"
            type="primary"
            @click="handleSelect"
            v-auth="InspectButtonEnum.ResultRegistrationSelect"
            >选择</a-button
          >
          <a-button
            class="mr-15px"
            type="primary"
            @click="handleAddItem"
            :disabled="!bsNo"
            v-auth="InspectButtonEnum.ResultRegistrationItemAdd"
          >
            新增检测项目
          </a-button>
          <a-button
            v-auth="InspectButtonEnum.ResultRegistrationRegist"
            class="mr-15px"
            type="primary"
            @click="registrationClick"
            :disabled="!bsNo"
            :loading="registrationLoading"
            >登记完成</a-button
          >
          <a-button
            v-auth="InspectButtonEnum.ResultRegistrationReRegist"
            type="primary"
            @click="unRegistration"
            :loading="unregistrationLoading"
            :disabled="!bsNo"
          >
            撤销登记
          </a-button>
        </div>
      </div>
      <CellWapper
        :data="rowData"
        cell-width="16.66%"
        labelWidth="160px"
        :cell-list="cellList"
        :gap="0"
      />
      <div class="title">样本汇总信息</div>
      <CellWapper :data="countData" :cell-list="plasmaCellList" :gap="0" />
      <Tabs v-model:activeKey="activeKey" class="flex-1 bg-white mt-10px" type="card" size="small">
        <TabPane key="1" tab="检测明细">
          <CheckPage :bs-no="bsNo" @reload="saveReload" />
        </TabPane>
        <TabPane key="2" tab="效价明细">
          <TiterPage :bs-no="bsNo" @reload="saveReload" />
        </TabPane>
        <TabPane key="3" tab="物料明细">
          <MaterialRegistration :bs-no="bsNo" @reload="saveReload" />
        </TabPane>
      </Tabs>
      <BatchModal @register="registerModal" @confirm="confirm" />
      <CheckItemModal @register="registerCIModal" @confirm="confirm2" />
      <BasicModal
        @register="registerCancelModal"
        title="登记"
        okText="提交"
        width="300px"
        @ok="registration"
      >
        <BasicForm @register="registerForm" />
      </BasicModal>
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
  import MaterialRegistration from './materialRegistration/index.vue';
  import BatchModal from './batchDrawer.vue';
  import CheckItemModal from './checkItemDrawer.vue';
  import { useModal, BasicModal } from '@/components/Modal';
  import {
    getPlasmaCountApi,
    submitRegistrationApi,
    sumbitRevokeRegistrationApi,
  } from '@/api/inspect/resultRegistration';
  import { SERVER_ENUM } from '@/enums/serverEnum';
  import { useServerEnumStoreWithOut } from '@/store/modules/serverEnums';
  import { InspectButtonEnum } from '@/enums/authCodeEnum';
  import { BasicForm, useForm } from '@/components/Form';
  import dayjs, { Dayjs } from 'dayjs';

  defineOptions({ name: 'ResultRegistration' });

  const serverEnumStore = useServerEnumStoreWithOut();
  const PlasmaType = serverEnumStore.getServerEnumText(SERVER_ENUM.PlasmaType);

  const activeKey = ref('1');
  const bsNo = ref('');
  const registrationLoading = ref(false);
  const unregistrationLoading = ref(false);
  const rowData = ref({});
  const countData = ref({});
  const plasmaCellList = ref<Cell[]>([]);
  const reloadMap = ref<Map<string, Function>>(new Map());

  const [registerForm, { resetFields, clearValidate, validate }] = useForm({
    labelWidth: 120,
    baseColProps: { span: 24 },
    schemas: [
      {
        field: 'checkCompletionDate',
        component: 'DatePicker',
        label: '检测结束日期',
        required: true,
        componentProps: {
          valueFormat: 'YYYY-MM-DD',
          disabledDate: (date: Dayjs) => date && date > dayjs(),
        },
      },
    ],
    showActionButtonGroup: false,
  });
  const [registerModal, { openModal: openModal }] = useModal();
  const [registerCIModal, { openModal: openCIModal }] = useModal();
  const [registerCancelModal, { openModal: openCancelModal, setModalProps }] = useModal();

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
      t.list.push({ field: i.toString(), label: PlasmaType(row.plasmaType) });
      t.data[i] = row.count;
      return t;
    }, initValue);
    countData.value = data;
    plasmaCellList.value = list;
  }
  async function registration() {
    setModalProps({ confirmLoading: true });
    const values = await validate();
    submitRegistrationApi({ bsNo: bsNo.value, checkCompletionDate: values.checkCompletionDate })
      .then(() => {
        message.success('登记成功');
      })
      .finally(() => {
        setModalProps({ confirmLoading: false });
      });
  }
  function registrationClick() {
    openCancelModal(true);
    resetFields();
    clearValidate();
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
