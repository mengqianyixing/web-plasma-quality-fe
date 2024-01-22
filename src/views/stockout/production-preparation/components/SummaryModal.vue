<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    title="血浆汇总"
    :footer="null"
    width="100%"
    :draggable="false"
    defaultFullscreen
    :canFullscreen="false"
  >
    <PageWrapper contentFullHeight fixedHeight>
      <Row v-if="!readOnly">
        <Col :span="3" :offset="21" style="margin-bottom: 12px">
          <a-button @click="goPick(true)" style="margin-right: 12px"> 按批挑选 </a-button>
          <a-button @click="goPick(false)"> 按箱挑选 </a-button>
        </Col>
      </Row>
      <Description @register="register" :data="prepareDetail" />
      <Tabs v-model:activeKey="activeKey" @change="changeTabs" style="margin-top: 12px" type="card">
        <TabPane key="columnsImmunity" tab="效价类型" force-render />
        <TabPane key="columnsStation" tab="采浆公司" />
        <TabPane key="columnsBatch" tab="血浆批次" />
        <TabPane key="columnsBox" tab="血浆箱号" />
        <TabPane key="columnsBag" tab="血浆明细" />
      </Tabs>
      <BasicTable @register="registerTable" :scroll="{ y: 520 }" />
    </PageWrapper>
  </BasicModal>
  <PickModal @register="registerPickModal" @close-pick-modal="closePickModal" />
</template>

