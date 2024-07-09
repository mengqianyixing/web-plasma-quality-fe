<template>
  <div>
    <BasicTable @register="registerTable">
      <template #prepareNo="{ record }">
        <div class="z-999">
          <a-button type="link" @click.stop="clickPrepareNo(record)">
            {{ record?.prepareNo }}
          </a-button>
        </div>
      </template>
      <template #batchCount="{ record }">
        <div class="z-999">
          <a-button type="link" @click.stop="goPickBatchDetail(record)">
            {{ record.summary?.batchCount }}
          </a-button>
          <!-- <span @click="goPickBatchDetail(record)">
            {{ record.summary?.batchCount }}
          </span> -->
        </div>
      </template>
      <template #pickBagCount="{ record }">
        <div class="z-999">
          <!-- <a-button type="link" @click="goPlasmaDetail(record)">
            {{ record.summary?.pickBagCount }}
          </a-button> -->
          <span>
            {{ record.summary?.pickBagCount }}
          </span>
        </div>
      </template>
      <template #prodBagCount="{ record }">
        <div class="z-999">
          <a-button type="link" @click.stop="goPlasmaDetail(record, 'prepareProduce')">
            {{ record.summary?.prodBagCount }}
          </a-button>
          <!-- <span>
            {{ record.summary?.prodBagCount }}
          </span> -->
        </div>
      </template>
      <template #toolbar>
        <div class="flex gap-2">
          <a-button
            @click="openPreparation"
            v-auth="StockOutButtonEnum.ProductionPreparationAdd"
            type="primary"
          >
            新增
          </a-button>
          <a-button
            @click="editPreparationModal"
            v-auth="StockOutButtonEnum.ProductionPreparationEdit"
            type="primary"
          >
            修改
          </a-button>
          <a-button
            @click="clickRevokeModal"
            v-auth="StockOutButtonEnum.ProductionPreparationDelete"
            type="primary"
          >
            撤销
          </a-button>
          <a-button
            @click="clickSummaryModal"
            v-auth="StockOutButtonEnum.ProductionPreparationSelect"
            type="primary"
          >
            挑选血浆
          </a-button>
          <a-button
            @click="completePreparation"
            v-auth="StockOutButtonEnum.ProductionPreparationFinish"
            type="primary"
          >
            完成准备
          </a-button>
          <a-button
            @click="clickRevokeModal('isPicked')"
            v-auth="StockOutButtonEnum.ProductionPreparationReset"
            type="primary"
          >
            撤销准备
          </a-button>
          <a-button
            @click="clickCheck"
            v-auth="StockOutButtonEnum.ProductionPreparationReCheck"
            type="primary"
          >
            复核
          </a-button>
          <a-button
            @click="revokeCheck"
            v-auth="StockOutButtonEnum.ProductionPreparationResetReCheck"
            type="primary"
          >
            撤销复核
          </a-button>
          <a-button
            @click="handleTask"
            v-auth="StockOutButtonEnum.ProductionPreparationSortTask"
            type="primary"
          >
            PMS分拣
          </a-button>
        </div>
      </template>
    </BasicTable>
    <CreateModal @register="registerModal" @success="handleSuccess" />
    <RevokeModal @register="registerRevokeModal" @success="handleSuccessRevoke" />
    <RevokeCheckModal @register="registerRevokeCheckModal" @success="handleSuccessRevokeCheck" />
    <SummaryModal @register="registerSummaryModal" @success="handleSuccessSummary" />
    <PickBatchDetail @register="registerPickBatchDetailModal" />
    <PlasmaDetail @register="registerPlasmaDetailModal" />
  </div>
