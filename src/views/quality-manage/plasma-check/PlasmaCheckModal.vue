<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    :title="getTitle"
    showFooter
    width="85%"
    @ok="handleOk"
    @cancel="handleClose"
    :showOkBtn="!isPreview"
  >
    <Description @register="registerPlasmaBatchDetail" :data="plasmaDetail" />

    <div class="h-[400px]">
      <BasicTable @register="registerTable">
        <template #toolbar v-if="!isPreview">
          <a-button type="primary" @click="handleAdd">新增</a-button>
          <a-button type="primary" @click="handleEdit">编辑</a-button>
          <a-button type="primary" @click="handleDelete">删除</a-button>
        </template>
      </BasicTable>
    </div>

    <BasicForm @register="registerForm" />
    <AddCheckContentModal @register="registerAddModal" @success="handleSuccess" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicModal, useModalInner, useModal } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form';
  import { computed, ref, unref } from 'vue';
  import { BasicTable, useTable } from '@/components/Table';
  import { useMessage } from '@/hooks/web/useMessage';

  import Description from '@/components/Description/src/Description.vue';
  import { useDescription } from '@/components/Description';
  import { PlasmaBatchSchema } from './check.data';
  import AddCheckContentModal from '@/views/quality-manage/plasma-check/AddCheckContentModal.vue';
  import {
    addPlasmaCheck,
    editPlasmaCheck,
    getPlasmaCheckDetail,
  } from '@/api/qualify-manage/plasma-check';
  import {
    PostApiCoreBatchPlasmaAuditRequest,
    PutApiCoreBatchPlasmaAuditRequest,
  } from '@/api/type/plasmaCheckManage';
  import { DictionaryEnum, getSysDictionary } from '@/api/_dictionary';

  const plasmaDetail = ref<Recordable>({});
  const selectedRow = ref<Recordable[]>([]);
  const isUpdate = ref(false);
  const isPreview = ref(false);

  const [registerAddModal, { openModal }] = useModal();
  const { createMessage } = useMessage();

  const emit = defineEmits(['success', 'register']);

  const [registerPlasmaBatchDetail] = useDescription({
    bordered: true,
    column: 4,
    size: 'middle',
    title: '血浆批次详情',
    schema: PlasmaBatchSchema,
  });

  const [
    registerTable,
    {
      updateTableDataRecord,
      insertTableDataRecord,
      deleteTableDataRecord,
      clearSelectedRowKeys,
      getDataSource,
      setTableData,
    },
  ] = useTable({
    columns: [
      {
        title: '排序号',
        dataIndex: 'sort',
      },
      {
        title: '审核项目',
        dataIndex: 'auditItem',
      },
      {
        title: '审核内容',
        dataIndex: 'auditContent',
      },
      {
        title: '审核结果',
        dataIndex: 'auditResult',
      },
    ],
    rowSelection: {
      type: 'radio',
      onChange: (_, selectedRows: any) => {
        selectedRow.value = selectedRows;
      },
    },
    size: 'large',
    striped: false,
    useSearchForm: false,
    pagination: false,
    showTableSetting: false,
    bordered: true,
    showIndexColumn: false,
    isCanResizeParent: true,
  });

  const [registerForm, { validate, resetFields, setFieldsValue, updateSchema }] = useForm({
    labelWidth: 120,
    schemas: [
      {
        field: 'auditConclusion',
        label: '审核结论',
        component: 'InputTextArea',
        colProps: { span: 12 },
        componentProps: {
          rows: 4,
        },
        required: true,
      },
      {
        field: 'remark',
        label: '备注',
        component: 'InputTextArea',
        colProps: { span: 12 },
        componentProps: {
          rows: 4,
        },
      },
    ],
    showActionButtonGroup: false,
  });

  const getTitle = computed(() => (unref(isUpdate) ? '修改审核' : '新增审核'));
  const [register, { setModalProps, closeModal }] = useModalInner(async (data) => {
    setModalProps({
      maskClosable: false,
    });
    plasmaDetail.value = data.record;

    isUpdate.value = !!data.isUpdate;
    isPreview.value = !!data.isPreview;

    await updateSchema([
      {
        field: 'auditConclusion',
        componentProps: {
          disabled: unref(isPreview),
        },
      },
      {
        field: 'remark',
        componentProps: {
          disabled: unref(isPreview),
        },
      },
    ]);

    if (unref(isPreview)) {
      const res = await getPlasmaCheckDetail(data.record.auditId);
      await setFieldsValue({
        auditConclusion: res.auditConclusion,
        remark: res.remark,
      });

      setTableData(res.itemList as any[]);
    }

    if (unref(isUpdate)) {
      const res = await getPlasmaCheckDetail(data.record.auditId);
      await setFieldsValue({
        auditConclusion: res.auditConclusion,
        remark: res.remark,
      });

      setTableData(res.itemList as any[]);
    } else {
      const dictionaryArr = await getSysDictionary([DictionaryEnum.PlasmaRelease]);
      if (!dictionaryArr.length) return;

      const template = dictionaryArr[0]?.dictImtes!.map((it) => {
        const _it = JSON.parse(it.desc!);
        return {
          sort: _it.appId,
          auditItem: _it.appName,
          auditContent: _it.appContent,
          auditResult: _it.appResult,
        };
      });
      setTableData(template);
    }
  });

  function handleAdd() {
    openModal(true, {
      isUpdate: false,
    });
  }

  function handleEdit() {
    if (!selectedRow.value.length) {
      createMessage.warn('请选择一条记录');
      return;
    }

    openModal(true, {
      isUpdate: true,
      record: selectedRow.value[0],
    });
  }

  function handleDelete() {
    if (!selectedRow.value.length) {
      createMessage.warn('请选择一条记录');
      return;
    }

    deleteTableDataRecord(selectedRow.value[0].key);
    clearSelectedRowKeys();
  }

  function handleSuccess(rowRecord: Recordable, flag = false) {
    if (!flag) {
      updateTableDataRecord(selectedRow.value[0].key, rowRecord);
    } else {
      insertTableDataRecord(rowRecord);
    }

    setTableData(getDataSource().sort((a, b) => a.sort - b.sort));

    clearSelectedRowKeys();
  }

  async function handleOk() {
    try {
      setModalProps({ confirmLoading: true });
      const values = await validate();

      if (!isUpdate.value) {
        await addPlasmaCheck({
          ...values,
          auditList: getDataSource(),
          batchNo: plasmaDetail.value.batchNo,
        } as PostApiCoreBatchPlasmaAuditRequest);
      } else {
        await editPlasmaCheck({
          ...values,
          auditId: plasmaDetail.value.auditId,
          auditList: getDataSource(),
          batchNo: plasmaDetail.value.batchNo,
        } as PutApiCoreBatchPlasmaAuditRequest);
      }

      emit('success');

      closeModal();
      await resetFields();
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }

  function handleClose() {
    setTableData([]);
  }
</script>
