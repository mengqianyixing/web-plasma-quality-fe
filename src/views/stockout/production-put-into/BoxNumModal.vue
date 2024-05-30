<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="箱数详情"
    showFooter
    width="60%"
    :min-height="520"
    :showOkBtn="false"
    @cancel="handelCancel"
  >
    <div class="relative h-inherit max-h-inherit min-h-inherit">
      <div class="absolute w-full h-full">
        <BasicTable @register="registerTable">
          <template #bagNum="{ record }">
            <span
              class="text-blue-500 underline cursor-pointer"
              @click.stop.self="handleBagNum(record)"
            >
              {{ record?.bagNum }}
            </span>
          </template>
        </BasicTable>
      </div>
    </div>

    <DetailModal @register="registerDetailModal" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicModal, useModal, useModalInner } from '@/components/Modal';
  import { ref } from 'vue';
  import { BasicTable, useTable } from '@/components/Table';
  import { getBoxNumDetailList } from '@/api/stockout/production-put-into';

  import DetailModal from './DetailModal.vue';

  const orderNo = ref('');

  defineEmits(['success', 'register']);

  const [registerDetailModal, { openModal: openDetailModal }] = useModal();

  const [registerTable, { reload, getForm }] = useTable({
    api: getBoxNumDetailList,
    columns: [
      {
        title: '投产准备号',
        dataIndex: 'prepareNo',
      },
      {
        title: '血浆箱号',
        dataIndex: 'boxNo',
      },
      {
        title: '血浆数量',
        dataIndex: 'bagNum',
        slots: { customRender: 'bagNum' },
      },
      {
        title: '血浆类型',
        dataIndex: 'plasmaType',
      },
      {
        title: '包装人',
        dataIndex: 'packBy',
      },
      {
        title: '包装日期',
        dataIndex: 'packAt',
      },
    ],
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
    useSearchForm: false,
    bordered: true,
    isCanResizeParent: true,
    inset: false,
    showTableSetting: false,
    showIndexColumn: true,
    indexColumnProps: {
      width: 80,
    },
    immediate: false,
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

  function handleBagNum(record) {
    openDetailModal(true, {
      record: {
        ...record,
        orderNo: orderNo.value,
      },
    });
  }
</script>
