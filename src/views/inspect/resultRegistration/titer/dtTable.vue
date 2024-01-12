<template>
  <div class="h-full">
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleEdit" v-if="checkResult">编辑</a-button>
      </template>
    </BasicTable>
    <BasicModal
      v-bind="$attrs"
      @register="registerModal"
      showFooter
      title="效价结果编辑"
      width="400px"
      @ok="handleSubmit"
    >
      <BasicForm @register="registerForm" />
      <Login :open="open" @cancel="cancel" @login="login" />
    </BasicModal>
  </div>
</template>
<script setup lang="ts">
  import { BasicTable, useTable } from '@/components/Table';
  import { message } from 'ant-design-vue';
  import { dtColumns, dtSearchSchema } from './data';
  import { BasicModal, useModal } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form';
  import Login from '@/components/BusinessDrawer/login/index.vue';
  import { ref, nextTick } from 'vue';
  import { getCheckItemDtListApi, updateTiterCheckApi } from '@/api/inspect/resultRegistration';
  import { PLASMA_TYPE_TEXT } from '@/enums/inspectEnum';

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
  const [registerModal, { openModal }] = useModal();
  const [registerForm, { setFieldsValue, validate, updateSchema }] = useForm({
    labelWidth: 80,
    baseColProps: { span: 24 },
    schemas: [
      {
        required: true,
        field: 'conclusion',
        component: 'Select',
        label: '效价结果',
        componentProps: {},
      },
      {
        required: true,
        field: 'account',
        component: 'InputSearch',
        label: '复核人',
        componentProps: {
          'enter-button': '登录',
          placeholder: '请点击登录按钮',
          readonly: true,
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
    rowKey: 'sampleNo',
    columns: dtColumns(props.checkResult),
    size: 'small',
    useSearchForm: !!props.checkResult,
    showTableSetting: false,
    bordered: true,
    isCanResizeParent: true,
    rowSelection: props.checkResult ? { type: 'radio' } : void 0,
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
    await updateTiterCheckApi({
      reason,
      checkeName: username,
      conclusion,
      checker: userId,
      bsNo: props.bsNo,
      sampleNo: row.sampleNo,
    });
    reload();
    openModal(false);
  }
  async function handleEdit() {
    const rows = getSelectRows();
    if (rows.length === 0) return message.warning('请选择一条数据');
    const [row] = rows;
    openModal(true);
    await nextTick();
    updateSchema({
      field: 'conclusion',
      componentProps: {
        options: [
          {
            label: PLASMA_TYPE_TEXT[row.plasmaType] + '高效价',
            value: PLASMA_TYPE_TEXT[row.plasmaType] + '高效价',
          },
          {
            label: PLASMA_TYPE_TEXT[row.plasmaType] + '低效价',
            value: PLASMA_TYPE_TEXT[row.plasmaType] + '低效价',
          },
          { label: '合格普通浆', value: '合格普通浆' },
        ],
      },
    });
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
