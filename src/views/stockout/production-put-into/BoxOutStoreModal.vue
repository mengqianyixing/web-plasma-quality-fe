<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="逐箱出库列表"
    showFooter
    width="85%"
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
            size="large"
            @keyup="handleKeyupEnter"
            placeholder="请扫箱号"
            :disabled="inputDisabled"
            v-model:value="inputValue"
          />
        </div>
        <div class="flex" style="height: calc(100% - 40px)">
          <div class="flex-1 shrink-1">
            <BasicTable
              @register="registerNoOutTable"
              :title="'未出库箱数: ' + (noOutTableData?.length ?? 'N/A')"
              :dataSource="noOutTableData"
            />
          </div>
          <div class="flex-1 shrink-1">
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

  const orderNo = ref('');
  const inputDisabled = ref(false);
  const inputValue = ref('');
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
    setModalProps({
      loading: true,
    });
    originTableData.value = await getProductionOutStoreList(orderNo.value);
    setModalProps({
      loading: false,
    });
  }

  const noOutTableData = computed(() => originTableData.value?.notOutList);
  const outTableData = computed(() => originTableData.value?.outList);

  async function handleEnter() {
    inputDisabled.value = true;

    try {
      setModalProps({
        loading: true,
      });
      await productionOutStore({
        orderNo: orderNo.value,
        boxNo: inputValue.value,
      });

      createMessage.success('出库成功');

      await reloadTable();

      if (noOutTableData.value?.length === 0) {
        createMessage.success('全部出库成功');
      }
    } finally {
      setModalProps({
        loading: false,
      });
      inputValue.value = '';
      inputDisabled.value = false;
    }
  }

  function handleClose() {
    _removeEvent();
    closeModal();
    emit('success');
  }
</script>
