<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerEditModal"
    showFooter
    :title="getTitle"
    width="1000px"
    :min-height="600"
    @ok="handleSubmit"
  >
    <div class="relative h-inherit max-h-inherit min-h-inherit">
      <div class="absolute flex flex-col w-full h-full">
        <div class="flex-1 w-full">
          <a-tabs v-model:activeKey="activeKey" class="h-full bg-white tabs">
            <a-tab-pane key="1" tab="编辑">
              <BasicTable @register="registerTable">
                <template #toolbar>
                  <div class="flex gap-2">
                    <a-button type="primary" @click="handleAdd"> 新增 </a-button>
                  </div>
                </template>
                <template #bodyCell="{ record, column }">
                  <template v-if="column.key === 'action'">
                    <TableAction
                      :actions="[
                        {
                          label: '删除',
                          color: 'error',
                          onClick: handleEncodingDel.bind(null, record),
                        },
                      ]"
                    />
                  </template>
                </template>
              </BasicTable>
            </a-tab-pane>
            <a-tab-pane key="2" tab="编辑JSON" force-render>
              <div class="h-[100vh]">
                <CodeEditor v-model:value="JsonValue" :mode="modeValue" />
              </div>
            </a-tab-pane>
          </a-tabs>
        </div>
      </div>
    </div>
  </BasicModal>

  <EncodingModal @register="registerModal" @success="handleSuccess" />
</template>
<script lang="ts" setup>
  import { ref, computed, unref, createVNode } from 'vue';
  import { BasicTable, TableAction, useTable } from '@/components/Table';
  import { encodingDetailColumns } from './encoding.data';
  import { BasicModal, useModalInner, useModal } from '@/components/Modal';
  import { Tabs, TabPane } from 'ant-design-vue';
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
  import type { Nullable } from '@vben/types';
  import { CodeEditor, MODE } from '@/components/CodeEditor';
  import { editEncoding, getEncodingDetail } from '@/api/tag/encoding';

  import EncodingModal from './EncodingModal.vue';
  import { GetApiSysCodingRuleCodingTypeResponse } from '@/api/type/encodingManage';
  import { useMessage } from '@/hooks/web/useMessage';

  const ATabs = Tabs;
  const ATabPane = TabPane;

  const emit = defineEmits(['success', 'register']);
  const isUpdate = ref(true);
  const originDetailData = ref<Nullable<GetApiSysCodingRuleCodingTypeResponse>>(null);
  const codingType = ref('');
  const activeKey = ref('1');

  const JsonValue = ref('');
  const modeValue = ref<MODE>(MODE.JSON);

  const [
    registerTable,
    { setTableData, getDataSource, insertTableDataRecord, deleteTableDataRecord },
  ] = useTable({
    columns: encodingDetailColumns,
    clickToRowSelect: false,
    size: 'small',
    striped: false,
    useSearchForm: false,
    inset: true,
    isCanResizeParent: true,
    bordered: true,
    pagination: false,
    showIndexColumn: false,
    actionColumn: {
      title: '操作',
      dataIndex: 'action',
      fixed: 'right',
    },
  });

  const [registerModal, { openModal }] = useModal();

  const [registerEditModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    setModalProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;

    if (unref(isUpdate)) {
      codingType.value = data.record.codingType;

      originDetailData.value = await getEncodingDetail(codingType.value);

      JsonValue.value = JSON.stringify(originDetailData.value, null, 2);
      setTableData(originDetailData.value);
    }
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增' : '编辑'));

  async function handleSubmit() {
    try {
      setModalProps({ confirmLoading: true });
      if (unref(isUpdate)) {
        if (activeKey.value === '1') {
          await editEncoding({
            codingType: codingType.value,
            adapterRules: [...(getDataSource() as any)],
          });
        } else {
          await editEncoding({
            codingType: codingType.value,
            adapterRules: JSON.parse(JsonValue.value) as any,
          });
        }
      }
      closeModal();
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }

  function handleAdd() {
    openModal(true, {
      isUpdate: false,
    });
  }

  const { createConfirm } = useMessage();

  function handleEncodingDel(record: Recordable) {
    createConfirm({
      iconType: 'error',
      title: '是否确认删除?',
      icon: createVNode(ExclamationCircleOutlined),
      content: '',
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        deleteTableDataRecord(record.key);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  function handleSuccess(rowRecord: Recordable) {
    insertTableDataRecord({
      ...rowRecord,
      order: Number(rowRecord.order),
      id: {
        id: rowRecord.id,
        remark: rowRecord.remark,
      },
    });
  }
</script>
<style scoped>
  .tabs :deep(.ant-tabs-content) {
    height: 100%;
  }
</style>
