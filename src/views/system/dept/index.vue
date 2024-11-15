<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate" v-auth="SysButtonEnum.AddDept">
          新增部门
        </a-button>
        <a-button type="primary" @click="handleEdit" v-auth="SysButtonEnum.UpdateDept">
          编辑部门
        </a-button>
        <a-button type="primary" @click="handleDelete" v-auth="SysButtonEnum.RemoveDept">
          删除部门
        </a-button>
      </template>
    </BasicTable>
    <DeptModal @register="registerModal" @success="handleSuccess" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';
  import { SysButtonEnum } from '@/enums/authCodeEnum';

  import { deleteDept, getDeptList } from '@/api/systemServer/system';

  import { useModal } from '@/components/Modal';
  import DeptModal from './DeptModal.vue';

  import { columns } from './dept.data';
  import { PageWrapper } from '@/components/Page';
  import { ref } from 'vue';
  import { useMessage } from '@/hooks/web/useMessage';

  defineOptions({ name: 'Department' });
  const selectedRow = ref<Recordable>([]);
  const { createMessage, createConfirm } = useMessage();

  const [registerModal, { openModal }] = useModal();
  const [registerTable, { reload, clearSelectedRowKeys, getSelectRows }] = useTable({
    beforeFetch: (params) => {
      return {
        ...params,
        withTree: true,
      };
    },
    afterFetch: (res) => {
      clearSelectedRowKeys();
      return res;
    },
    api: getDeptList,
    columns,
    useSearchForm: false,
    bordered: true,
    showIndexColumn: false,
    canResize: true,
    rowSelection: {
      type: 'radio',
      onChange: (_, selectedRows: any) => {
        selectedRow.value = selectedRows;
      },
    },
  });

  function checkSelectedRows() {
    if (!selectedRow.value.length) {
      createMessage.warn('请选择一条记录');
      return false;
    }

    return true;
  }

  function handleCreate() {
    openModal(true, {
      isUpdate: false,
    });
  }

  function handleEdit() {
    if (!checkSelectedRows()) return;

    openModal(true, {
      record: selectedRow.value[0],
      isUpdate: true,
    });
  }

  async function handleDelete() {
    if (!checkSelectedRows()) return;
    const [row] = getSelectRows();
    if ((row.children || []).length) return createMessage.warn('请先删除下级部门');

    createConfirm({
      title: '确认',
      content: '确定要删除该部门吗？',
      iconType: 'warning',
      onOk: async () => {
        await deleteDept({
          name: selectedRow.value[0]?.key,
        });
        handleSuccess();

        createMessage.success('删除成功');
      },
    });
  }

  function handleSuccess() {
    reload();
  }
</script>
