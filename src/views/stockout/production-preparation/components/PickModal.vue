<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    title="血浆挑选"
    :footer="null"
    width="100%"
    :draggable="false"
    :closeFunc="handleCloseFunc"
    defaultFullscreen
    :canFullscreen="false"
  >
    <BasicForm @register="registerForm" @submit="queryUntable" />
    <div class="flex gap-1 mt-1">
      <BasicTable @register="registerTableUn" class="inline-block w-15/20 pr-2" />
      <div class="w-1/20 pr-2 icon-box">
        <Button :icon="h(DoubleRightOutlined)" @click="pick" :loading="pickLoading" />
        <Button
          :icon="h(DoubleLeftOutlined)"
          @click="cancelPick"
          class="mt-4"
          :loading="pickLoading"
        />
      </div>
      <BasicTable @register="registerTableEd" class="inline-block w-4/20 pr-2" />
    </div>
    <Description @register="register" :data="prepareDetail" />
  </BasicModal>
</template>

<script lang="tsx" setup>
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm, FormSchema } from '@/components/Form';
  import { BasicColumn, useTable, BasicTable } from '@/components/Table';
  import Description from '@/components/Description/src/Description.vue';
  import { DescItem, useDescription } from '@/components/Description';
  import { Input, FormItem, FormItemRest, Button } from 'ant-design-vue';
  import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons-vue';
  import { ref, h } from 'vue';
  import dayjs from 'dayjs';
  import { useMessage } from '@/hooks/web/useMessage';
  import {
    getPrepareList,
    getPickBatch,
    getPickBox,
    pickBag,
    revokePickBag,
    getPickedBatch,
    getPickedBox,
    getSummaryPreview,
  } from '@/api/stockout/production-preparation.js';
  import { stationNameList } from '@/api/callback/list-generation';
  import { operationMap, prepareStateMap, bagFlagMap, pickModeMap } from '@/enums/stockoutEnum';

  const { createMessage } = useMessage();
  const { success, warning } = createMessage;

  const emit = defineEmits(['closePickModal']);

  let pickMode; // 是否为按批挑选
  const pickLoading = ref(false);
  const prepareNo = ref(); // 准备号
  const prodType = ref(); // 投产类型
  const cacheForm = ref(); // 缓存最近一次查询表单的入参
  const [registerModal] = useModalInner(async (data) => {
    pickMode = data.isBatch;
    prepareNo.value = data.prepareNo;
    prodType.value = data.prodType;
    const prodTypeName = operationMap.get(prodType.value);
    const untablePropsCols = [...columnsUn]; // 未挑选表格列
    // 更新汇总数据
    _getPrepareList();
    // 按批
    if (data.isBatch) {
      updateSchema([
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
      setProps({
        api: getPickBatch,
        rowKey: 'batchNo',
      });
      untablePropsCols.unshift({
        title: '待挑选血浆批号',
        dataIndex: 'batchNo',
        fixed: true,
        sorter: true,
      });
      untablePropsCols.push({
        title: '挑浆次数',
        dataIndex: 'batchPickCount',
        width: 100,
      });
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
      updateSchema([
        {
          component: 'Select',
          label: '首次挑浆',
          field: 'firstFlag',
          ifShow: false,
        },
        {
          component: 'Input',
          label: '血浆箱号',
          field: 'boxNo',
          ifShow: true,
        },
      ]);
      setProps({
        api: getPickBox,
        rowKey: 'boxNo',
      });
      untablePropsCols.unshift(
        {
          title: '待挑选血浆箱号',
          dataIndex: 'boxNo',
          fixed: true,
          sorter: true,
        },
        {
          title: '血浆批号',
          dataIndex: 'batchNo',
        },
      );
      setPropsed({
        api: getPickedBox,
        columns: [
          {
            title: '已挑选血浆箱号',
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
      updateSchema([
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
                label: `${prodTypeName}高效价`,
              },
              {
                value: 'N',
                label: `${prodTypeName}低效价`,
              },
            ],
          },
        },
      ]);
      untablePropsCols.push(
        {
          title: '平均效价',
          dataIndex: 'avgTiter',
          width: 110,
        },
        {
          title: `BH,${prodTypeName}高效价`,
          dataIndex: 'heightCount',
          width: 150,
        },
        {
          title: `BL,${prodTypeName}低效价`,
          dataIndex: 'lowCount',
          width: 150,
        },
      );
    } else {
      updateSchema([
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
      setFieldsValue({
        titerLevel: '普通',
      });
      untablePropsCols.push({
        title: '普通血浆数量',
        dataIndex: 'ordinaryCount',
        width: 110,
      });
    }
    setProps({
      columns: untablePropsCols,
    });
    queryUntable();
    reloaded();
  });

  // 关闭弹框前
  function handleCloseFunc() {
    resetFields();
    setTableData([]);
    setTableDataed([]);
    clearSelectedRowKeys();
    clearSelectedRowKeysed();
    emit('closePickModal');
    return true;
  }

  const FormSchemas: FormSchema[] = [
    {
      component: 'ApiSelect',
      label: '采浆公司',
      field: 'stationNo',
      colProps: { span: 5 },
      componentProps: {
        api: stationNameList,
        labelField: 'stationName',
        valueField: 'stationNo',
        immediate: true,
      },
    },
    {
      component: 'Input',
      label: '血浆批号',
      field: 'batchNo',
      colProps: { span: 5 },
      labelWidth: 90,
    },
    {
      field: 'minCollectDay',
      defaultValue: '', // 第一个默认值
      fields: ['maxCollectDay'],
      defaultValueObj: { maxCollectDay: '' }, // 第二个默认值
      component: 'Input',
      colProps: { span: 5 },
      renderColContent({ model, field }, { disabled }) {
        return (
          <FormItem name="minCollectDay" label="采集天数" label-col={{ style: { width: '90px' } }}>
            <Input.Group compact>
              <Input
                disabled={disabled}
                style="width: 130px"
                v-model:value={model[field]}
                autocomplete="off"
                placeholder="请输入"
              ></Input>
              <span style="margin-top: 4px;padding: 0 15px;border-right: 0;">至</span>
              <FormItemRest>
                <Input
                  style="width: 130px; margin-left: -1px;"
                  placeholder="请输入"
                  autocomplete="off"
                  v-model:value={model['maxCollectDay']}
                  disabled={disabled}
                />
              </FormItemRest>
            </Input.Group>
          </FormItem>
        );
      },
    },
    {
      component: 'Input',
      label: '血浆箱号',
      field: 'boxNo',
      colProps: { span: 5 },
    },
    {
      component: 'Select',
      label: '首次挑浆',
      field: 'firstFlag',
      colProps: { span: 5 },
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
      colProps: { span: 5 },
    },
    {
      field: 'minTiter',
      defaultValue: '', // 第一个默认值
      fields: ['maxTiter'],
      defaultValueObj: { maxTiter: '' }, // 第二个默认值
      component: 'Input',
      colProps: { span: 5 },
      renderColContent({ model, field }, { disabled }) {
        return (
          <FormItem name="minTiter" label="效价范围" label-col={{ style: { width: '90px' } }}>
            <Input.Group compact>
              <Input
                disabled={disabled}
                style="width: 130px"
                v-model:value={model[field]}
                autocomplete="off"
                placeholder="请输入"
              ></Input>
              <span style="margin-top: 4px;padding: 0 15px;border-right: 0;">至</span>
              <FormItemRest>
                <Input
                  style="width: 130px; margin-left: -1px;"
                  autocomplete="off"
                  placeholder="请输入"
                  v-model:value={model['maxTiter']}
                  disabled={disabled}
                />
              </FormItemRest>
            </Input.Group>
          </FormItem>
        );
      },
    },
  ];
  const [registerForm, { updateSchema, getFieldsValue, resetFields, setFieldsValue }] = useForm({
    labelWidth: 90,
    baseColProps: { span: 24 },
    schemas: FormSchemas,
    showActionButtonGroup: true,
    showResetButton: true,
    actionColOptions: {
      span: 14,
    },
  });

  const columnsUn: BasicColumn[] = [
    {
      title: '采浆公司',
      dataIndex: 'stationName',
    },
    {
      title: '未挑数量',
      dataIndex: 'unpickCount',
      width: 100,
    },
    {
      title: '满足数量',
      dataIndex: 'passCount',
      width: 100,
      sorter: true,
    },
    {
      title: '满足率',
      dataIndex: 'passRatio',
      sorter: true,
      width: 100,
    },
    {
      title: '浆员数量',
      dataIndex: 'donorCount',
      width: 100,
    },
    {
      title: '最早采集日期',
      dataIndex: 'minCollectAt',
      format(text) {
        return text ? dayjs(text).format('YYYY-MM-DD') : '-';
      },
    },
  ];
  const columnsEd: BasicColumn[] = [
    {
      title: '血浆数量',
      dataIndex: 'count',
    },
  ];

  const [registerTableUn, { reload, setProps, getSelectRows, clearSelectedRowKeys, setTableData }] =
    useTable({
      maxHeight: 510,
      columns: columnsUn,
      useSearchForm: false,
      beforeFetch: (p) => {
        let { currPage, pageSize, field: orderBy, order: sort } = p;
        if (sort === 'ascend') sort = 'asc';
        if (sort === 'descend') sort = 'desc';
        const formValue = getFieldsValue();
        prodType.value === 'N' && delete formValue.titerLevel;
        return {
          currPage,
          pageSize,
          orderBy,
          sort,
          prepareNo: prepareNo.value,
          ...formValue,
        };
      },
      pagination: { pageSize: 20 },
      fetchSetting: {
        pageField: 'currPage',
        sizeField: 'pageSize',
        totalField: 'totalCount',
        listField: 'result',
      },
      clickToRowSelect: false,
      size: 'small',
      striped: false,
      rowSelection: {
        type: 'checkbox',
        onChange: unSelectionChange,
        hideSelectAll: true,
        preserveSelectedRowKeys: true,
      },
      immediate: false,
      bordered: true,
      showIndexColumn: false,
      canResize: true,
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
    clickToRowSelect: false,
    size: 'small',
    striped: false,
    rowSelection: {
      type: 'checkbox',
      hideSelectAll: true,
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

  // 点击查询未挑血浆，并缓存筛选条件
  async function queryUntable() {
    await reload();
    cacheForm.value = getFieldsValue();
  }

  // 未挑选表格勾选事件
  async function unSelectionChange(selectedRowKeys, selectedRows) {
    console.log('微挑选勾选事件', getSelectRows(), selectedRows);
    // 一个都没勾，初始化数据
    if (!selectedRows.length) {
      _getPrepareList();
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
    const selected = getSelectRows();
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
    if (pickMode) {
      params.batchNos = selected.map((item) => item.batchNo);
    } else {
      params.boxNos = selected.map((item) => item.boxNo);
    }
    // 普浆不需要效价类型
    prodType.value === 'N' && delete params.titerLevel;

    pickLoading.value = true;
    try {
      const res = await pickBag(params);
      console.log(res);
      success('挑选成功!');
      clearSelectedRowKeys();
      clearSelectedRowKeysed();
      queryUntable();
      reloaded();
      // 挑选成功，查询落地数据作为汇总详情数据
      _getPrepareList();
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
    if (pickMode) {
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
      await revokePickBag(params);
      success('挑选成功!');
      clearSelectedRowKeys();
      clearSelectedRowKeysed();
      queryUntable();
      reloaded();
      // 挑选成功，查询落地数据作为汇总详情数据
      _getPrepareList();
    } finally {
      pickLoading.value = false;
    }
  }

  // 获取预览汇总数据
  async function _getSummaryPreview() {
    const { minCollectDay, maxCollectDay, firstFlag, titerLevel, minTiter, maxTiter, boxNo } =
      getFieldsValue();
    const selected = getSelectRows();
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
    if (pickMode) {
      params.batchNos = selected.map((item) => item.batchNo);
    } else {
      params.boxNos = selected.map((item) => item.boxNo);
    }
    // 普浆不需要效价类型
    prodType.value === 'N' && delete params.titerLevel;

    const data = await getSummaryPreview(params);
    prepareDetail.value = data;
  }

  // 获取汇总数据（已挑非实时）
  async function _getPrepareList() {
    const data = await getPrepareList({ prepareNo: prepareNo.value, currPage: 1, pageSize: 1 });
    prepareDetail.value = data.result[0];
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
