<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable">
      <template #stationNo="{ record }">
        {{ formatStationNo(record) }}
      </template>
      <template #toolbar>
        <div class="flex gap-2">
          <a-button type="primary" @click="handleAdd"> 新增 </a-button>
          <a-button type="primary" @click="handleEdit"> 编辑 </a-button>
          <a-button type="primary" @click="handleDelete"> 撤销 </a-button>
        </div>
      </template>
    </BasicTable>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';

  import { ref, onMounted } from 'vue';

  import { columns, searchFormSchema } from './generation.data';

  import { PageWrapper } from '@/components/Page';
  import { getCallbackListApi, stationNameList } from '@/api/callback/list-generation';

  defineOptions({ name: 'CallbackListGeneration' });

  const selectedRow = ref<Recordable>([]);
  const stationNames = ref<Recordable>({});

  onMounted(async () => {
    stationNames.value = await stationNameList();
    await getForm().updateSchema({
      field: 'stationNo',
      componentProps: {
        options: stationNames.value.map((it) => ({
          label: it.stationName,
          value: it.stationNo,
        })),
      },
    });
  });

  const [registerTable, { getForm }] = useTable({
    title: '回访名单生成列表',
    api: getCallbackListApi,
    columns,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
      transformDateFunc(date) {
        return date ? date.format('YYYY-MM-DD') : '';
      },
    },
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    clickToRowSelect: false,
    rowSelection: {
      type: 'checkbox',
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

  // function selectRowsCheck() {
  //   if (selectedRow.value.length > 1) {
  //     warning('只能选择一条数据');
  //     return false;
  //   } else if (selectedRow.value.length === 0) {
  //     warning('请先选择一条数据');
  //     return false;
  //   } else {
  //     return true;
  //   }
  // }

  function handleAdd() {}

  function handleEdit() {}

  function handleDelete() {}

  // function handleSuccess() {
  //   reload();
  //   selectedRow.value = [];
  // }

  function formatStationNo(record: Recordable) {
    return stationNames.value.find((it) => it.stationNo === record.stationNo)?.stationName;
  }
</script>
