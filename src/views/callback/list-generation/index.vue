<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable">
      <template #planNo="{ record }">
        <a-button type="link" @click="handlePlanNoClick(record)">
          {{ record?.planNo }}
        </a-button>
      </template>
      <template #stationNo="{ record }">
        {{ formatStationNo(record) }}
      </template>
      <template #toolbar>
        <div class="flex gap-2">
          <a-button type="primary" @click="handleAdd"> 新增 </a-button>
          <a-button type="primary" @click="handleDelete"> 撤销 </a-button>
        </div>
      </template>
    </BasicTable>

    <SelectStationNameModal @register="registerSelectModal" @success="handleSelectSuccess" />
    <CallbackGenerationDrawer @register="registerGenerationDrawer" @success="handleSuccess" />
    <CallbackDetailDrawer @register="registerCallbackDetailDrawer" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';
  import { useModal } from '@/components/Modal';
  import { useDrawer } from '@/components/Drawer';
  import { useMessage } from '@/hooks/web/useMessage';

  import CallbackGenerationDrawer from '@/views/callback/list-generation/CallbackGenerationDrawer.vue';
  import CallbackDetailDrawer from '@/views/callback/list-generation/CallbackDetailDrawer.vue';
  import SelectStationNameModal from '@/views/callback/list-generation/SelectStationNameModal.vue';

  import { ref, onMounted } from 'vue';

  import { columns, searchFormSchema } from './generation.data';

  import { PageWrapper } from '@/components/Page';
  import {
    deleteCallback,
    getCallbackListApi,
    stationNameList,
  } from '@/api/callback/list-generation';
  import { CallbackStateMap } from '@/enums/callbackEnum';

  defineOptions({ name: 'CallbackListGeneration' });

  const selectedRow = ref<Recordable>([]);
  const stationNames = ref<Recordable>({});

  const { createConfirm } = useMessage();

  onMounted(async () => {
    stationNames.value = await stationNameList();
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

  const [registerSelectModal, { openModal }] = useModal();

  const [registerGenerationDrawer, { openDrawer: openGenerationDrawer }] = useDrawer();
  const [registerCallbackDetailDrawer, { openDrawer: openCallbackDetailDrawer }] = useDrawer();

  const [registerTable, { getForm, reload }] = useTable({
    title: '回访名单生成列表',
    api: getCallbackListApi,
    columns,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
      transformDateFunc(date) {
        return date ? date.format('YYYY-MM-DD') : '';
      },
    },
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    clickToRowSelect: false,
    rowSelection: {
      type: 'checkbox',
      onChange: (_, selectedRows: any) => {
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
  });

  function handleAdd() {
    openModal(true, {
      record: {
        options: stationNames.value.map((it) => ({
          label: it.stationName,
          value: it.stationNo,
        })),
      },
    });
  }

  async function handleDelete() {
    createConfirm({
      title: '确认',
      content: '确认撤销选中的名单吗？',
      iconType: 'warning',
      onOk: async () => {
        await deleteCallback({
          callbackBatchNoes: selectedRow.value.map((it) => it.planNo),
        });
        await reload();
      },
    });
  }

  function handleSuccess() {
    reload();
  }

  function formatStationNo(record: Recordable) {
    return stationNames.value.find((it) => it.stationNo === record.stationNo)?.stationName;
  }

  function handleSelectSuccess(id: string) {
    openGenerationDrawer(true, {
      isUpdate: false,
      reload: true,
      record: {
        options: stationNames.value.map((it) => ({
          label: it.stationName,
          value: it.stationNo,
        })),
        stationNo: id,
      },
    });
  }

  function handlePlanNoClick(record: Recordable) {
    openCallbackDetailDrawer(true, {
      ...record,
      stationName: formatStationNo(record),
      state: CallbackStateMap.get(record.state),
    });
  }
</script>
