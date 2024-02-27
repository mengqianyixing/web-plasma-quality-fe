<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    title="挑选血浆"
    @ok="handleSubmit"
    width="1200px"
  >
    <div>
      <BasicTable @register="registerTable" />
    </div>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicTable, useTable } from '@/components/Table';
  import { getPickPlasmaList, pickPlasma } from '@/api/stockout/non-productin-put-into';
  import { onMounted, ref, watchEffect } from 'vue';
  import { useStation } from '@/hooks/common/useStation';
  import { useServerEnumStoreWithOut } from '@/store/modules/serverEnums';
  import { SERVER_ENUM } from '@/enums/serverEnum';
  import { useMessage } from '@/hooks/web/useMessage';

  defineOptions({ name: 'PickPlasmaModal' });
  const emit = defineEmits(['success', 'register']);

  const { isLoading, stationOptions } = useStation();
  const { createMessage } = useMessage();
  const { warning } = createMessage;

  const serverEnumStore = useServerEnumStoreWithOut();

  const selectedRow = ref<Recordable>([]);
  onMounted(async () => {
    watchEffect(async () => {
      if (!isLoading) {
        await getForm()?.updateSchema({
          field: 'stationNo',
          componentProps: {
            options: stationOptions.value,
          },
        });
      }
    });
  });

  const [registerTable, { getForm }] = useTable({
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
        dataIndex: 'donorNo',
      },
      {
        title: '采集日期',
        dataIndex: 'collDate',
      },
      {
        title: '血浆状态',
        dataIndex: 'plasmaStatus',
        format(text) {
          return serverEnumStore.getServerEnumText(SERVER_ENUM.BagFlow)(text);
        },
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
          field: 'donorNo',
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
          label: '血浆状态',
          component: 'Select',
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
          component: 'Select',
          componentProps: {
            options: serverEnumStore.getServerEnum(SERVER_ENUM.ImmType),
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
    size: 'small',
    striped: false,
    useSearchForm: true,
    showTableSetting: false,
    bordered: true,
    showIndexColumn: false,
    canResize: false,
  });

  const dlvNo = ref('');
  const [registerModal, { setModalProps, closeModal }] = useModalInner((data) => {
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

      emit('success');

      setModalProps({ confirmLoading: true });
      closeModal();
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
