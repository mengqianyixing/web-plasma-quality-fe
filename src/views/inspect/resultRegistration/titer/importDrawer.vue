<!--
 * @Descripttion: 
 * @version: 
 * @Author: zcc
 * @Date: 2023-12-29 15:52:07
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-13 19:03:32
-->
<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    title="效价导入"
    width="1000px"
    cancelText="关闭"
    @cancel="emit('close')"
    @ok="checkNuc"
  >
    <div class="flex flex-col h-full">
      <div class="title">
        导入汇总
        <div class="float-right">
          <a-upload
            :showUploadList="false"
            :before-upload="beforeUpload"
            :maxCount="1"
            accept=".xlsx,.xls"
            class="mr-10px"
          >
            <a-button> 选择文件 </a-button>
          </a-upload>
          <a-button
            type="primary"
            class="mr-10px"
            @click="uploadClick"
            :loading="loading"
            :disabled="!hasFile"
            >开始上传</a-button
          >
          <a-button type="primary" class="mr-10px" @click="downFile">
            <a href="/manage/tmp/titer.xlsx" download>下载模板</a>
          </a-button>
        </div>
      </div>
      <CellWapper :data="cellData" cell-width="33%" :cell-list="cellList" :gap="0" />
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
      title="效价导入复核人确认"
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
      :auth-code="ReCheckButtonEnum.TiterImportConfirmationCheck"
    />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { CellWapper } from '@/components/CellWapper';
  import { importSuccessColumns, importFailColumns, cellList } from './data';
  import { useModalInner, useModal, BasicModal } from '@/components/Modal';
  import { ref, reactive, markRaw } from 'vue';
  import { Upload as AUpload, message } from 'ant-design-vue';
  import { uploadItemTiter, updateImportApi } from '@/api/inspect/resultRegistration';
  import { PostApiCoreLabRegistrationTiterUploadResponse } from '@/api/type/inspectManage';
  import { VxeGridProps } from 'vxe-table';
  import { BasicForm, useForm } from '@/components/Form';
  import Login from '@/__components/ReviewLoginModal/index.vue';
  import { ReCheckButtonEnum } from '@/enums/authCodeEnum';
  import { useMessage } from '@/hooks/web/useMessage';

  const fileList = ref<File[]>([]);
  const loading = ref(false);
  const pid = ref('');
  const bsno = ref('');
  const hasFile = ref(false);

  const emit = defineEmits(['close']);

  const { createConfirm } = useMessage();
  const cellData = ref<PostApiCoreLabRegistrationTiterUploadResponse['summary']>({
    filename: '',
    uploadAt: '',
    username: '',
    count: '',
    successCount: '',
    faildCount: '',
    normalNum: '',
    lowNum: '',
    isNucleic: false,
    heightNum: '',
  });
  const dataSource = reactive<{
    dataSaved: PostApiCoreLabRegistrationTiterUploadResponse['dataSaved'];
    dataFaild: PostApiCoreLabRegistrationTiterUploadResponse['dataFaild'];
  }>({
    dataSaved: markRaw([]),
    dataFaild: markRaw([]),
  });

  defineOptions({ name: 'ImportModal' });

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
  async function checkNuc() {
    if (dataSource.dataSaved.length === 0) return message.warning('没有导入成功的数据');
    if (cellData.value.isNucleic) {
      createConfirm({
        iconType: 'warning',
        title: '提示',
        content: '核酸不合格确认导入效价？',
        onOk: () => {
          openConfirmModal();
        },
      });
    } else {
      openConfirmModal();
    }
  }
  async function handleSubmit() {
    const values = await validate();
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
      emit('close');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
  function login(userName, data) {
    setFieldsValue({ reviewer: data.username });
  }
  const [registerModal, { closeModal }] = useModalInner(({ projectId, bsNo }) => {
    pid.value = projectId;
    bsno.value = bsNo;
    dataSource.dataFaild = [];
    dataSource.dataSaved = [];
    for (const key in cellData.value) {
      cellData.value[key] = '';
    }
  });

  async function uploadClick() {
    try {
      loading.value = true;
      const res = await uploadItemTiter({
        file: fileList.value[0],
        data: { projectId: pid.value, bsNo: bsno.value },
      } as any);
      const { summary, dataSaved, dataFaild } = res;
      for (const key in cellData.value) {
        if (key === 'filename') continue;
        cellData.value[key] = summary[key];
      }
      dataSource.dataFaild = markRaw(dataFaild || []);
      dataSource.dataSaved = markRaw(dataSaved || []);
      message.success('导入成功');
    } finally {
      loading.value = false;
      hasFile.value = false;
    }
  }
  function downFile() {}

  const beforeUpload: (file: File) => boolean = (file) => {
    fileList.value = [file];
    for (const key in cellData.value) {
      cellData.value[key] = '';
    }
    cellData.value.filename = file.name;
    hasFile.value = true;
    return false;
  };
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
