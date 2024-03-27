<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    title="单号明细"
    width="70%"
    :minHeight="600"
    :showOkBtn="false"
  >
    <div class="relative h-inherit max-h-inherit min-h-inherit">
      <div class="absolute flex flex-col w-full h-full">
        <BasicTable @register="registerTable">
          <template #toolbar>
            <a-button type="primary" @click="handleExport" :loading="loading"> 导出 </a-button>
          </template>
        </BasicTable>
      </div>
    </div>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { ref } from 'vue';
  import { BasicTable, useTable } from '@/components/Table';
  import { getERPOutDetail } from '@/api/query-statistics/ERP';
  import { formatData, getHeader, jsonToSheetXlsx } from '@/components/Excel/src/Export2Excel';
  import { useGlobalApiStoreWithOut } from '@/store/modules/globalApi';
  import { useRouter } from 'vue-router';

  const globalApiStore = useGlobalApiStoreWithOut();

  defineOptions({ name: 'PickPlasmaModal' });
  const { currentRoute } = useRouter();

  const columns = [
    {
      title: '血浆编号',
      dataIndex: 'bagNo',
    },
    {
      title: '血浆批号',
      dataIndex: 'batchNo',
    },
    {
      title: '验收净重',
      dataIndex: 'verifyWeight',
    },
    {
      title: '物料编码',
      dataIndex: 'materialNo',
    },
  ];
  const [registerTable, { reload }] = useTable({
    api: getERPOutDetail,
    columns,
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    beforeFetch: (params) => {
      return { ...params, dlvNo: dlvNo.value };
    },
    isCanResizeParent: true,
    inset: true,
    size: 'small',
    striped: false,
    useSearchForm: false,
    bordered: true,
    immediate: false,
  });

  const dlvNo = ref('');

  const [registerModal, { setModalProps }] = useModalInner(async (data) => {
    setModalProps({ confirmLoading: false });

    dlvNo.value = data.dlvNo;

    await reload();
  });

  const loading = ref(false);
  async function handleExport() {
    loading.value = true;
    try {
      const pageSize = (await globalApiStore.getSysParamsValue('maxPageSize')) as string;
      const data = await getERPOutDetail({ currPage: 1, pageSize, dlvNo: dlvNo.value } as any);
      const { rows, merges: headerMerge, lastLevelCols } = getHeader(columns);
      const { result, merge: bodyMerge } = formatData(
        lastLevelCols,
        data.result || [],
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
