<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    showFooter
    title="标签历史"
    width="1000px"
    @ok="handleSubmit"
  >
    <BasicTable @register="registerTable">
      <template #bodyCell="{ record, column }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                label: '预览',
                onClick: handlePreview.bind(null, record),
              },
              {
                label: '重用',
                popConfirm: {
                  title: '是否重用该样式',
                  placement: 'left',
                  confirm: handleReuse.bind(null, record),
                },
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>

    <HistoryStylePreviewModal @register="registerPreviewModal" />
  </BasicModal>
</template>

<script setup lang="ts">
  import { BasicModal, useModalInner, useModal } from '@/components/Modal';
  import { BasicTable, TableAction, useTable } from '@/components/Table';
  import { ref } from 'vue';
  import { historyStyle, historyStylePreview, reuseStyle } from '@/api/tag/manage';
  import { columnsHistory, searchHistoryFormSchema } from '@/views/tag-manage/style/style.data';

  import HistoryStylePreviewModal from './HistoryStylePreviewModal.vue';

  const hisNo = ref('');

  const [registerPreviewModal, { openModal: openPreviewModal }] = useModal();
  const emit = defineEmits(['success']);

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    setModalProps({ confirmLoading: false });
    hisNo.value = data.record.tagNo;
    reload();
    await getForm().updateSchema({
      field: 'labelType',
      componentProps: {
        options: data.labelTypeOptions,
      },
    });
  });
  const [registerTable, { getForm, reload }] = useTable({
    api: historyStyle,
    columns: columnsHistory,
    beforeFetch: (params) => {
      params.tagNo = hisNo.value;
      return params;
    },
    formConfig: {
      schemas: searchHistoryFormSchema,
    },
    clickToRowSelect: false,
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
    actionColumn: {
      title: '操作',
      dataIndex: 'action',
      fixed: 'right',
    },
    canResize: false,
    immediate: false,
  });

  function handleSubmit() {
    closeModal();
  }

  async function handlePreview(record: Recordable) {
    const previewData = await historyStylePreview(record.hisNo);
    openPreviewModal(true, {
      record: previewData,
    });
  }

  async function handleReuse(record: Recordable) {
    await reuseStyle(record.hisNo);
    closeModal();
    emit('success');
  }
</script>

<style scoped lang="less"></style>
