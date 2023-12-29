<template>
  <BasicDrawer v-bind="$attrs" @register="register" title="样本批次列表" width="80%">
    <PageWrapper dense contentFullHeight fixedHeight>
      <BasicTable @register="registerTable">
        <template #toolbar>
          <a-button type="primary" @click="handleSelect">选择</a-button>
        </template>
      </BasicTable>
    </PageWrapper>
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { PageWrapper } from '@/components/Page';
  import { ref } from 'vue';
  import { BasicTable, useTable } from '@/components/Table';
  import { getSampleAcceptList } from '@/api/inbound-management/sample-accept';
  import {
    sampleAcceptColumns,
    searchFormSchema,
  } from '@/views/inbound-management/sample-accept/accept.data';

  const emit = defineEmits(['success', 'register']);

  const selectedRow = ref<Recordable>([]);

  const [registerTable, { reload }] = useTable({
    title: '样本批次列表',
    api: getSampleAcceptList,
    columns: sampleAcceptColumns,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
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
    immediate: false,
  });

  const [register, { closeDrawer }] = useDrawerInner((data) => {
    if (data.reload) reload();
  });

  function handleSelect() {
    emit('success', selectedRow.value[0]);
    closeDrawer();
  }
</script>