<script lang="tsx" setup>
  import { BasicModal, useModalInner, useModal } from '@/components/Modal';
  import PageWrapper from '@/components/Page/src/PageWrapper.vue';
  import { Row, Col, Tabs, TabPane } from 'ant-design-vue';
  import Description from '@/components/Description/src/Description.vue';
  import { DescItem, useDescription } from '@/components/Description';
  import { BasicTable, useTable, BasicColumn } from '@/components/Table';
  import { ref } from 'vue';
  import {
    operationMap,
    prepareStateMap,
    bagFlagMap,
    pickModeMap,
    BagTrackMap,
  } from '@/enums/stockoutEnum';

  import PickModal from './PickModal.vue';
  import {
    getPrepareList,
    getImmunityList,
    getStationList,
    getBatchList,
    getBoxList,
    getBagList,
  } from '@/api/stockout/production-preparation.js';
  import dayjs from 'dayjs';

  // const emit = defineEmits(['register']);
  const activeKey = ref('columnsImmunity');

  const prepareDetail = ref(); // 准备详情
  const readOnly = ref(false);
  const [registerModal, { setModalProps }] = useModalInner(async (data) => {
    prepareDetail.value = data.record;
    readOnly.value = data?.readOnly;
    const res = await getPrepareList({
      prepareNo: prepareDetail.value.prepareNo,
      currPage: 1,
      pageSize: 1,
    });
    prepareDetail.value = res.result[0];
    reload();
    setModalProps({ confirmLoading: false });
  });

  // 血浆批次信息
  const schema: DescItem[] = [
    {
      field: 'prepareNo',
      label: '投产准备号',
      contentMinWidth: 100,
    },
    {
      field: 'prodType',
      label: '投产类型',
      contentMinWidth: 100,
      render(val) {
        return <div>{operationMap.get(val)}</div>;
      },
    },
    {
      field: 'bagFlag',
      label: '限制血浆',
      contentMinWidth: 100,
      render(val) {
        return <div>{bagFlagMap.get(val)}</div>;
      },
    },
    {
      field: 'pickMode',
      label: '挑浆模式',
      contentMinWidth: 100,
      render(val) {
        return <div>{pickModeMap.get(val)}</div>;
      },
    },
    {
      field: 'prepareState',
      label: '状态',
      contentMinWidth: 100,
      render(val) {
        return <div>{prepareStateMap.get(val)}</div>;
      },
    },
    {
      field: 'batchCount',
      label: '分拣批次数量',
      contentMinWidth: 100,
      render(val, data) {
        return <div>{data.summary.batchCount}</div>;
      },
    },
    {
      field: 'pickBagCount',
      label: '分拣血浆数量',
      contentMinWidth: 100,
      render(val, data) {
        return <div>{data.summary.pickBagCount}</div>;
      },
    },
    {
      field: 'prodBagCount',
      label: '投产血浆数量',
      contentMinWidth: 100,
      render(val, data) {
        return <div>{data.summary.prodBagCount}</div>;
      },
    },
    {
      field: 'netWeight',
      label: '血浆净重(kg)',
      contentMinWidth: 100,
      render(val, data) {
        return <div>{data.summary.netWeight}</div>;
      },
    },
    {
      field: 'donorCount',
      label: '浆员数量',
      contentMinWidth: 100,
      render(val, data) {
        return <div>{data.summary.donorCount}</div>;
      },
    },
    {
      field: 'minCollectAt',
      label: '最早采集日期',
      contentMinWidth: 100,
      render(val, data) {
        return (
          <div>
            {data.summary.minCollectAt
              ? dayjs(data.summary.minCollectAt).format('YYYY-MM-DD')
              : '-'}
          </div>
        );
      },
    },
    {
      field: 'maxCollectAt',
      label: '最晚采集日期',
      contentMinWidth: 100,
      render(val, data) {
        return (
          <div>
            {data.summary.maxCollectAt
              ? dayjs(data.summary.maxCollectAt).format('YYYY-MM-DD')
              : '-'}
          </div>
        );
      },
    },
    {
      field: 'avgTiter',
      label: '平均效价值',
      contentMinWidth: 100,
      render(val, data) {
        return <div>{data.summary.avgTiter}</div>;
      },
    },
    {
      field: 'tallTiterCount',
      label: '高效价数量',
      contentMinWidth: 100,
      render(val, data) {
        return <div>{data.summary.tallTiterCount}</div>;
      },
    },
    {
      field: 'lowTiterCount',
      label: '低效价数量',
      contentMinWidth: 100,
      render(val, data) {
        return <div>{data.summary.lowTiterCount}</div>;
      },
    },
    {
      field: 'ordinaryCount',
      label: '普通数量',
      contentMinWidth: 100,
      render(val, data) {
        return <div>{data.summary.ordinaryCount}</div>;
      },
    },
  ];
  const [register] = useDescription({
    column: 4,
    schema: schema,
  });

  const columnsImmunity: BasicColumn[] = [
    {
      title: '效价类型',
      dataIndex: 'immunity',
      align: 'left',
    },
    {
      dataIndex: 'bagCount',
      title: '血浆数量',
    },
    {
      title: '血浆比例',
      dataIndex: 'bagRatio',
    },
    {
      title: '血浆净重(kg)',
      dataIndex: 'netWeight',
    },
    {
      title: '净重比例',
      dataIndex: 'netWeightRatio',
    },
  ];

  const columnsStation: BasicColumn[] = [
    {
      title: '浆站名称',
      dataIndex: 'stationName',
      align: 'left',
    },
    {
      title: '血浆数量',
      dataIndex: 'bagCount',
    },
    {
      title: '血浆比例',
      dataIndex: 'bagRatio',
    },
    {
      title: '血浆净重(kg)',
      dataIndex: 'netWeight',
    },
    {
      title: '净重比例',
      dataIndex: 'netWeightRatio',
    },
  ];

  const columnsBatch: BasicColumn[] = [
    {
      title: '浆站名称',
      dataIndex: 'stationName',
      align: 'left',
    },
    {
      title: '血浆批号',
      dataIndex: 'batchNo',
    },
    {
      title: '血浆数量',
      dataIndex: 'bagCount',
    },
    {
      title: '血浆净重(kg)',
      dataIndex: 'netWeight',
    },
    {
      title: '效价类型',
      dataIndex: 'immunity',
    },
  ];

  const columnsBox: BasicColumn[] = [
    {
      title: '浆站名称',
      dataIndex: 'stationName',
      align: 'left',
    },
    {
      title: '血浆批号',
      dataIndex: 'batchNo',
    },
    {
      title: '血浆箱号',
      dataIndex: 'boxNo',
    },
    {
      title: '血浆数量',
      dataIndex: 'bagCount',
    },
    {
      title: '血浆净重(kg)',
      dataIndex: 'netWeight',
    },
    {
      title: '效价类型',
      dataIndex: 'immunity',
    },
  ];

  const columnsBag: BasicColumn[] = [
    {
      title: '浆站名称',
      dataIndex: 'stationName',
      align: 'left',
    },
    {
      title: '血浆批号',
      dataIndex: 'batchNo',
    },
    {
      title: '血浆箱号',
      dataIndex: 'boxNo',
    },
    {
      title: '血浆编号',
      dataIndex: 'bagNo',
    },
    {
      title: '采集日期',
      dataIndex: 'collectAt',
      format(text) {
        return dayjs(text).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    {
      title: '浆员编号',
      dataIndex: 'donorNo',
    },
    {
      title: '浆员姓名',
      dataIndex: 'donorName',
    },
    {
      title: '血型',
      dataIndex: 'bloodType',
    },
    {
      title: '效价类型',
      dataIndex: 'immunity',
    },
    {
      title: '效价值',
      dataIndex: 'titer',
    },
    {
      title: '血浆流程状态',
      dataIndex: 'tracked',
      format(text) {
        const val = text ? BagTrackMap.get(text) : '';
        return val;
      },
    },
  ];

  const [registerTable, { setProps, reload }] = useTable({
    api: getImmunityList,
    columns: columnsImmunity,
    useSearchForm: false,
    beforeFetch: (p) => {
      return { ...p, prepareNo: prepareDetail.value.prepareNo };
    },
    pagination: false,
    clickToRowSelect: false,
    maxHeight: 600,
    size: 'small',
    striped: false,
    immediate: false,
    bordered: true,
    showIndexColumn: false,
    // canResize: false,
  });

  function changeTabs(activeKey) {
    let api, columns;
    switch (activeKey) {
      case 'columnsImmunity':
        api = getImmunityList;
        columns = columnsImmunity;
        break;
      case 'columnsStation':
        api = getStationList;
        columns = columnsStation;
        break;
      case 'columnsBatch':
        api = getBatchList;
        columns = columnsBatch;
        break;
      case 'columnsBox':
        api = getBoxList;
        columns = columnsBox;
        break;
      case 'columnsBag':
        api = getBagList;
        columns = columnsBag;
        break;
      default:
        break;
    }
    setProps({
      api,
      columns,
    });
    reload();
  }

  const [registerPickModal, { openModal: openPickModal }] = useModal();

  function goPick(record) {
    openPickModal(true, {
      isBatch: record,
      prepareNo: prepareDetail.value.prepareNo,
      // prepareDetail,
    });
  }
  // 挑选框关闭，刷新页面数据
  async function closePickModal() {
    const res = await getPrepareList({
      prepareNo: prepareDetail.value.prepareNo,
      currPage: 1,
      pageSize: 1,
    });
    prepareDetail.value = res.result[0];
    reload();
  }
</script>
