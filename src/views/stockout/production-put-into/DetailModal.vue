<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="批次详情"
    showFooter
    width="85%"
    :showOkBtn="false"
    :min-height="600"
  >
    <div class="relative h-inherit max-h-inherit min-h-inherit">
      <div class="absolute w-full h-full">
        <BasicTable @register="registerTable" ref="table" />
      </div>
    </div>
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

  const [registerTable, { getForm }] = useTable({
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
    isCanResizeParent: true,
    inset: false,
    scroll: {
      x: 0,
    },
    showIndexColumn: true,
    indexColumnProps: {
      width: 80,
    },
    immediate: false,
  });
  const [register, { setModalProps }] = useModalInner(async (data) => {
    await getForm().resetFields();

    setModalProps({
      maskClosable: false,
    });

    orderNo.value = data.record.orderNo;

    await getForm().setFieldsValue({
      boxNo: data.record.boxNo,
    });
  });
</script>
