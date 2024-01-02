<!--
 * @Descripttion: 
 * @version: 
 * @Author: zcc
 * @Date: 2023-12-29 15:52:07
 * @LastEditors: zcc
 * @LastEditTime: 2023-12-29 17:16:42
-->
<template>
  <BasicDrawer v-bind="$attrs" @register="registerDrawer" title="效价导入" width="1200px">
    <div class="flex flex-col h-full">
      <div class="title"
        >导入汇总

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
            >开始上传</a-button
          >
          <a-button type="primary" class="mr-10px" size="small" @click="downFile"
            >下载模板</a-button
          >
        </div>
      </div>
      <CellWapper :data="{}" cell-width="25%" :cell-list="cellList" :gap="0" />
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
  import { CellWapper } from '@/components/CellWapper';
  import { importSuccessColumns, importFailColumns, cellList } from './data';
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { ref } from 'vue';
  import { Upload as AUpload } from 'ant-design-vue';
  import { defHttp } from '@/utils/http/axios';

  const fileList = ref<File[]>([]);
  const loading = ref(false);

  defineOptions({ name: 'ImportDrawer' });

  const [registerTable] = useTable({
    api: () => Promise.resolve({ result: [{}] }),
    immediate: true,
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    rowKey: 'projectId',
    columns: importSuccessColumns,
    size: 'small',
    useSearchForm: false,
    showTableSetting: false,
    bordered: true,
    isCanResizeParent: true,
  });
  const [registerFailTable] = useTable({
    api: () => Promise.resolve({ result: [{}] }),
    immediate: true,
    isCanResizeParent: true,
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    rowKey: 'projectId',
    columns: importFailColumns,
    size: 'small',
    useSearchForm: false,
    showTableSetting: false,
    bordered: true,
  });
  const [registerDrawer] = useDrawerInner(() => {});

  function uploadClick() {
    defHttp.uploadFile(
      { url: 'http://192.168.1.14' },
      { file: fileList.value[0], data: { test: '123' } },
    );
  }
  function downFile() {}

  const beforeUpload: (file: File) => boolean = (file) => {
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
