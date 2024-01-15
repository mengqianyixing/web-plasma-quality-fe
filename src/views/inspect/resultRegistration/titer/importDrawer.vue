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
    :show-ok-btn="false"
    cancelText="关闭"
    @cancel="emit('close')"
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
          <BasicTable @register="registerTable" />
        </div>
        <div class="h-4/10">
          <BasicTable @register="registerFailTable" />
        </div>
      </div>
    </div>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';
  import { CellWapper } from '@/components/CellWapper';
  import { importSuccessColumns, importFailColumns, cellList } from './data';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { ref, reactive } from 'vue';
  import { Upload as AUpload, message } from 'ant-design-vue';
  import { uploadItemTiter } from '@/api/inspect/resultRegistration';
  import { PostApiCoreLabRegistrationTiterUploadResponse } from '@/api/type/inspectManage';

  const fileList = ref<File[]>([]);
  const loading = ref(false);
  const pid = ref('');
  const bsno = ref('');
  const hasFile = ref(false);

  const emit = defineEmits(['close']);

  const cellData = ref<PostApiCoreLabRegistrationTiterUploadResponse['summary']>({
    filename: '',
    uploadAt: '',
    username: '',
    count: '',
    successCount: '',
    faildCount: '',
  });
  const dataSource = reactive<{
    dataSaved: PostApiCoreLabRegistrationTiterUploadResponse['dataSaved'];
    dataFaild: PostApiCoreLabRegistrationTiterUploadResponse['dataFaild'];
  }>({
    dataSaved: [],
    dataFaild: [],
  });

  defineOptions({ name: 'ImportModal' });

  const [registerTable, { reload: reloadSaved }] = useTable({
    api: () => Promise.resolve({ result: dataSource.dataSaved }),
    fetchSetting: {
      listField: 'result',
    },
    immediate: false,
    pagination: false,
    columns: importSuccessColumns,
    size: 'small',
    useSearchForm: false,
    showTableSetting: false,
    bordered: true,
    isCanResizeParent: true,
  });
  const [registerFailTable, { reload: reloadFaild }] = useTable({
    api: () => Promise.resolve({ result: dataSource.dataFaild }),
    fetchSetting: {
      listField: 'result',
    },
    immediate: false,
    isCanResizeParent: true,
    columns: importFailColumns,
    size: 'small',
    pagination: false,
    useSearchForm: false,
    showTableSetting: false,
    bordered: true,
  });
  const [registerModal] = useModalInner(({ projectId, bsNo }) => {
    pid.value = projectId;
    bsno.value = bsNo;
    dataSource.dataFaild.splice(0, dataSource.dataFaild.length);
    dataSource.dataSaved.splice(0, dataSource.dataSaved.length);
    reloadSaved();
    reloadFaild();
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
      dataSource.dataFaild.splice(0, dataSource.dataFaild.length, ...dataFaild);
      dataSource.dataSaved.splice(0, dataSource.dataSaved.length, ...dataSaved);
      reloadSaved();
      reloadFaild();
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
