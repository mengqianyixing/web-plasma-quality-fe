<!--
 * @Descripttion: 
 * @version: 
 * @Author: zcc
 * @Date: 2023-12-27 16:52:13
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-03 16:53:45
-->
<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    title="新增"
    width="1200px"
    @close="emit('close')"
  >
    <div class="flex flex-col h-full">
      <BasicForm @register="registerForm" />
      <div class="title">
        导入汇总
        <div class="float-right">
          <a-upload
            size="small"
            :showUploadList="false"
            :before-upload="beforeUpload"
            :maxCount="1"
            accept=".xlsx,.xls"
            class="mr-10px"
          >
            <a-button size="small"> 选择文件 </a-button>
          </a-upload>
          <a-button
            type="primary"
            class="mr-10px"
            size="small"
            @click="uploadClick"
            :loading="loading"
            :disabled="!hasFile"
            >开始上传</a-button
          >
          <a-button type="primary" class="mr-10px" size="small" @click="downFile"
            >下载模板</a-button
          >
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
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';
  import { BasicForm, useForm } from '@/components/Form';
  import { importDrwaerColumns, searchFormschema, cellList } from './titer.data';
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { ref, reactive } from 'vue';
  import { Upload as AUpload } from 'ant-design-vue';
  import { defHttp } from '@/utils/http/axios';
  import { CellWapper } from '@/components/CellWapper';

  defineOptions({ name: 'ImportDrawer' });
  const emit = defineEmits(['close']);

  const fileList = ref<File[]>([]);
  const loading = ref(false);
  const hasFile = ref(false);
  const cellData = ref({
    filename: '',
    uploadAt: '',
    username: '',
    count: '',
    successCount: '',
    faildCount: '',
  });
  const dataSource = reactive({
    dataSaved: [],
    dataFaild: [],
  });
  const [registerForm, { validate, clearValidate, resetFields }] = useForm({
    labelWidth: 90,
    baseColProps: { span: 12 },
    schemas: searchFormschema.slice(0, 2).map((_) => ({ ..._, required: true })),
    showActionButtonGroup: false,
  });

  const [registerTable] = useTable({
    immediate: false,
    columns: importDrwaerColumns,
    size: 'small',
    useSearchForm: false,
    showTableSetting: false,
    bordered: true,
  });
  const [registerFailTable] = useTable({
    dataSource: dataSource.dataFaild,
    immediate: false,
    isCanResizeParent: true,
    columns: [],
    size: 'small',
    pagination: false,
    useSearchForm: false,
    showTableSetting: false,
    bordered: true,
  });
  const [registerDrawer] = useDrawerInner(() => {
    resetFields();
    clearValidate();
  });

  function uploadClick() {
    defHttp.uploadFile(
      { url: 'http://192.168.1.14' },
      { file: fileList.value[0], data: { test: '123' } },
    );
    validate();
  }
  function downFile() {}

  const beforeUpload: (file: File) => boolean = (file) => {
    for (const key in cellData.value) {
      cellData.value[key] = '';
    }
    cellData.value.filename = file.name;
    hasFile.value = true;
    fileList.value = [file];
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
