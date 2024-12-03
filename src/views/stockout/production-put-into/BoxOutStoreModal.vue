<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="逐箱出库列表"
    showFooter
    width="800px"
    :min-height="600"
    :showOkBtn="false"
    :cancelText="'关闭'"
    @cancel="handleClose"
    @fullscreen="redoHeight"
  >
    <div class="relative h-inherit max-h-inherit min-h-inherit">
      <div class="absolute w-full h-full">
        <div class="flex items-center gap-1 w-[300px]">
          <span class="w-[80px]">箱号：</span>
          <ScanInput
            size="lg"
            @keyup="handleKeyupEnter"
            placeholder="请扫箱号"
            @scan-change="(code) => (inputValue = code)"
            :readonly="inputDisabled"
            @enter="_handleEnter"
            :value="inputValue"
            ref="inputRef"
          />
        </div>
        <div class="flex" style="height: calc(100% - 40px)">
          <div class="w-1/2">
            <BasicTable
              @register="registerNoOutTable"
              :title="'未出库箱数: ' + (noOutTableData?.length ?? 'N/A')"
              :dataSource="noOutTableData"
            />
          </div>
          <div class="w-1/2">
            <BasicTable
              @register="registerOutStoreTable"
              :title="'已出库箱数: ' + (outTableData?.length ?? 'N/A')"
              :dataSource="outTableData"
            />
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
    getProductionOutStoreList,
    productionOutStore,
  } from '@/api/stockout/production-put-into';
  import { GetApiProductOutStoreBoxesOrderNoResponse } from '@/api/type/productionSortingMangeMain';
  import { RemoveEventFn } from '@/hooks/event/useEventListener';
  import ScanInput from '@/components/Form/src/components/ScanInput.vue';

  const orderNo = ref('');
  const inputDisabled = ref(false);
  const inputValue = ref('');
  const inputRef = ref();
  const originTableData = ref<GetApiProductOutStoreBoxesOrderNoResponse>({});

  const emit = defineEmits(['success', 'register']);
  const { createMessage } = useMessage();
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
  const [registerNoOutTable, { redoHeight: leftRedo, setLoading: setLeftLoading }] = useTable({
    columns: [
      {
        title: '箱号',
        dataIndex: 'boxNo',
        width: 150,
      },
      {
        title: '血浆总数',
        dataIndex: 'bagNum',
        width: 80,
      },
    ],
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },

    size: 'small',
    striped: false,
    useSearchForm: false,
    pagination: false,
    bordered: true,
    showIndexColumn: true,
    indexColumnProps: {
      width: 80,
    },
    inset: true,
    isCanResizeParent: true,
    immediate: false,
  });
  const [registerOutStoreTable, { redoHeight: rightRedo, setLoading: setRightLoading }] = useTable({
    columns: [
      {
        title: '箱号',
        dataIndex: 'boxNo',
        width: 150,
      },
      {
        title: '血浆总数',
        dataIndex: 'bagNum',
        width: 80,
      },
    ],
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    size: 'small',
    striped: false,
    useSearchForm: false,
    pagination: false,
    bordered: true,
    showIndexColumn: true,
    indexColumnProps: {
      width: 80,
    },
    inset: true,
    isCanResizeParent: true,
    immediate: false,
  });
  function redoHeight() {
    leftRedo();
    rightRedo();
  }
  let _removeEvent: RemoveEventFn = () => {};
  const [register, { setModalProps, closeModal }] = useModalInner(async (data) => {
    const { removeEvent } = startEvent();
    _removeEvent = removeEvent;

    setModalProps({
      maskClosable: false,
    });

    orderNo.value = data.record.orderNo;
    await reloadTable();
  });

  async function reloadTable() {
    setLeftLoading(true);
    setRightLoading(true);
    originTableData.value = await getProductionOutStoreList(orderNo.value);
    setLeftLoading(false);
    setRightLoading(false);
  }

  const noOutTableData = computed(() => originTableData.value?.notOutList);
  const outTableData = computed(() => originTableData.value?.outList);

  async function handleEnter() {
    inputDisabled.value = true;

    try {
      const res = await productionOutStore({
        orderNo: orderNo.value,
        boxNo: inputValue.value,
      });
      if (res.data.code !== '0' && res.data.msg) {
        _removeEvent();
        createMessage.warn(res?.data?.msg);
        inputValue.value = '';
        setTimeout(() => {
          inputRef.value.$el.focus();
          inputRef.value.$el.select();
        }, 300);
        return;
      }
      createMessage.success('出库成功');
      inputValue.value = '';
      await reloadTable();

      if (noOutTableData.value?.length === 0) {
        createMessage.success('全部出库成功');
      }
    } finally {
      inputDisabled.value = false;
    }
  }

  function handleClose() {
    _removeEvent();
    closeModal();
    emit('success');
  }
</script>
