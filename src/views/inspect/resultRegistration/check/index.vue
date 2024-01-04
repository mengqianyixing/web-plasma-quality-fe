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
    <Modal
      :open="open"
      @cancel="open = false"
      @ok="confirmRemove"
      okText="提交"
      width="300px"
      :confirmLoading="confirmLoading"
      title="删除原因"
    >
      <div class="m-20px">
        <BasicForm @register="registerForm" />
      </div>
    </Modal>
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
  import { BasicForm, useForm } from '@/components/Form';

  const emit = defineEmits(['reload']);
  const methodMap = ref(new Map());

  const props = defineProps({
    bsNo: { type: String, default: '' },
  });
  const options = ref<any[]>([]);
  const open = ref(false);
  const confirmLoading = ref(false);
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
  const [registerForm, { resetFields, clearValidate, validate }] = useForm({
    labelWidth: 60,
    baseColProps: { span: 24 },
    schemas: [
      {
        field: 'cause',
        component: 'Input',
        label: '原因',
        required: true,
      },
    ],
    showActionButtonGroup: false,
  });

  const [registerTable, { getSelectRows, reload }] = useTable({
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
  async function confirmRemove() {
    const { cause } = await validate();
    try {
      const rows = getSelectRows();
      const { projectId } = rows[0];
      confirmLoading.value = true;
      await removeCheckApi({ projectId, bsNo: props.bsNo, cause });
      message.success('删除成功');
      open.value = false;
      reload();
    } finally {
      confirmLoading.value = false;
    }
  }
  function handleRemove() {
    const rows = getSelectRows();
    if (rows.length === 0) return message.warning('请选择一条数据');
    if (rows.length > 1) return message.warning('只能选择一条数据');
    open.value = true;
    resetFields();
    clearValidate();
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
    if (rows.length > 1) return message.warning('只能选择一条数据');
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
