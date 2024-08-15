<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="success" @click="handleExport">导出</a-button>
        <a-button v-auth="'E_123'" type="primary" @click="handleCreate">新增角色</a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            v-auth="'E_456'"
            :actions="[
              {
                icon: 'clarity:note-edit-line',
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
    <RoleModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { deleteCasDoorRole, getCasDoorRoles } from '@/api/oauth/auth';

  import { useModal } from '@/components/Modal';
  import RoleModal from './RoleModal.vue';

  import { columns, searchFormSchema } from './role.data';
  import { ref, createVNode } from 'vue';
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
  import { useMessage } from '@/hooks/web/useMessage';
  import { exportFile, formatDate, getRandNum, transferCSVData } from 'js-xxx';
  import { modulesRouteList } from '@/router/routes';
  import { useUserStore } from '@/store/modules/user';
  import { pushLog } from '@/api/oauth/logger';
  import { filterRoutes } from './dataTransfer';

  const { createMessage } = useMessage();
  const userStore = useUserStore();

  defineOptions({ name: 'AuthMenus' });

  const selectedRowsRef = ref<Recordable>([]);
  const [registerModal, { openModal }] = useModal();
  const [registerTable, { reload }] = useTable({
    api: getCasDoorRoles,
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
    rowSelection: {
      type: 'checkbox',
      onChange(_, selectedRows) {
        selectedRowsRef.value = selectedRows;
      },
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

  function handleExport() {
    if (!selectedRowsRef.value.length) {
      createMessage.warn('请选择一条记录');
      return;
    }
    const menuList: Recordable[] = filterRoutes(modulesRouteList);
    const flat = () => {
      const list: Recordable[] = menuList
        .slice()
        .map((it) => ({ ...it, titleArr: [it.meta.title] }));
      const newList: Recordable[] = [];
      while (list.length) {
        const node = list.pop() as Recordable;
        const children: Recordable[] = node.children || node.authElements || [];
        if (children.length) {
          const arr = children.map((it) => ({
            ...it,
            titleArr: [...node.titleArr, it.title || it.meta.title],
          }));
          list.push(...arr.reverse());
        }
        newList.push(node);
      }
      return newList;
    };
    const results: any[] = flat();
    const excelCol = [
      { label: '一级菜单', prop: '0' },
      { label: '二级菜单', prop: '1' },
      { label: '三级菜单', prop: '2' },
      { label: '按钮', prop: 'bt' },
    ];
    const exportData = results.map((x) => {
      const { titleArr } = x;
      const obj = { bt: x.path ? void 0 : titleArr.pop() };
      for (const key in titleArr) {
        obj[key] = titleArr[key];
      }
      return obj;
    });

    selectedRowsRef.value.forEach((x, i) => {
      const usersStr = (x.users ?? []).map((it) => it.split('/')[1]).join('、');
      excelCol.push({ label: `${x.displayName}/${usersStr}`, prop: `domainsStr${i}` });
      results.forEach((v, n) => {
        if (x.domains.includes(v.id.toString())) {
          exportData[n][`domainsStr${i}`] = '√';
        }
      });
    });
    exportFile(
      transferCSVData(excelCol, exportData),
      `角色权限导出-${formatDate(new Date(), 'yyyymmddhhiissS')}`,
      'csv',
    );

    pushLog({
      usrName: userStore.userInfo?.username,
      usrId: userStore.userInfo?.userAccount,
      moduleType: 1,
      optName: '系统',
      optContent: `导出角色【${selectedRowsRef.value.map((it) => it.displayName).join(',')}】成功`,
      path: 'POST /api/sys/user/logout',
      time: getRandNum(10, 50),
      reqData: JSON.stringify(userStore.userInfo),
      respData: JSON.stringify({ code: 0, msg: 'ok', data: null }),
    });
    createMessage.success('导出成功');
  }

  const { createConfirm } = useMessage();

  async function handleDelete(record: Recordable) {
    createConfirm({
      title: '是否确认删除?',
      iconType: 'warning',
      icon: createVNode(ExclamationCircleOutlined),
      content: '',
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      async onOk() {
        await deleteCasDoorRole(record);
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
