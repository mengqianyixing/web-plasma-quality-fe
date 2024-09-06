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
    <CheckItemModal @register="registerCIModal" @confirm="confirm" />
  </PageWrapper>
</template>
<script setup lang="ts">
  import { BasicTable, useTable } from '@/components/Table';
  import { PageWrapper } from '@/components/Page';
  import { useModal } from '@/components/Modal';
  import { useMessage } from '@/hooks/web/useMessage';
  import { columns, searchReleaseSchema } from './release.data';
  import { getSampleBatchesList } from '@/api/sample-manage/sample-release';

  import UnqualifiedModal from '@/views/sample-manage/sample-release/unqualifiedModal.vue';
  import { onMounted, ref, watchEffect } from 'vue';
  import { useStation } from '@/hooks/common/useStation';
  import { SampleManageButtonEnum } from '@/enums/authCodeEnum';
  import CheckItemModal from './checkItemDrawer.vue';
  import { sampleVerifyStatusValueEnum } from '@/enums/sampleEnum';

  defineOptions({ name: 'SampleRelease' });

  const { createMessage } = useMessage();

  const [registerUnqualifiedModal, { openModal: openUnqualifiedModal }] = useModal();
  const [registerCIModal, { openModal: openCIModal }] = useModal();

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

  function confirm() {
    reload();
    clearSelectedRowKeys();
  }
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
    const row = selectedRow.value[0];
    if (sampleVerifyStatusValueEnum.S !== row.verifyState) {
      createMessage.warning('请选择已验收的样本');
      return;
    }
    openCIModal(true, { ...row, bsNo: row.batchSampleNo });
  }
</script>
