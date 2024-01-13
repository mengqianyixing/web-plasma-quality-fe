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
          <a-button type="primary" @click="handleConfirm">确认</a-button>
        </div>
      </template>
    </BasicTable>

    <SelectStationNameModal @register="registerSelectModal" @success="handleSelectSuccess" />
    <CallbackGenerationModal @register="registerGenerationModal" @success="handleSuccess" />
    <CallbackDetailModal @register="registerCallbackDetailModal" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';
  import { useModal } from '@/components/Modal';
  import { useMessage } from '@/hooks/web/useMessage';

  import CallbackGenerationModal from '@/views/callback/list-generation/CallbackGenerationModal.vue';
  import CallbackDetailModal from '@/views/callback/list-generation/CallbackDetailModal.vue';
  import SelectStationNameModal from '@/views/callback/list-generation/SelectStationNameModal.vue';

  import { ref, onMounted } from 'vue';

  import { columns, searchFormSchema } from './confirm.data';

  import { PageWrapper } from '@/components/Page';
  import { getCallbackListApi, stationNameList } from '@/api/callback/list-generation';
  import { CallbackStateMap } from '@/enums/callbackEnum';
  import { callbackConfirm } from '@/api/callback/list-confirm';

  defineOptions({ name: 'CallbackListGeneration' });

  const selectedRow = ref<Recordable>([]);
  const stationNames = ref<Recordable>({});

  const { createConfirm, createMessage } = useMessage();

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

  const [registerSelectModal] = useModal();

  const [registerGenerationModal, { openModal: openGenerationModal }] = useModal();
  const [registerCallbackDetailModal, { openModal: openCallbackDetailModal }] = useModal();

  const [registerTable, { getForm, reload }] = useTable({
    title: '回访名单确认列表',
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
    size: 'middle',
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
  });

  async function handleConfirm() {
    if (!selectedRow.value.length) {
      createMessage.warn('请选择要撤销的名单');
      return;
    }

    createConfirm({
      title: '确认',
      content: '名单确认后，会实时下发到各采浆公司，确认操作吗？',
      iconType: 'warning',
      onOk: async () => {
        await callbackConfirm({
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
    openGenerationModal(true, {
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
    openCallbackDetailModal(true, {
      ...record,
      stationName: formatStationNo(record),
      state: CallbackStateMap.get(record.state),
    });
  }
</script>
