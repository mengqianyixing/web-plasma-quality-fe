<template>
  <BasicModal v-bind="$attrs" @register="register" title="样本批次列表" width="80%">
    <div>
      <BasicTable @register="registerTable">
        <template #sampleType="{ record }">
          {{ formatSampleType(record?.sampleType) }}
        </template>
        <template #toolbar>
          <a-button type="primary" @click="handleSelect">选择</a-button>
        </template>
      </BasicTable>
    </div>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { ref } from 'vue';
  import { BasicTable, useTable } from '@/components/Table';
  import { getSampleReceiveList } from '@/api/inbound-management/sample-receive';
  import {
    sampleAcceptColumns,
    searchFormSchema,
  } from '@/views/inbound-management/sample-receive/receive.data';
  import { useMessage } from '@/hooks/web/useMessage';
  import { sampleTypeEnum } from '@/enums/sampleEnum';

  const emit = defineEmits(['success', 'register']);

  const selectedRow = ref<Recordable>([]);
  const { createMessage } = useMessage();
  const { warning } = createMessage;

  const [registerTable, { reload, setSelectedRowKeys }] = useTable({
    title: '样本批次列表',
    api: getSampleReceiveList,
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
    clickToRowSelect: true,
    clearSelectOnPageChange: true,
    rowSelection: {
      type: 'checkbox',
      onChange: (keys, selectedRows: any) => {
        if (keys.length > 1) {
          warning('只能选择一条数据');

          setSelectedRowKeys(selectedRow.value.map((it) => it.key));

          return;
        }

        if (keys.length === 1 && selectedRows[0].sampleType !== sampleTypeEnum.CallbackSample) {
          warning('只能选择回访样本批次');

          setSelectedRowKeys(selectedRow.value.map((it) => it.key));

          return;
        }
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
    showIndexColumn: false,
    canResize: false,
    immediate: false,
  });

  const sampleType = ref<Recordable[]>([]);

  const [register, { closeModal }] = useModalInner((data) => {
    if (data.reload) reload();

    sampleType.value = data.record.sampleType;
  });

  function handleSelect() {
    if (selectedRow.value.length === 0) {
      createMessage.warn('请选择一条数据');
      return;
    }
    emit('success', selectedRow.value[0]);
    closeModal();
  }

  function formatSampleType(value: string) {
    return sampleType.value.length !== 0
      ? sampleType.value.find((it) => it.value === value)?.label
      : value;
  }
</script>
