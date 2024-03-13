<template>
  <BasicModal
    :centered="false"
    v-bind="$attrs"
    @register="registerModal"
    :title="modalTitle"
    :showOkBtn="false"
    cancelText="关闭"
    width="600px"
  >
    <BasicTable @register="registerTable">
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
  import { ref, onMounted } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { useTable, BasicTable } from '@/components/Table';
  import { modalCommonColumns, colMap } from './plasma-batch.data';
  import { DictionaryEnum, getSysDictionary } from '@/api/_dictionary';

  const bagNos = ref<any>([]);
  const modalTitle = ref<string>('');
  const modalColumns = ref<any[]>([]);
  const plasmaUnqualifiedDictionary = ref<Recordable[] | undefined>([]);
  const unProdReasonDictionary = ref<Recordable[] | undefined>([]);

  async function getUnqualifiedDictionary() {
    const dictionaryArr = await getSysDictionary([
      DictionaryEnum.PlasmaFailedReason,
      DictionaryEnum.unProdReason,
    ]);
    if (!dictionaryArr.length) return;

    plasmaUnqualifiedDictionary.value = dictionaryArr.find(
      (it) => it.dictNo === DictionaryEnum.PlasmaFailedReason,
    )?.dictImtes;

    unProdReasonDictionary.value = dictionaryArr.find(
      (it) => it.dictNo === DictionaryEnum.unProdReason,
    )?.dictImtes;
  }

  onMounted(() => {
    getUnqualifiedDictionary();
  });

  function formatUnReason(unqReason: string) {
    return plasmaUnqualifiedDictionary.value?.find((it) => it.id === unqReason)?.label ?? unqReason;
  }

  function formatProdReason(unqReason: string) {
    return unProdReasonDictionary.value?.find((it) => it.id === unqReason)?.label ?? unqReason;
  }
  const [registerTable, { reload }] = useTable({
    dataSource: bagNos,
    size: 'small',
    maxHeight: 300,
    columns: modalColumns,
    pagination: false,
    clickToRowSelect: false,
    rowKey: 'batchNo',
    useSearchForm: false,
    showTableSetting: false,
    bordered: true,
    showIndexColumn: true,

    canResize: true,
  });

  const [registerModal, { setModalProps }] = useModalInner(async (data) => {
    setModalProps({ confirmLoading: false });
    modalTitle.value = data.title + '详情';
    modalColumns.value = [...modalCommonColumns, ...colMap[data.type]];
    bagNos.value = data.content?.[data.type] || [];
    await reload();
  });
</script>
