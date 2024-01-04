<!--
 * @Descripttion: 
 * @version: 
 * @Author: zcc
 * @Date: 2023-12-29 15:36:12
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-04 14:08:20
-->
<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="projectName + '录入效价结果'"
    width="800px"
    okText="提交&关闭"
    cancelText="关闭"
    @close="close"
    @ok="handleSubmit(true)"
  >
    <template #appendFooter>
      <a-button type="primary" @click="handleSubmit(false)" :loading="loading">提交&继续</a-button>
    </template>
    <div class="flex flex-col h-full">
      <BasicForm @register="registerForm" />
      <div class="flex-1">
        <BasicTable @register="registerTable" />
      </div>
    </div>
  </BasicDrawer>
</template>
<script setup lang="ts">
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { BasicForm, useForm } from '@/components/Form';
  import { enterColumns, enterFormSchema } from './data';
  import { BasicTable, useTable } from '@/components/Table';
  import { ref, unref } from 'vue';
  import { message } from 'ant-design-vue';
  import { submitTiterCheckApi, getCheckItemDtListApi } from '@/api/inspect/resultRegistration';
  import { PLASMA_TYPE_TEXT } from '@/enums/inspectEnum';

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
  const [registerTable, { clearSelectedRowKeys, getSelectRows, reload, setPagination }] = useTable({
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
  const [registerDrawer, { setDrawerProps }] = useDrawerInner(
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
              label: PLASMA_TYPE_TEXT[plasmaType] + '高效价',
              value: PLASMA_TYPE_TEXT[plasmaType] + '高效价',
            },
            {
              label: PLASMA_TYPE_TEXT[plasmaType] + '低效价',
              value: PLASMA_TYPE_TEXT[plasmaType] + '低效价',
            },
            {
              label: '合格普通浆',
              value: '合格普通浆',
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
      setDrawerProps({ confirmLoading: true });
      loading.value = true;
      await submitTiterCheckApi(data);
      message.success('录入成功');
      if (close === false) {
        reloadPage();
      } else {
        emit('confirm');
      }
    } finally {
      setDrawerProps({ confirmLoading: false });
      loading.value = false;
    }
  }
</script>
