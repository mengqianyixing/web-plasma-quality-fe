<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="逐箱出库列表"
    showFooter
    width="85%"
    :showOkBtn="false"
  >
    <div class="flex items-center gap-2 w-[300px]">
      <span class="w-[80px]">箱号：</span>
      <a-input
        ref="inputRef"
        size="large"
        @press-enter="handleEnter"
        placeholder="请扫箱号"
        :disabled="inputDisabled"
        v-model:value="inputValue"
      />
    </div>
    <div class="flex mt-3">
      <BasicTable
        @register="registerNoOutTable"
        :title="'未出库箱数: ' + noOutTableData?.length"
        :dataSource="noOutTableData"
      />
      <BasicTable
        @register="registerOutStoreTable"
        :title="'已出库箱数: ' + outTableData?.length"
        :dataSource="outTableData"
      />
    </div>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { ref, computed, watchEffect, nextTick } from 'vue';
  import { BasicTable, useTable } from '@/components/Table';
  import { useMessage } from '@/hooks/web/useMessage';
  import { useFocus } from '@vueuse/core';

  import {
    getProductionOutStoreList,
    productionOutStore,
  } from '@/api/stockout/production-put-into';
  import { GetApiProductOutStoreBoxesOrderNoResponse } from '@/api/type/stockoutManage';

  const orderNo = ref('');
  const inputDisabled = ref(false);
  const inputValue = ref('');
  const originTableData = ref<GetApiProductOutStoreBoxesOrderNoResponse>({});

  defineEmits(['success', 'register']);
  const { createMessage } = useMessage();
  const inputRef = ref<HTMLElement | null>(null);
  const { focused } = useFocus(inputRef);
  watchEffect(() => {
    if (!focused.value) {
      focused.value = true;
    }
  });

  const [registerNoOutTable] = useTable({
    columns: [
      {
        title: '箱号',
        dataIndex: 'boxNo',
      },
      {
        title: '血浆总数',
        dataIndex: 'bagNum',
      },
    ],
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },

    size: 'large',
    striped: false,
    useSearchForm: false,
    showTableSetting: false,
    pagination: false,
    bordered: true,
    showIndexColumn: true,
    indexColumnProps: {
      width: 80,
    },
    immediate: false,
    canResize: false,
  });
  const [registerOutStoreTable] = useTable({
    columns: [
      {
        title: '箱号',
        dataIndex: 'boxNo',
      },
      {
        title: '血浆总数',
        dataIndex: 'bagNum',
      },
    ],
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    size: 'large',
    striped: false,
    useSearchForm: false,
    showTableSetting: false,
    pagination: false,
    bordered: true,
    showIndexColumn: true,
    indexColumnProps: {
      width: 80,
    },
    immediate: false,
    canResize: false,
  });
  const [register, { setModalProps }] = useModalInner(async (data) => {
    setModalProps({
      maskClosable: false,
    });

    orderNo.value = data.record.orderNo;
    await reloadTable();
  });

  async function reloadTable() {
    originTableData.value = await getProductionOutStoreList(orderNo.value);
  }

  const noOutTableData = computed(() => originTableData.value?.notOutList);
  const outTableData = computed(() => originTableData.value?.outList);

  async function handleEnter() {
    inputDisabled.value = true;

    try {
      await productionOutStore({
        orderNo: orderNo.value,
        boxNo: inputValue.value,
      });

      createMessage.success('出库成功');

      await reloadTable();
    } finally {
      inputValue.value = '';
      inputDisabled.value = false;
      await nextTick(() => {
        inputRef.value?.focus();
      });
    }
  }
</script>
