<template>
  <div class="h-full">
    <BasicTable @register="registerTable">
      <template #projectAbbr="{ record }: { record: Recordable }">
        <span class="text-blue-500 underline cursor-pointer" @click.stop.self="handleDt(record)">
          {{ record.projectAbbr }}
        </span>
      </template>
    </BasicTable>
    <DtModal @register="registerDtModal" @close="reload" />
  </div>
</template>
<script setup lang="ts">
  import { BasicTable, useTable } from '@/components/Table';
  import { columns } from './data';
  import DtModal from './dtDrawer.vue';
  import { useModal } from '@/components/Modal';
  import { watch, nextTick, onMounted, ref } from 'vue';
  import { getCheckListApi } from '@/api/inspect/resultRegistration';

  const emit = defineEmits(['reload']);

  const props = defineProps({
    bsNo: { type: String, default: '' },
  });
  const options = ref<any[]>([]);
  watch(
    () => props.bsNo,
    async (value) => {
      await nextTick();
      value && reload();
    },
    {
      immediate: true,
    },
  );

  const [registerDtModal, { openModal: openDtModal }] = useModal();

  const [registerTable, { reload, clearSelectedRowKeys }] = useTable({
    immediate: false,
    api: getCheckListApi,
    isCanResizeParent: true,
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    beforeFetch: (p) => ({ ...p, bsNo: props.bsNo }),
    columns: columns,
    useSearchForm: false,
    bordered: true,
    size: 'small',
    afterFetch: (data) => {
      clearSelectedRowKeys();
      options.value.splice(0, options.value.length);
      options.value.push(...data.map((_) => ({ label: _.projectAbbr, value: _.projectId })));
      return data;
    },
  });

  function handleDt(row: Recordable) {
    openDtModal(true, { ...row, bsNo: props.bsNo });
  }

  onMounted(async () => {
    emit('reload', reload, '1');
  });
</script>
