<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :title="`投产准备-血浆挑选-按${pickMode ? '批' : iskm ? '托盘' : '箱'}`"
    :footer="null"
    width="100%"
    :draggable="false"
    :destroyOnClose="true"
    :closeFunc="handleCloseFunc"
    defaultFullscreen
    :canFullscreen="false"
  >
    <BasicForm @register="registerForm" @submit="queryUntable" />
    <div class="flex gap-1 mt-1 mb-2">
      <vxe-grid
        ref="tableRef"
        :loading="vxeTableLoading"
        @checkbox-change="selectChangeEvent"
        @checkbox-all="selectAllEvent"
        v-bind="gridOptions"
        :data="unPickTableData"
        :columns="columnsUnRef"
        @sort-change="sortChangeEvent"
        show-overflow
        class="inline-block pr-2 w-15/20"
      />
      <div class="pr-2 w-1/20 icon-box">
        <Button :icon="h(DoubleRightOutlined)" @click="pick" :loading="pickLoading" />
        <Button
          :icon="h(DoubleLeftOutlined)"
          @click="cancelPick"
          class="mt-4"
          :loading="pickLoading"
        />
      </div>
      <BasicTable @register="registerTableEd" class="inline-block pr-2 w-4/20" />
    </div>
    <Description
      @register="register"
      :data="prepareDetail"
      :schema="schema"
      v-loading="previewLoading"
    />
  </BasicModal>
</template>

