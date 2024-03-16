<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    :title="getTitle"
    width="85%"
    showFooter
    @ok="handleOk"
    @cancel="clearSelectedRowKeys"
  >
    <BasicTable @register="registerTable" ref="table" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { computed, ref, unref } from 'vue';
  import { BasicTable, useTable } from '@/components/Table';
  import { useMessage } from '@/hooks/web/useMessage';

  import {
    callbackModalColumns,
    addCallbackModalSearchFromSchema,
  } from '@/views/callback/list-generation/generation.data';
  import { generateCallback, getNeedCallbackList } from '@/api/callback/list-generation';
  import dayjs, { Dayjs } from 'dayjs';
  import { getSysParamsByParamKey } from '@/api/systemServer/params';

  const emit = defineEmits(['success', 'register']);

  const selectedRow = ref<string[]>([]);
  const isUpdate = ref(false);
  const stationNo = ref('');

  const [registerTable, { setSelectedRowKeys, reload, clearSelectedRowKeys, getForm }] = useTable({
    api: getNeedCallbackList,
    columns: callbackModalColumns,
    beforeFetch: (params) => {
      return {
        ...params,
        stationNo: stationNo.value,
        batchNo: batchNo.value,
      };
    },
    formConfig: {
      showAdvancedButton: false,
      schemas: addCallbackModalSearchFromSchema,
      transformDateFunc(date) {
        return dayjs(date).format('YYYY-MM-DD');
      },
    },
    afterFetch: (data) => {
      const allDonorNos = data.map((it) => it.donorNo);
      selectedRow.value = allDonorNos;
      setSelectedRowKeys(allDonorNos);
    },
    rowKey: 'donorNo',
    clickToRowSelect: true,
    rowSelection: {
      type: 'checkbox',
      onChange: (selectedRowKeys: any) => {
        selectedRow.value = selectedRowKeys;
      },
    },
    size: 'small',
    striped: false,
    useSearchForm: true,

    bordered: true,
    showIndexColumn: true,
    indexColumnProps: {
      width: 80,
    },
    immediate: false,
    pagination: false,
    canResize: false,
  });

  const getTitle = computed(() => (unref(isUpdate) ? '编辑名单' : '选择名单'));

  const table = ref(null);
  const batchNo = ref('');
  const [register, { closeModal, setModalProps }] = useModalInner(async (data) => {
    setModalProps({
      maskClosable: false,
    });

    isUpdate.value = data.isUpdate;
    stationNo.value = data.record.stationNo;
    batchNo.value = data.record.batchNo;

    const gapDays = await getSysParamsByParamKey('callbackGapDays');

    await getForm().updateSchema({
      field: '[minCollectTime, maxCollectTime]',
      defaultValue: [
        dayjs().subtract(1, 'year').add(1, 'day').format('YYYY-MM-DD'),
        dayjs().subtract(gapDays, 'day').format('YYYY-MM-DD'),
      ],
      componentProps: {
        disabledDate: (current: Dayjs) => {
          return (
            !current.isAfter(dayjs().subtract(1, 'year').add(1, 'day')) ||
            current.isAfter(dayjs().subtract(gapDays, 'day'))
          );
        },
      },
    });

    await reload();
  });

  const { createConfirm } = useMessage();

  async function handleOk() {
    createConfirm({
      title: '确认',
      content: `名单共有${selectedRow.value.length}位浆员待回访，确认添加吗？`,
      iconType: 'warning',
      onOk: async () => {
        await generateCallback({
          batchNo: batchNo.value,
          donorNos: selectedRow.value,
        });

        emit('success');
        closeModal();
      },
    });
  }
</script>
