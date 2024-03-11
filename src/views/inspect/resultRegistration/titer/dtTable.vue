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
      <Login
        @register="registerLoginModal"
        @success="login"
        :auth-code="ReCheckButtonEnum.ResultRegistrationTiter"
      />
    </BasicModal>
  </div>
</template>
<script setup lang="ts">
  import { BasicTable, useTable } from '@/components/Table';
  import { message } from 'ant-design-vue';
  import { dtColumns, dtSearchSchema } from './data';
  import { BasicModal, useModal } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form';
  import Login from '@/__components/ReviewLoginModal/index.vue';
  import { nextTick } from 'vue';
  import { getCheckItemDtListApi, updateTiterCheckApi } from '@/api/inspect/resultRegistration';
  import { SERVER_ENUM } from '@/enums/serverEnum';
  import { useServerEnumStoreWithOut } from '@/store/modules/serverEnums';
  import { ReCheckButtonEnum } from '@/enums/authCodeEnum';

  const serverEnumStore = useServerEnumStoreWithOut();
  const PlasmaType = serverEnumStore.getServerEnumText(SERVER_ENUM.PlasmaType);

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
    plasmaType: {
      type: String,
      default: '',
    },
    pv: {
      type: Number,
      default: 0,
    },
  });
  let userData = {};

  const [registerLoginModal, { openModal: openLoginModal }] = useModal();
  const [registerModal, { openModal }] = useModal();
  const [registerForm, { setFieldsValue, validate, updateSchema, resetFields, clearValidate }] =
    useForm({
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
          field: 'titerValue',
          component: 'InputNumber',
          label: '效价结果',
          componentProps: {
            min: 0,
            formatter: (n: string) => {
              if (/\.[0-9]{2}/.test(n)) return n.replace(/([0-9]+\.[0-9]{1,1})[0-9]+/, '$1');
              return n;
            },
          },
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
              openLoginModal(true, {});
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
  function formatter(n: string) {
    const { pv } = props;
    const reg1 = new RegExp(`[.]{1,1}[0-9]{${pv + 1}}`);
    const reg2 = new RegExp(`([0-9]+[.]{1,1}[0-9]{${pv},${pv}})[0-9]+`);
    if (reg1.test(n)) return n.replace(reg2, '$1');
    return n;
  }
  async function handleSubmit() {
    const { conclusion, reason, titerValue } = (await validate()) as any;
    const { username, userId } = userData as any;
    const [row] = getSelectRows();
    await updateTiterCheckApi({
      reason,
      checkeName: username,
      conclusion,
      checker: userId,
      bsNo: props.bsNo,
      sampleNo: row.sampleNo,
      titerValue,
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
    updateSchema([
      {
        field: 'conclusion',
        componentProps: {
          options: serverEnumStore.getServerEnum(SERVER_ENUM.TiterLevel).map((it) => ({
            value: it.value === 'N' ? it.value : props.plasmaType + it.value,
            label: it.value === 'N' ? it.label : PlasmaType(props.plasmaType) + it.label,
          })),
        },
      },
      {
        field: 'titerValue',
        componentProps: {
          formatter,
        },
      },
    ]);
    resetFields();
    setFieldsValue(row);
    clearValidate();
  }

  function login(username, data) {
    setFieldsValue({ account: data.username });
    userData = data;
  }
</script>
