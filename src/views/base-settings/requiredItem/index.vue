<template>
  <PageWrapper dense contentFullHeight fixedHeight class="p-16px">
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button
          type="primary"
          @click="handleCreate"
          v-auth="BaseSettingButtonEnum.RequiredItemAdd"
          >新增</a-button
        >
        <a-button
          type="primary"
          @click="handleUpdate"
          v-auth="BaseSettingButtonEnum.RequiredItemUpdate"
          >编辑</a-button
        >
        <a-button
          type="primary"
          @click="handleDelete"
          v-auth="BaseSettingButtonEnum.RequiredItemDelete"
          >删除</a-button
        >
      </template>
    </BasicTable>
    <FormModal @register="registerModal" @success="success" />
    <BasicModal
      @register="registerCancelModal"
      title="删除"
      okText="提交"
      width="400px"
      @ok="handleSubmit"
    >
      <BasicForm @register="registerForm" />
    </BasicModal>
    <LoginModal
      @register="registerLogin"
      @success="handleLoginSuccess"
      :auth-code="ReCheckButtonEnum.RequiredItemCheck"
    />
  </PageWrapper>
</template>
<script setup lang="ts">
  import { BasicTable, useTable } from '@/components/Table';
  import { PageWrapper } from '@/components/Page';
  import { useModal, BasicModal } from '@/components/Modal';
  import { columns, sampleTypeSchema } from './requiredItem.data';
  import { message } from 'ant-design-vue';
  import FormModal from './formModal.vue';
  import { ref } from 'vue';
  import { BasicForm, useForm } from '@/components/Form';
  import { getListApi, removeApi } from '@/api/base-settings/requiredItem';
  import { ReCheckButtonEnum, BaseSettingButtonEnum } from '@/enums/authCodeEnum';
  import LoginModal from '@/__components/ReviewLoginModal/index.vue';

  defineOptions({ name: 'RequiredItem' });

  const userId = ref('');

  const [registerLogin, { openModal: openLoginModal }] = useModal();
  const [registerCancelModal, { openModal: openCancelModal, setModalProps }] = useModal();

  const [registerForm, { resetFields, clearValidate, validate, setFieldsValue }] = useForm({
    labelWidth: 80,
    baseColProps: { span: 24 },
    schemas: [
      {
        field: 'reviewName',
        label: '复核人',
        component: 'InputSearch',
        componentProps: {
          'enter-button': '登录',
          placeholder: '请点击登录按钮',
          readonly: true,
          onSearch: handleLogin,
        },
        required: true,
      },
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
    formConfig: {
      schemas: [{ ...sampleTypeSchema, required: false }],
    },
    rowSelection: { type: 'radio' },
    afterFetch: (res) => {
      clearSelectedRowKeys();
      return res;
    },
  });
  function handleLogin() {
    openLoginModal(true);
  }
  function handleLoginSuccess(name: string, userInfo: any) {
    userId.value = userInfo.userId;
    setFieldsValue({ reviewName: userInfo.username });
  }

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
    openModal(true, {});
  }
  function handleUpdate() {
    getSelections(true, ([row]) => {
      openModal(true, { ...row });
    });
  }
  function handleDelete() {
    getSelections(true, () => {
      openCancelModal(true);
      resetFields();
      clearValidate();
    });
  }
  async function handleSubmit() {
    const values = await validate();
    const [row] = getSelections(true);
    try {
      setModalProps({ confirmLoading: true });
      await removeApi({
        ...values,
        reviewNo: userId.value,
        rawImm: row.rawImmEnum,
        sampleType: row.sampleTypeEnum,
      } as any);
      message.success('删除成功');
      reload();
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
  function success() {
    clearSelectedRowKeys();
    reload();
  }
</script>
