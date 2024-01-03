<template>
  <div class="h-full">
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleRemove" size="small" :disabled="!props.bsNo">
          删除
        </a-button>
        <a-button type="primary" @click="handleUnq" size="small" :disabled="!props.bsNo">
          不合格登记
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
      <template #methodAbbr="{ record }: { record: Recordable }">
        {{ methodMap.get(record.methodAbbr) }}
      </template>
    </BasicTable>
    <DtDrawer @register="registerDtDrawer" />
    <NotCheck
      @register="registerNotCheckDrawer"
      @close="reload"
      @confirm="openNotCheckDrawer(false)"
    />
    <UnqualifiedDrawer
      @register="registerUnqDrawer"
      @close="reload"
      @confirm="openUnqDrawer(false)"
    />
  </div>
</template>
<script setup lang="ts">
  import { BasicTable, useTable } from '@/components/Table';
  import { columns } from './data';
  import DtDrawer from './dtDrawer.vue';
  import NotCheck from './notCheck.vue';
  import UnqualifiedDrawer from './unqualifiedDrawer.vue';
  import { useDrawer } from '@/components/Drawer';
  import { message, Modal } from 'ant-design-vue';
  import { watch, nextTick, onMounted, ref } from 'vue';
  import { getCheckListApi, removeCheckApi } from '@/api/inspect/resultRegistration';
  import { getInspectMethodListApi } from '@/api/inspect/inspectMethod';

  const emit = defineEmits(['reload']);
  const methodMap = ref(new Map());

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
  const [registerUnqDrawer, { openDrawer: openUnqDrawer }] = useDrawer();

  const [registerTable, { getSelectRows, reload, clearSelectedRowKeys }] = useTable({
    title: '',
    immediate: false,
    api: getCheckListApi,
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    beforeFetch: (p) => ({ ...p, bsNo: props.bsNo }),
    rowKey: 'projectId',
    columns: columns,
    useSearchForm: false,
    bordered: true,
    size: 'small',
    rowSelection: { type: 'checkbox' },
    afterFetch: (data) => {
      options.value.splice(0, options.value.length);
      options.value.push(...data.map((_) => ({ label: _.projectAbbr, value: _.projectId })));
      return data;
    },
  });
  function handleRemove() {
    const rows = getSelectRows();
    if (rows.length === 0) return message.warning('请选择一条数据');
    const { projectId, projectAbbr } = rows[0];
    Modal.confirm({
      content: '确认删除' + projectAbbr + '?',
      onOk: async () => {
        await removeCheckApi({ projectId, bsNo: props.bsNo });
        clearSelectedRowKeys();
        reload();
      },
      onCancel: () => Modal.destroyAll(),
    });
  }
  function handleDt(row: Recordable) {
    openDtDrawer(true, { ...row, bsNo: props.bsNo });
  }
  function handleNotCheck() {
    const projectIds = getSelectRows().map((_) => _.projectId);
    openNotCheckDrawer(true, { projectIds, bsNo: props.bsNo, options: options.value });
  }
  function handleUnq() {
    const rows = getSelectRows();
    if (rows.length === 0) return message.warning('请选择一条数据');
    openUnqDrawer(true, { ...rows[0], bsNo: props.bsNo });
  }
  onMounted(async () => {
    emit('reload', reload, '1');
    const res = await getInspectMethodListApi();
    res.forEach((_) => {
      methodMap.value.set(_.value, _.label);
    });
  });
</script>
