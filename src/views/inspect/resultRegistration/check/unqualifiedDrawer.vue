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
    async ({ projectAbbr, projectId, bsNo, methodAbbr }) => {
      pid = projectId;
      bsno = bsNo;
      reloadPage();
      projectName.value = projectAbbr;
      const formSchemaList = [...notCheckFormSchema];
      formSchemaList.splice(1, 0, ...formSchemaMap[methodsMappding[methodAbbr]]);
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
        checkeName: username,
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
