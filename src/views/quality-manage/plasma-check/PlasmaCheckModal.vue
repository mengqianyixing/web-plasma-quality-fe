<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    :title="getTitle"
    showFooter
    width="85%"
    @ok="handleOk"
    :minHeight="600"
    @cancel="handleClose"
    :showOkBtn="unref(flag) !== 'preview'"
  >
    <Description @register="registerPlasmaBatchDetail" :data="plasmaDetail" />

    <div class="h-[350px] mb-4">
      <BasicTable @register="registerTable">
        <template #toolbar v-if="unref(flag) !== 'preview'">
          <a-button type="primary" @click="handleAdd">新增</a-button>
          <a-button type="primary" @click="handleEdit">编辑</a-button>
          <a-button type="primary" @click="handleDelete">删除</a-button>
        </template>
      </BasicTable>
    </div>

    <Description @register="registerConclusionDetail" :data="conclusionData" />
    <BasicForm @register="registerForm" />
    <AddCheckContentModal @register="registerAddModal" @success="handleSuccess" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicModal, useModalInner, useModal } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form';
  import { computed, ref, unref, reactive } from 'vue';
  import { BasicTable, useTable } from '@/components/Table';
  import { useMessage } from '@/hooks/web/useMessage';

  import Description from '@/components/Description/src/Description.vue';
  import { useDescription } from '@/components/Description';
  import { PlasmaBatchSchema } from './check.data';
  import AddCheckContentModal from '@/views/quality-manage/plasma-check/AddCheckContentModal.vue';
  import {
    addPlasmaCheck,
    editPlasmaCheck,
    getCheckConclusionTemplate,
    getPlasmaCheckDetail,
  } from '@/api/qualify-manage/plasma-check';
  import {
    PostApiCoreBatchPlasmaAuditRequest,
    PutApiCoreBatchPlasmaAuditRequest,
  } from '@/api/type/plasmaCheckManage';
  import { DictionaryEnum, getSysDictionary } from '@/api/_dictionary';
  import dayjs from 'dayjs';

  const plasmaDetail = ref<Recordable>({});
  const conclusionData = reactive<Recordable>({
    conclusion: '',
  });
  const selectedRow = ref<Recordable[]>([]);

  const [registerAddModal, { openModal }] = useModal();
  const { createMessage } = useMessage();

  const emit = defineEmits(['success', 'register']);

  const [registerPlasmaBatchDetail] = useDescription({
    bordered: true,
    column: 4,
    size: 'middle',
    schema: PlasmaBatchSchema,
  });
  const [registerConclusionDetail] = useDescription({
    bordered: false,
    column: 4,
    size: 'middle',
    schema: [
      {
        field: 'conclusion',
        label: '审核结论',
      },
    ],
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
        width: 80,
      },
      {
        title: '审核项目',
        dataIndex: 'auditItem',
        align: 'left',
        width: 200,
      },
      {
        title: '审核内容',
        dataIndex: 'auditContent',
        align: 'left',
        ellipsis: false,
      },
      {
        title: '审核结果',
        dataIndex: 'auditResult',
        align: 'left',
        width: 200,
      },
    ],
    rowSelection: {
      type: 'radio',
      onChange: (_, selectedRows: any) => {
        selectedRow.value = selectedRows;
      },
    },
    size: 'small',
    striped: false,
    useSearchForm: false,
    pagination: false,
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
        colProps: { span: 24 },
        componentProps: {
          rows: 6,
        },
        show: false,
      },
      {
        field: 'remark',
        label: '备注',
        component: 'InputTextArea',
        colProps: { span: 24 },
        componentProps: {
          rows: 4,
        },
      },
    ],
    showActionButtonGroup: false,
  });

  const flag = ref('');
  const getTitle = computed(() =>
    unref(flag) === 'add' ? '新增审核' : unref(flag) === 'edit' ? '编辑审核' : '审核详情',
  );
  const [register, { setModalProps, closeModal }] = useModalInner(async (data) => {
    setModalProps({
      maskClosable: false,
    });

    plasmaDetail.value = {
      ...data.record,
      testIssueAt: dayjs(data.record.testIssueAt).format('YYYY-MM-DD'),
    };
    flag.value = data.flag;

    await updateSchema([
      {
        field: 'auditConclusion',
        componentProps: {
          disabled: true,
        },
      },
    ]);

    if (unref(flag) === 'preview') {
      const res = await getPlasmaCheckDetail(data.record.auditId);
      conclusionData.conclusion = res.auditConclusion;
      await setFieldsValue({
        auditConclusion: res.auditConclusion,
        remark: res.remark,
      });

      await updateSchema([
        {
          field: 'remark',
          componentProps: {
            disabled: unref(flag) === 'preview',
          },
        },
      ]);

      setTableData(res.itemList as any[]);
    } else if (unref(flag) === 'edit') {
      const res = await getPlasmaCheckDetail(data.record.auditId);
      conclusionData.conclusion = res.auditConclusion;
      await setFieldsValue({
        auditConclusion: res.auditConclusion,
        remark: res.remark,
      });

      setTableData(res.itemList as any[]);
    } else {
      conclusionData.conclusion = await getCheckConclusionTemplate(data.record?.batchNo);
      await setFieldsValue({
        auditConclusion: conclusionData.conclusion,
      });

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

      if (unref(flag) === 'add') {
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
