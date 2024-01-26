<!--
 * @Descripttion: 
 * @version: 
 * @Author: zcc
 * @Date: 2024-01-19 14:20:15
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-25 09:26:10
-->
<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    cancelText="关闭"
    :title="state.title"
    width="880px"
    :minHeight="520"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm">
      <template #table>
        <div class="h-300px">
          <BasicTable @register="registerTable">
            <template #toolbar v-if="state.title !== '查看'">
              <a-button type="primary" @click="handleCreate">新增</a-button>
              <a-button type="primary" @click="handleUpdate">编辑</a-button>
              <a-button type="primary" @click="handleRemove">删除</a-button>
            </template>
          </BasicTable>
        </div>
      </template>
    </BasicForm>
    <ItemModal @register="registerItemModal" @success="success" @close="close" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicForm, useForm } from '@/components/Form';
  import { BasicModal, useModalInner, useModal } from '@/components/Modal';
  import { BasicTable, useTable } from '@/components/Table';
  import { message, Modal } from 'ant-design-vue';
  import { formColumns, formSchema } from './batch-release.data';
  import {
    getFormApi,
    submitCreateFormApi,
    submitUpdateFormApi,
    getPresetsApi,
  } from '@/api/quality/batch-release';
  import ItemModal from './item-modal.vue';
  import { reactive, computed } from 'vue';
  import { GetApiProductReleasePrNoResponse } from '@/api/type/qualityMange';

  const state = reactive<{
    tableData: GetApiProductReleasePrNoResponse['releaseDetail'];
    title: string;
  }>({ tableData: [], title: '' });
  const appNames = computed(() => state.tableData.map((_) => _.appName));
  const emit = defineEmits(['success', 'register']);
  defineOptions({ name: 'FormModel' });
  const [registerTable, { getSelectRows, clearSelectedRowKeys, reload, setProps }] = useTable({
    api: () =>
      Promise.resolve(state.tableData.sort((a, b) => Number(a.appIndex) - Number(b.appIndex))),
    immediate: false,
    columns: formColumns,
    size: 'small',
    bordered: true,
    isCanResizeParent: true,
    pagination: false,
    rowSelection: { type: 'radio' },
    showIndexColumn: false,
  });
  const [registerForm, { validate, clearValidate, resetFields, setFieldsValue, updateSchema }] =
    useForm({
      labelWidth: 120,
      baseColProps: { span: 24 },
      schemas: formSchema,
      showActionButtonGroup: false,
    });
  const [registerItemModal, { openModal: openItemModal }] = useModal();
  const [registerModal, { setModalProps, closeModal }] = useModalInner((data) => {
    state.title = data.title;
    const onlyRead = data.title === '查看';
    setModalProps({ showOkBtn: !onlyRead });
    setProps({ rowSelection: onlyRead ? void 0 : { type: 'radio' } });
    updateSchema(
      formSchema.map((_: any) => ({
        ..._,
        required: !onlyRead,
        componentProps: { disabled: _.componentProps?.disabled || onlyRead },
      })),
    );
    clearValidate();
    resetFields();
    state.tableData = [];
    reload();
    clearSelectedRowKeys();
    if (data.title === '新增') {
      getPresetsApi().then((res) => {
        state.tableData = res;
        setFieldsValue({ mesId: data.mesId, releaseDetail: state.tableData });
        reload();
      });
    } else {
      updateSchema({ field: 'prNo', componentProps: { disabled: true } });
      getFormApi({ prNo: data.prNo }).then((res) => {
        state.tableData = res.releaseDetail;
        setFieldsValue(res);
        reload();
      });
    }
  });
  function success(row) {
    state.tableData.push(row);
    reload();
    clearValidate('releaseDetail');
  }
  function close(row: GetApiProductReleasePrNoResponse['releaseDetail'][0]) {
    const index = state.tableData.findIndex((_) => _.appName === row.appName);
    state.tableData.splice(index, 1, row);
    reload();
    clearSelectedRowKeys();
  }
  function handleCreate() {
    openItemModal(true, { isUpdate: false, appNames: appNames.value });
  }
  function handleUpdate() {
    const rows = getSelectRows();
    if (rows.length === 0) return message.warning('请选择数据');
    const [row] = rows;
    openItemModal(true, {
      row: rows[0],
      isUpdate: true,
      appNames: appNames.value.filter((_) => _ !== row.appName),
    });
  }
  function handleRemove() {
    const rows = getSelectRows();
    if (rows.length === 0) return message.warning('请选择数据');
    const [row] = rows;
    Modal.confirm({
      content: '确认删除项目【' + row.appName + '】?',
      onOk: async () => {
        const index = state.tableData.findIndex((_) => _.appName === row.appName);
        state.tableData.splice(index, 1);
        clearSelectedRowKeys();
        reload();
      },
      onCancel: () => Modal.destroyAll(),
    });
  }

  async function handleSubmit() {
    try {
      const values = await validate();
      try {
        setModalProps({ confirmLoading: true });
        if (state.title === '新增')
          await submitCreateFormApi({ ...values, releaseDetail: state.tableData } as any);
        else if (state.title === '编辑')
          await submitUpdateFormApi({ ...values, releaseDetail: state.tableData } as any);
        closeModal();
        emit('success');
        message.success(state.title + '成功');
      } finally {
        setModalProps({ confirmLoading: false });
      }
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
