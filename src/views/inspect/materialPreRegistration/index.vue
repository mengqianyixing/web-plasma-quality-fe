<!--
 * @Descripttion:
 * @version:
 * @Author: zcc
 * @Date: 2023-12-25 14:30:13
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-13 17:29:42
-->
<template>
  <PageWrapper dense contentFullHeight fixedHeight class="p-16px">
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button
          type="primary"
          @click="handleCreate"
          v-auth="InspectButtonEnum.MaterialPreRegistrationAdd"
          >新增</a-button
        >
        <a-button
          type="primary"
          @click="handleUpdate"
          v-auth="InspectButtonEnum.MaterialPreRegistrationUpdate"
          >编辑</a-button
        >
        <a-button
          type="primary"
          @click="handleReview"
          v-auth="InspectButtonEnum.MaterialPreRegistrationReview"
          >复核</a-button
        >
        <a-button
          type="primary"
          @click="handleCancelReview"
          v-auth="InspectButtonEnum.MaterialPreRegistrationUnReview"
          >取消复核</a-button
        >

        <a-button
          type="primary"
          @click="handleUpdateDate"
          v-auth="InspectButtonEnum.MaterialPreRegistrationUpdateDate"
          >登记使用截止日期</a-button
        >
      </template>
    </BasicTable>
    <FormModal @register="registerModal" @success="success" />
    <DateFormModal @register="registerDateModal" @success="success" />
    <Modal
      :open="open"
      @cancel="open = false"
      @ok="handleSubmit"
      okText="提交"
      width="300px"
      :confirmLoading="confirmLoading"
      title="撤销原因'"
    >
      <div class="m-20px">
        <BasicForm @register="registerForm" />
      </div>
    </Modal>
  </PageWrapper>
</template>
<script setup lang="ts">
  import { BasicTable, useTable } from '@/components/Table';
  import { PageWrapper } from '@/components/Page';
  import { useModal } from '@/components/Modal';
  import { columns, searchSchema } from './materialPreRegistration.data';
  import { message, Modal } from 'ant-design-vue';
  import FormModal from './formModal.vue';
  import DateFormModal from './dateFormModal.vue';
  import { ref } from 'vue';
  import { BasicForm, useForm } from '@/components/Form';
  import { getListApi, reviewApi, cancelReviewApi } from '@/api/inspect/materialPreRegistration';
  import { InspectButtonEnum } from '@/enums/authCodeEnum';
  import { useMessage } from '@/hooks/web/useMessage';

  defineOptions({ name: 'MaterialPreRegistration' });

  const open = ref(false);
  const confirmLoading = ref(false);

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
  const [registerModal, { openModal }] = useModal();
  const [registerDateModal, { openModal: openDateModal }] = useModal();

  const [registerTable, { getSelectRows, clearSelectedRowKeys, reload }] = useTable({
    api: getListApi,
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    scroll: { x: 0 },
    columns: columns,
    formConfig: { schemas: searchSchema },
    useSearchForm: true,
    size: 'small',
    showTableSetting: false,
    bordered: true,
    rowSelection: { type: 'radio' },
    afterFetch: (res) => {
      clearSelectedRowKeys();
      return res;
    },
  });
  function getSelections(onlyOne: boolean, callBack?: Function) {
    const rows = getSelectRows();
    if (rows.length === 0) {
      message.warning('请选择一条数据');
      return [];
    } else if (rows.length > 1 && onlyOne) {
      message.warning('只能选择一条数据');
      return [];
    }
    rows.length && callBack?.(rows);
    return rows;
  }
  function handleCreate() {
    openModal(true, { isUpdate: false, data: {} });
  }
  function handleUpdate() {
    getSelections(true, ([row]) => {
      openModal(true, { data: row, isUpdata: true });
    });
  }
  function handleUpdateDate() {
    getSelections(true, ([row]) => {
      if (row.deadline) return message.warning('已登记使用截止日期');
      openDateModal(true, { data: row });
    });
  }
  function success() {
    clearSelectedRowKeys();
    reload();
  }

  const { createConfirm } = useMessage();

  function handleReview() {
    getSelections(true, ([row]) => {
      createConfirm({
        iconType: 'warning',
        content: '确认复核【' + row.projectName + row.testType + '】?',
        onOk: async () => {
          await reviewApi({ id: row.id });
          clearSelectedRowKeys();
          await reload();
        },
      });
    });
  }
  function handleCancelReview() {
    getSelections(true, () => {
      open.value = true;
      resetFields();
      clearValidate();
    });
  }
  async function handleSubmit() {
    const { cause } = await validate();
    const [row] = getSelections(true);
    try {
      confirmLoading.value = true;
      await cancelReviewApi({ id: row.id, cause });
      open.value = false;
      message.success('取消复核成功');
      await reload();
    } finally {
      confirmLoading.value = false;
    }
  }
</script>
