<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable">
      <template #stationNo="{ record }">
        {{ getStationNameById(record?.stationNo) }}
      </template>
      <template #toolbar>
        <a-button type="primary" @click="handleUnqualifiedStage"> 不合格暂存 </a-button>
        <a-button type="primary" @click="handleWeightRegister"> 重量登记 </a-button>
        <a-button type="primary" @click="handleVerifyRelease">验收发布</a-button>
        <a-button type="primary" @click="handleVerifyList">验收清单</a-button>
        <a-button type="primary" @click="handleVisualInspectionList">外观检查清单</a-button>
      </template>
    </BasicTable>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';
  import { columns, searchFormSchema } from './record.data';

  import { onMounted, ref, watchEffect } from 'vue';
  import { PageWrapper } from '@/components/Page';
  import { getPlasmaInboundList } from '@/api/inbound-management/plasma-inbound-record';
  import { useStation } from '@/hooks/common/useStation';

  const { isLoading, stationOptions, getStationNameById } = useStation();

  onMounted(() => {
    watchEffect(() => {
      if (!isLoading) {
        getForm().updateSchema({
          field: 'stationNo',
          componentProps: {
            options: stationOptions.value,
          },
        });
      }
    });
  });

  defineOptions({ name: 'PlasmaInboundRecord' });

  const selectedRowsRef = ref<Recordable>([]);
  const [registerTable, { getForm }] = useTable({
    title: '血浆入库记录',
    api: getPlasmaInboundList,
    columns,
    formConfig: {
      schemas: searchFormSchema,
    },
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    clickToRowSelect: true,
    rowSelection: {
      type: 'radio',
      onChange(_, selectedRows) {
        selectedRowsRef.value = selectedRows;
      },
    },
    size: 'large',
    striped: false,
    useSearchForm: true,
    showTableSetting: true,
    tableSetting: {
      size: false,
      redo: false,
      setting: false,
    },
    bordered: true,
    showIndexColumn: false,
    canResize: true,
  });

  function handleUnqualifiedStage() {}

  function handleWeightRegister() {}

  function handleVerifyRelease() {}

  function handleVerifyList() {}

  function handleVisualInspectionList() {}
</script>
