<!--
 * @Descripttion: 
 * @version: 
 * @Author: zcc
 * @Date: 2023-12-29 15:36:12
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-02 13:47:54
-->
<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    title="录入效价结果"
    width="800px"
    @close="close"
    @ok="handleSubmit"
  >
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

  const emit = defineEmits(['confirm']);
  let fieldList: string[] = [];
  const bsno = ref('');
  const pid = ref('');
  const [registerForm, { removeSchemaByField, updateSchema, validate }] = useForm({
    labelWidth: 120,
    baseColProps: { span: 12 },
    schemas: enterFormSchema,
    showActionButtonGroup: false,
  });
  const [registerTable, { clearSelectedRowKeys, getSelectRows, reload }] = useTable({
    immediate: true,
    api: getCheckItemDtListApi,
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    rowKey: 'dictItemId',
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
  const [registerDrawer] = useDrawerInner(async ({ titerType, bsNo, projectId }) => {
    bsno.value = bsNo;
    pid.value = projectId;
    reload();
    updateSchema({
      field: 'conclusion',
      componentProps: {
        options: [
          {
            label: titerType + '高效价',
            value: titerType + '高效价',
          },
          {
            label: titerType + '低效价',
            value: titerType + '低效价',
          },
          {
            label: '合格普通浆',
            value: '合格普通浆',
          },
        ],
      },
    });
  });
  function close() {
    removeSchemaByField(fieldList);
  }
  async function handleSubmit() {
    const { conclusion, checkAt } = await validate();
    const rows = getSelectRows();
    if (rows.length === 0) return message.warning('请选择数据');
    const data = rows.map((_) => ({
      bsNo: unref(bsno),
      conclusion,
      checkAt,
      sampleId: _.sampleId,
    }));
    await submitTiterCheckApi(data);
    emit('confirm');
  }
</script>
