<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="托盘出库"
    showFooter
    width="85%"
    @ok="handleTrayOutStore"
    @cancel="emit('success')"
  >
    <BasicTable @register="registerTable" ref="table" />
    <TrayOutConfirmModal @register="registerTrayOutConfirmModal" @success="reload" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicModal, useModalInner, useModal } from '@/components/Modal';
  import { ref } from 'vue';
  import { BasicTable, useTable } from '@/components/Table';

  import { trayColumns } from '@/views/stockout/production-put-into/production-put-into.data';
  import { getTrayOutStoreList } from '@/api/stockout/production-put-into';
  import { useMessage } from '@/hooks/web/useMessage';

  import TrayOutConfirmModal from '@/views/stockout/production-put-into/TrayOutConfirmModal.vue';

  const orderNo = ref('');
  const selectedRow = ref<Recordable>([]);

  const emit = defineEmits(['success', 'register']);
  const { createMessage } = useMessage();
  const { warning } = createMessage;

  const [registerTrayOutConfirmModal, { openModal }] = useModal();

  const [registerTable, { reload, clearSelectedRowKeys }] = useTable({
    api: getTrayOutStoreList,
    columns: trayColumns,
    formConfig: {
      schemas: [
        {
          field: 'trayNo',
          label: '托盘编号',
          component: 'Input',
        },
      ],
    },
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    beforeFetch: (params) => {
      return {
        ...params,
        orderNo: orderNo.value,
      };
    },
    afterFetch: (data) => {
      clearSelectedRowKeys();
      return data;
    },
    size: 'small',
    clickToRowSelect: true,
    rowSelection: {
      type: 'checkbox',
      onChange: (_, selectedRows: any) => {
        selectedRow.value = selectedRows;
      },
    },
    striped: false,
    useSearchForm: true,
    pagination: false,
    showTableSetting: false,
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

    orderNo.value = data.record.orderNo;

    reload();
  });
  function selectRowsCheck() {
    if (selectedRow.value.length === 0) {
      warning('请先选择一条数据');
      return false;
    } else {
      return true;
    }
  }

  function handleTrayOutStore() {
    if (!selectRowsCheck()) return;

    openModal(true, {
      record: {
        dlvInfo: selectedRow.value,
        orderNo: orderNo.value,
        houseNo: selectedRow.value[0]?.houseNo,
      },
    });
  }
</script>
