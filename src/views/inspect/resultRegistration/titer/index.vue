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
      <template #toolbar>
        <a-button
          type="primary"
          @click="handleSqImport"
          :disabled="!props.bsNo"
          :loading="sqLoading"
          v-auth="InspectButtonEnum.ResultRegistrationSqImport"
        >
          思桥效价导入
        </a-button>
        <a-button
          type="primary"
          @click="handleImport"
          :disabled="!props.bsNo"
          v-auth="InspectButtonEnum.ResultRegistrationTiterImport"
        >
          效价导入
        </a-button>
        <a-button
          type="primary"
          @click="handleEnter"
          :disabled="!props.bsNo"
          v-auth="InspectButtonEnum.ResultRegistrationTiterRegist"
        >
          录入效价结果
        </a-button>
        <a-button
          type="primary"
          @click="handleNotCheck"
          :disabled="!props.bsNo"
          v-auth="InspectButtonEnum.ResultRegistrationTiterNotCheck"
        >
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
    <DtModal @register="registerDtModal" />
    <NotCheck
      @register="registerNotCheckModal"
      @close="reload"
      @confirm="
        openNotCheckModal(false);
        reload();
      "
    />
    <ImportModal @register="registerImportModal" @close="reload" />
    <EnterRusult
      @register="registerEnterModal"
      @close="reload"
      @confirm="
        openEnterModal(false);
        reload();
      "
    />
  </div>
</template>
<script setup lang="ts">
  import { BasicTable, useTable } from '@/components/Table';
  import { columns } from './data';
  import DtModal from './dtDrawer.vue';
  import NotCheck from './notCheck.vue';
  import EnterRusult from './enterRusult.vue';
  import ImportModal from './importDrawer.vue';
  import { useModal } from '@/components/Modal';
  import { getTiterListApi, submitSqImportApi } from '@/api/inspect/resultRegistration';
  import { watch, nextTick, onMounted, ref } from 'vue';
  import { message } from 'ant-design-vue';
  import { getInspectMethodListApi } from '@/api/inspect/inspectMethod';
  import { InspectButtonEnum } from '@/enums/authCodeEnum';

  const emit = defineEmits(['reload']);
  const props = defineProps({
    bsNo: { type: String, default: '' },
  });
  const options = ref<any[]>([]);
  const methodMap = ref(new Map());
  const sqLoading = ref(false);

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
  const [registerEnterModal, { openModal: openEnterModal }] = useModal();
  const [registerImportModal, { openModal: openImportModal }] = useModal();

  const [registerTable, { reload, getSelectRows }] = useTable({
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
      options.value.splice(0, options.value.length);
      options.value.push(...data.map((_) => ({ label: _.projectAbbr, value: _.projectId })));
      return data;
    },
  });
  function handleDt(record: Recordable) {
    openDtModal(true, { ...record, bsNo: props.bsNo });
  }
  async function handleSqImport() {
    const rows = getSelectRows();
    if (rows.length === 0) return message.warning('请选择一条数据');
    if (rows.length > 1) return message.warning('只能选择一条数据');
    try {
      sqLoading.value = true;
      await submitSqImportApi({ bsNo: props.bsNo, project: rows[0].projectId });
    } finally {
      sqLoading.value = false;
    }
  }
  function handleImport() {
    const rows = getSelectRows();
    if (rows.length === 0) return message.warning('请选择一条数据');
    if (rows.length > 1) return message.warning('只能选择一条数据');
    openImportModal(true, { ...rows[0], bsNo: props.bsNo });
  }
  function handleNotCheck() {
    const projectIds = getSelectRows().map((_) => _.projectId);
    openNotCheckModal(true, { projectIds, bsNo: props.bsNo, options: options.value });
  }
  function handleEnter() {
    const rows = getSelectRows();
    if (rows.length === 0) return message.warning('请选择一条数据');
    if (rows.length > 1) return message.warning('只能选择一条数据');
    openEnterModal(true, { ...rows[0], bsNo: props.bsNo });
  }
  onMounted(async () => {
    emit('reload', reload, '2');
    const res = await getInspectMethodListApi();
    res.forEach((_) => {
      methodMap.value.set(_.value, _.label);
    });
  });
</script>
