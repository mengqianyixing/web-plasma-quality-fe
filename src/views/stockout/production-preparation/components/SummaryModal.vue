<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    title="投产准备-血浆挑选"
    :footer="null"
    width="100%"
    :draggable="false"
    defaultFullscreen
    :closeFunc="handleCloseFunc"
    :canFullscreen="false"
  >
    <!-- <PageWrapper contentFullHeight fixedHeight> -->
    <PageWrapper>
      <div class="flex justify-end" v-if="!readOnly">
        <div style="margin-bottom: 12px">
          <a-button @click="goPick(true)" style="margin-right: 12px"> 按批挑选 </a-button>
          <a-button @click="goPick(false)"> {{ iskm ? '按托盘挑选' : '按箱挑选' }} </a-button>
        </div>
      </div>
      <Description @register="register" :data="prepareDetail" />
      <Tabs v-model:activeKey="activeKey" @change="changeTabs" style="margin-top: 12px" type="card">
        <TabPane key="columnsImmunity" tab="效价类型" force-render />
        <TabPane key="columnsStation" tab="采浆公司" />
        <TabPane key="columnsBatch" tab="血浆批次" />
        <TabPane key="columnsBox" :tab="iskm ? '托盘明细' : '血浆箱号'" />
        <TabPane key="columnsBag" tab="血浆明细" />
        <template #rightExtra v-if="activeKey === 'columnsBag'">
          <a-button
            type="primary"
            @click="handleExport"
            :loading="exportLoading"
            v-auth="StockOutButtonEnum.ProductionPreparationDetailExport"
            >导出</a-button
          >
        </template>
      </Tabs>
      <BasicTable v-if="activeKey !== 'columnsBag'" @register="registerTable" :scroll="{ y: 520 }">
        <template #bodyCell="{ record, column }">
          <template v-if="column.key === 'action'">
            <a-button type="text" danger @click="handleDel(record)">删除</a-button>
          </template>
        </template>
      </BasicTable>
      <vxe-grid
        v-if="activeKey === 'columnsBag'"
        ref="xTable"
        @scroll="handleScroll"
        v-bind="gridOptions"
        :data="plasmaDetailData"
        show-overflow
        class="inline-block w-100%"
        :loading="tableLoading"
      >
        <template #collectAt="{ row }">
          <span>{{ row.collectAt ? dayjs(row.collectAt).format('YYYY-MM-DD') : '-' }}</span>
        </template>
        <template #calculateAt="{ row }">
          <span>{{ row.calculateAt ? dayjs(row.calculateAt).format('YYYY-MM-DD') : '-' }}</span>
        </template>
      </vxe-grid>
    </PageWrapper>
  </BasicModal>
  <PickModal @register="registerPickModal" @close-pick-modal="closePickModal" />
</template>

