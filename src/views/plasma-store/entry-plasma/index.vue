<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <BasicTable @register="registerTable">
      <!-- 采浆编号跳转 -->
      <template #batchNo="{ record }">
        <span
          :class="
            !record?.batchNo ? 'pointer-events-none' : 'text-blue-500 underline cursor-pointer'
          "
          @click.stop.self="handleDetails(record, 'batchNo')"
        >
          {{ record?.batchNo }}
        </span>
      </template>
      <!-- 验收数量跳转 -->
      <template #verifyNum="{ record }">
        <span
          :class="
            !record?.verifyNum ? 'pointer-events-none' : 'text-blue-500 underline cursor-pointer'
          "
          @click.stop.self="handleDetails(record, 'verifyNum')"
        >
          {{ record?.verifyNum }}
        </span>
      </template>
      <!-- 验收不合格数量跳转 -->
      <template #verifyNoPassNum="{ record }">
        <span
          :class="
            !record?.verifyNoPassNum
              ? 'pointer-events-none'
              : 'text-blue-500 underline cursor-pointer'
          "
          @click.stop.self="handleDetails(record, 'verifyNoPassNum')"
        >
          {{ record?.verifyNoPassNum }}
        </span>
      </template>
      <!-- 不足量数量跳转 -->
      <template #shortFallNum="{ record }">
        <span
          :class="
            !record?.shortFallNum ? 'pointer-events-none' : 'text-blue-500 underline cursor-pointer'
          "
          @click.stop.self="handleDetails(record, 'shortFallNum')"
        >
          {{ record?.shortFallNum }}
        </span>
      </template>
      <template #toolbar>
        <a-button type="primary" @click="handleExport" :loading="loading">导出</a-button>
      </template>
    </BasicTable>
    <BatchNoModal @register="register" />
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
  import { useModal } from '@/components/Modal';
  import BatchNoModal from './batchNoModal.vue';
  import VerifyNumModal from './verifyNumModal.vue';
  import NoPassModal from './noPassModal.vue';
  import HortFallModal from './hortFallModal.vue';

  import { ref } from 'vue';
  import { message } from 'ant-design-vue';
  import { formatData, getHeader, jsonToSheetXlsx } from '@/components/Excel/src/Export2Excel';
  import { useGlobalApiStoreWithOut } from '@/store/modules/globalApi';
  import { useRouter } from 'vue-router';

  const [register, { openModal }] = useModal();
  const [registerVerifyNum, { openModal: openVerifyNumModal }] = useModal();
  const [registerNoPass, { openModal: openNoPassModal }] = useModal();
  const [registerHortFall, { openModal: openHortFallModal }] = useModal();

  defineOptions({ name: 'EntryPlasma' });

  const globalApiStore = useGlobalApiStoreWithOut();
  const { currentRoute } = useRouter();

  const [registerTable, { getForm }] = useTable({
    api: receptionDetailApi,
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
    scroll: {
      x: 0,
    },
    rowKey: 'batchNo',
    columns: entryColumns,
    useSearchForm: true,
    bordered: true,
    showIndexColumn: true,
  });

  function handleDetails(
    row: Recordable,
    flag: 'batchNo' | 'verifyNum' | 'verifyNoPassNum' | string,
  ) {
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

  const loading = ref(false);
  async function handleExport() {
    loading.value = true;
    try {
      const pageSize = (await globalApiStore.getSysParamsValue('maxPageSize')) as string;
      const OriginData = await receptionDetailApi({
        ...getForm().getFieldsValue(),
        currPage: '1',
        pageSize,
      });
      if ((OriginData.totalCount || 0) > Number(pageSize))
        return message.warning('最多只能导出【' + pageSize + '】条数据');
      const { rows, merges: headerMerge, lastLevelCols } = getHeader(entryColumns);
      const { result, merge: bodyMerge } = formatData(
        lastLevelCols,
        OriginData.result || [],
        rows.length,
      );
      jsonToSheetXlsx({
        data: [...rows, ...result],
        json2sheetOpts: { skipHeader: true },
        merges: [...headerMerge, ...bodyMerge],
        filename: currentRoute.value.meta.title + '.xlsx',
      });
    } finally {
      loading.value = false;
    }
  }
</script>
<style scoped>
  :deep(.ant-table th) {
    white-space: wrap;
  }
</style>
