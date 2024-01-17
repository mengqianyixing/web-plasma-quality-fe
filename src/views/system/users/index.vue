<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">新增用户</a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
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
                popConfirm: {
                  title: '是否确认删除',
                  placement: 'left',
                  confirm: handleDelete.bind(null, record),
                },
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <UsersModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { deleteCasDoorUser, getCasDoorUsers } from '@/api/oauth/users';

  import { useModal } from '@/components/Modal';
  import UsersModal from './UsersModal.vue';

  import { columns, searchFormSchema } from './users.data';

  defineOptions({ name: 'UsersAuthManagement' });

  const [registerModal, { openModal }] = useModal();
  const [registerTable, { reload }] = useTable({
    title: '用户列表',
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
    showTableSetting: true,
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

  function handleEdit(record: Recordable) {
    openModal(true, {
      record,
      isUpdate: true,
    });
  }

  function handleSetPassword(record: Recordable) {
    openModal(true, {
      record,
      isPassword: true,
    });
  }

  async function handleDelete(record: Recordable) {
    await deleteCasDoorUser(record);
    reload();
  }

  function handleSuccess() {
    reload();
  }
</script>
