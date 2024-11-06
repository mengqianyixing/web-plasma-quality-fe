<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="success" v-auth="'E_1114'" @click="handleExport" :loading="loading"
          >导出</a-button
        >
        <a-button type="primary" v-auth="'E_1113'" @click="handleCreate">新增用户</a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <div class="flex" style="justify-content: space-around">
            <TableAction
              v-auth="'E_910'"
              class="w-20px"
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
              class="w-20px"
              :actions="[
                {
                  icon: 'clarity:note-edit-line',
                  title: '编辑用户',
                  onClick: handleEdit.bind(null, record),
                },
              ]"
            />
            <!-- <TableAction
              v-auth="'E_1314'"
              class="w-20px"
              :actions="[
                {
                  icon: 'ant-design:delete-outlined',
                  color: 'error',
                  title: '删除用户',
                  onClick: handleDelete.bind(null, record),
                },
              ]"
            /> -->
          </div>
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
  import { useUserStore } from '@/store/modules/user';
  import { useMessage } from '@/hooks/web/useMessage';
  import { useModal } from '@/components/Modal';
  import UsersModal from './UsersModal.vue';
  import { exportFile, transferCSVData, getRandNum } from 'js-xxx';
  import { pushLog } from '@/api/oauth/logger';
  import { columns, searchFormSchema } from './users.data';
  import { getDeptList } from '@/api/systemServer/system';

  const { createMessage } = useMessage();
  const userStore = useUserStore();

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
      const groups = await getDeptList({ withTree: false });
      const groupsMap = groups.reduce((t, c) => {
        t[c.name] = c.displayName;
        return t;
      }, {});

      const { result: roles } = rolesRes;
      const exportData: any[] = [];
      const excelCol = [
        { label: '账号', prop: 'username' },
        { label: '姓名', prop: 'displayName' },
        { label: '部门', prop: 'groups' },
        { label: '状态', prop: 'state' },
      ];
      roles.forEach((it) => excelCol.push({ label: it.displayName, prop: it.displayName }));
      userList.forEach((it) => {
        const obj = (it?.roles || []).reduce((pre, cur) => {
          pre[cur.displayName] = '√';
          return pre;
        }, {});
        exportData.push({
          state: it.isForbidden ? '停用' : '启用',
          groups: it.groups?.map((it) => groupsMap[it.split('/')[1]]).join('，'),
          username: it.name,
          displayName: it.displayName,
          ...obj,
        });
      });
      exportFile(transferCSVData(excelCol, exportData), `用户角色`, 'csv');
      pushLog({
        usrName: userStore.userInfo?.username,
        usrId: userStore.userInfo?.userAccount,
        moduleType: 1,
        optName: '系统',
        optContent: `导出【用户角色】`,
        path: 'GET /',
        time: getRandNum(10, 50),
        reqData: JSON.stringify(userStore.userInfo),
        respData: JSON.stringify({ code: 0, msg: 'ok', data: null }),
      });
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

  // async function handleDelete(record: Recordable) {
  //   createConfirm({
  //     iconType: 'warning',
  //     content: '确认删除账号【' + record.name + '】吗?',
  //     onOk: async () => {
  //       await deleteCasDoorUser({ name: record.name });
  //       createMessage.success('删除用户【' + record.name + '】成功！');
  //       reload();
  //     },
  //   });
  // }

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
