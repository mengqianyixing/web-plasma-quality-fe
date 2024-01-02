<template>
  <div class="h-full">
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleImport" size="small" :disabled="!props.bsNo">
          效价导入
        </a-button>
        <a-button type="primary" @click="handleEnter" size="small" :disabled="!props.bsNo">
          录入效价结果
        </a-button>
        <a-button type="primary" @click="handleNotCheck" size="small" :disabled="!props.bsNo">
          未检测登记
        </a-button>
      </template>
      <template #projectAbbr="{ record }: { record: Recordable }">
        <span class="text-blue-500 underline cursor-pointer" @click.stop.self="handleDt(record)">
          {{ record.projectAbbr }}
        </span>
      </template>
    </BasicTable>
    <DtDrawer @register="registerDtDrawer" />
    <NotCheck @register="registerNotCheckDrawer" @confirm="reload" />
    <ImportDrawer @register="registerImportDrawer" />
    <EnterRusult @register="registerEnterDrawer" @confirm="reload" />
  </div>
</template>
<script setup lang="ts">
  import { BasicTable, useTable } from '@/components/Table';
  import { columns } from './data';
  import DtDrawer from './dtDrawer.vue';
  import NotCheck from './notCheck.vue';
  import EnterRusult from './enterRusult.vue';
  import ImportDrawer from './importDrawer.vue';
  import { useDrawer } from '@/components/Drawer';
  import { getTiterListApi } from '@/api/inspect/resultRegistration';
  import { watch, nextTick, onMounted, ref } from 'vue';

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
  const [registerDtDrawer, { openDrawer: openDtDrawer }] = useDrawer();
  const [registerNotCheckDrawer, { openDrawer: openNotCheckDrawer }] = useDrawer();
  const [registerEnterDrawer, { openDrawer: openEnterDrawer }] = useDrawer();
  const [registerImportDrawer, { openDrawer: openImportDrawer }] = useDrawer();

  const [registerTable, { reload, getSelectRows }] = useTable({
    title: '',
    immediate: false,
    api: getTiterListApi,
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    rowKey: 'projectId',
    columns: columns,
    useSearchForm: false,
    bordered: true,
    size: 'small',
    rowSelection: { type: 'checkbox' },
    beforeFetch: (p) => ({ ...p, bsNo: props.bsNo }),
    afterFetch: (data) => {
      options.value.push(...data.map((_) => ({ label: _.projectAbbr, value: _.projectId })));
      return data;
    },
  });
  function handleDt(record: Recordable) {
    console.log(record);
    openDtDrawer(true, {});
  }
  function handleImport() {
    openImportDrawer(true, {});
  }
  function handleNotCheck() {
    const projectIds = getSelectRows().map((_) => _.projectId);
    openNotCheckDrawer(true, { projectIds, bsNo: props.bsNo, options: options.value });
  }
  function handleEnter() {
    openEnterDrawer(true, {});
  }
  onMounted(() => {
    emit('reload', reload, '2');
  });
</script>
