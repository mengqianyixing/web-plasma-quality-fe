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

    <EncodingEditModal @register="registerEncodingModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { columns } from './encoding.data';

  import { getEncodingRules } from '@/api/tag/encoding';
  import { useModal } from '@/components/Modal';

  import EncodingEditModal from './EncodingEditModal.vue';

  defineOptions({ name: 'TagEncoding' });

  const [registerEncodingModal, { openModal: openEncodingEditModal }] = useModal();

  const [registerTable, { reload }] = useTable({
    api: getEncodingRules,
    columns,
    clickToRowSelect: true,
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
    openEncodingEditModal(true, {
      record,
      isUpdate: true,
    });
  }

  function handleSuccess() {
    reload();
  }
</script>
