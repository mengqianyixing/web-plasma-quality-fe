<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable">
      <template #unqReason="{ record }">
        {{ formatUnqReason(record?.unqReason) }}
      </template>
      <template #bagNo="{ record }">
        <span
          class="text-blue-500 underline cursor-pointer"
          @click.stop.self="handleBagNoClick(record)"
        >
          {{ record?.bagNo }}
        </span>
      </template>
      <template #stationNo="{ record }">
        {{ getStationNameById(record?.stationNo) }}
      </template>
      <template #toolbar>
        <a-button type="primary" @click="handlePickPlasma">挑浆</a-button>
        <a-button type="primary" @click="handleInStore">入库</a-button>
        <a-button type="primary" @click="handleCheck">审核</a-button>
        <a-button type="primary" @click="handleCancelCheck">取消审核</a-button>
      </template>
    </BasicTable>

    <PickPlasmaModal @register="registerPickModal" @success="handleSuccess" />
    <InStoreModal @register="registerInStoreModal" @success="handleSuccess" />
    <PlasmaDetailModal @register="registerDetailModal" />
  </PageWrapper>
</template>
<script setup lang="ts">
  import { BasicTable, useTable } from '@/components/Table';
  import { useModal } from '@/components/Modal';
  import { useMessage } from '@/hooks/web/useMessage';
  import { PageWrapper } from '@/components/Page';
  import { columns, searchSchema } from './manage.data';

  import { onMounted, ref, watchEffect } from 'vue';
  import {
    DictionaryItemKeyEnum,
    DictionaryReasonEnum,
    getSysSecondaryDictionary,
  } from '@/api/_dictionary';
  import {
    nonconformityCheck,
    nonconformityPlasmaList,
    nonconformityRedoCheck,
  } from '@/api/nonconformity/plasma-manage';

  import PickPlasmaModal from '@/views/nonconformity/plasma-manage/PickPlasmaModal.vue';
  import InStoreModal from '@/views/nonconformity/plasma-manage/InStoreModal.vue';
  import PlasmaDetailModal from '@/views/nonconformity/plasma-manage/PlasmaDetailModal.vue';
  import { useStation } from '@/hooks/common/useStation';

  const selectedRow = ref<Recordable>([]);
  const plasmaUnqualifiedDictionary = ref<Recordable[] | undefined>([]);

  const { createConfirm, createMessage } = useMessage();
  const { isLoading, stationOptions, getStationNameById } = useStation();

  onMounted(async () => {
    watchEffect(async () => {
      if (!isLoading) {
        await getForm().updateSchema({
          field: 'stationNo',
          componentProps: {
            options: stationOptions.value,
          },
        });
      }
    });

    plasmaUnqualifiedDictionary.value = await getSysSecondaryDictionary({
      dataKey: DictionaryReasonEnum.PlasmaFailedReason,
      dictItemTypes: [DictionaryItemKeyEnum.PlasmaFailed],
    });

    await getForm().updateSchema({
      field: 'unqReason',
      componentProps: {
        options: plasmaUnqualifiedDictionary.value.map((it) => ({
          label: it.label,
          value: it.value,
        })),
      },
    });
  });

  const [registerPickModal, { openModal: openPickModal }] = useModal();
  const [registerInStoreModal, { openModal: openInStoreModal }] = useModal();
  const [registerDetailModal, { openModal: openDetailModal }] = useModal();

  const [registerTable, { getForm, reload, clearSelectedRowKeys }] = useTable({
    api: nonconformityPlasmaList,
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    columns,
    size: 'small',
    useSearchForm: true,
    showTableSetting: false,
    bordered: true,
    clickToRowSelect: true,
    rowSelection: {
      type: 'radio',
      onChange: (_, selectedRows: any) => {
        selectedRow.value = selectedRows;
      },
    },
    formConfig: {
      schemas: searchSchema,
      transformDateFunc(date) {
        return date ? date.format('YYYY-MM-DD') : '';
      },
    },
    showIndexColumn: false,
    canResize: true,
  });

  function checkSelectedRows() {
    if (!selectedRow.value.length) {
      createMessage.warn('请选择一条记录');
      return false;
    }

    return true;
  }

  function handlePickPlasma() {
    openPickModal(true, {});
  }

  function handleInStore() {
    openInStoreModal(true, {});
  }

  function handleCheck() {
    if (!checkSelectedRows()) return;

    createConfirm({
      iconType: 'warning',
      title: '提示',
      content: '确定审核吗？',
      onOk: async () => {
        await nonconformityCheck(selectedRow.value[0]?.bagNo);

        await reload();
        clearSelectedRowKeys();
      },
    });
  }

  function handleCancelCheck() {
    if (!checkSelectedRows()) return;

    createConfirm({
      iconType: 'warning',
      title: '提示',
      content: '确定取消审核吗？',
      onOk: async () => {
        await nonconformityRedoCheck(selectedRow.value[0]?.bagNo);

        await reload();
        clearSelectedRowKeys();
      },
    });
  }

  function formatUnqReason(unqReason: string) {
    return (
      plasmaUnqualifiedDictionary.value?.find((it) => it.value === unqReason)?.label ?? unqReason
    );
  }

  function handleBagNoClick(record: Recordable) {
    openDetailModal(true, {
      record: {
        bagNo: record?.bagNo,
        plasmaUnqualifiedDictionary: plasmaUnqualifiedDictionary.value,
      },
    });
  }

  function handleSuccess() {
    clearSelectedRowKeys();
    reload();
  }
</script>
