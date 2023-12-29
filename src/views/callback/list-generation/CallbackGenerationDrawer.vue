<template>
  <BasicDrawer v-bind="$attrs" @register="register" :title="getTitle" width="85%">
    <BasicTable @register="registerTable" ref="table">
      <template #toolbar>
        <a-button type="primary" @click="handleSelect">选择</a-button>
      </template>
    </BasicTable>
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { computed, ref, unref } from 'vue';
  import { BasicTable, useTable } from '@/components/Table';
  import {
    callbackDrawerSearchFromSchema,
    callbackDrawerColumns,
  } from '@/views/callback/list-generation/generation.data';
  import { generateCallback, getNeedCallbackList } from '@/api/callback/list-generation';

  const emit = defineEmits(['success', 'register']);

  const selectedRow = ref<Recordable>([]);
  const isUpdate = ref(false);

  const [registerTable, { reload, getForm, getDataSource, setSelectedRowKeys }] = useTable({
    title: '样本批次列表',
    api: getNeedCallbackList,
    columns: callbackDrawerColumns,
    formConfig: {
      labelWidth: 150,
      schemas: callbackDrawerSearchFromSchema,
    },
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    clickToRowSelect: true,
    rowSelection: {
      type: 'checkbox',
      onChange: (_, selectedRows: any) => {
        selectedRow.value = selectedRows;
      },
      preserveSelectedRowKeys: true,
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
    immediate: false,
  });

  const getTitle = computed(() => (unref(isUpdate) ? '编辑名单' : '生成名单'));

  const table = ref(null);
  const [register, { closeDrawer }] = useDrawerInner((data) => {
    if (data.reload) reload();
    isUpdate.value = data.isUpdate;

    getForm().updateSchema({
      field: 'stationNo',
      defaultValue: data.record.stationNo,
      componentProps: {
        options: data.record.options,
      },
    });
    setSelectedRowKeys(getDataSource().map((it) => it.key));
  });

  async function handleSelect() {
    await generateCallback(selectedRow.value.map((it) => it.donorNo));
    emit('success');
    closeDrawer();
  }
</script>
