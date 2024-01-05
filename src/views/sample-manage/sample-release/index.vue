<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable">
      <template #unqualifiedCount="{ record }">
        <span
          class="text-blue-500 underline cursor-pointer"
          @click.stop.self="handleOpenUnqualifiedDrawer(record)"
        >
          {{ record?.batchSampleNo }}
        </span>
      </template>
      <template #toolbar>
        <a-button type="primary" @click="handleRelease">发布</a-button>
      </template>
    </BasicTable>

    <UnqualifiedDrawer @register="registerUnqualifiedDrawer" />
  </PageWrapper>
</template>
<script setup lang="ts">
  import { BasicTable, useTable } from '@/components/Table';
  import { PageWrapper } from '@/components/Page';
  import { useDrawer } from '@/components/Drawer';
  import { useMessage } from '@/hooks/web/useMessage';
  import { columns, searchReleaseSchema } from './release.data';
  import { getSampleBatchesList, sampleRelease } from '@/api/sample-manage/sample-release';

  import UnqualifiedDrawer from '@/views/sample-manage/sample-release/unqualifiedDrawer.vue';
  import { onMounted, ref } from 'vue';
  import { stationNameList } from '@/api/callback/list-generation';

  const { createMessage, createConfirm } = useMessage();

  const [registerUnqualifiedDrawer, { openDrawer: openUnqualifyiedDrawer }] = useDrawer();

  const selectedRow = ref<Recordable>([]);
  const stationNames = ref<Recordable>({});

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

  const [registerTable, { getForm, reload, clearSelectedRowKeys }] = useTable({
    title: '样本发布列表',
    api: getSampleBatchesList,
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    columns,
    size: 'large',
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
      alwaysShowLines: 3,
      labelWidth: 120,
      schemas: searchReleaseSchema,
      transformDateFunc(date) {
        return date ? date.format('YYYY-MM-DD') : '';
      },
    },
    canResize: true,
  });

  function handleOpenUnqualifiedDrawer(batchSampleNo: string) {
    openUnqualifyiedDrawer(true, {
      record: {
        batchSampleNo,
      },
    });
  }

  async function handleRelease() {
    if (selectedRow.value.length === 0) {
      createMessage.warning('请选择需要发布的样本');
      return;
    }

    createConfirm({
      title: '确认',
      content: '此操作不可回退，请确认是否发布？',
      iconType: 'warning',
      onOk: async () => {
        await sampleRelease({
          batchSampleNo: selectedRow.value[0]?.batchSampleNo,
        });

        clearSelectedRowKeys();
        await reload();
      },
    });
  }
</script>
