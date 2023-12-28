<template>
  <BasicDrawer v-bind="$attrs" @register="register" title="样本批次列表" width="80%">
    <PageWrapper dense contentFullHeight fixedHeight>
      <BasicTable @register="registerTable">
        <template #toolbar="{ record }">
          <a-button type="primary" @click="handleSelect(record)">选择</a-button>
        </template>
      </BasicTable>
    </PageWrapper>
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { PageWrapper } from '@/components/Page';
  import { ref, watchEffect } from 'vue';
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
    // api: getSampleAcceptList,
    dataSource: getSampleAcceptList().data.result,
    columns: sampleAcceptColumns,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
    },
    // fetchSetting: {
    //   pageField: 'currPage',
    //   sizeField: 'pageSize',
    //   totalField: 'totalCount',
    //   listField: 'result',
    // },
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

  const [register, { getOpen }] = useDrawerInner();

  watchEffect(() => {
    if (getOpen && getOpen.value) {
      reload();
    }
  });

  function handleSelect(record: Recordable) {
    emit('success', record);
  }
</script>
