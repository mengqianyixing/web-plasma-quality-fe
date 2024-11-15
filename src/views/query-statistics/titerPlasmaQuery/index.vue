<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex flex-col">
    <div>
      <BasicTable @register="registerTable" style="padding-bottom: 0" />
    </div>
    <div class="flex-1 bg-white p-16px pt-0px pb-0px m-6px mb-0px">
      <vxe-grid
        v-bind="gridOptionsUnaccept"
        ref="tableRef"
        :data="unAcceptList"
        :loading="tableLoading"
      >
        <template #[slot.slotName]="{ row }" v-for="slot in slots" :key="slot.slotName">
          <span v-if="row.stationName === '合计'">
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
    <div class="bg-white mb-10px pb-6px pr-16px m-6px">
      <a-pagination
        class="float-right mt-2"
        @change="handlePageChange"
        @show-size-change="handleSizeChange"
        size="small"
        show-size-changer
        show-quick-jumper
        :page-size-options="['10', '30', '50', '80', '100']"
        v-model:current="pager.currPage"
        v-model:pageSize="pager.pageSize"
        :total="pager.total"
        :show-total="(total) => `共 ${total} 条数据`"
      />
    </div>
    <TabelModal @register="registerModal" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';
  import { columns, searchFormSchema } from './data';
  import { PageWrapper } from '@/components/Page';
  import { getListApi, getCountApi } from '@/api/query-statistics/titerPlasmaQuery';
  import { GetApiSearchPlasmaPrivilegeResponse } from '@/api/type/queryStatistics';
  import { get, isEqual } from 'lodash-es';
  import { useModal } from '@/components/Modal';
  import TabelModal from './tabelModal.vue';
  import { reactive, ref } from 'vue';
  import { VxeGridProps } from 'vxe-table';
  import { message, Pagination as APagination } from 'ant-design-vue';
  import { useSticky } from '@/hooks/web/useSticky';

  defineOptions({ name: 'TiterPlasmaQuery' });

  const tableRef = ref();
  const totalStyle = useSticky(tableRef, { bodyClass: 'vxe-table--body-wrapper' });
  const [registerModal, { openModal }] = useModal();
  const pager = reactive({
    pageSize: 30,
    currPage: 1,
    total: 0,
  });
  const slots = ['B', 'R', 'T', 'N', 'C'].reduce((res: Recordable[], it) => {
    const list = [
      { slotName: it + 'N', key: it + '.' + 'nTiter' },
      { slotName: it + 'L', key: it + '.' + 'lTiter' },
      { slotName: it + 'H', key: it + '.' + 'hTiter' },
    ];
    return [...res, ...list];
  }, []);

  const unAcceptList = ref([]);
  const tableLoading = ref(false);
  let _saveParams = {};
  let _saveCount = {};

  const getCacheCount = (p) => {
    const values = getForm().getFieldsValue();
    const _isEqual = isEqual(values, _saveParams);
    if (_isEqual) {
      return Promise.resolve(_saveCount);
    } else {
      _saveParams = values;
      return getCountApi(p);
    }
  };
  const gridOptionsUnaccept = reactive<VxeGridProps<any>>({
    border: true,
    rowConfig: {
      isHover: true,
    },
    height: 'auto',
    exportConfig: {},
    columnConfig: {
      resizable: true,
    },
    scrollY: {
      enabled: false,
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
  const [registerTable, { getForm, reload }] = useTable({
    api: (p) => Promise.all([getListApi(p), getCacheCount(p)]),
    immediate: false,
    columns: [],
    formConfig: {
      schemas: searchFormSchema,
      submitFunc,
    },
    emptyDataIsShowTable: false,
    size: 'small',
    striped: false,
    useSearchForm: true,
    bordered: true,
    pagination: false,
    showIndexColumn: false,
    beforeFetch: (p) => ({ ...p, ...pager }),
    afterFetch: (
      res: [GetApiSearchPlasmaPrivilegeResponse, GetApiSearchPlasmaPrivilegeResponse['result'][0]],
    ) => {
      const formatData = [...res[0].result, res[1]].map((row) => {
        row['B'] = row.titers.find((it) => it.rawImm === '乙免') || {};
        row['R'] = row.titers.find((it) => it.rawImm === '狂免') || {};
        row['T'] = row.titers.find((it) => it.rawImm === '破免') || {};
        row['N'] = row.titers.find((it) => it.rawImm === '普通') || {};
        row['C'] = row.titers.find((it) => it.rawImm === '巨细胞') || {};
        return row;
      });
      _saveCount = res[1];
      unAcceptList.value = formatData as any;
      pager.total = res[0].totalCount;
      return [];
    },
  });

  async function handlePageChange(e) {
    pager.currPage = e;
    reload();
  }

  async function handleSizeChange(_, size) {
    pager.pageSize = size;
    reload();
  }
  function getFormIsNotNull() {
    const values = getForm().getFieldsValue();
    return Object.values(values).some((v) => v || v === 0);
  }
  function submitFunc() {
    if (getFormIsNotNull()) {
      pager.currPage = 1;
      reload();
      return Promise.resolve();
    }
    message.warning('请选择或输入条件进行查询');
    return Promise.reject();
  }
  function cellClick(slotName: string, data: Recordable) {
    const [rawImm, titerLevel] = slotName.split('');
    const { batchNo, stationNo } = data;
    const values = getForm().getFieldsValue();

    openModal(true, { ...values, rawImm, titerLevel, batchNo, stationNo });
  }
</script>
<style scoped>
  :deep(.vxe-table--body tr:last-child) {
    position: v-bind('totalStyle.position');
    top: v-bind('totalStyle.top');
    bottom: v-bind('totalStyle.bottom');
    background-color: #f5f5f5;
  }
</style>
