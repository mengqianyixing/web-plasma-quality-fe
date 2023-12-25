<template>
  <div>
    <BasicTable @register="registerTable" :searchInfo="searchInfo">
      <template #toolbar>
        <div class="flex gap-2">
          <a-button type="primary" @click="handleAdd"> 新增 </a-button>
        </div>
      </template>
      <template #bodyCell="{ record, column }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                label: '编辑',
                onClick: handleEdit.bind(null, record),
              },
              {
                label: '复制',
                onClick: handleCopy.bind(null, record),
              },
              {
                label: '删除',
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

    <StyleDrawer @register="registerStyleDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable, TableAction } from '@/components/Table';

  import { columns, searchFormSchema } from './style.data';

  import { ref } from 'vue';

  import { copyStyle, deleteStyle, getTagsList } from '@/api/tag/manage';
  import { useDrawer } from '@/components/Drawer';

  import StyleDrawer from './StyleDrawer.vue';

  defineOptions({ name: 'DeptManagement' });

  const searchInfo = ref<Recordable>({});

  const [registerStyleDrawer, { openDrawer: openStyleDrawer }] = useDrawer();

  const [registerTable, { reload }] = useTable({
    title: '标签样式列表',
    api: getTagsList,
    columns,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
    },
    clickToRowSelect: false,
    size: 'small',
    striped: false,
    useSearchForm: true,
    showTableSetting: true,
    tableSetting: {
      size: false,
      redo: false,
      setting: false,
    },
    handleSearchInfoFn(info) {
      console.log('handleSearchInfoFn', info);
      return info;
    },
    bordered: true,
    showIndexColumn: false,
    actionColumn: {
      title: '操作',
      dataIndex: 'action',
      fixed: undefined,
    },
    canResize: false,
  });

  function handleAdd(record: Recordable) {
    openStyleDrawer(true, {
      record,
      isUpdate: false,
    });
  }

  function handleEdit(record: Recordable) {
    openStyleDrawer(true, {
      record,
      isUpdate: true,
    });
  }

  async function handleCopy(record: Recordable) {
    await copyStyle(record.tagNo);
    reload();
  }

  async function handleDelete(record: Recordable) {
    await deleteStyle(record.tagNo);
    reload();
  }

  function handleSuccess() {
    reload();
  }
</script>
