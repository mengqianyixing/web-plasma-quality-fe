<!--
 * @Descripttion: 
 * @version: 
 * @Author: zcc
 * @Date: 2024-01-02 13:43:33
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-03 09:48:50
-->
<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="projectName + '不合格登记'"
    width="400px"
    cancelText="关闭"
    okText="提交&关闭"
    @close="close"
    @ok="handleSubmit(true)"
  >
    <template #appendFooter>
      <a-button type="primary" @click="handleSubmit(false)" :loading="loading">提交&继续</a-button>
    </template>
    <BasicForm @register="registerForm" />
    <Login :open="open" @cancel="cancel" @login="login" />
  </BasicDrawer>
</template>
<script setup lang="ts">
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { BasicForm, useForm } from '@/components/Form';
  import { formSchemaMap, notCheckFormSchema, checkItemMappding } from './data';
  import Login from '@/components/BusinessDrawer/login/index.vue';
  import { ref } from 'vue';
  import { summitUnqualifiedApi } from '@/api/inspect/resultRegistration';
  import { message } from 'ant-design-vue';

  const open = ref(false);
  const loading = ref(false);

  let projectName = ref('');
  let pid = '';
  let bsno = '';
  let userData = {};
  let fieldList: string[] = [];
  const emit = defineEmits(['close', 'confirm']);
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
  const [registerDrawer, { setDrawerProps }] = useDrawerInner(
    async ({ projectAbbr, projectId, bsNo }) => {
      pid = projectId;
      bsno = bsNo;
      reloadPage();
      projectName.value = projectAbbr;
      const formSchemaList = [...notCheckFormSchema];
      formSchemaList.splice(1, 0, ...formSchemaMap[checkItemMappding[projectAbbr]]);
      fieldList = formSchemaList.map((_) => _.field);
      appendSchemaByField(formSchemaList, 'sampleId');
      updateSchema({
        field: 'account',
        componentProps: {
          'enter-button': '登录',
          onSearch: () => {
            open.value = true;
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
  async function handleSubmit(close: boolean) {
    const { sampleId, unqualified, od, cutoff, ct } = await validate();
    const { username, userId } = userData as any;
    try {
      setDrawerProps({ confirmLoading: true });
      loading.value = true;
      await summitUnqualifiedApi({
        sampleId,
        unqualified,
        od,
        cutoff,
        ct,
        bsNo: bsno,
        checker: userId,
        checkeName: username,
        projectIds: [pid],
      });
      message.success(sampleId + '登记成功');
      if (close === false) {
        reloadPage();
      } else {
        emit('confirm');
      }
    } finally {
      loading.value = false;
      setDrawerProps({ confirmLoading: false });
    }
  }
  function cancel() {
    open.value = false;
  }
  function login(data) {
    userData = data;
    setFieldsValue({ account: data.username });
    open.value = false;
  }
</script>
