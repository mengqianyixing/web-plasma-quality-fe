<template>
  <div class="p-3 root">
    <div class="pt-5 bg-white mb-16px">
      <BasicForm @register="registerForm" @reset="handleResetBtn" @submit="handleSubmit" />
    </div>

    <vxe-grid v-bind="gridOptions" ref="vxeRef" :loading="tableLoading" :data="tableData">
      <template #toolbar>
        <div class="h-32px">
          <a-button type="primary" class="absolute right-0" @click="handleExport"> 导出 </a-button>
        </div>
      </template>
    </vxe-grid>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, reactive, watchEffect, ref } from 'vue';
  import { BasicForm, useForm } from '@/components/Form';
  import { useStation } from '@/hooks/common/useStation';
  import { VxeGridProps } from 'vxe-table';
  import { vxeTableColumns, formSchema } from './inventory.data';
  import { GetApiCoreBankStockRequest } from '@/api/type/plasmaStoreManage';
  import dayjs from 'dayjs';
  import { useMessage } from '@/hooks/web/useMessage';

  import { inventoryDetailApi } from '@/api/plasmaStore/inventory';
  import { jsonToSheetXlsx } from '@/components/Excel';
  import { omit } from 'lodash-es';

  defineOptions({ name: 'StoreInventory' });

  const { createMessage } = useMessage();

  const { isLoading, stationOptions, getStationNameById } = useStation();
  onMounted(async () => {
    await initTableData();
    watchEffect(() => {
      if (!isLoading) {
        updateSchema({
          field: 'stationNo',
          componentProps: {
            options: stationOptions.value,
          },
        });
      }
    });
  });

  const sumNum = (list: any[], field: string) => {
    let count = 0;
    list.forEach((item) => {
      count += Number(item[field]);
    });
    return count;
  };

  const [registerForm, { updateSchema, getFieldsValue }] = useForm({
    labelWidth: 140,
    showAdvancedButton: false,
    actionColOptions: { style: 'right: 40px; top: 150px;  position: absolute;' },
    schemas: formSchema,
    transformDateFunc(date) {
      return dayjs(date).format('YYYY-MM-DD');
    },
    compact: true,
  });

  const gridOptions = reactive<VxeGridProps<GetApiCoreBankStockRequest>>({
    border: true,
    showOverflow: true,
    height: 750,
    align: 'center',
    size: 'small',
    exportConfig: {},
    columnConfig: {
      resizable: true,
    },
    scrollY: {
      enabled: true,
    },
    toolbarConfig: {
      refresh: false,
      loading: false,
      export: false,
      custom: false,
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
  const tableData = ref<Recordable[]>([{}]);
  async function initTableData() {
    try {
      const values = getFieldsValue();
      tableLoading.value = true;

      if (values.dateKey === 'receipt' && values.date) {
        values.receiptStartDate = values.date[0];
        values.receiptEndDate = values.date[1];
      } else if (values.dateKey === 'verify' && values.date) {
        values.verifyPubStartDate = values.date[0];
        values.verifyPubEndDate = values.date[1];
      }

      const searchParams = {
        ...values,
      };

      delete searchParams.dateKey;
      delete searchParams.date;

      const originListData = await inventoryDetailApi(searchParams as GetApiCoreBankStockRequest);

      tableData.value = originListData.map((it) => ({
        ...it,
        stationNo: getStationNameById(it.stationNo),
      }));
    } finally {
      tableLoading.value = false;
    }
  }

  async function handleResetBtn() {
    await initTableData();
  }

  async function handleSubmit() {
    await initTableData();
  }

  async function handleExport() {
    const values = getFieldsValue();

    if (!values.date) {
      return createMessage.warning('请选择日期');
    }

    if (values.dateKey === 'receipt' && values.date) {
      values.receiptStartDate = values.date[0];
      values.receiptEndDate = values.date[1];
    } else if (values.dateKey === 'verify' && values.date) {
      values.verifyPubStartDate = values.date[0];
      values.verifyPubEndDate = values.date[1];
    }

    const searchParams = {
      ...values,
    };

    delete searchParams.dateKey;
    delete searchParams.date;

    const originExportData = await inventoryDetailApi(searchParams as GetApiCoreBankStockRequest);

    if (originExportData.length === 0) {
      return createMessage.warning('暂无数据');
    }

    const dateFlag = values.dateKey === 'receipt' ? '接收' : '验收';

    const header = {};
    vxeTableColumns.forEach((item) => {
      header[item.field!] = item.title;
    });
    delete header['undefined'];
    jsonToSheetXlsx<any>({
      header,
      filename: `库存${values.date[0]}-${values.date[1]}${dateFlag}.xlsx`,
      data: originExportData.map((it) => {
        return omit(it, ['inWeightG', 'outWeightG']);
      }),
    });
  }
</script>

<style scoped lang="less">
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
</style>
