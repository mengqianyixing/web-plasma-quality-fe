<!--
 * @Descripttion: 
 * @version: 
 * @Author: zcc
 * @Date: 2023-12-29 15:36:12
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-15 10:27:40
-->
<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    showFooter
    :title="projectName + '录入效价结果'"
    width="800px"
    okText="提交&关闭"
    cancelText="关闭"
    :minHeight="520"
    @cancel="close"
    @fullscreen="redoHeight"
    @ok="handleSubmit(true)"
  >
    <template #appendFooter>
      <a-button type="primary" @click="handleSubmit(false)" :loading="loading">提交&继续</a-button>
    </template>
    <div class="relative h-inherit max-h-inherit min-h-inherit">
      <div class="absolute w-full h-full">
        <BasicForm @register="registerForm" />
        <div class="flex-1 shrink-1" style="height: calc(100% - 56px)">
          <BasicTable @register="registerTable" />
        </div>
      </div>
    </div>
  </BasicModal>
</template>
<script setup lang="ts">
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form';
  import { enterColumns, enterFormSchema } from './data';
  import { BasicTable, useTable } from '@/components/Table';
  import { ref, unref } from 'vue';
  import { message } from 'ant-design-vue';
  import { submitTiterCheckApi, getCheckItemDtListApi } from '@/api/inspect/resultRegistration';
  import { SERVER_ENUM } from '@/enums/serverEnum';
  import { useServerEnumStoreWithOut } from '@/store/modules/serverEnums';

  const serverEnumStore = useServerEnumStoreWithOut();
  const PlasmaType = serverEnumStore.getServerEnumText(SERVER_ENUM.PlasmaType);

  const emit = defineEmits(['close', 'confirm']);
  let fieldList: string[] = [];
  const bsno = ref('');
  const pid = ref('');
  const loading = ref(false);
  const projectName = ref('');
  const [
    registerForm,
    { removeSchemaByField, updateSchema, validate, resetFields, clearValidate },
  ] = useForm({
    labelWidth: 120,
    baseColProps: { span: 12 },
    schemas: enterFormSchema,
    showActionButtonGroup: false,
  });
  const [
    registerTable,
    { clearSelectedRowKeys, getSelectRows, reload, setPagination, redoHeight },
  ] = useTable({
    immediate: true,
    api: getCheckItemDtListApi,
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    rowKey: 'sampleNo',
    columns: enterColumns,
    size: 'small',
    useSearchForm: false,
    showTableSetting: false,
    bordered: true,
    isCanResizeParent: true,
    rowSelection: { type: 'checkbox' },
    beforeFetch: (p) => ({ ...p, type: 'INVALID_PRICE', bsNo: bsno.value, projectId: pid.value }),
    afterFetch: (res) => {
      clearSelectedRowKeys();
      return res;
    },
  });
  const [registerModal, { setModalProps }] = useModalInner(
    async ({ bsNo, projectId, plasmaType, projectAbbr }) => {
      bsno.value = bsNo;
      pid.value = projectId;
      projectName.value = projectAbbr;
      setPagination({ current: 1 });
      reloadPage();
      updateSchema({
        field: 'conclusion',
        componentProps: {
          options: [
            {
              label: PlasmaType(plasmaType) + '高效价',
              value: plasmaType + 'H',
            },
            {
              label: PlasmaType(plasmaType) + '低效价',
              value: plasmaType + 'L',
            },
            {
              label: '合格普通浆',
              value: 'N',
            },
          ],
        },
      });
    },
  );
  function close() {
    emit('close');
    removeSchemaByField(fieldList);
  }
  function reloadPage() {
    reload();
    resetFields();
    clearValidate();
  }
  async function handleSubmit(close: boolean) {
    const { conclusion, checkAt } = await validate();
    try {
      const rows = getSelectRows();
      if (rows.length === 0) return message.warning('请选择数据');
      const data = rows.map((_) => ({
        bsNo: unref(bsno),
        conclusion,
        checkAt,
        sampleNo: _.sampleNo,
        projectId: pid.value,
      }));
      setModalProps({ confirmLoading: true });
      loading.value = true;
      await submitTiterCheckApi(data);
      message.success('录入成功');
      if (close === false) {
        reloadPage();
      } else {
        emit('confirm');
      }
    } finally {
      setModalProps({ confirmLoading: false });
      loading.value = false;
    }
  }
</script>
