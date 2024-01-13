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
    <BatchNoMadal @register="register" />
    <VerifyNumModal @register="registerVerifyNum" />
    <NoPassModal @register="registerNoPass" />
    <HortFallModal @register="registerHortFall" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';
  import { PageWrapper } from '@/components/Page';
  import { entryColumns, searchFormSchema } from './entrySearch.data';
  import { receptionDetailApi } from '@/api/plasmaStore/entryPlasma';
  import { useModal } from '/@/components/Modal';
  import BatchNoMadal from './batchNoModal.vue';
  import VerifyNumModal from './verifyNumModal.vue';
  import NoPassModal from './noPassModal.vue';
  import HortFallModal from './hortFallModal.vue';
  // import dayjs from 'dayjs';
  // import { cloneDeep } from 'lodash-es';
  // import { TableColumnType } from 'ant-design-vue';

  const [register, { openModal }] = useModal();
  const [registerVerifyNum, { openModal: openVerifyNumModal }] = useModal();
  const [registerNoPass, { openModal: openNoPassModal }] = useModal();
  const [registerHortFall, { openModal: openHortFallModal }] = useModal();

  defineOptions({ name: 'PlasmaStoreSetting' });

  const [registerTable] = useTable({
    title: '入库查询',
    api: receptionDetailApi,
    dataSource: [
      {
        verifyNoPassNum: '5',
      },
    ],
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    formConfig: {
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
      openModal(true, { batchNo: row.batchNo });
    } else if (flag === 'verifyNum') {
      openVerifyNumModal(true, { batchNo: row.batchNo });
    } else if (flag === 'verifyNoPassNum') {
      openNoPassModal(true, { batchNo: row.batchNo, bagVerify: 'FAIL' });
    } else {
      openHortFallModal(true, { batchNo: row.batchNo });
    }
  }
</script>
