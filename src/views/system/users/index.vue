<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">新增用户</a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            v-auth="'E_789'"
            :actions="[
              {
                icon: 'ant-design:user',
                title: '用户详情',
                onClick: handleUserDetail.bind(null, record),
              },
              {
                icon: 'ant-design:lock-twotone',
                title: '修改密码',
                onClick: handleSetPassword.bind(null, record),
              },
              {
                icon: 'clarity:note-edit-line',
                title: '编辑用户',
                onClick: handleEdit.bind(null, record),
              },
              {
                icon: 'ant-design:delete-outlined',
                color: 'error',
                onClick: handleDelete.bind(null, record),
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <UsersModal @register="registerModal" @success="handleSuccess" />
    <UsersDetailModal @register="registerUserDetailModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
  import { createVNode } from 'vue';
  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import {
    deleteCasDoorUser,
    getCasDoorUserDetail,
    getCasDoorUsers,
    resetCasDoorUserPwd,
  } from '@/api/oauth/users';
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
  import { useMessage } from '@/hooks/web/useMessage';
  import { useModal } from '@/components/Modal';
  import UsersModal from './UsersModal.vue';
  import UsersDetailModal from './UsersDetailModal.vue';

  import { columns, searchFormSchema } from './users.data';

  const { createMessage } = useMessage();

  defineOptions({ name: 'Users' });

  const [registerModal, { openModal }] = useModal();
  const [registerUserDetailModal, { openModal: openUsersDetailModal }] = useModal();
  const [registerTable, { reload }] = useTable({
    api: getCasDoorUsers,
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    columns: columns,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
    },
    useSearchForm: true,

    bordered: true,
    showIndexColumn: false,
    actionColumn: {
      width: 80,
      title: '操作',
      dataIndex: 'action',
      // slots: { customRender: 'action' },
      fixed: undefined,
    },
  });

  function handleCreate() {
    openModal(true, {
      isUpdate: false,
    });
  }

  async function handleEdit(record: Recordable) {
    const res: any = await getCasDoorUserDetail(record);
    openModal(true, {
      record: { ...record, ...(res ?? {}) },
      isUpdate: true,
    });
  }

  async function handleUserDetail(record: Recordable) {
    const res: any = await getCasDoorUserDetail(record);
    openUsersDetailModal(true, {
      record: { ...record, ...(res ?? {}) },
    });
  }

  const { createConfirm } = useMessage();

  function handleSetPassword(record: Recordable) {
    createConfirm({
      iconType: 'warning',
      content: '确认重置账号【' + record.name + '】的密码?',
      onOk: async () => {
        await resetCasDoorUserPwd({ userName: record.name });
        createMessage.success('重置密码成功！');
        await reload();
      },
    });
  }

  async function handleDelete(record: Recordable) {
    createConfirm({
      iconType: 'error',
      title: '是否确认删除?',
      icon: createVNode(ExclamationCircleOutlined),
      content: '',
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      async onOk() {
        await deleteCasDoorUser(record);
        await reload();
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
