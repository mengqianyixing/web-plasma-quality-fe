<!--
 * @Descripttion:
 * @version:
 * @Author: zcc
 * @Date: 2024-01-26 14:02:29
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-30 10:54:05
-->
<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button
          type="primary"
          @click="handleReview"
          v-auth="QuarantineButtonEnum.OverdueConfirmationConfim"
          >确认</a-button
        >
      </template>
    </BasicTable>
    <BasicModal
      @register="registerConfirmModal"
      title="超一年确认"
      okText="提交"
      width="300px"
      @ok="handleSubmit"
    >
      <BasicForm @register="registerForm" />
    </BasicModal>
    <Login
      @register="registerLoginModal"
      @success="login"
      :auth-code="ReCheckButtonEnum.OverdueConfirmationCheck"
    />
  </PageWrapper>
</template>
<script setup lang="ts">
  import { BasicTable, useTable } from '@/components/Table';
  import { PageWrapper } from '@/components/Page';
  import { message } from 'ant-design-vue';
  import { columns, searchFormSchema } from './overdue-confirmation.data';
  import { getListApi, submitConfirmApi } from '@/api/quarantine/overdue-confirmation';
  import { QuarantineButtonEnum, ReCheckButtonEnum } from '@/enums/authCodeEnum';
  import { useModal, BasicModal } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form';
  import Login from '@/__components/ReviewLoginModal/index.vue';

  defineOptions({ name: 'OverdueConfirmation' });

  const [registerTable, { getSelectRows, clearSelectedRowKeys, reload }] = useTable({
    api: getListApi,
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    columns: columns,
    size: 'small',
    useSearchForm: true,
    showTableSetting: false,
    bordered: true,
    rowSelection: { type: 'radio' },
    afterFetch: (res) => {
      clearSelectedRowKeys();
      return res;
    },
    formConfig: {
      schemas: searchFormSchema,
    },
  });

  const [registerLoginModal, { openModal: openLoginModal }] = useModal();
  const [registerConfirmModal, { openModal: openConfirmModal, setModalProps }] = useModal();

  const [registerForm, { validate, setFieldsValue, resetFields }] = useForm({
    labelWidth: 80,
    baseColProps: { span: 24 },
    schemas: [
      {
        field: 'reviewer',
        component: 'InputSearch',
        label: '复核人',
        required: true,
        componentProps: {
          'enter-button': '登录',
          placeholder: '请点击登录按钮',
          readonly: true,
          onSearch: () => {
            openLoginModal(true, {});
          },
        },
      },
    ],
    showActionButtonGroup: false,
  });
  function login(userName, data) {
    setFieldsValue({ reviewer: data.username });
  }
  async function handleSubmit() {
    const rows = getSelectRows();
    const values = await validate();
    const [row] = rows;
    setModalProps({ confirmLoading: true });
    try {
      await submitConfirmApi({ bagNo: row.bagNo, reviewer: values.reviewer });
      message.success('确认成功');
      clearSelectedRowKeys();
      await reload();
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
  function handleReview() {
    const rows = getSelectRows();
    if (rows.length === 0) return message.warning('请选择数据');
    const [row] = rows;
    if (row.creator) return message.warning('请选择【未确认】的数据');
    openConfirmModal(true);
    resetFields();
  }
</script>
