<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    title="接收暂停记录"
    @cancel="closeModalThis"
    :maskClosable="false"
    width="85%"
  >
    <BasicForm @register="registerForm">
      <template #check="{ model, field }">
        <a-input
          disabled
          placeholder="请点击登录"
          v-model:value="model[field]"
          style="width: calc(100% - 80px)"
        />
        <a-button type="primary" @click="handleLogin" class="ml-3">登录</a-button>
      </template>
    </BasicForm>
    <BasicTable @register="registerTable" />
  </BasicModal>
  <LoginModal @register="registerLoginModal" @success="handleSuccess" />
</template>

<script setup lang="tsx">
  import { useModalInner, useModal } from '@/components/Modal';
  import { BasicTable, useTable } from '@/components/Table';
  import { BasicForm, useForm, FormSchema } from '@/components/Form';
  import BasicModal from '@/components/Modal/src/BasicModal.vue';
  import LoginModal from '@/__components/ReviewLoginModal/index.vue';
  import { plasmaPauseBoxList } from '@/api/inbound-management/accept-plasma';
  import { receivePause } from '@/api/inbound-management/receive-plasma';
  import dayjs from 'dayjs';
  import { ref } from 'vue';
  import { useMessage } from '@/hooks/web/useMessage';
  import { useUserStore } from '@/store/modules/user';

  const { createMessage } = useMessage();
  const { success } = createMessage;

  const emit = defineEmits(['clearInfo', 'goon']);
  const userInfo = useUserStore();

  const [registerModal, { closeModal, setModalProps }] = useModalInner((data) => {
    setModalProps({
      showCancelBtn: false,
      showOkBtn: false,
    });
    setFieldsValue({
      batchNo: data.batchNo,
    });
    setTimeout(() => {
      reload();
    });
  });
  function closeModalThis() {
    closeModal();
    setFieldsValue({
      checker: '',
      remark: '',
    });
    clearValidate();
  }

  const formSchema: FormSchema[] = [
    {
      field: 'batchNo',
      label: '血浆批号',
      component: 'Input',
      componentProps: { disabled: true },
      required: true,
    },
    {
      field: 'checker',
      component: 'InputGroup',
      slot: 'check',
      label: '复核人',
      required: true,
    },
    {
      field: 'remark',
      component: 'InputTextArea',
      label: '备注',
      colProps: { span: 8 },
      required: true,
    },
  ];
  const pauseLoading = ref(false);
  const resumeLoading = ref(false);
  const [registerForm, { setFieldsValue, getFieldsValue, validate, clearValidate }] = useForm({
    labelWidth: 80,
    schemas: formSchema,
    showActionButtonGroup: true,
    showResetButton: true,
    resetButtonOptions: { text: '提交暂停', loading: pauseLoading },
    resetFunc: submitReceivePause,
    showSubmitButton: true,
    submitButtonOptions: { text: '继续', loading: resumeLoading },
    submitFunc: submitResume,
  });

  // 表格列
  const columns = [
    {
      title: '接收人',
      dataIndex: 'creater',
    },
    {
      title: '复核人',
      dataIndex: 'reviewer',
    },
    {
      title: '暂停操作时间',
      dataIndex: 'createAt',
      customRender: ({ text }) => {
        if (text) {
          return dayjs(text).format('YYYY-MM-DD HH:mm:ss');
        }
        return '';
      },
    },
    {
      title: '继续操作时间',
      dataIndex: 'freeAt',
      customRender: ({ text }) => {
        if (text) {
          return dayjs(text).format('YYYY-MM-DD HH:mm:ss');
        }
        return '';
      },
    },
    {
      title: '继续操作人',
      dataIndex: 'freedBy',
    },
    {
      title: '继续复核人',
      dataIndex: 'reviewBy',
    },
  ];
  const selectedRow = ref<any>([]);
  const [registerTable, { reload }] = useTable({
    api: plasmaPauseBoxList,
    searchInfo: {},
    columns,
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    beforeFetch: () => {
      const data = getFieldsValue();
      return { batchNo: data.batchNo, pattern: 'BCH', pauseType: 'ACC' };
    },
    rowSelection: {
      type: 'radio',
      onChange: (_, selectedRows: any) => {
        selectedRow.value = selectedRows;
      },
      getCheckboxProps: (record) => ({
        disabled:
          !!record.freedBy ||
          (userInfo.getUserInfo.username && record.creater != userInfo.getUserInfo.username), // 有继续人 || 接收人和已登录账户不一致不可操作
      }),
    },
    clickToRowSelect: false,
    size: 'small',
    immediate: false,
    striped: false,
    handleSearchInfoFn(info) {
      console.log('handleSearchInfoFn', info);
      return info;
    },
    bordered: true,
    showIndexColumn: false,
    canResize: false,
  });

  const [registerLoginModal, { openModal }] = useModal();

  // 提交暂停
  async function submitReceivePause() {
    await validate();
    const data = getFieldsValue();
    const params = {
      batchNo: data.batchNo,
      checker: data.checker,
      remark: data.remark,
      state: 'PAUSE',
      type: 'ACC',
    };
    pauseLoading.value = true;
    try {
      const res = await receivePause(params);
      if (res === null) {
        success('暂停成功!');
        closeModalThis();
        emit('clearInfo');
      }
    } finally {
      pauseLoading.value = false;
    }
  }
  // 提交继续
  async function submitResume() {
    await validate();
    const data = getFieldsValue();
    const params = {
      batchNo: data.batchNo,
      checker: data.checker,
      remark: data.remark,
      state: 'RESTORE',
      type: 'ACC',
    };
    resumeLoading.value = true;
    try {
      const res = await receivePause(params);
      if (res === null) {
        success('继续成功!');
        setFieldsValue({
          remark: '',
        });
        emit('goon');
        closeModal();
        selectedRow.value = [];
        clearValidate();
      }
    } finally {
      resumeLoading.value = false;
    }
  }

  // 点击登录按钮
  function handleLogin() {
    openModal(true);
  }

  // 登录成功事件
  function handleSuccess(nickname: string) {
    setFieldsValue({
      checker: nickname,
    });
  }
</script>
