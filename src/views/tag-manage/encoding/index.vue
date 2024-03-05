<!--
 * @Descripttion:
 * @version:
 * @Author: zcc
 * @Date: 2023-12-26 14:35:04
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-31 18:32:15
-->
<template>
  <div class="p-16px">
    <BasicTable @register="registerTable">
      <template #bodyCell="{ record, column }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                label: '编辑',
                onClick: handleEdit.bind(null, record),
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>

    <EncodingDrawer @register="registerEncodingDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { columns } from './encoding.data';

  import { getEncodingRules } from '@/api/tag/encoding';
  import { useDrawer } from '@/components/Drawer';

  import EncodingDrawer from './EncodingDrawer.vue';

  defineOptions({ name: 'TagEncoding' });

  const [registerEncodingDrawer, { openDrawer: openEncodingDrawer }] = useDrawer();

  const [registerTable, { reload }] = useTable({
    api: getEncodingRules,
    columns,
    clickToRowSelect: false,
    size: 'small',
    striped: false,
    useSearchForm: false,
    bordered: true,
    actionColumn: {
      title: '操作',
      dataIndex: 'action',
      fixed: undefined,
    },
    canResize: false,
    pagination: false,
  });

  function handleEdit(record: Recordable) {
    openEncodingDrawer(true, {
      record,
      isUpdate: true,
    });
  }

  function handleSuccess() {
    reload();
  }
</script>