<script lang="tsx" setup>
  import { BasicModal, useModalInner, useModal } from '@/components/Modal';
  import PageWrapper from '@/components/Page/src/PageWrapper.vue';
  import { Tabs, TabPane } from 'ant-design-vue';
  import { VxeGridProps } from 'vxe-table';
  import Description from '@/components/Description/src/Description.vue';
  import { DescItem, useDescription } from '@/components/Description';
  import { BasicTable, useTable, BasicColumn } from '@/components/Table';
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
  import { useMessage } from '@/hooks/web/useMessage';
  import { jsonToSheetXlsx } from '@/components/Excel';
  import { ref, reactive, nextTick, createVNode } from 'vue';
  import {
    prepareStateMap,
    bagFlagMap,
    pickModeMap,
    BagTrackMap,
    BagTrackValueEnum,
  } from '@/enums/stockoutEnum';
  import { SERVER_ENUM } from '@/enums/serverEnum';
  import { useServerEnumStoreWithOut } from '@/store/modules/serverEnums';
  import PickModal from './PickModal.vue';
  import {
    getPrepareList,
    getImmunityList,
    getStationList,
    getBatchList,
    getBoxList,
    getBagList,
    revokePickBag,
  } from '@/api/stockout/production-preparation.js';
  import { StockOutButtonEnum } from '@/enums/authCodeEnum';
  import dayjs from 'dayjs';
  import { COMPANY } from '@/enums/company';
  import { useGlobSetting } from '@/hooks/setting/index';

  const globSetting = useGlobSetting();
  const iskm = globSetting.company === COMPANY.KM;
  const serverEnumStore = useServerEnumStoreWithOut();
  const PlasmaType = serverEnumStore.getServerEnumText(SERVER_ENUM.PlasmaType);
  const { createMessage } = useMessage();

  const emit = defineEmits(['success', 'register']);
  const activeKey = ref('columnsImmunity');

  const prepareDetail = ref(); // 准备详情
  const readOnly = ref(false);
  let plasmaDetailData = []; // 血浆明细表格数据
  const tableLoading = ref(false);
  const xTable = ref(null);
  const plasmaDetailPage = ref({
    currPage: 1,
    pageSize: 20,
    totalCount: 0,
  });

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
        return <div>{PlasmaType(val)}</div>;
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
      field: 'heightCount',
      label: '高效价数量',
      contentMinWidth: 100,
      render(val, data) {
        return <div>{data.summary.heightCount}</div>;
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
      title: iskm ? '托盘编号' : '血浆箱号',
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

  const columnsBag = [
    {
      title: '浆站名称',
      field: 'stationName',
      // align: 'left',
    },
    {
      title: '血浆批号',
      field: 'batchNo',
    },
    {
      title: iskm ? '托盘编号' : '血浆箱号',
      field: 'boxNo',
    },
    {
      title: '血浆编号',
      field: 'bagNo',
    },
    {
      title: '采集日期',
      field: 'collectAt',
      slots: { default: 'collectAt' },
    },
    {
      title: '浆员编号',
      field: 'cardNo',
    },
    {
      title: '浆员姓名',
      field: 'donorName',
    },
    {
      title: '血型',
      field: 'bloodType',
    },
    {
      title: '效价类型',
      field: 'immunity',
    },
    {
      title: '效价值',
      field: 'titer',
    },
    {
      title: '检疫期满足日期',
      field: 'calculateAt',
      slots: { default: 'calculateAt' },
    },
    {
      title: '血浆流程状态',
      field: 'plasmaStatus',
      // format(text) {
      //   const val = text ? BagTrackMap.get(text as BagTrackValueEnum) : '';
      //   return val;
      // },
    },
  ];

  const gridOptions = reactive<VxeGridProps<any>>({
    border: true,
    rowConfig: {
      isHover: true,
    },
    // height: '520px',
    maxHeight: 600,
    showOverflow: true,
    exportConfig: {},
    columnConfig: {
      resizable: true,
    },
    scrollY: {
      enabled: true,
      gt: 0,
    },
    pagerConfig: {
      enabled: false,
    },
    formConfig: {
      enabled: false,
    },
    toolbarConfig: {
      refresh: false,
      loading: false,
      export: false,
      custom: false,
    },
    columns: columnsBag,
    showFooter: false,
  });

  const [registerTable, { setProps, reload, setLoading }] = useTable({
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
    let api, columns, actionColumn;
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
        actionColumn = {
          title: '操作',
          dataIndex: 'action',
          fixed: 'right',
        };
        break;
      case 'columnsBox':
        api = getBoxList;
        columns = columnsBox;
        actionColumn = {
          title: '操作',
          dataIndex: 'action',
          fixed: 'right',
        };
        break;
      case 'columnsBag':
        plasmaDetailData = [];
        plasmaDetailPage.value.currPage = 1;
        plasmaDetailPage.value.pageSize = 20;
        plasmaDetailPage.value.totalCount = 0;
        _getBagList();
        break;
      default:
        break;
    }
    nextTick(() => {
      setProps({
        api,
        columns,
        actionColumn,
      });
      reload();
    });
  }

  const [registerPickModal, { openModal: openPickModal }] = useModal();

  function goPick(record) {
    openPickModal(true, {
      isBatch: record,
      prepareNo: prepareDetail.value.prepareNo,
      prodType: prepareDetail.value.prodType,
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

  // 获取血浆明细
  async function _getBagList() {
    try {
      const data = {
        prepareNo: prepareDetail.value.prepareNo,
        currPage: plasmaDetailPage.value.currPage,
        pageSize: plasmaDetailPage.value.pageSize,
      };
      tableLoading.value = true;
      const res = await getBagList(data);
      plasmaDetailPage.value.totalCount = res.totalCount;
      plasmaDetailData = plasmaDetailData.concat(res.result);
      const $table = xTable.value;
      if ($table) {
        // 表格局部加载
        $table.loadData(plasmaDetailData);
      }
    } finally {
      tableLoading.value = false;
    }
  }

  function handleScroll({ scrollTop, scrollHeight }) {
    const wrapperHeight = document.querySelector('.vxe-table--body-wrapper.body--wrapper')
      ?.clientHeight;
    // 滚到当前底部加载下一块
    if (
      scrollTop + wrapperHeight >= scrollHeight - 10 &&
      plasmaDetailPage.value.currPage * plasmaDetailPage.value.pageSize <
        plasmaDetailPage.value.totalCount
    ) {
      plasmaDetailPage.value.currPage++;
      _getBagList();
    }
  }

  // 关闭弹框前
  function handleCloseFunc() {
    activeKey.value = 'columnsImmunity';
    emit('success');
    return true;
  }

  // 导出功能
  const exportLoading = ref(false);
  async function handleExport() {
    const data = {
      prepareNo: prepareDetail.value.prepareNo,
      currPage: 1,
      pageSize: 9999999,
    };
    const res = await getBagList(data);
    const tableDate = res.result;
    if (!tableDate.length) {
      createMessage.warn('暂无可导出的数据!');
      return;
    }

    exportLoading.value = true;
    try {
      const _exportData = tableDate!.map((it) => {
        return {
          stationName: it.stationName,
          batchNo: it.batchNo,
          boxNo: it.boxNo,
          bagNo: it.bagNo,
          collectAt: it.collectAt ? dayjs(it.collectAt).format('YYYY-MM-DD') : '',
          cardNo: it.cardNo,
          donorName: it.donorName,
          bloodType: it.bloodType,
          immunity: it.immunity,
          titer: it.titer,
          calculateAt: it.calculateAt ? dayjs(it.calculateAt).format('YYYY-MM-DD') : '',
          plasmaStatus: it.plasmaStatus
            ? BagTrackMap.get(it.plasmaStatus as BagTrackValueEnum)
            : '',
        };
      });

      jsonToSheetXlsx<any>({
        header: {
          stationName: '浆站名称',
          batchNo: '血浆批号',
          boxNo: iskm ? '托盘编号' : '血浆箱号',
          bagNo: '血浆编号',
          collectAt: '采集日期',
          cardNo: '浆员编号',
          donorName: '浆员姓名',
          bloodType: '血型',
          immunity: '效价类型',
          titer: '效价值',
          calculateAt: '检疫期满足日期',
          plasmaStatus: '血浆流程状态	',
        },
        filename: `投产准备号:${prepareDetail.value.prepareNo}-血浆明细.xlsx`,
        data: _exportData,
      });

      createMessage.success('导出成功');
    } catch (e) {
      createMessage.error('导出失败，请重试 :(');
    } finally {
      exportLoading.value = false;
    }
  }

  const { createConfirm } = useMessage();

  // 删除
  async function handleDel(record) {
    createConfirm({
      iconType: 'warning',
      title: '是否确认删除?',
      icon: createVNode(ExclamationCircleOutlined),
      content: '',
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      async onOk() {
        const params = {
          prepareNo: prepareDetail.value.prepareNo,
          immType: record.immType,
          titerLevel: record.titerLevel,
        };
        // 箱
        if (Object.prototype.hasOwnProperty.call(record, 'boxNo'))
          params['boxNos'] = [record.boxNo];
        // 批
        else params['batchNos'] = [record.batchNo];

        try {
          setLoading(true);
          await revokePickBag(params);
          closePickModal();
        } finally {
          setLoading(false);
        }
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
</script>
