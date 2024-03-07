<template>
  <div>
    <BasicTable @register="registerTable" :searchInfo="searchInfo">
      <template #labelType="{ record }">
        {{ formatLabelType(record?.labelType) }}
      </template>
      <template #toolbar>
        <div class="flex gap-2">
          <a-button type="primary" @click="handleAdd"> 新增 </a-button>
          <a-button type="primary" @click="handleEdit"> 编辑 </a-button>
          <a-button type="primary" @click="handleDelete"> 撤销 </a-button>
          <a-button type="primary" @click="handleCopy"> 复制 </a-button>
          <a-button type="primary" @click="handleHistory"> 历史 </a-button>
          <a-button type="primary" @click="handleStylePreview"> 预览 </a-button>
          <a-button type="primary" @click="handleCheckStatus(tagStatusValueEnum.EAB)">
            启用
          </a-button>
          <a-button type="primary" @click="handleCheckStatus(tagStatusValueEnum.DSB)">
            禁用
          </a-button>
        </div>
      </template>
    </BasicTable>
    <HistoryStylePreviewModal @register="registerPreviewModal" />
    <StyleModal @register="registerStyleModal" @success="handleSuccess" />
    <StyleHistoryModal @register="registerStyleHistoryModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';

  import { columns, searchFormSchema } from './style.data';
  import { useModal } from '@/components/Modal';

  import { onMounted, ref } from 'vue';

  import {
    copyStyle,
    deleteStyle,
    getTagsList,
    getStylePreview,
    disableStyle,
    enableStyle,
  } from '@/api/tag/manage';

  import StyleModal from './StyleModal.vue';
  import StyleHistoryModal from './StyleHistoryModal.vue';
  import HistoryStylePreviewModal from './HistoryStylePreviewModal.vue';
  import { message, Modal } from 'ant-design-vue';

  import { getTagDictionary } from '@/api/tag/encoding';
  import { TagDictionaryType } from '@/enums/dictionaryEnum';
  import { PostApiSysTagPreviewRequest } from '@/api/type/tagManage';
  import { tagStatusValueEnum } from '@/enums/tagManageEnum';

  defineOptions({ name: 'TagStyle' });

  const searchInfo = ref<Recordable>({});
  const selectedRow = ref<Recordable[]>([]);
  const labelTypeDictionary = ref<Recordable[] | undefined>([]);

  onMounted(async () => {
    const dictionaryArr = await getTagDictionary([TagDictionaryType.LabelType]);
    if (!dictionaryArr.length) return;

    labelTypeDictionary.value = dictionaryArr.find(
      (it) => it.dictNo === TagDictionaryType.LabelType,
    )?.dictImtes;

    await getForm().updateSchema({
      field: 'labelType',
      componentProps: {
        options: labelTypeDictionary.value,
      },
    });
  });

  const [registerStyleModal, { openModal: openStyleModal }] = useModal();
  const [registerStyleHistoryModal, { openModal: openStyleHistoryModal }] = useModal();

  const [registerPreviewModal, { openModal: openPreviewModal }] = useModal();
  const [registerTable, { getSelectRows, clearSelectedRowKeys, reload, getForm }] = useTable({
    api: getTagsList,
    columns,
    formConfig: {
      schemas: searchFormSchema,
    },
    clickToRowSelect: true,
    size: 'small',
    striped: false,
    useSearchForm: true,

    rowKey: 'tagNo',
    rowSelection: {
      type: 'radio',
      onChange: (_, selectedRows: any) => {
        selectedRow.value = selectedRows;
      },
    },
    afterFetch: (res) => {
      clearSelectedRowKeys();
      return res;
    },
    bordered: true,
    showIndexColumn: false,
    canResize: true,
  });

  function getSelections(onlyOne: boolean) {
    const rows = getSelectRows();
    if (rows.length === 0) {
      message.warning('请选择一条数据');
      return [];
    } else if (rows.length > 1 && onlyOne) {
      message.warning('只能选择一条数据');
      return [];
    }
    return rows;
  }

  function stateAction(row) {
    if (row.state === tagStatusValueEnum.EAB) {
      message.warning('当前状态不能进行该操作');
      return true;
    } else {
      return false;
    }
  }

  function handleCheckStatus(action: string) {
    const [row] = getSelections(true);
    if (!row) return;

    const { tagName, state } = row;
    if (state === action) return message.warning('状态不需要变更');
    Modal.confirm({
      content: '确认' + (action == tagStatusValueEnum.DSB ? '禁用' : '启用') + tagName + '?',

      onOk: async () => {
        if (action == tagStatusValueEnum.EAB) {
          await enableStyle(row.tagNo);
          clearSelectedRowKeys();
          await reload();
        } else {
          await disableStyle(row.tagNo);
          clearSelectedRowKeys();
          await reload();
        }
      },
      onCancel: () => Modal.destroyAll(),
    });
  }

  function handleAdd(record: Recordable) {
    openStyleModal(true, {
      record,
      isUpdate: false,
    });
  }

  async function handleEdit() {
    const [row] = getSelections(true);
    if (!row) return;
    const action = stateAction(row);
    if (action) return;

    openStyleModal(true, {
      record: selectedRow.value[0],
      isUpdate: true,
    });
  }

  async function handleHistory() {
    const [row] = getSelections(true);
    if (!row) return;

    openStyleHistoryModal(true, {
      record: selectedRow.value[0],
      labelTypeOptions: labelTypeDictionary.value,
    });
  }

  async function handleCopy() {
    const [row] = getSelections(true);
    if (!row) return;

    await copyStyle(row.tagNo);
    await reload();
  }

  async function handleDelete() {
    const [row] = getSelections(true);
    if (!row) return;

    const action = stateAction(row);

    if (action) return;

    const { tagName } = row;
    Modal.confirm({
      content: '确认撤销' + tagName + '?',
      onOk: async () => {
        await deleteStyle(row.tagNo);
        clearSelectedRowKeys();
        await reload();
      },
      onCancel: () => Modal.destroyAll(),
    });
  }

  async function handleStylePreview() {
    const [row] = getSelections(true);
    if (!row) return;

    const previewOriginData = await getStylePreview({
      content: row.content,
      resolution: row.resolution,
      tagName: row.tagName,
      labelType: row.labelType,
      times: row.times,
      printerType: row.printerType,
      printerName: row.printerName,
      patternPicture: row.patternPicture,
      state: row.state,
    } as PostApiSysTagPreviewRequest);

    openPreviewModal(true, {
      record: previewOriginData,
    });
  }

  function handleSuccess() {
    reload();
  }

  function formatLabelType(labelType: string) {
    return labelTypeDictionary.value!.find((it) => it.value === labelType)?.label ?? labelType;
  }
</script>
