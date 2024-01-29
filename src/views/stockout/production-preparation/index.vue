<template>
  <div>
    <BasicTable @register="registerTable">
      <template #prepareNo="{ record }">
        <div class="z-999">
          <a-button type="link" @click="clickPrepareNo(record)">
            {{ record?.prepareNo }}
          </a-button>
        </div>
      </template>
      <template #batchCount="{ record }">
        <div class="z-999">
          <a-button type="link" @click="goPickBatchDetail(record)">
            {{ record.summary?.batchCount }}
          </a-button>
        </div>
      </template>
      <template #pickBagCount="{ record }">
        <div class="z-999">
          <a-button type="link" @click="goPlasmaDetail(record)">
            {{ record.summary?.pickBagCount }}
          </a-button>
        </div>
      </template>
      <template #prodBagCount="{ record }">
        <div class="z-999">
          <a-button type="link" @click="goPlasmaDetail(record, 'prepareProduce')">
            {{ record.summary?.prodBagCount }}
          </a-button>
        </div>
      </template>
      <template #toolbar>
        <div class="flex gap-2">
          <a-button @click="openPreparation"> 新增 </a-button>
          <a-button @click="editPreparationModal"> 修改 </a-button>
          <a-button @click="clickRevokeModal"> 撤销 </a-button>
          <a-button @click="clickSummaryModal"> 挑选血浆 </a-button>
          <a-button @click="completePreparation"> 完成准备 </a-button>
          <a-button @click="clickRevokeModal('isPicked')"> 撤销准备 </a-button>
          <a-button @click="clickCheck"> 复核 </a-button>
          <a-button @click="revokeCheck"> 撤销复核 </a-button>
          <a-button> 自动分拣 </a-button>
          <a-button> 转人工分拣 </a-button>
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
  import { BasicTable, useTable, BasicColumn } from '@/components/Table';
  import { FormSchema } from '@/components/Form';
  import { useModal } from '@/components/Modal';
  import dayjs from 'dayjs';
  import { ref, createVNode } from 'vue';
  import { Modal } from 'ant-design-vue';
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
    operationMap,
    operationValueEnum,
    prepareStateMap,
    prepareStateValueEnum,
    bagFlagMap,
    bagFlagValueEnum,
    pickModeMap,
    pickModeValueEnum,
  } from '@/enums/stockoutEnum';

  const { createMessage } = useMessage();
  const { warning, success } = createMessage;

  const selectedRow = ref([]); // 表格已选中

  const columns: BasicColumn[] = [
    {
      title: '投产准备号',
      dataIndex: 'prepareNo',
      align: 'left',
      width: 180,
      slots: { customRender: 'prepareNo' },
    },
    {
      title: '投产类型',
      dataIndex: 'prodType',
      width: 100,
      format(text) {
        return `${operationMap.get(text as operationValueEnum)}`;
      },
    },
    {
      title: '挑浆模式',
      dataIndex: 'pickMode',
      format(text) {
        return `${pickModeMap.get(text as pickModeValueEnum)}`;
      },
    },
    {
      title: '是否限制血浆',
      dataIndex: 'bagFlag',
      format(text) {
        return `${bagFlagMap.get(text as bagFlagValueEnum)}`;
      },
    },
    {
      title: '批次数量',
      dataIndex: 'batchCount',
      slots: { customRender: 'batchCount' },
    },
    {
      title: '分拣血浆数量',
      dataIndex: 'pickBagCount',
      slots: { customRender: 'pickBagCount' },
      // customRender: ({ record }) => {
      //   if (record.summary && record.summary.pickBagCount !== null) {
      //     return record.summary.pickBagCount;
      //   }
      //   return '';
      // },
    },
    {
      title: '投产血浆数量',
      dataIndex: 'prodBagCount',
      slots: { customRender: 'prodBagCount' },
    },
    {
      title: '投产血浆净重(kg)',
      dataIndex: 'netWeight',
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
    },
    {
      title: '准备时间',
      dataIndex: 'createAt',
      format(text) {
        return text ? dayjs(text).format('YYYY-MM-DD HH:mm:ss') : '-';
      },
    },
    {
      title: '复核人',
      dataIndex: 'reviewer',
      width: 100,
    },
    {
      title: '复核时间',
      dataIndex: 'reviewerAt',
      width: 100,
      format(text) {
        return text ? dayjs(text).format('YYYY-MM-DD HH:mm:ss') : '-';
      },
    },
    {
      title: '分拣完成日期',
      dataIndex: 'pickMode',
      width: 100,
      // format(text) {
      //   return text ? dayjs(text).format('YYYY-MM-DD') : '-';
      // },
    },
    {
      title: '状态',
      dataIndex: 'prepareState',
      width: 100,
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
      colProps: { span: 6 },
    },
    {
      field: 'prodType',
      label: '投产类型',
      component: 'Select',
      colProps: { span: 6 },
      componentProps: {
        options: [...operationMap.entries()].map(([key, value]) => ({
          value: key,
          label: `${value}`,
        })),
      },
    },
    {
      field: 'pickMode',
      label: '挑浆模式',
      component: 'Select',
      colProps: { span: 6 },
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
      colProps: { span: 6 },
      componentProps: {
        options: [...bagFlagMap.entries()].map(([key, value]) => ({
          value: key,
          label: `${value}`,
        })),
      },
    },
    {
      field: 'prepareState',
      label: '状态',
      component: 'Select',
      colProps: { span: 6 },
      componentProps: {
        options: [...prepareStateMap.entries()].map(([key, value]) => ({
          value: key,
          label: `${value}`,
        })),
      },
    },
    {
      field: '[pickBegin, pickEnd]',
      component: 'RangePicker',
      colProps: { span: 6 },
      label: '分拣完成日期',
    },
  ];

  const [registerTable, { reload }] = useTable({
    api: getPrepareList,
    columns,
    formConfig: {
      labelWidth: 120,
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
    clickToRowSelect: false,
    rowSelection: {
      type: 'radio',
      onChange: (_, selectedRows: any) => {
        selectedRow.value = selectedRows;
      },
    },
    size: 'small',
    striped: false,
    useSearchForm: true,
    showTableSetting: true,
    tableSetting: {
      size: false,
      redo: false,
      setting: false,
    },
    bordered: true,
    showIndexColumn: false,
    canResize: false,
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
    const prepareState = (selectedRow.value[0] as { prepareState?: string })?.prepareState;
    const pickBagCount = (selectedRow.value[0] as { pickBagCount?: string })?.pickBagCount;
    if(!isPicked && prepareState !== 'RUN' || Number(pickBagCount) > 0) {
      warning('该准备号不可撤销!');
      return;
    }
    if (prepareState !== 'REV' && isPicked) {
      warning('该准备号不可撤销准备!');
      return;
    }
    openRevokeModal(true, {
      record: selectedRow.value[0],
      isPicked: isPicked === 'isPicked',
    });
  }

  // 完成准备
  function completePreparation() {
    if (!selectedRow.value.length) {
      warning('请先选择投产准备号!');
      return;
    }
    const prepareState = (selectedRow.value[0] as { prepareState?: string })?.prepareState;
    const prepareNo = (selectedRow.value[0] as { prepareNo?: string })?.prepareNo;
    if (prepareState !== 'RUN') {
      warning('该准备号不可完成准备!');
      return;
    }
    Modal.confirm({
      title: '确定要完成准备吗?',
      icon: createVNode(ExclamationCircleOutlined),
      content: createVNode('div', { style: 'color:red;' }, `投产准备号：${prepareNo}`),
      async onOk() {
        await completePrepare({ prepareNo });
        success('完成准备成功!');
        reload();
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
    if (prepareState !== 'REV') {
      warning('该准备号不可复核!');
      return;
    }
    Modal.confirm({
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
    const prepareState = (selectedRow.value[0] as { prepareState?: string })?.prepareState;
    if (prepareState !== 'TPK') {
      warning('该准备号不可撤销复核!');
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
  function goPlasmaDetail(record, prepareProduce) {
    openPlasmaDetailModal(true, {
      record,
      prepareProduce,
    });
  }
</script>
