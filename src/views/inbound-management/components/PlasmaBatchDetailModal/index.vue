<template>
  <BasicModal v-bind="$attrs" @register="register" title="验收详情" width="80%">
    <template #footer>
      <a-button @click="handleClose">关闭</a-button>
    </template>
    <BasicTable @register="registerTable">
      <template #verifyState="{ record }"> {{ PlasmaStateMap.get(record?.verifyState) }} </template>
    </BasicTable>
    <div class="absolute bottom-2 right-[35px] text-right">血浆总袋数：{{ verifyCount }}</div>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicTable, useTable } from '@/components/Table';
  import { columns, searchFormSchema } from './batch.data';
  import { ref } from 'vue';
  import { getPlasmaBag } from '@/api/inbound-management/accept-plasma';
  import { PlasmaStateMap } from '@/enums/plasmaEnum';

  const verifyCount = ref(0);
  const record = ref<Recordable>({});
  const emit = defineEmits(['close', 'register']);

  const [registerTable, { reload, getForm }] = useTable({
    api: getPlasmaBag,
    columns,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
      showResetButton: false,
    },
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    afterFetch: (data) => {
      verifyCount.value = data.length;
    },
    clickToRowSelect: true,
    clearSelectOnPageChange: true,
    size: 'small',
    striped: false,
    pagination: false,
    useSearchForm: true,

    tableSetting: {
      size: false,
      redo: false,
      setting: false,
    },
    bordered: true,
    showIndexColumn: false,
    immediate: false,
  });

  const [register, { closeModal }] = useModalInner(async (data) => {
    record.value = data.record;
    await getForm().setFieldsValue({
      stationName: data.record.stationName,
      batchNo: data.record.batchNo,
      boxNo: data.record.boxNo,
    });

    await reload({
      searchInfo: {
        ...getForm().getFieldsValue(),
      },
    });
  });

  function handleClose() {
    closeModal();
    if (getForm().getFieldsValue().boxNo) {
      emit('close', record.value);
    }
  }
</script>
