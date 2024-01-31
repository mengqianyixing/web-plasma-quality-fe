<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="批次详情"
    showFooter
    width="85%"
    :showOkBtn="false"
    @cancel="handelCancel"
  >
    <BasicTable @register="registerTable" ref="table" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { ref } from 'vue';
  import { BasicTable, useTable } from '@/components/Table';

  import { detailColumns } from '@/views/stockout/production-put-into/production-put-into.data';
  import { getForPlasmaListApi } from '@/api/stockout/production-plan';

  const orderNo = ref('');

  defineEmits(['success', 'register']);

  const [registerTable, { reload, getForm }] = useTable({
    api: getForPlasmaListApi,
    columns: detailColumns,
    formConfig: {
      schemas: [
        {
          field: 'plasmaBatchNo',
          label: '血浆批号',
          component: 'Input',
        },
        {
          field: 'boxNo',
          label: '血浆箱号',
          component: 'Input',
        },
        {
          field: 'plasmaNo',
          label: '血浆编号',
          component: 'Input',
        },
      ],
    },
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    beforeFetch: (params) => {
      return {
        ...params,
        orderNo: orderNo.value,
      };
    },
    size: 'small',
    striped: false,
    useSearchForm: true,
    showTableSetting: false,
    bordered: true,
    showIndexColumn: true,
    indexColumnProps: {
      width: 80,
    },
    immediate: false,
    canResize: false,
  });
  const [register, { setModalProps }] = useModalInner((data) => {
    setModalProps({
      maskClosable: false,
    });

    orderNo.value = data.record.orderNo;

    reload();
  });

  function handelCancel() {
    getForm().resetFields();
  }
</script>
