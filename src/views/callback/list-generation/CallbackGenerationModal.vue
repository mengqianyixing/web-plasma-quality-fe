<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    :title="getTitle"
    showFooter
    width="85%"
    @close="handleCancel"
  >
    <BasicTable @register="registerTable" ref="table">
      <template #toolbar>
        <a-button type="primary" @click="handleAdd">新增</a-button>
        <a-button type="primary" @click="handleDelete">撤销</a-button>
      </template>
    </BasicTable>

    <template #footer>
      <a-button type="primary" @click="handleOk">确定</a-button>
    </template>

    <AddCallbackPersonnelListModal @register="registerAddModal" @success="reload" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicModal, useModal, useModalInner } from '@/components/Modal';
  import { computed, ref, unref } from 'vue';
  import { BasicTable, useTable } from '@/components/Table';
  import { useMessage } from '@/hooks/web/useMessage';

  import AddCallbackPersonnelListModal from '@/views/callback/list-generation/AddCallbackPersonnelListModal.vue';
  import {
    callbackModalSearchFromSchema,
    callbackModalColumns,
  } from '@/views/callback/list-generation/generation.data';
  import { getCallbackDetail, revokeCallback } from '@/api/callback/list-generation';
  import dayjs from 'dayjs';

  const emit = defineEmits(['success', 'register']);

  const selectedRow = ref<Recordable>([]);
  const isUpdate = ref(false);
  const stationNo = ref('');
  const batchNo = ref('');

  const { createConfirm } = useMessage();

  const [registerTable, { reload }] = useTable({
    title: '样本批次列表',
    api: getCallbackDetail,
    columns: callbackModalColumns,
    formConfig: {
      showAdvancedButton: false,
      labelWidth: 150,
      schemas: callbackModalSearchFromSchema,
      transformDateFunc(date) {
        return dayjs(date).format('YYYY-MM-DD');
      },
    },
    pagination: false,
    beforeFetch: (params) => {
      return {
        ...params,
        batchNo: batchNo.value,
      };
    },
    rowKey: 'donorNo',
    clickToRowSelect: true,
    rowSelection: {
      type: 'checkbox',
      onChange: (_, selectedRows: any) => {
        selectedRow.value = selectedRows;
      },
    },
    size: 'large',
    striped: false,
    useSearchForm: true,
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
  });

  const getTitle = computed(() => (unref(isUpdate) ? '编辑名单' : '生成名单'));

  const table = ref(null);
  const [registerAddModal, { openModal }] = useModal();
  const [register, { setModalProps, closeModal }] = useModalInner((data) => {
    setModalProps({
      maskClosable: false,
    });

    isUpdate.value = data.isUpdate;
    stationNo.value = data.record.stationNo;
    batchNo.value = data.record.batchNo;

    reload();
  });

  async function handleAdd() {
    openModal(true, {
      reload: true,
      record: {
        stationNo: stationNo.value,
        batchNo: batchNo.value,
      },
    });
  }

  async function handleDelete() {
    createConfirm({
      iconType: 'warning',
      title: '确认',
      content: '确认撤消选中名单吗？',
      onOk: async () => {
        await revokeCallback({
          batchNo: batchNo.value,
          donorNos: selectedRow.value.map((it) => it.donorNo),
        });

        await reload();

        emit('success');
      },
    });
  }

  function handleOk() {
    emit('success');
    closeModal();
  }

  function handleCancel() {
    emit('success');
    closeModal();
  }
</script>
