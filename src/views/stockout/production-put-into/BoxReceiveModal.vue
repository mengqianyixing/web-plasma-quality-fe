<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="按箱接收列表"
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
      <BasicTable @register="registerReceptionTable" :title="receptionTitle" />
      <BasicTable @register="registerAcceptedTable" :title="acceptedTitle" />
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
    getAcceptedReceptionList,
    getReceptionList,
    productionAcceptByBox,
  } from '@/api/stockout/production-put-into';

  const orderNo = ref('');
  const inputDisabled = ref(false);
  const inputValue = ref('');

  defineEmits(['success', 'register']);
  const { createMessage } = useMessage();
  const inputRef = ref<HTMLElement | null>(null);
  const { focused } = useFocus(inputRef);
  watchEffect(() => {
    if (!focused.value) {
      focused.value = true;
    }
  });

  const receptionCount = ref(0);
  const acceptedCount = ref(0);
  const receptionTitle = computed(() => `未接收箱数：${receptionCount.value}`);
  const acceptedTitle = computed(() => `已接收箱数：${acceptedCount.value}`);

  const [registerReceptionTable, { reload: reloadReception }] = useTable({
    api: getReceptionList,
    columns: [
      {
        title: '箱号',
        dataIndex: 'boxNo',
      },
      {
        title: '血浆总数',
        dataIndex: 'acceptBagCount',
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
    afterFetch: (data) => {
      receptionCount.value = data.length;
    },
    size: 'large',
    striped: false,
    useSearchForm: false,
    showTableSetting: false,
    bordered: true,
    showIndexColumn: true,
    indexColumnProps: {
      width: 80,
    },
    immediate: false,
    canResize: false,
  });
  const [registerAcceptedTable, { reload: reloadAccepted }] = useTable({
    api: getAcceptedReceptionList,
    columns: [
      {
        title: '箱号',
        dataIndex: 'boxNo',
      },
      {
        title: '血浆总数',
        dataIndex: 'acceptBagCount',
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
    afterFetch: (data) => {
      acceptedCount.value = data.length;
    },
    size: 'large',
    striped: false,
    useSearchForm: false,
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
    reloadTable();
  });

  function reloadTable() {
    reloadReception();
    reloadAccepted();
  }

  async function handleEnter() {
    inputDisabled.value = true;

    try {
      await productionAcceptByBox({
        orderNo: orderNo.value,
        boxNo: inputValue.value,
      });

      createMessage.success('接收成功');
    } finally {
      inputValue.value = '';
      inputDisabled.value = false;
      await nextTick(() => {
        inputRef.value?.focus();
      });

      reloadTable();
    }
  }
</script>
