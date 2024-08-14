<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="样本批次列表"
    width="1000px"
    :min-height="600"
    @ok="handleSelect"
    @fullscreen="redoHeight"
  >
    <div class="relative h-inherit max-h-inherit min-h-inherit">
      <div class="absolute flex flex-col w-full h-full">
        <BasicTable @register="registerTable">
          <template #sampleType="{ record }">
            {{ formatSampleType(record?.sampleType) }}
          </template>
        </BasicTable>
      </div>
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
  } from '@/views/sample-manage/sample-receive/receive.data';
  import { useMessage } from '@/hooks/web/useMessage';
  import { sampleTypeEnum } from '@/enums/sampleEnum';

  const emit = defineEmits(['success', 'register']);

  const selectedRow = ref<Recordable>([]);
  const { createMessage } = useMessage();
  const { warning } = createMessage;

  const [registerTable, { reload, setSelectedRowKeys, clearSelectedRowKeys, redoHeight }] =
    useTable({
      api: getSampleReceiveList,
      columns: sampleAcceptColumns,
      formConfig: {
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
      clickToRowSelect: true,
      clearSelectOnPageChange: true,
      rowSelection: {
        type: 'radio',
        onChange: (keys, selectedRows: any) => {
          if (keys.length === 1 && selectedRows[0].sampleType !== sampleTypeEnum.CallbackSample) {
            warning('只能选择回访样本批次');

            setSelectedRowKeys(selectedRow.value.map((it) => it.key));

            return;
          }
          selectedRow.value = selectedRows;
        },
      },
      size: 'small',
      striped: false,
      useSearchForm: true,
      bordered: true,
      showIndexColumn: false,
      inset: true,
      isCanResizeParent: true,
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
    clearSelectedRowKeys();
    closeModal();
  }

  function formatSampleType(value: string) {
    return sampleType.value.length !== 0
      ? sampleType.value.find((it) => it.value === value)?.label
      : value;
  }
</script>
