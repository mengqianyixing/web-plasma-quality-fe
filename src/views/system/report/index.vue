<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleUpdate">编辑</a-button>
        <BasicUpload
          ref="basicUpload"
          :maxSize="20"
          :maxNumber="1"
          @change="handleChange"
          :api="uploadReportApi"
          class="my-5"
          :uploadParams="uploadParams"
          :emptyHidePreview="true"
          v-show="false"
          :showOkBtn="false"
          :showCancelBtn="false"
        />
        <a-button type="primary" @click="handleUpload" preIcon="carbon:cloud-upload">上传</a-button>
      </template>
    </BasicTable>
    <FormModal @register="registerFormModal" @success="reload" />
  </PageWrapper>
</template>
<script setup lang="ts">
  import { BasicUpload } from '@/components/Upload';
  import { PageWrapper } from '@/components/Page';
  import { BasicTable, useTable } from '@/components/Table';
  import { useModal } from '@/components/Modal';
  import { columns } from './report.data';
  import { message } from 'ant-design-vue';
  import FormModal from './form-modal.vue';
  import { getReportList, uploadReportApi } from '@/api/report';
  import { ref } from 'vue';

  let uploadParams = ref({});
  const [registerFormModal, { openModal: openFormModal }, closeModal] = useModal();
  const basicUpload = ref<any>();
  const [registerTable, { clearSelectedRowKeys, getSelectRows, reload }] = useTable({
    api: getReportList,
    size: 'small',
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    formConfig: {
      schemas: [
        {
          field: 'ctrlTitle',
          component: 'Input',
          label: '报表名称',
        },
      ],
    },
    columns: columns,
    useSearchForm: true,
    bordered: true,
    rowSelection: { type: 'radio' },
    afterFetch: (res) => {
      clearSelectedRowKeys();
      return res;
    },
  });
  function getSelections(onlyOne: boolean, fn?: (rows: Recordable[]) => void) {
    const rows = getSelectRows();
    if (rows.length === 0) {
      message.warning('请选择一条数据');
      return [];
    } else if (rows.length > 1 && onlyOne) {
      message.warning('只能选择一条数据');
      return [];
    }
    if (rows.state === 0) {
      message.warning('模板已失效');
      return;
    }
    fn?.(rows);
    return rows;
  }
  function handleUpdate() {
    getSelections(true, ([row]) => {
      openFormModal(true, { isUpdate: true, ...row });
    });
  }
  function handleChange() {
    reload();
    closeModal();
  }
  function handleUpload() {
    getSelections(true, ([row]) => {
      uploadParams.value = {
        id: row.id,
      };
      basicUpload.value.openUploadModal();
    });
  }
</script>
