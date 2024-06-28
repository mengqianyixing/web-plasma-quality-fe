<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    width="85%"
    :min-height="700"
    :showOkBtn="false"
    :title="`暂停${searchForm.pattern === 'BOX' ? '箱' : '批'}记录`"
  >
    <div class="relative h-inherit max-h-inherit min-h-inherit">
      <div class="absolute w-full h-full">
        <BasicForm @register="registerForm" />
      </div>
      <div class="float-right mr-[420px] mb-5">
        <a-button type="primary" @click="confirm" :loading="submitLoading"> 暂停 </a-button>
      </div>

      <div class="flex-1 shrink-1" style="height: calc(100% - 170px)">
        <BasicTable @register="registerTable" :columns="columns">
          <template #toolbar>
            <a-button type="primary" @click="clickResume" :loading="resumeLoading">继续</a-button>
          </template>
        </BasicTable>
      </div>
    </div>
    <LoginModal
      @register="registerLoginModal"
      @success="handleSuccess"
      :auth-code="ReCheckButtonEnum.PlasmaSuspendCheck"
    />
  </BasicModal>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import dayjs from 'dayjs';
  import {
    plasmaPauseBox,
    plasmaPauseBoxList,
    plasmaPauseBatch,
  } from '@/api/inbound-management/accept-plasma';
  import LoginModal from '@/__components/ReviewLoginModal/index.vue';
  import { useModal, BasicModal, useModalInner } from '@/components/Modal';

  import { useMessage } from '@/hooks/web/useMessage';
  import { ReCheckButtonEnum } from '@/enums/authCodeEnum';
  import { BasicForm, useForm } from '@/components/Form';
  import { useTable, BasicTable } from '@/components/Table';
  import {
    PostApiCoreBatchPlasmaVerifyBatchPauseRequest,
    PostApiCoreBatchPlasmaVerifyBoxPauseRequest,
  } from '@/api/type/batchManage';

  const { createMessage } = useMessage();
  const { success, warning } = createMessage;

  const emit = defineEmits(['close', 'clearInfo', 'refresh-data', 'register']);
  const searchForm = ref<SearchForm>({
    batchNo: '',
    boxNo: '',
    remark: '',
    checker: '',
    pattern: '',
  });

  const columns = ref([
    {
      title: '验收人',
      dataIndex: 'creater',
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
  ]);

  const [register, { setModalProps, closeModal }] = useModalInner((data) => {
    resetFields();
    columns.value = [
      {
        title: '验收人',
        dataIndex: 'creater',
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
    ];
    setModalProps({
      maskClosable: false,
      destroyOnClose: true,
    });

    if (data.pattern === 'BOX') {
      appendSchemaByField(
        {
          label: '血浆箱号',
          field: 'boxNo',
          component: 'Input',
        },
        'batchNo',
      );

      columns.value.unshift(
        {
          title: '托盘编号',
          dataIndex: 'trayNo',
        },
        {
          title: '血浆箱号',
          dataIndex: 'boxNo',
        },
        {
          title: '当前状态',
          dataIndex: 'state',
          customRender: ({ text }) => {
            return boxSuspendEnum[text];
          },
        },
      );
    } else if (data.pattern === 'BCH') {
      appendSchemaByField(
        {
          field: 'checker',
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
        'batchNo',
      );
      updateSchema({
        field: 'remark',
        required: true,
      });
      columns.value.splice(1, 0, {
        title: '复核人',
        dataIndex: 'reviewer',
      });
      columns.value.splice(
        3,
        0,
        {
          title: '继续操作人',
          dataIndex: 'freedBy',
        },
        {
          title: '继续复核人',
          dataIndex: 'reviewBy',
        },
      );
    }

    searchForm.value = {
      ...data,
    };
    setFieldsValue({
      ...data,
    });

    reload();
  });

  const [
    registerForm,
    { validate, resetFields, setFieldsValue, updateSchema, appendSchemaByField },
  ] = useForm({
    showActionButtonGroup: false,
    labelWidth: 80,
    schemas: [
      {
        field: 'batchNo',
        component: 'Input',
        label: '血浆批号',
        required: true,
      },
      {
        label: '备注',
        field: 'remark',
        component: 'InputTextArea',
        componentProps: {
          rows: 1,
        },
        colProps: {
          span: 7,
        },
      },
      {
        label: '类型',
        field: 'type',
        defaultValue: 'VER',
        component: 'Input',
        show: false,
      },
    ],
  });

  const tableSelected = ref<any[]>([]);
  const [registerTable, { reload }] = useTable({
    api: plasmaPauseBoxList,
    beforeFetch: (params) => {
      return {
        ...params,
        batchNo: searchForm.value.batchNo || null,
        pattern: searchForm.value.pattern,
        pauseType: 'VER',
      };
    },
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    rowClassName(record: Recordable) {
      if (searchForm.value.pattern === 'BOX') {
        return boxSuspendEnum[record?.state] !== '已暂停'
          ? 'pointer-events-none cursor-not-allowed'
          : '';
      } else {
        return record?.freedBy ? 'pointer-events-none cursor-not-allowed' : '';
      }
    },
    rowSelection: {
      type: 'radio',
      onChange: (_, selectedRows: any[]) => {
        tableSelected.value = selectedRows;
      },
      getCheckboxProps: (record: any) => ({
        disabled:
          searchForm.value.pattern == 'BCH'
            ? !!record.freedBy
            : searchForm.value.pattern == 'BOX'
              ? boxSuspendEnum[record.state] != '已暂停'
              : undefined,
      }),
    },
    clickToRowSelect: true,
    pagination: false,
    size: 'small',
    striped: false,
    useSearchForm: false,
    bordered: true,
    showIndexColumn: false,
    immediate: false,
    inset: true,
    isCanResizeParent: true,
  });

  interface SearchForm {
    batchNo: string;
    boxNo?: string;
    remark?: string;
    checker?: string;
    pattern: string; // BOX/BCH
  }

  const submitLoading = ref(false);
  const resumeLoading = ref(false);

  // 箱暂停状态枚举
  const boxSuspendEnum = {
    W: '未验收',
    R: '验收中',
    S: '已验收',
    P: '已暂停',
  };

  // 暂停
  const confirm = async () => {
    if (searchForm.value.pattern === 'BOX') {
      try {
        const values = await validate();
        const params = {
          ...values,
          state: 'PAUSE',
        };

        submitLoading.value = true;
        await plasmaPauseBox(params as unknown as PostApiCoreBatchPlasmaVerifyBoxPauseRequest);

        success('提交成功!');

        await reload();
        emit('close', false);
        emit('clearInfo');
      } finally {
        submitLoading.value = false;
      }
    } else if (searchForm.value.pattern === 'BCH') {
      try {
        const values = await validate();
        const params = {
          ...values,
          state: 'PAUSE',
        };

        submitLoading.value = true;
        await plasmaPauseBatch(params as PostApiCoreBatchPlasmaVerifyBoxPauseRequest);
        success('提交成功!');

        await reload();
        emit('close', false);
        emit('clearInfo');
      } finally {
        submitLoading.value = false;
      }
    }
  };

  // 继续
  const clickResume = async () => {
    if (!tableSelected.value.length) {
      warning('请先选择一条数据!');
      return;
    }
    const firstSelectedItem = tableSelected.value[0];

    if (searchForm.value.pattern === 'BOX') {
      try {
        const values = await validate();

        const params = {
          ...values,
          boxNo: firstSelectedItem?.boxNo,
          state: 'RESTORE',
        };

        resumeLoading.value = true;
        await plasmaPauseBox(params as PostApiCoreBatchPlasmaVerifyBoxPauseRequest);

        success('操作成功!');
        await reload();
      } finally {
        resumeLoading.value = false;
        emit('refresh-data');
        closeModal();
      }
    } else if (searchForm.value.pattern === 'BCH') {
      try {
        const values = await validate();
        const params = {
          ...values,
          state: 'RESTORE',
        };

        resumeLoading.value = true;
        await plasmaPauseBatch(params as PostApiCoreBatchPlasmaVerifyBatchPauseRequest);
        success('操作成功!');
        await reload();
      } finally {
        resumeLoading.value = false;
        emit('refresh-data');
        closeModal();
      }
    }
  };

  const [registerLoginModal, { openModal }] = useModal();

  // 点击登录按钮
  function handleLogin() {
    openModal(true);
  }

  // 登录成功事件
  function handleSuccess(nickname: string) {
    searchForm.value.checker = nickname;
  }
</script>
