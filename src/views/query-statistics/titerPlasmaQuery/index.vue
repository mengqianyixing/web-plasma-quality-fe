<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable">
      <template #[slot.slotName]="data" v-for="slot in slots" :key="slot.slotName">
        <span v-if="data.record.isCount">
          {{ get(data.record, slot.key) }}
        </span>
        <span
          v-else
          class="text-blue-500 underline cursor-pointer"
          @click.stop.self="cellClick(slot.slotName, data.record)"
        >
          {{ get(data.record, slot.key) }}
        </span>
      </template>
    </BasicTable>
    <TabelModal @register="registerModal" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';
  import { columns, searchFormSchema } from './data';
  import { PageWrapper } from '@/components/Page';
  import { getListApi } from '@/api/query-statistics/titerPlasmaQuery';
  import { isArray, isObject } from '@/utils/is';
  import { PostApiCoreBagTiterResponse } from '@/api/type/queryStatistics';
  import { get } from 'lodash-es';
  import { useModal } from '@/components/Modal';
  import TabelModal from './tabelModal.vue';

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
  const [registerTable] = useTable({
    api: getListApi,
    columns,
    formConfig: {
      schemas: searchFormSchema,
    },
    size: 'small',
    striped: false,
    useSearchForm: true,
    bordered: true,
    pagination: false,
    showIndexColumn: false,
    afterFetch: (res: PostApiCoreBagTiterResponse) => {
      const formatData = res.map((row) => {
        row['B'] = row.titers.find((it) => it.rawImm === '乙免') || {};
        row['R'] = row.titers.find((it) => it.rawImm === '狂免') || {};
        row['T'] = row.titers.find((it) => it.rawImm === '破免') || {};
        row['N'] = row.titers.find((it) => it.rawImm === '普浆') || {};
        row['G'] = row.titers.find((it) => it.rawImm === '巨细胞') || {};
        return row;
      });

      const row = getCountRow(formatData);
      return [...formatData, row];
    },
  });
  function cellClick(slotName: string, data: Recordable) {
    const [rawImm, titerLevel] = slotName.split('');
    const { batchNo, stationNo } = data;
    openModal(true, { rawImm, titerLevel, batchNo, stationNo });
  }
  function getCountRow(data: Recordable[]) {
    const row = columns.reduce((row, { dataIndex, children = [] }) => {
      row[dataIndex as string] = 0;
      children.forEach(({ dataIndex: ci }) => {
        if (isArray(ci)) {
          row[ci[0]] = row[ci[0]] || {};
          row[ci[0]][ci[1]] = 0;
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
