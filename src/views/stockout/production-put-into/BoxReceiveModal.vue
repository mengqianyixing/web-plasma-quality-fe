<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="按箱接收列表"
    showFooter
    width="85%"
    :min-height="650"
    :showOkBtn="false"
    :cancelText="'关闭'"
    @cancel="handleClose"
  >
    <div class="flex items-center gap-1 w-[300px]">
      <span class="w-[80px]">{{ boxText }}：</span>
      <a-input
        ref="inputRef"
        size="large"
        @press-enter="handleEnter"
        :placeholder="'请扫' + boxText"
        :disabled="inputDisabled"
        v-model:value="inputValue"
      />
    </div>
    <div class="relative h-inherit max-h-inherit min-h-inherit">
      <div class="absolute flex w-full h-full">
        <div class="flex-1 shrink-1">
          <BasicTable @register="registerReceptionTable" :title="receptionTitle" />
        </div>

        <div class="flex-1 shrink-1">
          <BasicTable @register="registerAcceptedTable" :title="acceptedTitle" />
        </div>
      </div>
    </div>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { ref, computed, watch } from 'vue';
  import { BasicTable, useTable } from '@/components/Table';
  import { useMessage } from '@/hooks/web/useMessage';
  import { useScanHelper } from '@/hooks/common/useScanHelper';
  import { debounce } from 'lodash-es';

  import {
    getAcceptedReceptionList,
    getReceptionList,
    productionAcceptByBox,
  } from '@/api/stockout/production-put-into';
  import { RemoveEventFn } from '@/hooks/event/useEventListener';
  import { useServerConfig } from '@/hooks/common/useServerConfig';

  const { boxText } = useServerConfig();
  const orderNo = ref('');
  const inputDisabled = ref(false);
  const inputValue = ref('');

  const emit = defineEmits(['success', 'register']);
  const { createMessage } = useMessage();
  const inputRef = ref<HTMLElement | null>(null);

  const { barCode, startEvent, enterFlag } = useScanHelper();
  const _handleEnter = debounce(handleEnter, 300);

  watch([barCode, enterFlag], async ([code, flag]) => {
    if (code && flag) {
      inputValue.value = code;
      await _handleEnter();
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
        title: boxText,
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
    size: 'small',
    striped: false,
    useSearchForm: false,
    bordered: true,
    showIndexColumn: true,
    indexColumnProps: {
      width: 80,
    },
    inset: false,
    isCanResizeParent: true,
    immediate: false,
  });
  const [registerAcceptedTable, { reload: reloadAccepted }] = useTable({
    api: getAcceptedReceptionList,
    columns: [
      {
        title: boxText,
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
    size: 'small',
    striped: false,
    useSearchForm: false,
    bordered: true,
    showIndexColumn: true,
    indexColumnProps: {
      width: 80,
    },
    inset: false,
    isCanResizeParent: true,
    immediate: false,
  });

  let _removeEvent: RemoveEventFn = () => {};
  const [register, { setModalProps, closeModal }] = useModalInner((data) => {
    const { removeEvent } = startEvent();
    _removeEvent = removeEvent;

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
      setModalProps({
        loading: true,
      });

      await productionAcceptByBox({
        orderNo: orderNo.value,
        boxNo: inputValue.value,
      });

      createMessage.success('接收成功');
    } finally {
      setModalProps({
        loading: false,
      });

      inputValue.value = '';
      inputDisabled.value = false;

      reloadTable();
    }
  }

  function handleClose() {
    _removeEvent();
    closeModal();
    emit('success');
  }
</script>