</template>
<script lang="ts" setup>
  import { StockOutButtonEnum } from '@/enums/authCodeEnum';
  import { BasicTable, useTable, BasicColumn } from '@/components/Table';
  import { FormSchema } from '@/components/Form';
  import { useModal } from '@/components/Modal';
  import dayjs from 'dayjs';
  import { ref, createVNode } from 'vue';
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
  import { useMessage } from '@/hooks/web/useMessage';
  import SummaryModal from './components/SummaryModal.vue';
  import RevokeModal from './components/RevokeModal.vue';
  import RevokeCheckModal from './components/RevokeCheckModal.vue';
  import CreateModal from './components/CreateModal.vue';
  import PickBatchDetail from '../components/PickBatchDetail.vue';
  import PlasmaDetail from '../components/PlasmaDetail.vue';
  import {
    getPrepareList,
    completePrepare,
    checkPrepare,
  } from '@/api/stockout/production-preparation.js';
  import {
    prepareStateMap,
    prepareStateValueEnum,
    bagFlagMap,
    bagFlagValueEnum,
    pickModeMap,
    pickModeValueEnum,
  } from '@/enums/stockoutEnum';
  import { useUserStore } from '@/store/modules/user';
  import { SERVER_ENUM } from '@/enums/serverEnum';
  import { useServerEnumStoreWithOut } from '@/store/modules/serverEnums';
  import { productionPMSTask } from '@/api/stockout/production-put-into';

  defineOptions({ name: 'ProductionPreparation' });

  const serverEnumStore = useServerEnumStoreWithOut();
  const PlasmaType = serverEnumStore.getServerEnumText(SERVER_ENUM.PlasmaType);

  const userInfo = useUserStore();
  const { createMessage } = useMessage();
  const { warning, success } = createMessage;

  const selectedRow = ref([]); // 表格已选中

  const columns: BasicColumn[] = [
    {
      title: '投产准备号',
      dataIndex: 'prepareNo',
      align: 'left',
      width: 120,
      resizable: true,
      fixed: 'left',
      slots: { customRender: 'prepareNo' },
    },
    {
      title: '投产类型',
      dataIndex: 'prodType',
      width: 100,
      resizable: true,
      fixed: 'left',
      format(text) {
        return `${PlasmaType(text)}`;
      },
    },
    {
      title: '挑浆模式',
      dataIndex: 'pickMode',
      resizable: true,
      width: 130,
      format(text) {
        return `${pickModeMap.get(text as pickModeValueEnum)}`;
      },
    },
    {
      title: '是否限制血浆',
      dataIndex: 'bagFlag',
      resizable: true,
      width: 100,
      format(text) {
        return `${bagFlagMap.get(text as bagFlagValueEnum)}`;
      },
    },
    {
      title: '批次数量',
      dataIndex: 'batchCount',
      resizable: true,
      width: 75,
      slots: { customRender: 'batchCount' },
    },
    {
      title: '分拣血浆数量',
      dataIndex: 'pickBagCount',
      resizable: true,
      width: 105,
      slots: { customRender: 'pickBagCount' },
    },
    {
      title: '投产血浆数量',
      dataIndex: 'prodBagCount',
      resizable: true,
      width: 105,
      slots: { customRender: 'prodBagCount' },
    },
    {
      title: '投产血浆净重(kg)',
      resizable: true,
      dataIndex: 'netWeight',
      width: 150,
      customRender: ({ record }) => {
        if (record.summary && record.summary.netWeight !== null) {
          return record.summary.netWeight;
        }
        return '';
      },
    },
    {
      title: '浆员数量',
      dataIndex: 'donorCount',
      width: 75,
      resizable: true,
      customRender: ({ record }) => {
        if (record.summary && record.summary.donorCount !== null) {
          return record.summary.donorCount;
        }
        return '';
      },
    },
    {
      title: '准备人',
      dataIndex: 'creator',
      width: 80,
      resizable: true,
    },
    {
      title: '准备日期',
      resizable: true,
      width: 150,
      dataIndex: 'createAt',
      format(text) {
        return text ? dayjs(text).format('YYYY-MM-DD') : '-';
      },
    },
    {
      title: '复核人',
      resizable: true,
      dataIndex: 'reviewer',
      width: 100,
    },
    {
      title: '复核日期',
      dataIndex: 'reviewerAt',
      resizable: true,
      width: 100,
      format(text) {
        return text ? dayjs(text).format('YYYY-MM-DD') : '-';
      },
    },
    {
      title: '分拣完成日期',
      dataIndex: 'sortingAt',
      width: 100,
      resizable: true,
      format(text) {
        return text ? dayjs(text).format('YYYY-MM-DD') : '-';
      },
    },
    {
      title: '状态',
      dataIndex: 'prepareState',
      width: 80,
      resizable: true,
      format(text) {
        return `${prepareStateMap.get(text as prepareStateValueEnum)}`;
      },
    },
  ];

  const searchFormSchema: FormSchema[] = [
    {
      field: 'prepareNo',
      label: '投产准备号',
      component: 'Input',
    },
    {
      field: 'prodType',
      label: '投产类型',
      component: 'Select',
      componentProps: {
        options: serverEnumStore.getServerEnum(SERVER_ENUM.PlasmaType),
      },
    },
    {
      field: 'pickMode',
      label: '挑浆模式',
      component: 'Select',
      componentProps: {
        options: [...pickModeMap.entries()].map(([key, value]) => ({
          value: key,
          label: `${value}`,
        })),
      },
    },
    {
      field: 'bagFlag',
      label: '是否限制血浆',
      component: 'Select',
      componentProps: {
        options: [...bagFlagMap.entries()].map(([key, value]) => ({
          value: key,
          label: `${value}`,
        })),
      },
    },
    {
      field: 'prepareStates',
      label: '状态',
      component: 'Select',
      componentProps: {
        options: [...prepareStateMap.entries()].map(([key, value]) => ({
          value: key,
          label: `${value}`,
        })),
      },
    },
    {
      field: '[sortingAtBegin, sortingAtEnd]',
      component: 'RangePicker',
      label: '分拣完成日期',
    },
  ];

  const [registerTable, { reload, clearSelectedRowKeys }] = useTable({
    api: getPrepareList,
    columns,
    formConfig: {
      schemas: searchFormSchema,
      showAdvancedButton: false,
      transformDateFunc(date) {
        return date ? date.format('YYYY-MM-DD') : ''; // 时间格式只要日期
      },
    },
    beforeFetch: (p) => {
      return { ...p };
    },
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    clickToRowSelect: true,
    rowSelection: {
      type: 'radio',
      onChange: (_, selectedRows: any) => {
        selectedRow.value = selectedRows;
      },
    },
    size: 'small',
    striped: false,
    useSearchForm: true,
    canColDrag: true,
    bordered: true,
    showIndexColumn: false,
    canResize: true,
  });

  // 新增/修改投产准备框
  const [registerModal, { openModal: openPreparationModal }] = useModal();
  function handleSuccess() {
    reload();
    selectedRow.value = [];
  }
  function openPreparation() {
    openPreparationModal(true, {
      isUpdate: false,
    });
  }
  function editPreparationModal() {
    if (!selectedRow.value.length) {
      warning('请先选择投产准备号!');
      return;
    }
    const selectedRowOne: any = selectedRow.value[0];
    if (selectedRowOne.prepareState !== 'RUN' || selectedRowOne.prodBagCount == 0) {
      warning('该准备号不可修改!');
      return;
    }
    if (selectedRowOne.creator !== userInfo.getUserInfo.username) {
      warning('当前账号无此权限!');
      return;
    }
    openPreparationModal(true, {
      record: selectedRow.value[0],
      isUpdate: true,
    });
  }

  // 撤销/撤销准备
  const [registerRevokeModal, { openModal: openRevokeModal }] = useModal();
  function handleSuccessRevoke() {
    reload();
    selectedRow.value = [];
  }
  // isPicked => 撤销准备操作
  function clickRevokeModal(isPicked) {
    if (!selectedRow.value.length) {
      warning('请先选择投产准备号!');
      return;
    }
    const selectedRowOne: any = selectedRow.value[0];
    const prepareState = selectedRowOne?.prepareState;
    const prodBagCount = selectedRowOne?.summary?.prodBagCount;
    if (isPicked === 'isPicked') {
      if (prepareState !== 'REV') {
        warning('该准备号不可撤销准备!');
        return;
      }
    } else {
      if (prepareState !== 'RUN' || Number(prodBagCount) > 0) {
        warning('该准备号不可撤销!');
        return;
      }
    }
    if (selectedRowOne.creator !== userInfo.getUserInfo.username) {
      warning('当前账号无此权限!');
      return;
    }
    openRevokeModal(true, {
      record: selectedRow.value[0],
      isPicked: isPicked === 'isPicked',
    });
  }

  const { createConfirm } = useMessage();

  // 完成准备
  function completePreparation() {
    if (!selectedRow.value.length) {
      warning('请先选择投产准备号!');
      return;
    }
    const selectedRowOne: any = selectedRow.value[0];
    const prepareState = selectedRowOne?.prepareState;
    const prepareNo = selectedRowOne?.prepareNo;
    const prodBagCount = selectedRowOne?.summary?.prodBagCount;

    if (prepareState !== 'RUN' || Number(prodBagCount) <= 0) {
      warning('该准备号不可完成准备!');
      return;
    }
    if (selectedRowOne.creator !== userInfo.getUserInfo.username) {
      warning('当前账号无此权限!');
      return;
    }
    createConfirm({
      iconType: 'warning',
      title: '确定要完成准备吗?',
      icon: createVNode(ExclamationCircleOutlined),
      content: createVNode('div', { style: 'color:red;' }, `投产准备号：${prepareNo}`),
      async onOk() {
        await completePrepare({ prepareNo });
        success('完成准备成功!');
        await reload();
        selectedRow.value = [];
      },
      onCancel() {
        console.log('Cancel');
      },
      class: 'test',
    });
  }

  // 汇总弹框
  const [registerSummaryModal, { openModal: openSummaryModal }] = useModal();
  function clickSummaryModal() {
    if (!selectedRow.value.length) {
      warning('请先选择投产准备号!');
      return;
    }
    const prepareState = (selectedRow.value[0] as { prepareState?: string })?.prepareState;

    openSummaryModal(true, {
      record: selectedRow.value[0],
      readOnly: prepareState !== 'RUN', // 准备中状态才可挑选
    });
  }
  function handleSuccessSummary() {
    reload();
    selectedRow.value = [];
  }

  // 复核
  function clickCheck() {
    if (!selectedRow.value.length) {
      warning('请先选择投产准备号!');
      return;
    }
    const prepareState = (selectedRow.value[0] as { prepareState?: string })?.prepareState;
    const prepareNo = (selectedRow.value[0] as { prepareNo?: string })?.prepareNo;
    const creator = (selectedRow.value[0] as { creator?: string })?.creator;
    if (prepareState !== 'REV') {
      warning('该准备号不可复核!');
      return;
    }
    // 复核人不能和准备人相同
    if (creator === userInfo.getUserInfo.username) {
      warning('复核人与准备人不能为同一人!');
      return;
    }

    createConfirm({
      iconType: 'warning',
      title: '确定要通过复核吗?',
      icon: createVNode(ExclamationCircleOutlined),
      content: createVNode('div', { style: 'color:red;' }, `投产准备号：${prepareNo}`),
      async onOk() {
        await checkPrepare({ prepareNo });
        success('复核成功!');
        reload();
        selectedRow.value = [];
      },
      onCancel() {
        console.log('Cancel');
      },
      class: 'test',
    });
  }

  // 取消复核
  const [registerRevokeCheckModal, { openModal: openRevokeCheckModal }] = useModal();
  function handleSuccessRevokeCheck() {
    reload();
    selectedRow.value = [];
  }
  function revokeCheck() {
    if (!selectedRow.value.length) {
      warning('请先选择投产准备号!');
      return;
    }
    const selectedRowOne: any = selectedRow.value[0];
    const prepareState = selectedRowOne?.prepareState;
    if (prepareState !== 'TPK') {
      warning('该准备号不可撤销复核!');
      return;
    }
    if (selectedRowOne.reviewer !== userInfo.getUserInfo.username) {
      warning('当前账号无此权限!');
      return;
    }
    openRevokeCheckModal(true, {
      record: selectedRow.value[0],
    });
  }

  // 查看投产准备详情
  function clickPrepareNo(record) {
    openSummaryModal(true, {
      record,
      readOnly: true,
    });
  }

  // 分拣批次信息
  const [registerPickBatchDetailModal, { openModal: openPickBatchDetailModal }] = useModal();
  function goPickBatchDetail(record) {
    openPickBatchDetailModal(true, {
      record,
    });
  }

  // 血浆明细
  const [registerPlasmaDetailModal, { openModal: openPlasmaDetailModal }] = useModal();
  function goPlasmaDetail(record, prepareProduce?) {
    openPlasmaDetailModal(true, {
      record,
      prepareProduce,
    });
  }

  async function handleTask() {
    if (!selectedRow.value.length) {
      warning('请先选择投产准备号!');
      return;
    }

    createConfirm({
      title: '确认',
      content: '请确认是否生成PMS分拣任务？',
      iconType: 'warning',
      onOk: async () => {
        await productionPMSTask({
          prepareNo: (selectedRow.value as any)[0]?.prepareNo,
          taskType: 'SEND',
        });
        createMessage.success('生成PMS分拣任务成功');
        await reload();
        clearSelectedRowKeys();
      },
    });
  }
</script>
