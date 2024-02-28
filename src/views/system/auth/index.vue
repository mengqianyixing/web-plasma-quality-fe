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
    <RoleModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { deleteCasDoorRole, getCasDoorRoles } from '@/api/oauth/auth';

  import { useModal } from '@/components/Modal';
  import RoleModal from './RoleModal.vue';

  import { columns, searchFormSchema } from './role.data';
  import { ref } from 'vue';
  import { useMessage } from '@/hooks/web/useMessage';
  import { exportFile, formatDate, transferCSVData } from 'js-xxx';
  import { modulesRouteList } from '@/router/routes';

  const { createMessage } = useMessage();

  defineOptions({ name: 'RoleAuthManagement' });
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
    const menuList: any[] = modulesRouteList.filter((x) => x.id);
    const results: any[] = [];
    menuList.forEach((x) => {
      if (x.children) {
        x.children.forEach((v) => {
          if (v.authElements) {
            v.authElements.forEach((a) => {
              results.push({
                btn: a,
                grand: x,
                parent: v,
              });
            });
          } else {
            results.push({
              btn: { title: null },
              grand: x,
              parent: v,
            });
          }
        });
      }
    });
    const excelCol = [
      { label: '一级菜单', prop: 'grand' },
      { label: '二级菜单', prop: 'parent' },
      { label: '按钮', prop: 'btn' },
    ];
    const exportData = results.map((x) => ({
      btn: x.btn.title,
      grand: x.grand.meta.title,
      parent: x.parent.meta.title,
    }));
    selectedRowsRef.value.forEach((x, i) => {
      const usersStr = (x.users ?? []).join('、');
      excelCol.push({ label: `${x.name}/${x.displayName}/${usersStr}`, prop: `domainsStr${i}` });
      results.forEach((v, n) => {
        if (
          x.domains.includes(v.grand.id) ||
          x.domains.includes(v.parent.id) ||
          x.domains.includes(v.btn.id)
        ) {
          exportData[n][`domainsStr${i}`] = '√';
        }
      });
    });
    exportFile(
      transferCSVData(excelCol, exportData),
      `角色权限导出-${formatDate(new Date(), 'yyyymmddhhiissS')}`,
      'csv',
    );
    createMessage.success('导出成功');
  }

  async function handleDelete(record: Recordable) {
    await deleteCasDoorRole(record);
    reload();
  }

  function handleSuccess() {
    reload();
  }
</script>
