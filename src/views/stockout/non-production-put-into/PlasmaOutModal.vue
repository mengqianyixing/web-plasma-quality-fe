<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="扫描出库"
    showFooter
    width="1000px"
    :min-height="600"
    :showOkBtn="false"
    cancel-text="关闭"
  >
    <div class="relative h-inherit max-h-inherit min-h-inherit">
      <div class="absolute w-full h-full">
        <div class="flex items-center gap-2 w-[300px]">
          <span class="w-[120px] ml-4">血浆编号：</span>
          <ScanInput
            ref="inputRef"
            size="lg"
            placeholder="请扫描血浆编号"
            @scan-change="(code) => (inputValue = code)"
            :readonly="inputDisabled"
            :value="inputValue"
            @enter="_handleEnter"
            @keyup="handleKeyupEnter"
          />
        </div>
        <div class="flex" style="height: calc(100% - 40px)">
          <div class="flex-1 shrink-1">
            <BasicTable
              @register="registerNoOutTable"
              :title="'未出库袋数: ' + noOutTableData?.length"
              :dataSource="noOutTableData"
            />
          </div>
          <div class="flex-1 shrink-1">
            <BasicTable
              @register="registerOutStoreTable"
              :title="'已出库袋数: ' + outTableData?.length"
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
  import { ref, computed } from 'vue';
  import { BasicTable, useTable } from '@/components/Table';
  import { useMessage } from '@/hooks/web/useMessage';

  import { getPlasmaScanList, outStorePlasma } from '@/api/stockout/non-productin-put-into';
  import { GetApiCoreBankDeliverNonproductiveScanResponse } from '@/api/type/stockoutManage';
  import ScanInput from '@/components/Form/src/components/ScanInput.vue';
  import { debounce } from 'lodash-es';

  const dlvNo = ref('');
  const inputDisabled = ref(false);
  const inputValue = ref('');
  const originTableData = ref<GetApiCoreBankDeliverNonproductiveScanResponse>({});

  defineEmits(['success', 'register']);
  const { createMessage, createWarningModal } = useMessage();
  const inputRef = ref();

  const [registerNoOutTable] = useTable({
    columns: [
      {
        title: '未扫描血浆编号',
        dataIndex: 'bagNo',
      },
      {
        title: '浆员姓名',
        dataIndex: 'donorName',
        width: 100,
        ellipsis: false,
      },
      {
        title: '浆员编号',
        dataIndex: 'cardNo',
        width: 120,
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
    immediate: false,
    canResize: false,
  });
  const [registerOutStoreTable] = useTable({
    columns: [
      {
        title: '已扫描血浆编号',
        dataIndex: 'bagNo',
      },
      {
        title: '浆员姓名',
        dataIndex: 'donorName',
        width: 100,
        ellipsis: false,
      },
      {
        title: '浆员编号',
        dataIndex: 'cardNo',
        width: 120,
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
    immediate: false,
    canResize: false,
  });
  const [register, { setModalProps }] = useModalInner(async (data) => {
    inputRef.value.$el.focus();

    setModalProps({
      maskClosable: false,
    });

    dlvNo.value = data.record.dlvNo;
    await reloadTable();
  });

  async function reloadTable() {
    originTableData.value = await getPlasmaScanList({ dlvNo: dlvNo.value });
  }

  const noOutTableData = computed(() => originTableData.value?.waitList ?? []);
  const outTableData = computed(() => originTableData.value?.outList ?? []);

  const _handleEnter = debounce(handleEnter, 300);

  function handleKeyupEnter(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      _handleEnter();
    }
  }
  async function handleEnter() {
    inputDisabled.value = true;

    try {
      const res = await outStorePlasma({
        dlvNo: dlvNo.value,
        bagNo: inputValue.value,
      });
      if (res.data.code !== '0' && res.data.msg) {
        createWarningModal({
          title: '提示',
          content: res.data.msg,
          keyboard: false,
          onOk: () => {
            setTimeout(() => {
              inputRef.value.$el.focus();
              inputRef.value.$el.select();
            }, 300);
          },
        });

        return;
      }
      createMessage.success('出库成功');
      inputValue.value = '';
      await reloadTable();
    } finally {
      inputDisabled.value = false;
    }
  }
</script>
