<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    @fullscreen="redoHeight"
    title="本批详情"
    width="1000px"
    :minHeight="600"
  >
    <template #footer>
      <div class="absolute bottom-10px text-right">血浆总箱数：{{ verifyCount }}</div>
      <a-button @click="closeModal">关闭</a-button>
    </template>
    <div class="relative h-inherit max-h-inherit min-h-inherit">
      <div class="absolute w-full h-full">
        <BasicTable @register="registerTable">
          <template #verifyState="{ record }">
            {{ PlasmaStateMap.get(record?.verifyState) }}
          </template>
          <template #boxNo="{ record }">
            <span
              class="text-blue-500 underline cursor-pointer"
              @click.stop.self="handleGoPlasmaDetail(record)"
            >
              {{ record?.boxNo }}
            </span>
          </template>
        </BasicTable>
      </div></div
    >
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicTable, useTable } from '@/components/Table';
  import { columns, searchFormSchema } from './box.data';
  import { ref } from 'vue';
  import { getPlasmaBox } from '@/api/inbound-management/accept-plasma';
  import { PlasmaStateMap } from '@/enums/plasmaEnum';

  const verifyCount = ref(0);
  const stationNo = ref('');
  const batchNo = ref('');
  const emit = defineEmits(['success', 'register']);

  const [registerTable, { reload, getForm, redoHeight }] = useTable({
    api: getPlasmaBox,
    columns,
    isCanResizeParent: true,
    formConfig: {
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
    bordered: true,
    showIndexColumn: false,
    immediate: false,
  });

  const [register, { closeModal }] = useModalInner(async (data) => {
    stationNo.value = data.record.stationNo;
    batchNo.value = data.record.batchNo;

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

  function handleGoPlasmaDetail(record) {
    closeModal();
    emit('success', {
      ...record,
      stationNo: stationNo.value,
      batchNo: batchNo.value,
    });
  }
</script>
