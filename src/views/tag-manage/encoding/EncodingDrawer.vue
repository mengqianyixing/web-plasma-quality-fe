<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="1000px"
    @ok="handleSubmit"
  >
    <a-tabs v-model:activeKey="activeKey">
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
                    popConfirm: {
                      title: '是否确认删除',
                      placement: 'left',
                      confirm: handleEncodingDel.bind(null, record),
                    },
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
  </BasicDrawer>

  <EncodingModal @register="registerModal" @success="handleSuccess" />
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicTable, TableAction, useTable } from '@/components/Table';
  import { encodingDetailColumns } from './encoding.data';
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';

  import { Tabs, TabPane } from 'ant-design-vue';
  import type { Nullable } from '@vben/types';
  import { useModal } from '@/components/Modal';
  import { CodeEditor, MODE } from '@/components/CodeEditor';
  import { editEncoding, getEncodingDetail } from '@/api/tag/encoding';

  import EncodingModal from './EncodingModal.vue';
  import { GetApiSysCodingRuleCodingTypeResponse } from '@/api/type/encodingManage';

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

  const [registerModal, { openModal }] = useModal();

  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    setDrawerProps({ confirmLoading: false });
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
      setDrawerProps({ confirmLoading: true });
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
      closeDrawer();
      emit('success');
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }

  function handleAdd() {
    openModal(true, {
      isUpdate: false,
    });
  }

  function handleEncodingDel(record: Recordable) {
    deleteTableDataRecord(record.key);
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
