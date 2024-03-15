<template>
  <div class="h-full">
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleRemove" v-if="props.checkType"
          >撤销检测结果</a-button
        >
      </template>
    </BasicTable>
    <BasicModal
      @register="registerCancelModal"
      title="撤销原因"
      okText="提交"
      width="300px"
      @ok="handleSubmit"
    >
      <BasicForm @register="registerForm" />
    </BasicModal>
  </div>
</template>
<script setup lang="ts">
  import { BasicTable, useTable } from '@/components/Table';
  import { message } from 'ant-design-vue';
  import { dtColumns } from './data';
  import { getCheckItemDtListApi, removeUnqualified } from '@/api/inspect/resultRegistration';
  import { useModal, BasicModal } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form';

  const props = defineProps({
    checkResult: {
      type: String,
      default: '',
    },
    checkType: {
      type: String,
      default: '',
    },
    projectId: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: '',
    },
    bsNo: {
      type: String,
      default: '',
    },
  });
  const [registerCancelModal, { openModal: openCancelModal, setModalProps }] = useModal();
  const [registerForm, { resetFields, clearValidate, validate }] = useForm({
    labelWidth: 80,
    baseColProps: { span: 24 },
    schemas: [
      {
        field: 'cause',
        component: 'Input',
        label: '原因',
        required: true,
      },
    ],
    showActionButtonGroup: false,
  });

  const [registerTable, { getSelectRows, clearSelectedRowKeys, reload }] = useTable({
    immediate: true,
    api: getCheckItemDtListApi,
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    showIndexColumn: false,
    columns: dtColumns(props.checkResult, props.checkType),
    size: 'small',
    useSearchForm: false,
    showTableSetting: false,
    bordered: true,
    isCanResizeParent: true,
    beforeFetch: (p) => ({ ...p, projectId: props.projectId, type: props.type, bsNo: props.bsNo }),
    rowSelection: props.checkType ? { type: 'radio' } : void 0,
    afterFetch: (res) => {
      clearSelectedRowKeys();
      return res;
    },
  });
  async function handleSubmit() {
    const { cause } = await validate();
    const [row] = getSelectRows();
    try {
      setModalProps({ confirmLoading: true });
      await removeUnqualified({
        sampleNo: row.sampleNo,
        bsNo: props.bsNo,
        projectId: props.projectId,
        cause,
      });
      openCancelModal(false);
      message.success('撤销成功');
      reload();
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
  function handleRemove() {
    const rows = getSelectRows();
    if (rows.length === 0) return message.warning('请选择一条数据');
    resetFields();
    clearValidate();
    openCancelModal(true);
  }
</script>
