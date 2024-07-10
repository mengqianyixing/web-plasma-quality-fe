<!--
 * @Descripttion: 
 * @version: 
 * @Author: zcc
 * @Date: 2024-01-12 19:08:05
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-13 17:37:51
-->
<template>
  <div class="h-full">
    <BasicTable @register="registerTable">
      <template #projectAbbr="{ record }: { record: Recordable }">
        <span class="text-blue-500 underline cursor-pointer" @click.stop.self="handleDt(record)">
          {{ record.projectAbbr }}
        </span>
      </template>
      <template #methodAbbr="{ record }: { record: Recordable }">
        {{ methodMap.get(record.methodAbbr) }}
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
  import { getTiterListApi } from '@/api/inspect/resultRegistration';
  import { watch, nextTick, onMounted, ref } from 'vue';
  import { getInspectMethodListApi } from '@/api/inspect/inspectMethod';

  const emit = defineEmits(['reload']);
  const props = defineProps({
    bsNo: { type: String, default: '' },
  });

  const options = ref<any[]>([]);
  const methodMap = ref(new Map());

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
    api: getTiterListApi,
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    columns: columns,
    useSearchForm: false,
    bordered: true,
    size: 'small',
    isCanResizeParent: true,

    beforeFetch: (p) => ({ ...p, bsNo: props.bsNo }),
    afterFetch: (data) => {
      clearSelectedRowKeys();
      options.value.splice(0, options.value.length);
      options.value.push(...data.map((_) => ({ label: _.projectAbbr, value: _.projectId })));
      return data;
    },
  });
  function handleDt(record: Recordable) {
    openDtModal(true, { ...record, bsNo: props.bsNo });
  }

  onMounted(async () => {
    emit('reload', reload, '2');
    const res = await getInspectMethodListApi();
    res.forEach((_) => {
      methodMap.value.set(_.value, _.label);
    });
  });
</script>
