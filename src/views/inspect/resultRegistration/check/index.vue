<template>
  <div class="h-full">
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button
          type="primary"
          @click="handleRemove"
          :disabled="!props.bsNo"
          v-auth="InspectButtonEnum.ResultRegistrationItemDelete"
        >
          撤销项目
        </a-button>
        <a-button
          type="primary"
          @click="handleUnq"
          :disabled="!props.bsNo"
          v-auth="InspectButtonEnum.ResultRegistrationItemUnq"
        >
          不合格登记
        </a-button>
        <a-button
          type="primary"
          @click="handleNotCheck"
          :disabled="!props.bsNo"
          v-auth="InspectButtonEnum.ResultRegistrationItemNotCheck"
        >
          未检测登记
        </a-button>
      </template>
      <template #projectAbbr="{ record }: { record: Recordable }">
        <span class="text-blue-500 underline cursor-pointer" @click.stop.self="handleDt(record)">
          {{ record.projectAbbr }}
        </span>
      </template>
    </BasicTable>
    <DtModal @register="registerDtModal" @close="reload" />
    <NotCheck
      @register="registerNotCheckModal"
      @close="reload"
      @confirm="
        openNotCheckModal(false);
        reload();
      "
    />
    <UnqualifiedModal
      @register="registerUnqModal"
      @close="reload"
      @confirm="
        openUnqModal(false);
        reload();
      "
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
  import DtModal from './dtDrawer.vue';
  import NotCheck from './notCheck.vue';
  import UnqualifiedModal from './unqualifiedDrawer.vue';
  import { useModal } from '@/components/Modal';
  import { message, Modal } from 'ant-design-vue';
  import { watch, nextTick, onMounted, ref } from 'vue';
  import { getCheckListApi, removeCheckApi } from '@/api/inspect/resultRegistration';
  import { BasicForm, useForm } from '@/components/Form';
  import { InspectButtonEnum } from '@/enums/authCodeEnum';

  const emit = defineEmits(['reload']);

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

  const [registerDtModal, { openModal: openDtModal }] = useModal();
  const [registerNotCheckModal, { openModal: openNotCheckModal }] = useModal();
  const [registerUnqModal, { openModal: openUnqModal }] = useModal();
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

  const [registerTable, { getSelectRows, reload, clearSelectedRowKeys }] = useTable({
    immediate: false,
    api: getCheckListApi,
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
    rowSelection: { type: 'checkbox' },
    afterFetch: (data) => {
      clearSelectedRowKeys();
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
    openDtModal(true, { ...row, bsNo: props.bsNo });
  }
  function handleNotCheck() {
    const projectIds = getSelectRows().map((_) => _.projectId);
    openNotCheckModal(true, { projectIds, bsNo: props.bsNo, options: options.value });
  }
  function handleUnq() {
    const rows = getSelectRows();
    if (rows.length === 0) return message.warning('请选择一条数据');
    if (rows.length > 1) return message.warning('只能选择一条数据');
    openUnqModal(true, { ...rows[0], bsNo: props.bsNo });
  }
  onMounted(async () => {
    emit('reload', reload, '1');
  });
</script>
