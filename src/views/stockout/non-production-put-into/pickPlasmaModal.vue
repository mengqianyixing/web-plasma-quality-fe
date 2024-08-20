<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    title="挑选血浆"
    @ok="handleSubmit"
    :min-height="600"
    width="1200px"
    @cancel="emit('success')"
    @fullscreen="redoHeight"
    cancel-text="关闭"
  >
    <div class="relative h-inherit max-h-inherit min-h-inherit">
      <div class="absolute flex flex-col w-full h-full">
        <BasicTable @register="registerTable" />
      </div>
    </div>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicTable, useTable } from '@/components/Table';
  import { getPickPlasmaList, pickPlasma } from '@/api/stockout/non-productin-put-into';
  import { onMounted, ref, watchEffect } from 'vue';
  import { useStation } from '@/hooks/common/useStation';
  import { useMessage } from '@/hooks/web/useMessage';
  import { getDilutionTypeApi } from '@/api/plasmaStore/inventory';

  defineOptions({ name: 'PickPlasmaModal' });
  const emit = defineEmits(['success', 'register']);

  const { stationOptions } = useStation();
  const { createMessage } = useMessage();
  const { warning } = createMessage;

  const selectedRow = ref<Recordable>([]);
  onMounted(async () => {
    watchEffect(async () => {
      await getForm()?.updateSchema({
        field: 'stationNo',
        componentProps: {
          options: stationOptions,
        },
      });
    });
  });

  const [registerTable, { getForm, clearSelectedRowKeys, redoHeight, reload }] = useTable({
    immediate: false,
    api: getPickPlasmaList,
    columns: [
      {
        title: '采浆公司',
        dataIndex: 'stationName',
      },
      {
        title: '血浆编号',
        dataIndex: 'bagNo',
      },
      {
        title: '血浆批号',
        dataIndex: 'batchNo',
      },
      {
        title: '浆员编号',
        dataIndex: 'cardNo',
      },
      {
        title: '采集日期',
        dataIndex: 'collDate',
      },
      {
        title: '血浆过程状态',
        dataIndex: 'plasmaStatus',
      },
      {
        title: '效价类型',
        dataIndex: 'titerType',
      },
    ],
    formConfig: {
      schemas: [
        {
          field: 'stationNo',
          label: '采浆公司',
          component: 'Select',
        },
        {
          field: 'cardNo',
          label: '浆员编号',
          component: 'Input',
        },
        {
          field: '[collStartDate, collEndDate]',
          label: '采集日期',
          component: 'RangePicker',
        },
        {
          field: 'plasmaType',
          label: '血浆过程状态',
          component: 'Select',
          componentProps: {
            options: [
              {
                label: '检测合格',
                value: 'UTRK',
              },
              {
                label: '检疫期合格',
                value: 'PASS',
              },
            ],
          },
        },
        {
          field: 'batchNo',
          label: '血浆批号',
          component: 'Input',
        },
        {
          field: 'bagNo',
          label: '血浆编号',
          component: 'Input',
        },
        {
          field: 'titerType',
          label: '效价类型',
          component: 'ApiSelect',
          componentProps: {
            api: getDilutionTypeApi,
            labelField: 'key',
            valueField: 'value',
          },
        },
      ],
      transformDateFunc(date) {
        return date ? date.format('YYYY-MM-DD') : '';
      },
    },
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    clickToRowSelect: true,
    rowSelection: {
      type: 'checkbox',
      onChange: (_, selectedRows: any) => {
        selectedRow.value = selectedRows;
      },
    },
    clearSelectOnPageChange: true,
    size: 'small',
    striped: false,
    useSearchForm: true,
    showTableSetting: false,
    bordered: true,
    showIndexColumn: false,
    inset: true,
    isCanResizeParent: true,
  });

  const dlvNo = ref('');
  const [registerModal, { setModalProps }] = useModalInner((data) => {
    setModalProps({
      maskClosable: false,
      destroyOnClose: true,
    });
    dlvNo.value = data.dlvNo;
  });

  function selectRowsCheck() {
    if (selectedRow.value.length === 0) {
      warning('请先选择一条数据');
      return false;
    } else {
      return true;
    }
  }

  async function handleSubmit() {
    if (!selectRowsCheck()) return;

    try {
      await pickPlasma({
        dlvNo: dlvNo.value,
        plasmaNos: selectedRow.value.map((item) => item.bagNo),
      });
      reload();
      clearSelectedRowKeys();
      setModalProps({ confirmLoading: true });
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
