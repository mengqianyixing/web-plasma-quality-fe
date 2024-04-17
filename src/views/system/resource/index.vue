<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">新增资源</a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'clarity:note-edit-line',
                tooltip: '编辑资源信息',
                onClick: handleEdit.bind(null, record),
              },
              {
                icon: 'ant-design:delete-outlined',
                color: 'error',
                tooltip: '删除此资源',
                onClick: handleDelete.bind(null, record),
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <ResourceModel @register="registerModal" @success="handleSuccess" />
  </div>
</template>

<script setup lang="ts">
  import { createVNode } from 'vue';
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
  import { Modal } from 'ant-design-vue';
  import { BasicTable, TableAction, useTable } from '@/components/Table';
  import { deleteResource, getResourcesList } from '@/api/systemServer/system';
  import { columns, searchFormSchema } from './resource.data';
  import { useModal } from '@/components/Modal';
  import ResourceModel from '@/views/system/resource/ResourceModel.vue';

  const [registerModal, { openModal }] = useModal();

  const [registerTable, { reload }] = useTable({
    api: getResourcesList,
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    rowKey: 'id',
    columns,
    formConfig: {
      schemas: searchFormSchema,
      autoSubmitOnEnter: true,
    },
    useSearchForm: true,

    bordered: true,
    handleSearchInfoFn(info) {
      console.log('handleSearchInfoFn', info);
      return info;
    },
    actionColumn: {
      width: 120,
      title: '操作',
      dataIndex: 'action',
      // slots: { customRender: 'action' },
    },
  });

  function handleCreate() {
    openModal(true, {
      isUpdate: false,
    });
  }

  function handleEdit(record: Recordable) {
    openModal(true, {
      record,
      isUpdate: true,
    });
  }

  async function handleDelete(record: Recordable) {
    Modal.confirm({
      title: '是否确认删除?',
      icon: createVNode(ExclamationCircleOutlined),
      content: '',
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      async onOk() {
        await deleteResource(record.resourceId);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  function handleSuccess() {
    reload();
  }
</script>

<style scoped lang="less"></style>
