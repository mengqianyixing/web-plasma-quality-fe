<template>
  <BasicModal v-bind="$attrs" @register="register" title="血浆编号列表" showFooter width="30%">
    <BasicTable @register="registerTable" ref="table" :dataSource="tableData" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { ref } from 'vue';
  import { BasicTable, useTable } from '@/components/Table';

  const tableData = ref([]);

  const [registerTable, { reload }] = useTable({
    columns: [
      {
        title: '血浆编号',
        dataIndex: 'bagNo',
        ifShow: false,
      },
    ],
    size: 'large',
    striped: false,
    useSearchForm: false,
    showTableSetting: true,
    tableSetting: {
      size: false,
      redo: false,
      setting: false,
    },
    bordered: true,
    showIndexColumn: true,
    indexColumnProps: {
      width: 80,
    },
    immediate: false,
    canResize: false,
  });

  const [register, { setModalProps }] = useModalInner((data) => {
    setModalProps({
      maskClosable: false,
    });

    tableData.value = data.record.map((it) => ({ bagNo: it }));

    reload();
  });
</script>