<script lang="tsx" setup>
  import { VxeTableInstance, VxeGridProps } from 'vxe-table';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, FormSchema, useForm } from '@/components/Form';
  import { BasicColumn, BasicTable, useTable } from '@/components/Table';
  import Description from '@/components/Description/src/Description.vue';
  import { DescItem, useDescription } from '@/components/Description';
  import { Button } from 'ant-design-vue';
  import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons-vue';
  import { h, reactive, ref } from 'vue';
  import dayjs from 'dayjs';
  import { useMessage } from '@/hooks/web/useMessage';
  import {
    getPickBatch,
    getPickBox,
    getPickedBatch,
    getPickedBox,
    getPrepareList,
    getSummaryPreview,
    pickBag,
    revokePickBag,
  } from '@/api/stockout/production-preparation.js';
  import { settingListApi } from '@/api/plasmaStore/setting';
  import { STORE_FLAG, CLOSED } from '@/enums/plasmaStoreEnum';
  import { useStation } from '@/hooks/common/useStation';
  import { bagFlagMap, pickModeMap, prepareStateMap } from '@/enums/stockoutEnum';
  import { SERVER_ENUM } from '@/enums/serverEnum';
  import { useServerEnumStoreWithOut } from '@/store/modules/serverEnums';
  import {
    GetApiProductPreparePickBatchResponse,
    PostApiProductPreparePickBagRequest,
    PostApiProductPrepareRevokePickBagRequest,
    PostApiProductPrepareSummaryPreviewRequest,
    GetApiProductPrepareListRequest,
  } from '@/api/type/productionPreparation';
  import { VxeGridPropTypes } from 'vxe-table/types/grid';
  import { COMPANY } from '@/enums/company';
  import { useGlobSetting } from '@/hooks/setting';

  const globSetting = useGlobSetting();
  const iskm = globSetting.company === COMPANY.KM;
  const { stationOptions } = useStation();
  const serverEnumStore = useServerEnumStoreWithOut();
  const PlasmaType = serverEnumStore.getServerEnumText(SERVER_ENUM.PlasmaType);
  const { createMessage } = useMessage();
  const { success, warning } = createMessage;

  const emit = defineEmits(['closePickModal', 'register']);

  const tableRef = ref<VxeTableInstance<any>>();
  const columnsUn: VxeGridPropTypes.Columns<any> = [
    {
      title: '采浆公司',
      field: 'stationName',
      width: 100,
    },
    {
      title: '未挑数量',
      field: 'unpickCount',
      width: 100,
    },
    {
      title: '满足数量',
      field: 'passCount',
      width: 100,
      sortable: true,
    },
    {
      title: '满足率',
      field: 'passRatio',
      width: 100,
      formatter({ cellValue }) {
        return cellValue ? cellValue + '%' : '-';
      },
      sortable: true,
    },
    {
      title: '浆员数量',
      field: 'donorCount',
      width: 100,
    },
    {
      title: '最早采集日期',
      field: 'minCollectAt',
      width: 130,
      formatter({ cellValue }) {
        return cellValue ? dayjs(cellValue).format('YYYY-MM-DD') : '-';
      },
      sortable: true,
    },
  ];
  const columnsEd: BasicColumn[] = [
    {
      title: '血浆数量',
      dataIndex: 'count',
    },
  ];

  let pickMode = ref(); // 是否为按批挑选
  const pickLoading = ref(false);
  const prepareNo = ref(); // 准备号
  const prodType = ref(); // 投产类型
  const cacheForm = ref(); // 缓存最近一次查询表单的入参
  const unPickTableData = ref<GetApiProductPreparePickBatchResponse>([]);
  const columnsUnRef = ref([...columnsUn]);

  const [registerModal] = useModalInner(async (data) => {
    sorter.value = {};
    pickMode.value = data.isBatch;
    prepareNo.value = data.prepareNo;
    prodType.value = data.prodType;
    const prodTypeName = PlasmaType(prodType.value);
    // 更新汇总数据
    await _getPrepareList();
    // 按批
    if (data.isBatch) {
      await updateSchema([
        {
          component: 'Select',
          label: '首次挑浆',
          field: 'firstFlag',
          ifShow: true,
        },
        {
          component: 'Input',
          field: 'boxNo',
          label: '血浆箱号',
          ifShow: false,
        },
      ]);
      columnsUnRef.value = [
        {
          type: 'checkbox',
          width: 50,
        },
        {
          title: '待挑选血浆批号',
          field: 'batchNo',
          sortable: true,
          width: 150,
        },
        ...columnsUnRef.value,
        {
          title: '挑浆次数',
          field: 'batchPickCount',
          width: 100,
        },
      ];
      setPropsed({
        api: getPickedBatch,
        columns: [
          {
            title: '已挑选血浆批号',
            dataIndex: 'batchNo',
            align: 'left',
            fixed: true,
          },
          ...columnsEd,
        ],
      });
    } else {
      // 获取库房下拉备选项
      const warehouseOpts = (
        await settingListApi({
          warehouseType: STORE_FLAG.S,
          currPage: '1',
          pageSize: '1000',
          closed: CLOSED.NORMAL,
        })
      )?.result;
      let upSchs = [
        {
          component: 'Select',
          label: '首次挑浆',
          field: 'firstFlag',
          ifShow: false,
        },
        {
          component: 'Input',
          label: iskm ? '托盘编号' : '血浆箱号',
          field: 'boxNo',
          ifShow: true,
        },
      ];
      if (warehouseOpts.length) {
        upSchs = [
          ...upSchs,
          {
            component: 'ApiSelect',
            field: 'houseNo',
            ifShow: true,
            label: '库房',
          },
          {
            component: 'Select',
            label: '货架',
            field: 'shelfNo',
            ifShow: true,
          },
        ];
      }
      await updateSchema(upSchs);
      columnsUnRef.value.unshift(
        {
          type: 'checkbox',
          width: 50,
        },
        {
          title: iskm ? '待挑选托盘编号' : '待挑选血浆箱号',
          field: 'boxNo',
          sortable: true,
          width: 150,
        },
        {
          title: '血浆批号',
          field: 'batchNo',
          width: 150,
        },
      );
      setPropsed({
        api: getPickedBox,
        columns: [
          {
            title: iskm ? '已挑选托盘编号' : '已挑选血浆箱号',
            dataIndex: 'boxNo',
            align: 'left',
            fixed: true,
          },
          ...columnsEd,
        ],
      });
    }
    // 非普浆
    if (prodType.value !== 'N') {
      await updateSchema([
        {
          component: 'Select',
          label: '效价类型',
          field: 'titerLevel',
          ifShow: true,
          componentProps: {
            disabled: false,
            options: [
              {
                value: 'H',
                label: `${prodType.value}H,${prodTypeName}高效价`,
              },
              {
                value: 'L',
                label: `${prodType.value}L,${prodTypeName}低效价`,
              },
            ],
          },
        },
      ]);
      columnsUnRef.value.push(
        {
          title: '平均效价',
          field: 'avgTiter',
          width: 110,
        },
        {
          title: `${prodType.value}H,${prodTypeName}高效价`,
          field: 'heightCount',
          width: 100,
        },
        {
          title: `${prodType.value}L,${prodTypeName}低效价`,
          field: 'lowCount',
          width: 100,
        },
      );
    } else {
      await updateSchema([
        {
          component: 'Input',
          label: '效价类型',
          field: 'titerLevel',
          ifShow: true,
          componentProps: {
            disabled: true,
          },
        },
      ]);
      await setFieldsValue({
        titerLevel: '普通',
      });
      columnsUnRef.value.push({
        title: '普通血浆数量',
        field: 'ordinaryCount',
        width: 110,
      });
    }

    await reloadLeftTable();
    await queryUntable();
    await reloaded();
  });

  // 关闭弹框前
  function handleCloseFunc() {
    columnsUnRef.value = [...columnsUn];
    setTableDataed([]);
    clearSelectedRowKeysed();
    emit('closePickModal');
    return Promise.resolve(true);
  }

  const FormSchemas: FormSchema[] = [
    {
      component: 'Select',
      label: '采浆公司',
      field: 'stationNo',
      colProps: { span: 4 },
      componentProps: {
        options: stationOptions,
      },
    },
    {
      component: 'Input',
      label: '血浆批号',
      field: 'batchNo',
      colProps: { span: 4 },
      labelWidth: 90,
    },
    {
      field: '[minCollectDay,maxCollectDay]',
      label: '采集天数',
      component: 'InputRange',
      colProps: { span: 5 },
    },
    {
      component: 'Input',
      label: '血浆箱号',
      field: 'boxNo',
      colProps: { span: 4 },
    },
    {
      component: 'Select',
      label: '首次挑浆',
      field: 'firstFlag',
      colProps: { span: 4 },
      componentProps: {
        options: [
          {
            value: true,
            label: '是',
          },
          {
            value: false,
            label: '否',
          },
        ],
      },
    },
    {
      component: 'Select',
      label: '效价类型',
      field: 'titerLevel',
      colProps: { span: 4 },
    },
    {
      field: '[minTiter,maxTiter]',
      label: '效价范围',
      component: 'InputRange',
      colProps: { span: 5 },
    },
    {
      field: 'houseNo',
      component: 'Select',
      label: '库房',
      ifShow: false,
      colProps: { span: 4 },
      componentProps: {
        api: settingListApi,
        params: {
          warehouseType: STORE_FLAG.S,
          currPage: '1',
          pageSize: '1000',
          closed: CLOSED.NORMAL,
        },
        valueField: 'houseNo',
        labelField: 'houseName',
        resultField: 'result',
      },
      rules: [{ validator }],
    },
    {
      component: 'Select',
      label: '货架',
      field: 'shelfNo',
      ifShow: false,
      colProps: { span: 4 },
      componentProps: {
        options: Array.from({ length: 4 }, (_, i) => {
          return {
            label: '第' + (i + 1) + '排',
            value: i + 1,
          };
        }),
      },
      rules: [{ validator }],
    },
  ];
  function validator() {
    const obj = getFieldsValue();
    if ((obj.houseNo && !obj.shelfNo) || (!obj.houseNo && obj.shelfNo)) {
      return Promise.reject('请选择库房和货架');
    }
    return Promise.resolve();
  }
  const [registerForm, { updateSchema, getFieldsValue, setFieldsValue }] = useForm({
    labelWidth: 90,
    baseColProps: { span: 24 },
    schemas: FormSchemas,
    showActionButtonGroup: true,
    showResetButton: true,
    resetFunc: customResetFunc,
  });

  const gridOptions = reactive<VxeGridProps<any>>({
    border: true,
    maxHeight: 600,
    rowConfig: {
      isHover: true,
    },
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
    checkboxConfig: {
      trigger: 'row',
    },
    toolbarConfig: {
      refresh: false,
      loading: false,
      export: false,
      custom: false,
    },
    showFooter: false,
    sortConfig: {
      trigger: 'cell',
      remote: true,
    },
  });

  const [
    registerTableEd,
    {
      getSelectRows: getSelectRowsed,
      reload: reloaded,
      setProps: setPropsed,
      clearSelectedRowKeys: clearSelectedRowKeysed,
      setTableData: setTableDataed,
    },
  ] = useTable({
    maxHeight: 510,
    columns: columnsEd,
    beforeFetch: () => {
      return {
        prepareNo: prepareNo.value,
      };
    },
    useSearchForm: false,
    pagination: false,
    clickToRowSelect: true,
    size: 'small',
    striped: false,
    rowSelection: {
      type: 'checkbox',
      hideSelectAll: false,
    },
    immediate: false,
    bordered: true,
    showIndexColumn: false,
    canResize: true,
  });

  const prepareDetail = ref(); // 汇总详情
  // 血浆汇总详情
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
  });

  // 点击查询未挑血浆，并缓存筛选条件
  async function queryUntable() {
    await reloadLeftTable();
    cacheForm.value = getFieldsValue();
  }

  async function selectAllEvent({ records }) {
    // 一个都没勾，初始化数据
    if (!records.length) {
      await _getPrepareList();
      return;
    }
    await compareFilter();
    await _getSummaryPreview();
  }

  // 未挑选表格勾选事件
  async function selectChangeEvent({ records }) {
    // 一个都没勾，初始化数据
    if (!records.length) {
      await _getPrepareList();
      return;
    }
    await compareFilter();
    await _getSummaryPreview();
  }

  // 对比筛选条件
  async function compareFilter() {
    // 获取筛选条件，与上一次查询的筛选条件做对比，有不同则查询一次
    const formValue = getFieldsValue();
    const cacheKeys = Object.keys(cacheForm.value);
    const formKeys = Object.keys(formValue);
    let isChange = false;

    for (const key of formKeys) {
      if (cacheForm.value[key] !== formValue[key]) {
        isChange = true;
        break;
      }
    }
    for (const key of cacheKeys) {
      if (cacheForm.value[key] !== formValue[key]) {
        isChange = true;
        break;
      }
    }

    if (isChange) {
      isChange = false;
      await queryUntable();
      warning('查询条件不一致，已重新查询!');
      // 挑选逻辑时，需要返回false，不执行后续挑选逻辑
      return new Promise((resolve) => {
        resolve(false);
      });
    }
  }

  async function pick() {
    const res = await compareFilter();
    if (res === false) return; // 中止挑选
    const $table = tableRef.value;
    if (!$table) return;

    const selected = $table.getCheckboxRecords()!;
    if (!selected) {
      warning('请先勾选数据!');
      return;
    }
    const { minCollectDay, maxCollectDay, firstFlag, titerLevel, minTiter, maxTiter, boxNo } =
      getFieldsValue();
    const params = {
      prepareNo: prepareNo.value,
      batchNos: [] as string[],
      minCollectDay,
      maxCollectDay,
      firstFlag,
      titerLevel,
      minTiter,
      maxTiter,
      boxNos: [] as string[],
      boxNo: boxNo,
    };
    if (pickMode.value) {
      params.batchNos = selected.map((item) => item.batchNo);
    } else {
      params.boxNos = selected.map((item) => item.boxNo);
    }
    // 普浆不需要效价类型
    prodType.value === 'N' && delete params.titerLevel;

    pickLoading.value = true;
    try {
      await pickBag(params as unknown as PostApiProductPreparePickBagRequest);
      success('挑选成功!');
      await $table.clearCheckboxRow();
      clearSelectedRowKeysed();
      await queryUntable();
      await reloaded();
      // 挑选成功，查询落地数据作为汇总详情数据
      await _getPrepareList();
    } finally {
      pickLoading.value = false;
    }
  }
  async function cancelPick() {
    const selected = getSelectRowsed();
    if (!selected) {
      warning('请先勾选数据!');
      return;
    }
    let params = {};
    if (pickMode.value) {
      params = {
        prepareNo: prepareNo.value,
        batchNos: getSelectRowsed().map((item) => item.batchNo),
      };
    } else {
      params = {
        prepareNo: prepareNo.value,
        boxNos: getSelectRowsed().map((item) => item.boxNo),
      };
    }

    pickLoading.value = true;
    try {
      await revokePickBag(params as unknown as PostApiProductPrepareRevokePickBagRequest);
      success('挑选成功!');
      await tableRef.value!.clearCheckboxRow();
      clearSelectedRowKeysed();
      await queryUntable();
      await reloaded();
      // 挑选成功，查询落地数据作为汇总详情数据
      await _getPrepareList();
    } finally {
      pickLoading.value = false;
    }
  }

  const previewLoading = ref(false);
  // 获取预览汇总数据
  async function _getSummaryPreview() {
    const { minCollectDay, maxCollectDay, firstFlag, titerLevel, minTiter, maxTiter, boxNo } =
      getFieldsValue();

    const $table = tableRef.value;
    if (!$table) return;

    const selected = $table.getCheckboxRecords()!;
    const params = {
      prepareNo: prepareNo.value,
      batchNos: [] as string[],
      minCollectDay,
      maxCollectDay,
      titerLevel,
      minTiter,
      maxTiter,
      firstFlag,
      boxNos: [] as string[],
      boxNo,
    };
    if (pickMode.value) {
      params.batchNos = selected.map((item) => item.batchNo);
    } else {
      params.boxNos = selected.map((item) => item.boxNo);
    }
    // 普浆不需要效价类型
    prodType.value === 'N' && delete params.titerLevel;

    try {
      previewLoading.value = true;
      prepareDetail.value = await getSummaryPreview(
        params as unknown as PostApiProductPrepareSummaryPreviewRequest,
      );
    } finally {
      previewLoading.value = false;
    }
  }

  // 获取汇总数据（已挑非实时）
  async function _getPrepareList() {
    const data = await getPrepareList({
      prepareNo: prepareNo.value,
      currPage: String(1),
      pageSize: String(1),
    } as GetApiProductPrepareListRequest);
    prepareDetail.value = data.result[0];
  }

  // 重置查询
  async function customResetFunc() {
    setTimeout(() => {
      reloadLeftTable();
    });
  }

  const vxeTableLoading = ref(false);
  async function reloadLeftTable() {
    const formValue = getFieldsValue();
    prodType.value === 'N' && delete formValue.titerLevel;

    vxeTableLoading.value = true;

    if (pickMode.value) {
      try {
        unPickTableData.value = (
          (await getPickBatch({
            prepareNo: prepareNo.value,
            currPage: String(1),
            pageSize: String(99999),
            sort: sorter.value?.order,
            orderBy: sorter.value?.field,
            ...formValue,
          })) as any
        )?.result;
      } finally {
        vxeTableLoading.value = false;
      }
    } else {
      try {
        unPickTableData.value = (
          (await getPickBox({
            prepareNo: prepareNo.value,
            currPage: String(1),
            pageSize: String(99999),
            sort: sorter.value?.order,
            orderBy: sorter.value?.field,
            ...formValue,
          } as any)) as any
        )?.result;
      } finally {
        vxeTableLoading.value = false;
      }
    }
  }

  const sorter = ref();
  async function sortChangeEvent(e) {
    sorter.value = e;
    await reloadLeftTable();
  }
</script>
<style lang="less" scoped>
  .icon-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>
