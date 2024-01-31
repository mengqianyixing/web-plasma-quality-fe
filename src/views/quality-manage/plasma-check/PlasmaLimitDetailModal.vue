<template>
  <BasicModal v-bind="$attrs" @register="register" title="血浆限制列表" showFooter width="85%">
    <Description @register="registerLimitDetail" :data="plasmaLimitDesData" />

    <BasicTable @register="registerTable" ref="table">
      <template #bagNos="{ record }">
        <span
          class="text-blue-500 underline cursor-pointer"
          @click.stop.self="handleGoDetail(record)"
        >
          {{ record?.bagCount }}
        </span>
      </template>
    </BasicTable>
    <template #footer>
      <a-button type="primary" @click="handleConfirm">确认</a-button>
    </template>
  </BasicModal>
  <BasicModal
    v-bind="$attrs"
    @register="registerDetail"
    title="血浆编号列表"
    :showOkBtn="false"
    width="30%"
  >
    <BasicTable @register="registerDetailTable" :dataSource="tableData" />
    <template #footer>
      <a-button @click="closeDetailModal">关闭</a-button>
    </template>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicModal, useModalInner, useModal } from '@/components/Modal';
  import { ref } from 'vue';
  import { BasicTable, useTable } from '@/components/Table';

  import { getBindBoxListApi } from '@/api/quality/plasma-restriction';
  import Description from '@/components/Description/src/Description.vue';
  import { useDescription } from '@/components/Description';

  const batchNo = ref('');
  const plasmaLimitDesData = ref<Recordable>({});
  const tableData = ref([]);
  const emit = defineEmits(['success', 'register']);

  const [registerDetail, { openModal: openDetailModal, closeModal: closeDetailModal }] = useModal();
  const [registerLimitDetail] = useDescription({
    bordered: false,
    column: 1,
    title: '',
    schema: [
      {
        field: 'batchNo',
        label: '血浆批号',
      },
      {
        field: 'totalBoxCount',
        label: '总箱数',
      },
      {
        field: 'remark',
        label: '用途限制',
      },
    ],
  });

  const [registerTable, { reload, getRawDataSource }] = useTable({
    api: getBindBoxListApi,
    columns: [
      {
        title: '箱号',
        dataIndex: 'boxNo',
      },
      {
        title: '血浆总数',
        dataIndex: 'bagCount',
        slots: { customRender: 'bagNos' },
      },
      {
        title: '血浆编号',
        dataIndex: 'bagNos',
        ifShow: false,
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
        batchNo: batchNo.value,
      };
    },
    afterFetch: (data) => {
      const originData = getRawDataSource();
      plasmaLimitDesData.value = {
        batchNo: batchNo.value,
        totalBoxCount: originData.totalCount,
        remark: originData.remark,
      };
      return data;
    },
    size: 'small',
    striped: false,
    useSearchForm: false,
    tableSetting: {
      size: false,
      redo: false,
      setting: false,
    },
    bordered: true,
    showIndexColumn: true,
    indexColumnProps: {
      width: 80,
    },
    immediate: false,
    canResize: false,
  });
  const [registerDetailTable] = useTable({
    columns: [
      {
        title: '血浆编号',
        dataIndex: 'bagNo',
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
        batchNo: batchNo.value,
      };
    },
    afterFetch: (data) => {
      const originData = getRawDataSource();
      plasmaLimitDesData.value = {
        batchNo: batchNo.value,
        totalBoxCount: originData.totalCount,
        remark: originData.remark,
      };
      return data;
    },
    size: 'small',
    striped: false,
    useSearchForm: false,
    tableSetting: {
      size: false,
      redo: false,
      setting: false,
    },
    bordered: true,
    showIndexColumn: true,
    indexColumnProps: {
      width: 80,
    },
    immediate: false,
    canResize: false,
  });
  const flag = ref('');
  const [register, { setModalProps, closeModal }] = useModalInner((data) => {
    setModalProps({
      maskClosable: false,
    });

    flag.value = data.flag;

    batchNo.value = data.record.batchNo;

    reload();
  });

  function handleGoDetail(record) {
    tableData.value = record.bagNos.split(',').map((it) => ({ bagNo: it }));
    openDetailModal();
  }

  function handleConfirm() {
    closeModal();
    emit('success', flag.value);
  }
</script>
