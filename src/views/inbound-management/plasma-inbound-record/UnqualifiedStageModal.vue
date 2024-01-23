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
  import { BasicModal, useModalInner, useModal } from '@/components/Modal';
  import { onMounted, ref } from 'vue';
  import { BasicTable, useTable } from '@/components/Table';
  import { unqualifiedColumns } from './record.data';
  import { useMessage } from '@/hooks/web/useMessage';
  import { nonconformityPlasmaList } from '@/api/nonconformity/plasma-manage';
  import {
    nonconformityPlasmaMap,
    NonconformityPlasmaStatusValueEnum,
  } from '@/enums/nonconforityEnum';
  import { DictionaryEnum, getSysDictionary } from '@/api/_dictionary';

  import PickBatchModal from './PickBatchModal.vue';

  const selectedRow = ref<Recordable>([]);
  const { createMessage } = useMessage();
  const { warning } = createMessage;

  const [registerPickBatch, { openModal }] = useModal();

  const plasmaUnqualifiedDictionary = ref<Recordable[] | undefined>([]);
  onMounted(async () => {
    const dictionaryArr = await getSysDictionary([DictionaryEnum.PlasmaUnqualifiedReason]);

    if (!dictionaryArr) return;

    plasmaUnqualifiedDictionary.value = dictionaryArr.find(
      (it) => it.dictNo === DictionaryEnum.PlasmaUnqualifiedReason,
    )?.dictImtes;
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
            options: [...nonconformityPlasmaMap].map(([value, label]) => ({ value, label })),
          },
          defaultValue: NonconformityPlasmaStatusValueEnum.REG,
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
    return plasmaUnqualifiedDictionary.value?.find((it) => it.value === unqReason)?.label;
  }

  function handlePickSuccess() {
    reload({
      searchInfo: {
        ...getForm().getFieldsValue(),
      },
    });
  }
</script>
