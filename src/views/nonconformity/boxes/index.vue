<template>
  <div>
    <BasicTable @register="registerTable">
      <template #headerTop>
        <div class="flex gap-2">
          <a-button type="primary" @click="handleAdd"> 新增 </a-button>
          <a-button type="primary" @click="handleEdit"> 编辑 </a-button>
          <a-button type="primary" @click="handleDelete"> 删除 </a-button>
          <a-button type="primary" @click="handleLabelPrint"> 标签打印 </a-button>
        </div>
      </template>
    </BasicTable>
  </div>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';
  import { deleteDept, getDeptList } from '@/api/systemServer/system';
  import { columns, searchFormSchema } from './boxes.data';

  defineOptions({ name: 'NonconformityBoxes' });

  // const [registerModal, { openModal }] = useModal();

  const [registerTable, { reload }] = useTable({
    api: getDeptList,
    columns,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
    },
    rowSelection: {
      type: 'checkbox',
      onSelect(record, selected, selectedRows) {
        console.log(record, selected, selectedRows);
      },
    },
    pagination: true,
    striped: false,
    useSearchForm: true,
    showTableSetting: true,
    tableSetting: {
      size: false,
    },
    bordered: true,
    showIndexColumn: false,
    canResize: false,
  });

  function handleAdd() {}

  function handleEdit(record: Recordable) {
    console.log(record);
    // openModal(true, {
    //   record,
    //   isUpdate: true,
    // });
  }

  async function handleDelete(record: Recordable) {
    await deleteDept(record.deptId);
    handleSuccess();
  }

  function handleLabelPrint() {}

  function handleSuccess() {
    reload();
  }
</script>
