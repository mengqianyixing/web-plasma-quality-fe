<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="样本批次列表"
    width="80%"
    :minHeight="600"
    @ok="handleSelect"
  >
    <div class="relative h-inherit max-h-inherit min-h-inherit">
      <div class="absolute flex flex-col w-full h-full">
        <BasicTable @register="registerTable">
          <template #sampleType="{ record }">
            {{ formatSampleType(record?.sampleType) }}
          </template>
        </BasicTable>
      </div>
      <div class="absolute bottom-5px flex gap-2 ml-4">
        <div>未验收批次数: {{ waitVerifyBatchCount }}</div>
        <div>未验收样本数: {{ waitVerifySampleCount }}</div>
      </div>
    </div>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { ref } from 'vue';
  import { BasicTable, useTable } from '@/components/Table';
  import {
    sampleVerifyColumns,
    searchFormSchema,
  } from '@/views/sample-manage/sample-verify/verify.data';
  import { useMessage } from '@/hooks/web/useMessage';
  import { getSampleVerifyList } from '@/api/inbound-management/sample-verify';
  import { sampleTypeEnum } from '@/enums/sampleEnum';
  import { GetApiCoreBatchSampleVerifyResponse } from '@/api/type/batchManage';

  const emit = defineEmits(['success', 'register']);

  const selectedRow = ref<Recordable>([]);
  const { createMessage } = useMessage();
  const { warning } = createMessage;

  const waitVerifyBatchCount = ref(0);
  const waitVerifySampleCount = ref(0);
  const [registerTable, { reload, getRawDataSource, setSelectedRowKeys, clearSelectedRowKeys }] =
    useTable({
      api: getSampleVerifyList,
      columns: sampleVerifyColumns,
      formConfig: {
        labelWidth: 120,
        schemas: searchFormSchema,
      },
      afterFetch(data) {
        const originData: GetApiCoreBatchSampleVerifyResponse = getRawDataSource();
        waitVerifySampleCount.value = originData.result![0].waitVerifySampleCount!;
        waitVerifyBatchCount.value = originData.result![0].waitVerifyBatchCount!;
        return data;
      },
      fetchSetting: {
        pageField: 'currPage',
        sizeField: 'pageSize',
        totalField: 'totalCount',
        listField: 'result',
      },
      clickToRowSelect: true,
      rowSelection: {
        type: 'radio',
        onChange: (keys, selectedRows: any) => {
          if (
            keys.length === 1 &&
            selectedRows[0].sampleType !== sampleTypeEnum.CallbackSample &&
            selectedRows[0].sampleType !== sampleTypeEnum.PlasmaSample
          ) {
            warning('只能选择回访样本批次或血浆样本批次');

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
      isCanResizeParent: true,
      inset: false,
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
