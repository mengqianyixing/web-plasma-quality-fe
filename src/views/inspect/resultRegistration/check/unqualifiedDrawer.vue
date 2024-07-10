<!--
 * @Descripttion:
 * @version:
 * @Author: zcc
 * @Date: 2024-01-02 13:43:33
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-22 18:45:57
-->
<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    showFooter
    :title="projectName + '不合格登记'"
    width="400px"
    cancelText="关闭"
    okText="提交"
    @cancel="close"
    @ok="handleSubmit(true)"
  >
    <BasicForm @register="registerForm" />
    <Login
      @register="registerLoginModal"
      @success="login"
      :auth-code="ReCheckButtonEnum.ResultRegistrationCheck"
    />
  </BasicModal>
</template>
<script setup lang="ts">
  import { BasicModal, useModalInner, useModal } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form';
  import { formSchemaMap, notCheckFormSchema, methodsMappding } from './data';
  import Login from '@/__components/ReviewLoginModal/index.vue';
  import { ref } from 'vue';
  import { summitUnqualifiedApi } from '@/api/inspect/resultRegistration';
  import { message } from 'ant-design-vue';
  import { ReCheckButtonEnum } from '@/enums/authCodeEnum';

  const loading = ref(false);

  let projectName = ref('');
  let pid = '';
  let bsno = '';
  let pv = 0;
  let userData: Recordable = {};
  let fieldList: string[] = [];
  const emit = defineEmits(['close', 'confirm']);
  const [registerLoginModal, { openModal: openLoginModal }] = useModal();
  const [
    registerForm,
    {
      appendSchemaByField,
      removeSchemaByField,
      updateSchema,
      setFieldsValue,
      validate,
      resetFields,
      clearValidate,
    },
  ] = useForm({
    labelWidth: 120,
    baseColProps: { span: 24 },
    schemas: [],
    showActionButtonGroup: false,
  });
  const [registerModal, { setModalProps }] = useModalInner(
    async ({ projectAbbr, projectId, bsNo, methodAbbr, priceValidBit }) => {
      pv = priceValidBit;
      pid = projectId;
      bsno = bsNo;
      reloadPage();
      projectName.value = projectAbbr;
      const formSchemaList = [...notCheckFormSchema];
      formSchemaList.splice(
        1,
        0,
        ...formSchemaMap[methodsMappding[methodAbbr]].map((it) => ({
          ...it,
          rules: [{ validator: numValidator }],
        })),
      );
      fieldList = formSchemaList.map((_) => _.field);
      appendSchemaByField(formSchemaList, 'sampleNo');
      updateSchema({
        field: 'account',
        componentProps: {
          'enter-button': '登录',
          placeholder: '请点击登录按钮',
          readonly: true,
          onSearch: () => {
            openLoginModal(true, {});
          },
        },
      });
    },
  );
  function isValidNumber(input: string) {
    const regex = /^-?\d+(\.\d+)?$/;
    return regex.test(input);
  }
  function numValidator(_, value: string) {
    if (!value) return Promise.resolve();
    if (!isValidNumber(value)) return Promise.reject('请输入正确的数值');
    if (parseFloat(value) < 0) return Promise.reject('不能输入负数');
    if ((value.split('.')[1] || '').length !== pv) return Promise.reject('请保留' + pv + '位小数');
    return Promise.resolve();
  }
  function close() {
    removeSchemaByField(fieldList);
    emit('close');
  }
  function reloadPage() {
    resetFields();
    clearValidate();
  }
  async function handleSubmit(isClose: boolean) {
    const { sampleNo, unqualified, od, cutoff, ct } = await validate();
    const { username, userId } = userData as any;
    try {
      setModalProps({ confirmLoading: true });
      loading.value = true;
      await summitUnqualifiedApi({
        sampleNo,
        unqualified,
        od,
        cutoff,
        ct,
        bsNo: bsno,
        checker: userId,
        checkName: username,
        projectIds: [pid],
      });
      message.success(sampleNo + '登记成功');
      if (isClose === false) {
        reloadPage();
        setFieldsValue({ account: userData.username });
      } else {
        close();
        emit('confirm');
      }
    } finally {
      loading.value = false;
      setModalProps({ confirmLoading: false });
    }
  }

  function login(userName, data) {
    userData = data;
    setFieldsValue({ account: data.username });
  }
</script>
