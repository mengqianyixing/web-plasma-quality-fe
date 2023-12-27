<template>
  <BasicDrawer v-bind="$attrs" @register="registerDrawer" title="新增" width="1200px">
    <BasicForm @register="registerForm" />
    <BasicTable @register="registerTable">
      <template #toolbar>
        {{ fileList.map((_) => _.name).join('') }}
        <a-upload
          :showUploadList="false"
          :before-upload="beforeUpload"
          :maxCount="1"
          accept=".xlsx,.xls"
          class="ml-10px"
        >
          <a-button> 选择文件 </a-button>
        </a-upload>
        <a-button type="primary" @click="uploadClick" :loading="loading">开始上传</a-button>
        <a-button type="primary" @click="downFile">下载模板</a-button>
      </template>
    </BasicTable>
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';
  import { BasicForm, useForm } from '@/components/Form';

  import { importDrwaerColumns, searchFormschema } from './titer.data';
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { ref } from 'vue';
  import { Upload as AUpload } from 'ant-design-vue';
  import { defHttp } from '@/utils/http/axios';

  const fileList = ref<File[]>([]);
  const loading = ref(false);

  defineOptions({ name: 'ImportDrawer' });
  const [registerForm, { validate, clearValidate, resetFields }] = useForm({
    labelWidth: 120,
    baseColProps: { span: 12 },
    schemas: searchFormschema.slice(0, 2).map((_) => ({ ..._, required: true })),
    showActionButtonGroup: false,
  });

  const [registerTable] = useTable({
    api: () => Promise.resolve({ result: [] }),
    immediate: false,
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    rowKey: 'projectId',
    columns: importDrwaerColumns,
    size: 'small',
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
    fileList.value = [file];
    return false;
  };
</script>
