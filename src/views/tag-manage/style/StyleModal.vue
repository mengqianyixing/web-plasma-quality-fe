<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    showFooter
    :title="getTitle"
    width="80%"
    @ok="handleSubmit"
  >
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane key="1" tab="编辑">
        <BasicForm @register="registerForm" />

        <div class="flex items-center">
          <BasicTable @register="registerTable">
            <template #toolbar>
              <div class="flex gap-2">
                <a-button type="primary" @click="handleAdd"> 新增 </a-button>
                <a-button type="primary" @click="handleRefreshPreview">刷新预览</a-button>
              </div>
            </template>
            <template #bodyCell="{ record, column }">
              <template v-if="column.key === 'action'">
                <TableAction
                  :actions="[
                    {
                      label: '编辑',
                      onClick: handleStyleEdit.bind(null, record),
                    },
                    {
                      label: '删除',
                      color: 'error',
                      popConfirm: {
                        title: '是否确认删除',
                        placement: 'left',
                        confirm: handleStyleDelete.bind(null, record),
                      },
                    },
                  ]"
                />
              </template>
            </template>
          </BasicTable>
          <div>
            <img :src="previewUrl" alt="" class="w-[350px] h-[400px]" />
          </div>
        </div>
      </a-tab-pane>
      <a-tab-pane key="2" tab="编辑JSON" force-render>
        <div class="flex">
          <CodeEditor class="w-8/10" v-model:value="JsonValue" :mode="modeValue" />
          <div>
            <img :src="previewUrl" alt="" class="w-[350px] h-[400px]" />
          </div>
        </div>
      </a-tab-pane>
    </a-tabs>

    <StyleColumnModal @register="registerStyleColumnModal" @success="handleSuccess" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicForm, useForm } from '@/components/Form';
  import { BasicTable, TableAction, useTable } from '@/components/Table';
  import { styleDetailColumns, formSchema } from './style.data';
  import { BasicModal, useModalInner, useModal } from '@/components/Modal';

  import StyleColumnModal from './StyleColumnModal.vue';

  import { Tabs, TabPane } from 'ant-design-vue';
  import { addStyle, editStyle, getStylePreview, getTagDetail } from '@/api/tag/manage';
  import { GetApiSysTagTagNoResponse, PostApiSysTagPreviewRequest } from '@/api/type/tagManage';
  import type { Nullable } from '@vben/types';
  import { CodeEditor, MODE } from '@/components/CodeEditor';
  import { tagStatusValueEnum } from '@/enums/tagManageEnum';

  const ATabs = Tabs;
  const ATabPane = TabPane;

  const emit = defineEmits(['success', 'register']);
  const isUpdate = ref(true);
  const originDetailData = ref<Nullable<GetApiSysTagTagNoResponse>>(null);
  const tagNo = ref('');
  const activeKey = ref('1');

  const JsonValue = ref('');
  const modeValue = ref<MODE>(MODE.JSON);

  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 100,
    baseColProps: { span: 24 },
    schemas: formSchema,
    showActionButtonGroup: false,
  });

  const [
    registerTable,
    {
      setTableData,
      updateTableDataRecord,
      insertTableDataRecord,
      deleteTableDataRecord,
      getDataSource,
    },
  ] = useTable({
    title: '',
    columns: styleDetailColumns,
    clickToRowSelect: false,
    size: 'small',
    striped: false,
    useSearchForm: false,
    showTableSetting: true,
    tableSetting: {
      size: false,
      redo: false,
      setting: false,
    },
    bordered: true,
    pagination: false,
    showIndexColumn: false,
    actionColumn: {
      title: '操作',
      dataIndex: 'action',
      fixed: 'right',
    },
    canResize: true,
  });

  const [registerStyleColumnModal, { openModal }] = useModal();

  const state = ref('');
  const previewStyle = ref('');
  const previewUrl = computed(() => `data:image/png;base64,${unref(previewStyle)}`);

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    resetFields();
    setModalProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;

    if (unref(isUpdate)) {
      tagNo.value = data.record.tagNo;
      state.value = data.record.state;

      originDetailData.value = await getTagDetail(tagNo.value);
      JsonValue.value = JSON.stringify(originDetailData.value, null, 2);

      previewStyle.value = await getStylePreview({
        ...originDetailData.value,
        content: originDetailData.value?.content as any,
      });
      setTableData(originDetailData.value?.content?.Data);

      setFieldsValue({
        ...data.record,
        width: originDetailData.value.content.Width,
        height: originDetailData.value.content.Height,
        gap: originDetailData.value.content.Gap,
      });
    }
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增样式' : '编辑样式'));

  async function handleSubmit() {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });
      if (unref(isUpdate)) {
        if (activeKey.value === '1') {
          await editStyle({
            tagNo: tagNo.value,
            tagName: values.tagName,
            labelType: values.labelType,
            resolution: values.resolution,
            times: values.times,
            printerType: values.printerType,
            printerName: values.printerName,
            content: {
              Width: values.width,
              Height: values.height,
              Gap: values.gap,
              Data: getDataSource(),
            },
            state: state.value,
          });
        } else {
          await editStyle(JSON.parse(JsonValue.value));
        }
      } else {
        if (activeKey.value === '1') {
          await addStyle({
            tagName: values.tagName,
            labelType: values.labelType,
            resolution: values.resolution,
            times: values.times,
            printerType: values.printerType,
            printerName: values.printerName,
            content: {
              Width: values.width,
              Height: values.height,
              Gap: values.gap,
              Data: getDataSource(),
            },
            state: tagStatusValueEnum.DSB,
          });
        } else {
          await addStyle(JSON.parse(JsonValue.value));
        }
      }
      closeModal();
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }

  const rowKey = ref('');
  function handleStyleEdit(record: Recordable) {
    rowKey.value = record.key;
    openModal(true, {
      isUpdate: true,
      record,
    });
  }

  function handleAdd() {
    openModal(true, {
      isUpdate: false,
    });
  }

  async function handleRefreshPreview() {
    previewStyle.value = '';
    const formValues = await validate();
    previewStyle.value = await getStylePreview({
      ...formValues,
      content: {
        Width: formValues.width,
        Height: formValues.height,
        Gap: formValues.gap,
        Data: getDataSource(),
      },
    } as PostApiSysTagPreviewRequest);
  }

  function handleStyleDelete(record: Recordable) {
    deleteTableDataRecord(record.key);
  }

  function handleSuccess(rowRecord: Recordable, flag = false) {
    if (!flag) {
      updateTableDataRecord(rowKey.value, rowRecord);
    } else {
      insertTableDataRecord(rowRecord);
    }
  }
</script>
<style scoped>
  :deep(.vben-basic-table) {
    width: 70%;
  }
</style>
