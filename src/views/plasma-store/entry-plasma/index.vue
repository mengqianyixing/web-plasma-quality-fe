<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <BasicTable @register="registerTable">
      <!-- 采浆编号跳转 -->
      <template #batchNo="{ record }">
        <span
          class="text-blue-500 underline cursor-pointer"
          @click.stop.self="handleDetails(record, 'batchNo')"
        >
          {{ record.batchNo }}
        </span>
      </template>
      <!-- 验收数量跳转 -->
      <template #verifyNum="{ record }">
        <span
          class="text-blue-500 underline cursor-pointer"
          @click.stop.self="handleDetails(record, 'verifyNum')"
        >
          {{ record.verifyNum }}
        </span>
      </template>
      <!-- 验收不合格数量跳转 -->
      <template #verifyNoPassNum="{ record }">
        <span
          class="text-blue-500 underline cursor-pointer"
          @click.stop.self="handleDetails(record, 'verifyNoPassNum')"
        >
          {{ record.verifyNoPassNum }}
        </span>
      </template>
      <!-- 不足量数量跳转 -->
      <template #hortFallNum="{ record }">
        <span
          class="text-blue-500 underline cursor-pointer"
          @click.stop.self="handleDetails(record, 'hortFallNum')"
        >
          {{ record.hortFallNum }}
        </span>
      </template>
    </BasicTable>
    <BatchNoMadal @register="registerDrawer" />
    <VerifyNumModal @register="registerVerifyNumDrawer" />
    <NoPassModal @register="registerNoPassDrawer" />
    <HortFallModal @register="registerHortFallDrawer" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';
  import { PageWrapper } from '@/components/Page';
  import { entryColumns, searchFormSchema } from './entrySearch.data';
  import { receptionDetailApi } from '@/api/plasmaStore/entryPlasma';
  import { useDrawer } from '@/components/Drawer';
  import BatchNoMadal from './batchNoModal.vue';
  import VerifyNumModal from './verifyNumModal.vue';
  import NoPassModal from './noPassModal.vue';
  import HortFallModal from './hortFallModal.vue';
  // import dayjs from 'dayjs';
  // import { cloneDeep } from 'lodash-es';
  // import { TableColumnType } from 'ant-design-vue';

  const [registerDrawer, { openDrawer }] = useDrawer();
  const [registerVerifyNumDrawer, { openDrawer: openVerifyNumDrawer }] = useDrawer();
  const [registerNoPassDrawer, { openDrawer: openNoPassDrawer }] = useDrawer();
  const [registerHortFallDrawer, { openDrawer: openHortFallDrawer }] = useDrawer();

  defineOptions({ name: 'PlasmaStoreSetting' });

  const [registerTable] = useTable({
    title: '入库查询',
    api: receptionDetailApi,
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
      transformDateFunc(date) {
        return date ? date.format('YYYY-MM-DD') : '';
      },
    },
    rowKey: 'batchNo',
    columns: entryColumns,
    useSearchForm: true,
    bordered: true,
    showIndexColumn: true,
  });

  function handleDetails(row: Recordable, flag) {
    if (flag === 'batchNo') {
      openDrawer(true, { batchNo: row.batchNo });
    } else if (flag === 'verifyNum') {
      openVerifyNumDrawer(true, { batchNo: row.batchNo });
    } else if (flag === 'verifyNoPassNum') {
      openNoPassDrawer(true, { batchNo: row.batchNo, bagVerify: 'FAIL' });
    } else {
      openHortFallDrawer(true, { batchNo: row.batchNo });
    }
  }
</script>
