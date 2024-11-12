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
                onClick: handleReuse.bind(null, record),
              },
            ]"
          />
        </template>
      </template>
      <template #labelType="{ record }">
        {{ formatLabelType(record?.labelType) }}
      </template>
    </BasicTable>

    <HistoryStylePreviewModal @register="registerPreviewModal" />
  </BasicModal>
</template>

<script setup lang="ts">
  import { BasicModal, useModalInner, useModal } from '@/components/Modal';
  import { BasicTable, TableAction, useTable } from '@/components/Table';
  import { ref, createVNode } from 'vue';
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
  import { historyStyle, historyStylePreview, reuseStyle } from '@/api/tag/manage';
  import { columnsHistory, searchHistoryFormSchema } from '@/views/tag-manage/style/style.data';

  import HistoryStylePreviewModal from './HistoryStylePreviewModal.vue';
  import { useMessage } from '@/hooks/web/useMessage';

  const hisNo = ref('');

  const [registerPreviewModal, { openModal: openPreviewModal }] = useModal();
  const emit = defineEmits(['success', 'register']);

  let formatLabelType = (type) => type;
  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    setModalProps({ confirmLoading: false });
    hisNo.value = data.record.tagNo;
    formatLabelType = data.formatLabelType;
    await reload();
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

  const { createConfirm } = useMessage();

  async function handleReuse(record: Recordable) {
    createConfirm({
      iconType: 'warning',
      title: '是否重用该样式?',
      icon: createVNode(ExclamationCircleOutlined),
      content: '',
      okText: '重用',
      okType: 'danger',
      cancelText: '取消',
      async onOk() {
        await reuseStyle(record.hisNo);
        closeModal();
        emit('success');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
</script>

<style scoped lang="less"></style>
