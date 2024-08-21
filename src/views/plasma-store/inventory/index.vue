<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex flex-col" class="p-16px">
    <div class="bg-white pt-10px">
      <BasicForm
        @register="registerForm"
        class="search-form"
        @reset="handleResetBtn"
        @submit="handleSubmit"
      />
    </div>
    <div class="bg-#ffffff mt-2 flex items-center basis-40px shrink-0">
      <a-button
        type="primary"
        class="absolute right-8px mr-16px"
        :loading="loading"
        @click="handleExport"
        v-auth="SearchManager.InventoryExport"
      >
        导出
      </a-button>
    </div>
    <div class="flex-1">
      <vxe-grid v-bind="gridOptions" ref="vxeRef" :loading="tableLoading" :data="tableData" />
    </div>
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { SearchManager } from '@/enums/authCodeEnum';
  import { onMounted, reactive, watchEffect, ref } from 'vue';
  import { BasicForm, useForm } from '@/components/Form';
  import { useStation } from '@/hooks/common/useStation';
  import { VxeGridProps } from 'vxe-table';
  import { vxeTableColumns, formSchema } from './inventory.data';
  import { GetApiSearchBankStockRequest } from '@/api/type/plasmaStoreManage';
  import dayjs from 'dayjs';
  import { useMessage } from '@/hooks/web/useMessage';
  import { PageWrapper } from '@/components/Page';

  import { inventoryDetailApi } from '@/api/plasmaStore/inventory';
  import { jsonToSheetXlsx } from '@/components/Excel';
  import { omit } from 'lodash-es';

  defineOptions({ name: 'StoreInventory' });

  const { createMessage } = useMessage();

  const { stationOptions, getStationNameById } = useStation();
  onMounted(() => {
    watchEffect(() => {
      updateSchema({
        field: 'stationNo',
        componentProps: {
          options: stationOptions,
        },
      });
    });
  });

  const sumNum = (list: any[], field: string) => {
    let count = 0;
    list.forEach((item) => {
      count = accAdd(count, item[field]);
    });
    return count;
  };

  const [registerForm, { updateSchema, getFieldsValue, setProps }] = useForm({
    baseColProps: { flex: '0 0 373px' },
    actionColOptions: { flex: '1 1 150px', style: 'max-width:unset;' },
    schemas: formSchema,
    transformDateFunc(date) {
      return dayjs(date).format('YYYY-MM-DD');
    },
    compact: true,
  });

  function accAdd(arg1: number, arg2: number) {
    let r1: number, r2: number, m: number;
    try {
      r1 = arg1.toString().split('.')[1].length;
    } catch (e) {
      r1 = 0;
    }
    try {
      r2 = arg2.toString().split('.')[1].length;
    } catch (e) {
      r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    return (arg1 * m + arg2 * m) / m;
  }

  const gridOptions = reactive<VxeGridProps<GetApiSearchBankStockRequest>>({
    border: true,
    showOverflow: true,
    height: '100%',
    align: 'center',
    size: 'small',
    exportConfig: {},
    columnConfig: {
      resizable: true,
    },
    scrollY: {
      enabled: true,
    },
    columns: vxeTableColumns,
    showFooter: true,
    footerMethod({ columns, data }) {
      return [
        columns.map((column, columnIndex) => {
          if (columnIndex === 0) {
            return '合计';
          }
          if (
            ['inNum', 'inWeight', 'outNum', 'outWeight', 'surplusNum', 'surplusWeight'].includes(
              column.field,
            )
          ) {
            return sumNum(data, column.field);
          }
          return '';
        }),
      ];
    },
  });

  const tableLoading = ref(false);
  const tableData = ref<Recordable[]>([]);
  async function initTableData() {
    try {
      const values = getFieldsValue();
      tableLoading.value = true;

      if (!values.date && !values.batchNo) {
        return createMessage.warning('请至少选择日期或输入血浆批号');
      }

      if (values.dateKey === 'receipt' && values.date) {
        values.receiptStartDate = values.date[0];
        values.receiptEndDate = values.date[1];
      } else if (values.dateKey === 'verify' && values.date) {
        values.verifyStartDate = values.date[0];
        values.verifyEndDate = values.date[1];
      }
      const searchParams = {
        ...values,
      };

      delete searchParams.dateKey;
      delete searchParams.date;
      setProps({ submitButtonOptions: { loading: true } });
      const originListData = await inventoryDetailApi(searchParams as GetApiSearchBankStockRequest);

      tableData.value = originListData.map((it) => ({
        ...it,
        stationNo: getStationNameById(it.stationNo),
      }));
    } finally {
      setProps({ submitButtonOptions: { loading: false } });

      tableLoading.value = false;
    }
  }

  async function handleResetBtn() {
    await initTableData();
  }

  async function handleSubmit() {
    await initTableData();
  }

  const loading = ref(false);
  async function handleExport() {
    const values = getFieldsValue();

    if (!values.date && !values.batchNo) {
      return createMessage.warning('请至少选择日期或输入血浆批号');
    }

    if (values.dateKey === 'receipt' && values.date) {
      values.receiptStartDate = values.date[0];
      values.receiptEndDate = values.date[1];
    } else if (values.dateKey === 'verify' && values.date) {
      values.verifyStartDate = values.date[0];
      values.verifyEndDate = values.date[1];
    }

    const searchParams = {
      ...values,
    };

    delete searchParams.dateKey;
    delete searchParams.date;

    loading.value = true;
    const originExportData = await inventoryDetailApi(searchParams as GetApiSearchBankStockRequest);

    if (originExportData.length === 0) {
      return createMessage.warning('暂无数据');
    }

    const dateFlag = values.dateKey === 'receipt' ? '接收' : '验收';
    originExportData.push({
      stationNo: '合计',
      inNum: originExportData.reduce((acc, item) => acc + item.inNum, 0),
      inWeight: originExportData.reduce((acc, item) => acc + item.inWeight, 0),
      outNum: originExportData.reduce((acc, item) => acc + item.outNum, 0),
      outWeight: originExportData.reduce((acc, item) => acc + item.outWeight, 0),
      surplusNum: originExportData.reduce((acc, item) => acc + item.surplusNum, 0),
      surplusWeight: originExportData.reduce((acc, item) => acc + item.surplusWeight, 0),
      bankNames: '',
    });
    const header = {};
    vxeTableColumns.forEach((item) => {
      header[item.field!] = item.title;
    });
    delete header['undefined'];
    jsonToSheetXlsx<any>({
      header,
      filename: `库存${dateFlag}.xlsx`,
      data: originExportData.map((it) => {
        return {
          ...omit(it, ['inWeightG', 'outWeightG']),
          stationNo: it.stationNo === '合计' ? '合计' : getStationNameById(it.stationNo),
        };
      }),
    });

    loading.value = false;
  }
</script>

<style scoped lang="less">
  ::v-deep(.ant-form-item-control-input-content button) {
    margin-right: 8px;
    margin-left: 4px;
    float: right;
  }

  .root :deep(.vxe-pager) {
    display: none;
  }

  :deep(.vxe-form--item-content > div) {
    width: 100%;
  }

  :deep(.vxe-form--item > .vxe-form--item-inner) {
    flex-grow: unset;
  }

  :deep(.vxe-grid--form-wrapper::after) {
    content: '';
    display: block;
    height: 16px;
    background: #f5f5f5;
  }

  :deep(.vxe-cell--title) {
    color: #1e1e1e;
    font-size: 14px;
  }

  :deep(.vxe-cell--label) {
    color: #1e1e1e;
  }
</style>
