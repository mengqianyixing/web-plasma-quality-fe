<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="success" @click="handleExport" :loading="loading">导出</a-button>
        <a-button type="primary" @click="handleCreate">新增用户</a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            v-auth="'E_910'"
            class="w-20px float-left"
            :actions="[
              {
                icon: 'ant-design:lock-twotone',
                title: '重置密码',
                onClick: handleSetPassword.bind(null, record),
              },
            ]"
          />
          <TableAction
            v-auth="'E_1112'"
            class="w-20px float-right"
            :actions="[
              {
                icon: 'clarity:note-edit-line',
                title: '编辑用户',
                onClick: handleEdit.bind(null, record),
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
  import { ref } from 'vue';
  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { getCasDoorUserDetail, getCasDoorUsers, resetCasDoorUserPwd } from '@/api/oauth/users';
  import { getCasDoorRoles, getCasDoorAllUsers } from '@/api/oauth/auth';

  import { useMessage } from '@/hooks/web/useMessage';
  import { useModal } from '@/components/Modal';
  import UsersModal from './UsersModal.vue';
  import { exportFile, transferCSVData } from 'js-xxx';

  import { columns, searchFormSchema } from './users.data';

  const { createMessage } = useMessage();

  defineOptions({ name: 'Users' });
  const loading = ref(false);

  const [registerModal, { openModal }] = useModal();
  const [registerTable, { reload, getSelectRows }] = useTable({
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
    rowSelection: { type: 'checkbox' },
  });

  function handleCreate() {
    openModal(true, {
      isUpdate: false,
    });
  }

  async function handleExport() {
    const rows = getSelectRows();
    if (rows.length === 0) return createMessage.warn('请选择一条记录');
    try {
      loading.value = true;
      const userList = await getCasDoorAllUsers({ userIds: rows.map((it) => it.name) });
      const rolesRes = await getCasDoorRoles({ currPage: 1, pageSize: 999 });
      const { result: roles } = rolesRes;
      const exportData: any[] = [];
      const excelCol = [{ label: '用户', prop: 'username' }];
      roles.forEach((it) => excelCol.push({ label: it.displayName, prop: it.displayName }));
      userList.forEach((it) => {
        const obj = (it?.roles || []).reduce((pre, cur) => {
          pre[cur.displayName] = '√';
          return pre;
        }, {});
        exportData.push({ username: it.name, ...obj });
      });
      exportFile(transferCSVData(excelCol, exportData), `用户角色`, 'csv');
      createMessage.success('导出成功');
    } finally {
      loading.value = false;
    }
  }

  async function handleEdit(record: Recordable) {
    const res: any = await getCasDoorUserDetail(record);
    openModal(true, {
      record: { ...record, ...(res ?? {}) },
      isUpdate: true,
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

  function handleSuccess() {
    reload();
  }
</script>
