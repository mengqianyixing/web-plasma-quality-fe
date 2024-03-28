<!--
 * @Descripttion: 
 * @version: 
 * @Author: zcc
 * @Date: 2023-12-29 16:24:20
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-13 16:51:13
-->
<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    showFooter
    title="选择批次"
    width="1140px"
    cancelText="关闭"
    @ok="handleSubmit"
    :minHeight="520"
    @fullscreen="redoHeight"
  >
    <div class="flex h-inherit max-h-inherit min-h-inherit">
      <div class="flex-1 w-full">
        <BasicTable @register="registerTable" />
      </div>
    </div>
  </BasicModal>
</template>
<script setup lang="ts">
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicTable, useTable } from '@/components/Table';
  import { batchColumns, batchSearchScheam } from './resultRegistration.data';
  import { defineEmits } from 'vue';
  import { getBatchListApi } from '@/api/inspect/resultRegistration';
  import { message } from 'ant-design-vue';
  import { SERVER_ENUM } from '@/enums/serverEnum';
  import { useServerEnumStoreWithOut } from '@/store/modules/serverEnums';
  import { useStation } from '@/hooks/common/useStation';

  const serverEnumStore = useServerEnumStoreWithOut();
  const SampleType = serverEnumStore.getServerEnumText(SERVER_ENUM.SampleType);
  const { getStationNameById } = useStation();
  defineOptions({ name: 'LocationModel' });
  const emit = defineEmits(['confirm', 'register']);

  let rawData: Recordable[] = [];

  const [
    registerTable,
    { clearSelectedRowKeys, reload, setPagination, getSelectRows, redoHeight, setLoading },
  ] = useTable({
    api: getData,
    immediate: false,
    size: 'small',
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    formConfig: {
      schemas: batchSearchScheam,
    },
    rowKey: 'bsNo',
    columns: batchColumns,
    useSearchForm: true,
    showIndexColumn: false,
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
    try {
      setLoading(true);
      const res = await getBatchListApi({});
      rawData = res;
    } finally {
      setLoading(false);
    }
    reload();
  });
  function getData(params) {
    return new Promise((rs) => {
      const { pageSize, currPage, stationName, sampleCode, bsNo } = params;
      const fields = [
        { key: 'stationName', value: getStationNameById(stationName) },
        { key: 'sampleCode', value: SampleType(sampleCode) },
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
    emit('confirm', row);
  }
</script>
