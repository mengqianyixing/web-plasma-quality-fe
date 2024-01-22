<template>
  <div>
    <BasicTable @register="registerTable" :searchInfo="searchInfo">
      <template #labelType="{ record }">
        {{ formatLabelType(record?.labelType) }}
      </template>
      <template #toolbar>
        <div class="flex gap-2">
          <a-button type="primary" @click="handleReview">标签预览</a-button>
          <a-button type="primary" @click="handleReprint">标签打印</a-button>
        </div>
      </template>
    </BasicTable>

    <PrintPreviewModal @register="registerPreviewModal" />
    <ReprintRecordModal @register="registerReprintModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';
  import { useModal } from '@/components/Modal';
  import { useMessage } from '@/hooks/web/useMessage';

  import { ref, onMounted } from 'vue';
  import { columns, searchFormSchema } from './record.data';
  import {
    getPrintRecords,
    previewPrintRecord,
    printRecord,
    replayPrintRecord,
  } from '@/api/tag/printRecord';
  import { getTagDictionary } from '@/api/tag/encoding';
  import { TagDictionaryType } from '@/enums/dictionaryEnum';

  import PrintPreviewModal from './PrintPreviewModal.vue';
  import ReprintRecordModal from './ReprintRecordModal.vue';

  const { createMessage } = useMessage();
  const { warning } = createMessage;

  const searchInfo = ref<Recordable>({});
  const selectedRow = ref<Recordable[]>([]);
  const labelTypeDictionary = ref<Recordable[] | undefined>([]);
  const printReasonDictionary = ref<Recordable[] | undefined>([]);

  onMounted(async () => {
    const dictionaryArr = await getTagDictionary([
      TagDictionaryType.LabelType,
      TagDictionaryType.PrintReason,
    ]);
    if (!dictionaryArr) return;
    labelTypeDictionary.value = dictionaryArr.find(
      (it) => it.dictNo === TagDictionaryType.LabelType,
    )?.dictImtes;
    printReasonDictionary.value = dictionaryArr.find(
      (it) => it.dictNo === TagDictionaryType.PrintReason,
    )?.dictImtes;
    await getForm().updateSchema({
      field: 'labelType',
      componentProps: {
        options: labelTypeDictionary.value,
      },
    });
  });

  defineOptions({ name: 'TagRecord' });

  const [registerPreviewModal, { openModal: openPreviewModal }] = useModal();
  const [registerReprintModal, { openModal: openReprintModal }] = useModal();

  const [registerTable, { getForm, clearSelectedRowKeys }] = useTable({
    api: getPrintRecords,
    columns,
    formConfig: {
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
    rowSelection: {
      type: 'checkbox',
      onChange: (_, selectedRows: any) => {
        selectedRow.value = selectedRows;
      },
    },
    clickToRowSelect: false,
    rowKey: 'prtNo',
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
    showIndexColumn: true,
    canResize: false,
  });

  function selectRowsCheck() {
    if (selectedRow.value.length > 1) {
      warning('只能选择一条数据');
      return false;
    } else if (selectedRow.value.length === 0) {
      warning('请先选择一条数据');
      return false;
    } else {
      return true;
    }
  }

  async function handleReview() {
    if (!selectRowsCheck()) return;
    const res = await previewPrintRecord(selectedRow.value[0].prtNo);
    openPreviewModal(true, {
      record: res,
    });
  }

  async function handleReprint() {
    if (!selectRowsCheck()) return;
    openReprintModal(true, {
      record: {
        reasonOptions: printReasonDictionary.value,
        prtNo: selectedRow.value[0].prtNo,
      },
    });
  }

  function formatLabelType(labelType: string) {
    return labelTypeDictionary.value!.find((it) => it.value === labelType)?.label || labelType;
  }

  async function handleSuccess(formData: { prtNo: string; reason: string }) {
    selectedRow.value = [];
    clearSelectedRowKeys();
    const res = await replayPrintRecord({
      ...formData,
    });

    const params = {
      ...res,
      dpi: res.resolution,
    };
    delete params.resolution;

    await printRecord(params);
  }
</script>
