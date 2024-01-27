<!--
 * @Descripttion:
 * @version:
 * @Author: zcc
 * @Date: 2024-01-12 18:31:46
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-22 17:59:05
-->
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
        {{ formatStationNo(record?.stationNo) }}
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

  import { onMounted, ref } from 'vue';
  import { stationNameList } from '@/api/callback/list-generation';
  import {
    DictionaryEnum,
    DictionaryItemKeyEnum,
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

  const selectedRow = ref<Recordable>([]);
  const stationNames = ref<Recordable>({});
  const plasmaUnqualifiedDictionary = ref<Recordable[] | undefined>([]);

  const { createConfirm } = useMessage();

  onMounted(async () => {
    stationNames.value = await stationNameList();

    plasmaUnqualifiedDictionary.value = await getSysSecondaryDictionary({
      dataKey: DictionaryEnum.PlasmaFailedItem,
      dictNos: [
        DictionaryItemKeyEnum.Accept,
        DictionaryItemKeyEnum.Track,
        DictionaryItemKeyEnum.Test,
        DictionaryItemKeyEnum.Quarantine,
        DictionaryItemKeyEnum.Other,
      ],
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

    await getForm().updateSchema({
      field: 'stationNo',
      componentProps: {
        options: stationNames.value.map((it) => ({
          label: it.stationName,
          value: it.stationNo,
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

  function handlePickPlasma() {
    openPickModal(true, {});
  }

  function handleInStore() {
    openInStoreModal(true, {});
  }

  function handleCheck() {
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

  function formatStationNo(stationNo: string) {
    return stationNames.value.find((it) => it.stationNo === stationNo)?.stationName;
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
