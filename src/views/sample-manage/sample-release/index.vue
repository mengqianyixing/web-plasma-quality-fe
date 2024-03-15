<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable">
      <template #unqualifiedCount="{ record }">
        <span
          v-if="record.unqualifiedCount"
          class="text-blue-500 underline cursor-pointer"
          @click.stop.self="handleOpenUnqualifiedDrawer(record.batchSampleNo)"
        >
          {{ record?.unqualifiedCount }}
        </span>
        <span v-else>-</span>
      </template>
      <template #toolbar>
        <a-button
          type="primary"
          @click="handleRelease"
          v-auth="SampleManageButtonEnum.SampleRelease"
          >发布
        </a-button>
      </template>
    </BasicTable>

    <UnqualifiedModal @register="registerUnqualifiedModal" />
  </PageWrapper>
</template>
<script setup lang="ts">
  import { BasicTable, useTable } from '@/components/Table';
  import { PageWrapper } from '@/components/Page';
  import { useModal } from '@/components/Modal';
  import { useMessage } from '@/hooks/web/useMessage';
  import { columns, searchReleaseSchema } from './release.data';
  import { getSampleBatchesList, sampleRelease } from '@/api/sample-manage/sample-release';

  import UnqualifiedModal from '@/views/sample-manage/sample-release/unqualifiedModal.vue';
  import { onMounted, ref, watchEffect } from 'vue';
  import { useStation } from '@/hooks/common/useStation';
  import { SampleManageButtonEnum } from '@/enums/authCodeEnum';

  defineOptions({ name: 'SampleRelease' });

  const { createMessage, createConfirm } = useMessage();

  const [registerUnqualifiedModal, { openModal: openUnqualifiedModal }] = useModal();

  const selectedRow = ref<Recordable>([]);

  const { stationOptions } = useStation();

  onMounted(async () => {
    watchEffect(async () => {
      await getForm().updateSchema({
        field: 'stationNo',
        componentProps: {
          options: stationOptions,
        },
      });
    });
  });

  const [registerTable, { getForm, reload, clearSelectedRowKeys }] = useTable({
    api: getSampleBatchesList,
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
      schemas: searchReleaseSchema,
      transformDateFunc(date) {
        return date ? date.format('YYYY-MM-DD') : '';
      },
    },
    showIndexColumn: false,
    canResize: true,
  });

  function handleOpenUnqualifiedDrawer(batchSampleNo: string) {
    openUnqualifiedModal(true, {
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
