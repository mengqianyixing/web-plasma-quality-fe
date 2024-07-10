<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    title="分拣批次信息"
    :footer="null"
    width="80%"
    :destroyOnClose="true"
    :draggable="false"
    :canFullscreen="false"
    :min-height="600"
  >
    <div class="relative h-inherit max-h-inherit min-h-inherit">
      <div class="absolute w-full h-full">
        <div class="flex-1 h-full shrink-1">
          <BasicTable @register="registerTable">
            <template #sortCount="{ record }">
              <div class="z-999">
                <a-button type="link" @click="goPlasmaDetail(record, 'sortCount')">
                  {{ record.sortCount }}
                </a-button>
              </div>
            </template>
            <template #waitSortCount="{ record }">
              <div class="z-999">
                <a-button type="link" @click="goPlasmaDetail(record, 'waitSortCount')">
                  {{ record.waitSortCount }}
                </a-button>
              </div>
            </template>
            <template #toolbar>
              <a-button> 自动分拣 </a-button>
              <a-button> 转人工分拣 </a-button>
            </template>
          </BasicTable>
        </div></div
      ></div
    >

    <PlasmaDetail @register="registerPlasmaDetailModal" />
  </BasicModal>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { BasicModal, useModalInner, useModal } from '@/components/Modal';
  import { BasicTable, useTable, BasicColumn } from '@/components/Table';
  import dayjs from 'dayjs';
  import PlasmaDetail from './PlasmaDetail.vue';
  import { getBatchInfo } from '@/api/stockout/production-sorting/production-sorting-main';
  import { prepareStateMap, prepareStateValueEnum } from '@/enums/stockoutEnum';

  const prepareNo = ref(''); // 准备号
  const selectedRow = ref([]); // 表格已选中

  const [registerModal] = useModalInner(async (data) => {
    prepareNo.value = data.record.prepareNo;
    if (data.record.prepareState !== 'RUN') {
      const cols = [...columnsImmunity];
      cols.splice(
        2,
        0,
        {
          title: '分拣血浆数量',
          dataIndex: 'sortCount',
          width: 120,
          slots: { customRender: 'sortCount' },
        },
        {
          title: '待分拣血浆数量',
          dataIndex: 'waitSortCount',
          width: 120,

          slots: { customRender: 'waitSortCount' },
        },
      );
      setProps({
        columns: cols,
      });
    }
  });

  const columnsImmunity: BasicColumn[] = [
    {
      title: '血浆批号',
      dataIndex: 'batchNo',
      width: 110,
    },
    {
      dataIndex: 'pickCount',
      title: '挑浆次数',
      width: 80,
    },
    {
      title: '分拣人',
      dataIndex: 'operator',
      width: 100,
      ellipsis: false,
    },
    {
      title: '开始时间',
      dataIndex: 'startAt',
      format(text) {
        return text ? dayjs(text).format('YYYY-MM-DD HH:mm:ss') : '-';
      },
      width: 140,
    },
    {
      title: '结束时间',
      dataIndex: 'endAt',
      format(text) {
        return text ? dayjs(text).format('YYYY-MM-DD HH:mm:ss') : '-';
      },
      width: 140,
    },
    {
      title: '耗时',
      dataIndex: 'elapsedTime',
      width: 100,
    },
    {
      title: '状态',
      dataIndex: 'state',
      width: 100,
      format(text) {
        return `${prepareStateMap.get(text as prepareStateValueEnum)}`;
      },
    },
  ];

  const [registerTable, { setProps }] = useTable({
    api: getBatchInfo,
    columns: columnsImmunity,
    useSearchForm: false,
    beforeFetch: (p) => {
      return { ...p, prepareNo: prepareNo.value };
    },
    rowSelection: {
      type: 'radio',
      onChange: (_, selectedRows: any) => {
        selectedRow.value = selectedRows;
      },
    },
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    size: 'small',
    striped: false,
    immediate: true,
    bordered: true,
    showIndexColumn: false,
    isCanResizeParent: true,
  });

  // 血浆明细
  const [registerPlasmaDetailModal, { openModal: openPlasmaDetailModal }] = useModal();
  function goPlasmaDetail(record, sort?) {
    openPlasmaDetailModal(true, {
      record: {
        ...record,
        prepareNo: prepareNo.value,
        batchNo: record.batchNo,
        sort,
      },
    });
  }
</script>
