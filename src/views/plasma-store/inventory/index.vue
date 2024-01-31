<template>
  <div class="p-16px root">
    <vxe-grid v-bind="gridOptions" ref="vxe">
      <template #receiptDate="{ data, field }">
        <range-picker v-model:value="data[field]" />
      </template>
    </vxe-grid>
  </div>
</template>

<script lang="ts" setup>
  import { reactive } from 'vue';
  import { VxeGridProps } from 'vxe-table';
  import { RangePicker } from 'ant-design-vue';
  import { vxeTableColumns, vxeTableFormSchema } from './inventory.data';
  import { inventoryDetailApi } from '@/api/plasmaStore/inventory';
  import { GetApiCoreBankStockRequest } from '@/api/type/plasmaStoreManage';
  import dayjs from 'dayjs';
  import { cloneDeep } from 'lodash-es';

  const sumNum = (list: any[], field: string) => {
    let count = 0;
    list.forEach((item) => {
      count += Number(item[field]);
    });
    return count;
  };

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
    pagerConfig: {
      enabled: true,
      pageSize: 999999,
    },
    formConfig: {
      collapseStatus: false,
      items: vxeTableFormSchema,
      titleWidth: '140px',
      size: 'medium',
      titleAlign: 'right',
    },
    toolbarConfig: {
      refresh: false,
      loading: false,
      export: false,
      custom: false,
    },
    proxyConfig: {
      form: true,
      ajax: {
        query: async ({ _, form }) => {
          const params = cloneDeep(form);
          if (form.receiptDate) {
            params.receiptStartDate = dayjs(form.receiptDate[0]).format('YYYY-MM-DD');
            params.receiptEndDate = dayjs(form.receiptDate[1]).format('YYYY-MM-DD');

            delete params.receiptDate;
          }
          const list = await inventoryDetailApi({
            ...params,
          });

          return new Promise((resolve) => {
            resolve({
              result: list,
            });
          });
        },
      },
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
