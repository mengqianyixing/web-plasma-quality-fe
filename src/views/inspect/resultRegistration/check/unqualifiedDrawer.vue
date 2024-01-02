<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    title="不合格登记"
    width="400px"
    @close="close"
    @ok="handleSubmit"
    :cancel-button-props="{ text: '关闭' }"
  >
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

  const open = ref(false);
  let userData = {};
  let fieldList: string[] = [];
  const [
    registerForm,
    { appendSchemaByField, removeSchemaByField, updateSchema, setFieldsValue, validate },
  ] = useForm({
    labelWidth: 120,
    baseColProps: { span: 24 },
    schemas: [],
    showActionButtonGroup: false,
  });
  const [registerDrawer] = useDrawerInner(async ({ projectAbbr }) => {
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
  });
  function close() {
    removeSchemaByField(fieldList);
  }
  async function handleSubmit() {
    const { sampleId, unqualified, od, cutoff, ct } = await validate();
    const { username, userId } = userData as any;
    await summitUnqualifiedApi({
      sampleId,
      unqualified,
      od,
      cutoff,
      ct,
      checker: userId,
      checkeName: username,
    });
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
