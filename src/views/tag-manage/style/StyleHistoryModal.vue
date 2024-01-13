<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
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
  </BasicDrawer>
</template>

<script setup lang="ts">
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { BasicTable, TableAction, useTable } from '@/components/Table';
  import { ref } from 'vue';
  import { historyStyle, historyStylePreview, reuseStyle } from '@/api/tag/manage';
  import { columnsHistory, searchHistoryFormSchema } from '@/views/tag-manage/style/style.data';

  import { useModal } from '@/components/Modal';
  import HistoryStylePreviewModal from './HistoryStylePreviewModal.vue';

  const hisNo = ref('');

  const [registerPreviewModal, { openModal: openPreviewModal }] = useModal();
  const emit = defineEmits(['success']);

  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    setDrawerProps({ confirmLoading: false });
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
    title: '历史标签列表',
    api: historyStyle,
    columns: columnsHistory,
    beforeFetch: (params) => {
      params.tagNo = hisNo.value;
      return params;
    },
    formConfig: {
      labelWidth: 120,
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
    closeDrawer();
  }

  async function handlePreview(record: Recordable) {
    const previewData = await historyStylePreview(record.hisNo);
    openPreviewModal(true, {
      record: previewData,
    });
  }

  async function handleReuse(record: Recordable) {
    await reuseStyle(record.hisNo);
    closeDrawer();
    emit('success');
  }
</script>

<style scoped lang="less"></style>
