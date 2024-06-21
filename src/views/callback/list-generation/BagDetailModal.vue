<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="浆员血浆袋详情"
    width="85%"
    :min-height="700"
    :showOkBtn="false"
  >
    <div class="relative h-inherit max-h-inherit min-h-inherit">
      <div class="absolute flex flex-col w-full h-full">
        <BasicTable @register="registerTable" />
      </div>
    </div>
  </BasicModal>
</template>
<script lang="tsx" setup>
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { ref } from 'vue';
  import { BasicTable, useTable } from '@/components/Table';

  import { getDonorBagDetail } from '@/api/callback/list-generation';

  const [registerTable, { reload }] = useTable({
    api: getDonorBagDetail,
    columns: [
      {
        dataIndex: 'bagNo',
        title: '血浆编号',
        width: 100,
      },
      {
        dataIndex: 'plasmaType',
        title: '血浆类型',
        width: 80,
      },
      {
        dataIndex: 'flow',
        title: '血浆流程',
        width: 100,
      },
      {
        dataIndex: 'batchNo',
        title: '血浆批号',
        width: 120,
      },
      {
        dataIndex: 'donorNo',
        title: '浆员编号',
        width: 120,
      },
      {
        dataIndex: 'name',
        title: '浆员姓名',
        width: 80,
      },
      {
        dataIndex: 'collDate',
        title: '采集日期',
        width: 150,
      },
    ],
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    beforeFetch(params) {
      return {
        ...params,
        planNo: planNo.value,
        donorNo: donorNo.value,
      };
    },
    rowKey: 'donorNo',
    clickToRowSelect: false,
    size: 'small',
    striped: false,
    useSearchForm: false,
    bordered: true,
    showIndexColumn: false,
    scroll: {
      x: 0,
    },
    isCanResizeParent: true,
    inset: true,
    immediate: false,
  });

  const planNo = ref('');
  const donorNo = ref('');

  const [register] = useModalInner((data) => {
    donorNo.value = data.cardNo;
    planNo.value = data.planNo;

    reload();
  });
</script>
