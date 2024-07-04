<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    title="效价导入"
    width="1000px"
    cancelText="关闭"
    @cancel="emit('close')"
    @ok="openConfirmModal"
  >
    <div class="flex flex-col h-full">
      <div class="title"> 导入汇总 </div>
      <CellWapper :data="cellData" cell-width="33%" :cell-list="cellList.slice(3)" :gap="0" />
      <div class="flex-1 mt-8px">
        <div class="h-6/10">
          <vxe-grid v-bind="topTableOptions" :data="dataSource.dataSaved" />
        </div>
        <div class="h-4/10">
          <vxe-grid v-bind="bottomTableOptions" :data="dataSource.dataFaild" />
        </div>
      </div>
    </div>
    <BasicModal
      @register="registerConfirmModal"
      title="思桥效价导入确认"
      okText="提交"
      width="300px"
      @ok="handleSubmit"
      @cancel="resetFields"
    >
      <BasicForm @register="registerForm" />
    </BasicModal>
    <Login
      @register="registerLoginModal"
      @success="login"
      :auth-code="ReCheckButtonEnum.TiterSqImportConfirmationCheck"
    />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { CellWapper } from '@/components/CellWapper';
  import { importSuccessColumns, importFailColumns, cellList } from './data';
  import { useModalInner, useModal, BasicModal } from '@/components/Modal';
  import { ref, reactive, markRaw } from 'vue';
  import { message } from 'ant-design-vue';
  import { updateImportApi } from '@/api/inspect/resultRegistration';
  import { PostApiCoreLabMbBaninResponse } from '@/api/type/inspectManage';
  import { VxeGridProps } from 'vxe-table';
  import { BasicForm, useForm } from '@/components/Form';
  import Login from '@/__components/ReviewLoginModal/index.vue';
  import { ReCheckButtonEnum } from '@/enums/authCodeEnum';

  const emit = defineEmits(['close']);

  const cellData = ref<PostApiCoreLabMbBaninResponse['summary']>({
    filename: '',
    uploadAt: '',
    username: '',
    count: '',
    successCount: '',
    faildCount: '',
    normalNum: '',
    lowNum: '',
    heightNum: '',
  });
  const dataSource = reactive<{
    dataSaved: PostApiCoreLabMbBaninResponse['dataSaved'];
    dataFaild: PostApiCoreLabMbBaninResponse['dataFaild'];
  }>({
    dataSaved: markRaw([]),
    dataFaild: markRaw([]),
  });
  const topTableOptions = reactive<VxeGridProps<any>>({
    border: true,
    height: '280px',
    showOverflow: true,
    exportConfig: {},
    columnConfig: {
      resizable: true,
    },
    scrollY: {
      enabled: true,
      gt: 0,
    },
    pagerConfig: {
      enabled: false,
    },
    formConfig: {
      enabled: false,
    },
    toolbarConfig: {
      refresh: false,
      loading: false,
      export: false,
      custom: false,
    },
    columns: importSuccessColumns,
    showFooter: false,
  });
  const bottomTableOptions = reactive<VxeGridProps<any>>({
    border: true,
    height: '280px',
    showOverflow: true,
    exportConfig: {},
    columnConfig: {
      resizable: true,
    },
    scrollY: {
      enabled: true,
      gt: 0,
    },
    pagerConfig: {
      enabled: false,
    },
    formConfig: {
      enabled: false,
    },
    toolbarConfig: {
      refresh: false,
      loading: false,
      export: false,
      custom: false,
    },
    columns: importFailColumns,
    showFooter: false,
  });
  const [registerLoginModal, { openModal: openLoginModal }] = useModal();
  const [registerConfirmModal, { openModal: openConfirmModal, setModalProps }] = useModal();

  const [registerForm, { validate, setFieldsValue, resetFields }] = useForm({
    labelWidth: 80,
    baseColProps: { span: 24 },
    schemas: [
      {
        field: 'reviewer',
        component: 'InputSearch',
        label: '复核人',
        required: true,
        componentProps: {
          'enter-button': '登录',
          placeholder: '请点击登录按钮',
          readonly: true,
          onSearch: () => {
            openLoginModal(true, {});
          },
        },
      },
    ],
    showActionButtonGroup: false,
  });
  async function handleSubmit() {
    const values = await validate();
    if (dataSource.dataSaved.length === 0) return message.warning('没有导入成功的数据');
    setModalProps({ confirmLoading: true });
    try {
      await updateImportApi({
        userName: values.reviewer,
        dataSavedList: dataSource.dataSaved.map((it) => ({
          sampleNo: it.sampleNo,
          conclusion: it.conclusion,
          titerResult: it.titerResult,
          projectld: it.projectId,
        })),
      });
      message.success('效价导入已生效');
      openConfirmModal(false);
      resetFields();
      closeModal();
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
  function login(userName, data) {
    setFieldsValue({ reviewer: data.username });
  }
  const [registerModal, { closeModal }] = useModalInner(
    async (res: PostApiCoreLabMbBaninResponse) => {
      dataSource.dataFaild = res.dataFaild;
      dataSource.dataSaved = res.dataSaved;
      for (const key in cellData.value) {
        cellData.value[key] = res.summary[key];
      }
    },
  );
</script>
<style scoped lang="less">
  .title {
    display: flex;
    position: relative;
    align-items: center;
    justify-content: space-between;
    margin: 10px 0;
    margin-left: 10px;
    color: #000;
    font-size: 16px;

    &::after {
      content: '';
      display: block;
      position: absolute;
      top: 20%;
      left: -10px;
      width: 2px;
      height: 60%;
      background: @primary-color;
    }
  }
</style>
