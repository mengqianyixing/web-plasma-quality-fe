<template>
  <BasicModal v-bind="$attrs" @register="register" title="不合格暂存" width="80%" @ok="handleOk">
    <BasicTable @register="registerTable">
      <template #unqReason="{ record }">
        {{ formatUnReason(record?.unqReason) }}
      </template>
    </BasicTable>
  </BasicModal>

  <PickBatchModal @register="registerPickBatch" @success="handlePickSuccess" />
</template>
<script lang="ts" setup>
  import { BasicModal, useModal, useModalInner } from '@/components/Modal';
  import { onMounted, ref } from 'vue';
  import { BasicTable, useTable } from '@/components/Table';
  import { unqualifiedColumns } from './record.data';
  import { useMessage } from '@/hooks/web/useMessage';
  import { nonconformityPlasmaList } from '@/api/nonconformity/plasma-manage';
  import { useServerEnumStoreWithOut } from '@/store/modules/serverEnums';
  import { SERVER_ENUM } from '@/enums/serverEnum';
  import {
    DictionaryItemKeyEnum,
    DictionaryReasonEnum,
    getSysSecondaryDictionary,
  } from '@/api/_dictionary';

  import PickBatchModal from './PickBatchModal.vue';

  const serverEnumStore = useServerEnumStoreWithOut();

  const selectedRow = ref<Recordable>([]);
  const { createMessage } = useMessage();
  const { warning } = createMessage;

  const [registerPickBatch, { openModal }] = useModal();

  const plasmaUnqualifiedDictionary = ref<Recordable[] | undefined>([]);
  onMounted(async () => {
    plasmaUnqualifiedDictionary.value = await getSysSecondaryDictionary({
      dataKey: DictionaryReasonEnum.PlasmaFailedReason,
      dictItemTypes: [
        DictionaryItemKeyEnum.PlasmaAccept,
        DictionaryItemKeyEnum.SampleAccept,
        DictionaryItemKeyEnum.PlasmaFailed,
        DictionaryItemKeyEnum.SampleFailed,
        DictionaryItemKeyEnum.Sample,
        DictionaryItemKeyEnum.Track,
        DictionaryItemKeyEnum.Test,
        DictionaryItemKeyEnum.Quarantine,
        DictionaryItemKeyEnum.Other,
      ],
    });
  });

  const [registerTable, { reload, getForm }] = useTable({
    api: nonconformityPlasmaList,
    columns: unqualifiedColumns,
    beforeFetch: (params) => {
      return {
        ...params,
        currPage: 1,
        pageSize: 999,
      };
    },
    formConfig: {
      showResetButton: false,
      labelWidth: 120,
      schemas: [
        {
          field: 'batchNo',
          label: '血浆批号',
          component: 'Input',
        },
        {
          field: 'state',
          label: '状态',
          component: 'Select',
          componentProps: {
            options: serverEnumStore.getServerEnum(SERVER_ENUM.UnquaState),
          },
          defaultValue: 'PIK',
        },
        {
          field: 'flow',
          label: '标志',
          component: 'Input',
          defaultValue: 'PCP',
          show: false,
        },
      ],
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
        selectedRow.value = selectedRows;
      },
    },
    size: 'small',
    striped: false,
    useSearchForm: true,
    bordered: true,
    showIndexColumn: false,
    canResize: false,
    immediate: false,
    pagination: false,
  });

  const [register] = useModalInner(async (data) => {
    await getForm().setFieldsValue({
      batchNo: data.record.batchNo,
    });

    await reload({
      searchInfo: {
        ...getForm().getFieldsValue(),
      },
    });
  });

  function handleOk() {
    if (!selectedRow.value.length) {
      warning('请选择一条数据');
      return;
    }

    openModal(true, {
      record: {
        bagNos: selectedRow.value,
      },
    });
  }

  function formatUnReason(unqReason: string) {
    return (
      plasmaUnqualifiedDictionary.value?.find((it) => it.value === unqReason)?.label ?? unqReason
    );
  }

  function handlePickSuccess() {
    reload({
      searchInfo: {
        ...getForm().getFieldsValue(),
      },
    });
  }
</script>
