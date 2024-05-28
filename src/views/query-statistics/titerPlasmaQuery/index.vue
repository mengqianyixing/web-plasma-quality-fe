<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex flex-col">
    <div>
      <BasicTable @register="registerTable" style="padding-bottom: 0" />
    </div>
    <div class="flex-1 p-16px pt-0px">
      <vxe-grid v-bind="gridOptionsUnaccept" :data="unAcceptList" :loading="tableLoading">
        <template #[slot.slotName]="{ row }" v-for="slot in slots" :key="slot.slotName">
          <span v-if="row.isCount">
            {{ get(row, slot.key) }}
          </span>
          <span
            v-else
            class="text-blue-500 underline cursor-pointer"
            @click.stop.self="cellClick(slot.slotName, row)"
          >
            {{ get(row, slot.key) }}
          </span>
        </template>
      </vxe-grid>
    </div>
    <TabelModal @register="registerModal" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';
  import { columns, searchFormSchema } from './data';
  import { PageWrapper } from '@/components/Page';
  import { getListApi } from '@/api/query-statistics/titerPlasmaQuery';
  import { isObject } from '@/utils/is';
  import { GetApiSearchPlasmaPrivilegeResponse } from '@/api/type/queryStatistics';
  import { get } from 'lodash-es';
  import { useModal } from '@/components/Modal';
  import TabelModal from './tabelModal.vue';
  import { reactive, ref } from 'vue';
  import { VxeGridProps } from 'vxe-table';

  defineOptions({ name: 'TiterPlasmaQuery' });

  const [registerModal, { openModal }] = useModal();

  const slots = ['B', 'R', 'T', 'N', 'G'].reduce((res: Recordable[], it) => {
    const list = [
      { slotName: it + 'N', key: it + '.' + 'nTiter' },
      { slotName: it + 'L', key: it + '.' + 'lTiter' },
      { slotName: it + 'H', key: it + '.' + 'hTiter' },
    ];
    return [...res, ...list];
  }, []);

  const unAcceptList = ref([]);
  const tableLoading = ref(false);
  const gridOptionsUnaccept = reactive<VxeGridProps<any>>({
    border: true,
    height: 'auto',
    showOverflow: true,
    exportConfig: {},
    columnConfig: {
      resizable: true,
    },
    scrollY: {
      enabled: true,
      gt: 0,
    },
    pagerConfig: {
      enabled: false,
    },
    formConfig: {
      enabled: false,
    },
    toolbarConfig: {
      refresh: false,
      loading: false,
      export: false,
      custom: false,
    },
    columns: columns as any,
    showFooter: false,
  });
  const [registerTable] = useTable({
    api: getListApi,
    columns: [],
    formConfig: {
      schemas: searchFormSchema,
    },
    emptyDataIsShowTable: false,
    size: 'small',
    striped: false,
    useSearchForm: true,
    bordered: true,
    pagination: false,
    showIndexColumn: false,
    afterFetch: (res: GetApiSearchPlasmaPrivilegeResponse) => {
      const formatData = res.map((row) => {
        row['B'] = row.titers.find((it) => it.rawImm === '乙免') || {};
        row['R'] = row.titers.find((it) => it.rawImm === '狂免') || {};
        row['T'] = row.titers.find((it) => it.rawImm === '破免') || {};
        row['N'] = row.titers.find((it) => it.rawImm === '普浆') || {};
        row['G'] = row.titers.find((it) => it.rawImm === '巨细胞') || {};
        return row;
      });

      const row = getCountRow(formatData);
      const data = [...formatData, row];
      unAcceptList.value = data as any;
      return [];
    },
    immediate: false,
  });

  function cellClick(slotName: string, data: Recordable) {
    const [rawImm, titerLevel] = slotName.split('');
    const { batchNo, stationNo } = data;
    openModal(true, { rawImm, titerLevel, batchNo, stationNo });
  }
  function getCountRow(data: Recordable[]) {
    const row = columns.reduce((row, { field, children = [] }) => {
      row[field as string] = 0;
      children.forEach(({ field: ci }) => {
        if (ci.includes('.')) {
          const fs = ci.split('.');
          row[fs[0]] = row[fs[0]] || {};
          row[fs[0]][fs[1]] = 0;
        } else {
          row[ci as string] = 0;
        }
      });
      return row;
    }, {});
    data.forEach((it) => {
      for (const key in it) {
        const data = it[key];
        if (isObject(data)) {
          for (const ck in data) {
            row[key][ck] += data[ck] || 0;
          }
        } else {
          row[key] += data || 0;
        }
      }
    });
    row['B']['reagentBatch'] = '--';
    row['R']['reagentBatch'] = '--';
    row['T']['reagentBatch'] = '--';
    ['B', 'R', 'T', 'N', 'G'].map((it) => {
      row[it]['hRatio'] = row[it]['hTiter'] / row['bagCount'];
      row[it]['lRatio'] = row[it]['lTiter'] / row['bagCount'];
      row[it]['nRatio'] = row[it]['nTiter'] / row['bagCount'];
    });

    return { ...row, stationName: '合计', batchNo: '批次数：' + data.length + '批', isCount: true };
  }
</script>
