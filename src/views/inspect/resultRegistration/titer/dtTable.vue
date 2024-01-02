<template>
  <div class="h-full">
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleEdit" v-if="checkResult">编辑</a-button>
      </template>
    </BasicTable>
    <BasicDrawer
      v-bind="$attrs"
      @register="registerDrawer"
      showFooter
      title="效价结果编辑"
      width="400px"
      @ok="handleSubmit"
    >
      <BasicForm @register="registerForm" />
      <Login :open="open" @cancel="cancel" @login="login" />
    </BasicDrawer>
  </div>
</template>
<script setup lang="ts">
  import { BasicTable, useTable } from '@/components/Table';
  import { message } from 'ant-design-vue';
  import { dtColumns, dtSearchSchema } from './data';
  import { BasicDrawer, useDrawer } from '@/components/Drawer';
  import { BasicForm, useForm } from '@/components/Form';
  import Login from '@/components/BusinessDrawer/login/index.vue';
  import { ref } from 'vue';
  import { getCheckItemDtListApi, updateTiterCheckApi } from '@/api/inspect/resultRegistration';

  const open = ref(false);
  const props = defineProps({
    checkResult: {
      type: String,
      default: '',
    },
    projectId: {
      type: String,
      default: '',
    },
    bsNo: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: '',
    },
  });
  let userData = {};
  const [registerDrawer, { openDrawer }] = useDrawer();
  const [registerForm, { setFieldsValue, validate }] = useForm({
    labelWidth: 80,
    baseColProps: { span: 24 },
    schemas: [
      {
        required: true,
        field: 'conclusion',
        component: 'Input',
        label: '效价结果',
      },
      {
        required: true,
        field: 'account',
        component: 'InputSearch',
        label: '复核人',
        componentProps: {
          'enter-button': '登录',
          onSearch: () => {
            open.value = true;
          },
        },
      },
      {
        required: true,
        field: 'reason',
        component: 'Input',
        label: '编辑原因',
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
    formConfig: {
      labelWidth: 90,
      baseColProps: { span: 12 },
      schemas: dtSearchSchema,
    },
    rowKey: 'sampleId',
    columns: dtColumns(props.checkResult),
    size: 'small',
    useSearchForm: !!props.checkResult,
    showTableSetting: false,
    bordered: true,
    isCanResizeParent: true,
    rowSelection: props.checkResult ? { type: 'checkbox' } : void 0,
    beforeFetch: (p) => ({ ...p, projectId: props.projectId, bsNo: props.bsNo, type: props.type }),
    afterFetch: (res) => {
      clearSelectedRowKeys();
      return res;
    },
  });
  async function handleSubmit() {
    const { conclusion, reason } = (await validate()) as any;
    const { username, userId } = userData as any;
    const [row] = getSelectRows();
    await updateTiterCheckApi([
      {
        conclusion,
        reason,
        checker: userId,
        checkeName: username,
        bsNo: props.bsNo,
        sampleId: row.sampleId,
      },
    ]);
    reload();
    openDrawer(false);
  }
  function handleEdit() {
    const rows = getSelectRows();
    if (rows.length === 0) return message.warning('请选择一条数据');
    openDrawer(true);
  }
  function cancel() {
    open.value = false;
  }
  function login(data) {
    setFieldsValue({ account: data.username });
    userData = data;
    open.value = false;
  }
</script>
