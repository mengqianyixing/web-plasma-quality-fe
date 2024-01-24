<template>
  <BasicModal
    :centered="false"
    v-bind="$attrs"
    @register="registerModal"
    :title="modalTitle"
    @ok="handleSubmit"
  >
    <BasicTable @register="registerTable">
      <template #stationNo="{ record }">
        {{ getStationNameById(record?.stationNo) }}
      </template>
      <template #unqReason="{ record }">
        {{ formatUnReason(record?.fkFailedCode) }}
      </template>
      <template #prodReason="{ record }">
        {{ formatProdReason(record?.fkUnProdCode) }}
      </template>
    </BasicTable>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, onMounted, watchEffect } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { useStation } from '@/hooks/common/useStation';
  import { useTable, BasicTable } from '@/components/Table';
  import { modalFailDetailColumns, modalUnProductionDetailColumns } from './plasma-batch.data';
  // import { useMessage } from '@/hooks/web/useMessage';
  import { DictionaryEnum, getSysDictionary } from '@/api/_dictionary';

  const emit = defineEmits(['success', 'register']);
  const { isLoading, stationOptions, getStationNameById } = useStation();
  const bagNos = ref<any>([]);
  const modalTitle = ref<string>('');
  const modalColumns = ref<any[]>([]);
  // const { createMessage } = useMessage();
  const plasmaUnqualifiedDictionary = ref<Recordable[] | undefined>([]);
  const unProdReasonDictionary = ref<Recordable[] | undefined>([]);

  async function getUnqualifiedDictionary() {
    const dictionaryArr = await getSysDictionary([
      DictionaryEnum.PlasmaUnqualifiedReason,
      DictionaryEnum.unProdReason,
    ]);

    if (!dictionaryArr) return;

    plasmaUnqualifiedDictionary.value = dictionaryArr.find(
      (it) => it.dictNo === DictionaryEnum.PlasmaUnqualifiedReason,
    )?.dictImtes;
    unProdReasonDictionary.value = dictionaryArr.find(
      (it) => it.dictNo === DictionaryEnum.unProdReason,
    )?.dictImtes;
  }

  onMounted(() => {
    watchEffect(() => {
      if (!isLoading) {
        getForm()?.updateSchema({
          field: 'stationNo',
          componentProps: {
            options: stationOptions.value,
          },
        });
      }
    });

    getUnqualifiedDictionary();
  });

  function formatUnReason(unqReason: string) {
    return plasmaUnqualifiedDictionary.value?.find((it) => it.value === unqReason)?.label;
  }

  function formatProdReason(unqReason: string) {
    return unProdReasonDictionary.value?.find((it) => it.value === unqReason)?.label;
  }
  const [registerTable, { reload, getForm }] = useTable({
    dataSource: bagNos,
    size: 'small',
    maxHeight: 300,
    columns: modalColumns,
    clickToRowSelect: false,
    rowKey: 'batchNo',
    useSearchForm: false,
    showTableSetting: false,
    bordered: true,
    showIndexColumn: true,
    tableSetting: {
      size: false,
      redo: false,
      setting: false,
    },
    canResize: true,
  });

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    setModalProps({ confirmLoading: false });
    switch (data.type) {
      case 'unProductionCount':
        modalTitle.value = '非生产出库转移血浆详情';
        bagNos.value = data?.content?.unProductionBag ?? [];
        modalColumns.value = modalUnProductionDetailColumns;
        break;
      case 'failedCount':
        modalTitle.value = '不合格血浆详情';
        bagNos.value = data?.content?.failedBag ?? [];
        modalColumns.value = modalFailDetailColumns;
        break;
    }
    reload();
  });

  async function handleSubmit() {
    closeModal();
    emit('success');
  }
</script>
