<!--
 * @Descripttion: 
 * @version: 
 * @Author: zcc
 * @Date: 2023-12-29 16:24:20
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-12 17:42:46
-->
<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    showFooter
    title="选择批次"
    width="1200px"
    cancelText="关闭"
    @ok="handleSubmit"
    :minHeight="520"
    @fullscreen="redoHeight"
  >
    <div class="flex h-inherit max-h-inherit min-h-inherit">
      <div class="flex-1 w-full">
        <BasicTable @register="registerTable">
          <template #sampleCode="{ record }: { record: Recordable }">
            {{ sampleTypeMap.get(record.sampleCode) }}
          </template>
        </BasicTable>
      </div>
    </div>
  </BasicModal>
</template>
<script setup lang="ts">
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicTable, useTable } from '@/components/Table';
  import { batchColumns, batchSearchScheam } from './resultRegistration.data';
  import { defineEmits, onMounted, ref } from 'vue';
  import { getBatchListApi } from '@/api/inspect/resultRegistration';
  import { message } from 'ant-design-vue';
  import { getDictItemListByNoApi } from '@/api/dictionary';

  defineOptions({ name: 'LocationModel' });
  const emit = defineEmits(['confirm', 'register']);
  const sampleTypeMap = ref(new Map());

  let rawData: Recordable[] = [];

  const [
    registerTable,
    { clearSelectedRowKeys, reload, setPagination, getSelectRows, redoHeight },
  ] = useTable({
    api: getData,
    title: '',
    immediate: false,
    size: 'small',
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    formConfig: {
      labelWidth: 90,
      baseColProps: {
        span: 6,
      },
      schemas: batchSearchScheam,
    },
    rowKey: 'bsNo',
    columns: batchColumns,
    useSearchForm: true,
    bordered: true,
    isCanResizeParent: true,
    rowSelection: { type: 'radio' },
    afterFetch: (res) => {
      clearSelectedRowKeys();
      return res;
    },
  });
  const [registerModal] = useModalInner(async () => {
    setPagination({ current: 1 });
    clearSelectedRowKeys();
    const res = await getBatchListApi({});
    rawData = res;
    reload();
  });
  function getData(params) {
    return new Promise((rs) => {
      const { pageSize, currPage, stationName, sampleCode, bsNo } = params;
      const fields = [
        { key: 'stationName', value: stationName },
        { key: 'sampleCode', value: sampleCode },
        { key: 'bsNo', value: bsNo },
      ].filter((_) => _.value);
      const filterData = fields.reduce(
        (pre, cur) => pre.filter((_) => cur.value === _[cur.key]),
        rawData,
      );
      rs({
        result: filterData.slice((currPage - 1) * pageSize, currPage * pageSize),
        totalCount: filterData.length,
      });
    });
  }
  function handleSubmit() {
    const rows = getSelectRows();
    if (rows.length === 0) return message.warning('请选择一条数据');
    const [row] = rows;
    emit('confirm', { ...row, sampleTypeName: sampleTypeMap.value.get(row.sampleCode) });
  }
  onMounted(async () => {
    const [res] = await getDictItemListByNoApi(['sampleType']);
    res.dictImtes?.forEach((_) => {
      sampleTypeMap.value.set(_.value, _.label);
    });
  });
</script>
