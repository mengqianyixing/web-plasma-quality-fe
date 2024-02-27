<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="扫描出库"
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

  import { getPlasmaScanList, outStorePlasma } from '@/api/stockout/non-productin-put-into';
  import { GetApiCoreBankDeliverNonproductiveScanResponse } from '@/api/type/stockoutManage';

  const dlvNo = ref('');
  const inputDisabled = ref(false);
  const inputValue = ref('');
  const originTableData = ref<GetApiCoreBankDeliverNonproductiveScanResponse>({});

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
        title: '未扫描血浆编号',
        dataIndex: 'bagNo',
      },
      {
        title: '浆员姓名',
        dataIndex: 'donorName',
      },
      {
        title: '浆员编号',
        dataIndex: 'donorNo',
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
      },
      {
        title: '浆员编号',
        dataIndex: 'donorNo',
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
    inputRef.value?.focus();

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

  async function handleEnter() {
    inputDisabled.value = true;

    try {
      await outStorePlasma({
        dlvNo: dlvNo.value,
        bagNo: inputValue.value,
      });

      createMessage.success('出库成功');

      await reloadTable();
    } catch (e) {
      console.log(123123);
    } finally {
      inputValue.value = '';
      inputDisabled.value = false;
      await nextTick(() => {
        inputRef.value?.focus();
      });
    }
  }
</script>
