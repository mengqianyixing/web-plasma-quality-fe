<template>
  <VxeBasicTable ref="tableRef" v-bind="gridOptions" />
</template>
<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { vxeTableColumns, vxeTableFormSchema } from './entrySearch.data';
  import { BasicTableProps, VxeBasicTable, VxeGridInstance } from '@/components/VxeTable';
  import { demoListApi } from '@/api/systemServer/table';

  const tableRef = ref<VxeGridInstance>();

  // 库存查询列表要求不分页，这里使用vxetable做尝试
  const gridOptions = reactive<BasicTableProps>({
    id: 'VxeTable',
    keepSource: true,
    columns: vxeTableColumns,
    footerMethod: VxeFooterMethod,
    toolbarConfig: {
      resizable: false,
      export: false,
      print: false,
      custom: false,
    },
    formConfig: {
      enabled: true,
      items: vxeTableFormSchema,
    },
    height: 'auto',
    proxyConfig: {
      ajax: {
        query: async ({ page, form }) => {
          const res = await demoListApi({
            page: page.currentPage,
            pageSize: page.pageSize,
            ...form,
          });
          console.log(res);
          return demoListApi({
            page: page.currentPage,
            pageSize: page.pageSize,
            ...form,
          });
        },
      },
    },
  });

  const sumNum = (list: any[], field: string) => {
    let count = 0;
    list.forEach((item) => {
      count += Number(item[field]);
    });
    return count;
  };

  function VxeFooterMethod({ columns, data }): Array<string | number | null>[] {
    return [
      columns.map((column, columnIndex) => {
        if (columnIndex === 0) {
          return '和值';
        }
        if (['rate', 'num1'].includes(column.field)) {
          return sumNum(data, column.field);
        }
        return null;
      }),
    ];
  }
</script>
