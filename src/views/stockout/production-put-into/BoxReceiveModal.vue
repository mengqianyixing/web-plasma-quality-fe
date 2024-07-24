<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="按箱接收列表"
    showFooter
    width="800px"
    :min-height="600"
    :showOkBtn="false"
    :cancelText="'关闭'"
    @cancel="handleClose"
  >
    <div class="relative h-inherit max-h-inherit min-h-inherit">
      <div class="absolute w-full h-full">
        <div class="flex items-center gap-1 w-[300px]">
          <span class="w-[80px]">箱号：</span>
          <a-input
            ref="inputRef"
            size="large"
            @keyup="handleKeyupEnter"
            placeholder="请扫箱号"
            :readonly="inputDisabled"
            v-model:value="inputValue"
          />
        </div>
        <div class="flex" style="height: calc(100% - 40px)">
          <div class="flex-1 shrink-1">
            <BasicTable @register="registerReceptionTable" :title="receptionTitle" />
          </div>

          <div class="flex-1 shrink-1">
            <BasicTable @register="registerAcceptedTable" :title="acceptedTitle" />
          </div>
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

  const orderNo = ref('');
  const inputDisabled = ref(false);
  const inputValue = ref('');

  const emit = defineEmits(['success', 'register']);
  const { createMessage, createWarningModal } = useMessage();
  const inputRef = ref<HTMLElement | null>(null);

  const { barCode, startEvent, enterFlag } = useScanHelper();
  const _handleEnter = debounce(handleEnter, 300);

  watch([barCode, enterFlag], async ([code, flag]) => {
    if (code && flag) {
      inputValue.value = code;
      await _handleEnter();
    }
  });
  function handleKeyupEnter(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      _handleEnter();
    }
  }
  const receptionCount = ref(0);
  const acceptedCount = ref(0);
  const receptionTitle = computed(() => `未接收箱数：${receptionCount.value}`);
  const acceptedTitle = computed(() => `已接收箱数：${acceptedCount.value}`);

  const [registerReceptionTable, { reload: reloadReception, getRawDataSource }] = useTable({
    api: getReceptionList,
    columns: [
      {
        title: '箱号',
        dataIndex: 'boxNo',
        width: 150,
      },
      {
        title: '血浆总数',
        dataIndex: 'acceptBagCount',
        width: 80,
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
    afterFetch: () => {
      receptionCount.value = getRawDataSource().totalCount;
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
  const [
    registerAcceptedTable,
    { reload: reloadAccepted, getRawDataSource: getRawDataSourceAccepted },
  ] = useTable({
    api: getAcceptedReceptionList,
    columns: [
      {
        title: '箱号',
        dataIndex: 'boxNo',
        width: 150,
      },
      {
        title: '血浆总数',
        dataIndex: 'acceptBagCount',
        width: 80,
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
    afterFetch: () => {
      acceptedCount.value = getRawDataSourceAccepted().totalCount;
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

      const res = await productionAcceptByBox({
        orderNo: orderNo.value,
        boxNo: inputValue.value,
      });
      if (res.data.code !== '0' && res.data.msg) {
        _removeEvent();
        createWarningModal({
          title: '提示',
          content: res.data.msg,
          keyboard: false,
          wrapClassName: 'ppbr9527',
          onOk: () => {
            const { removeEvent } = startEvent();
            _removeEvent = removeEvent;
          },
        });
        const dom: HTMLElement | null = document.querySelector('.ppbr9527 button');
        setTimeout(() => {
          dom?.blur();
        });
        return;
      }
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
