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
  >
    <BasicTable @register="registerTable" :scroll="{ y: 600 }">
      <template #sortCount="{ record }">
        <div class="z-999">
          <a-button type="link" @click="goPlasmaDetail(record)">
            {{ record.sortCount }}
          </a-button>
        </div>
      </template>
      <template #waitSortCount="{ record }">
        <div class="z-999">
          <a-button type="link" @click="goPlasmaDetail(record)">
            {{ record.waitSortCount }}
          </a-button>
        </div>
      </template>
    </BasicTable>
    <PlasmaDetail @register="registerPlasmaDetailModal" />
  </BasicModal>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { BasicModal, useModalInner, useModal } from '@/components/Modal';
  import { BasicTable, useTable, BasicColumn } from '@/components/Table';
  import dayjs from 'dayjs';
  import PlasmaDetail from './PlasmaDetail.vue';
  import { getBatchInfo } from '@/api/stockout/production-preparation.js';
  import { prepareStateMap, prepareStateValueEnum } from '@/enums/stockoutEnum';

  const prepareNo = ref(''); // 准备号

  const [registerModal] = useModalInner(async (data) => {
    console.log('看看批次', data);
    prepareNo.value = data.record.prepareNo;
  });

  const columnsImmunity: BasicColumn[] = [
    {
      title: '血浆批号',
      dataIndex: 'batchNo',
      align: 'left',
    },
    {
      dataIndex: 'pickCount',
      title: '挑浆次数',
    },
    {
      title: '分拣血浆数量',
      dataIndex: 'sortCount',
      slots: { customRender: 'sortCount' },
    },
    {
      title: '待分拣血浆数量',
      dataIndex: 'waitSortCount',
      slots: { customRender: 'waitSortCount' },
    },
    {
      title: '分拣人',
      dataIndex: 'operator',
    },
    {
      title: '开始时间',
      dataIndex: 'startAt',
      format(text) {
        return text ? dayjs(text).format('YYYY-MM-DD HH:mm:ss') : '-';
      },
    },
    {
      title: '结束时间',
      dataIndex: 'endAt',
      format(text) {
        return text ? dayjs(text).format('YYYY-MM-DD HH:mm:ss') : '-';
      },
    },
    {
      title: '耗时',
      dataIndex: 'elapsedTime',
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

  const [registerTable] = useTable({
    api: getBatchInfo,
    columns: columnsImmunity,
    useSearchForm: false,
    beforeFetch: (p) => {
      return { ...p, prepareNo: prepareNo.value };
    },
    pagination: true,
    clickToRowSelect: false,
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
  });

  // 血浆明细
  const [registerPlasmaDetailModal, { openModal: openPlasmaDetailModal }] = useModal();
  function goPlasmaDetail(record) {
    openPlasmaDetailModal(true, {
      record: { ...record, prepareNo: prepareNo.value },
    });
  }
</script>
