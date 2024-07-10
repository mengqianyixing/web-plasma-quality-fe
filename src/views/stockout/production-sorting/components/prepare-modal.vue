<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    title="选择准备号"
    @ok="handleSubmit"
    @cancel="resetField"
    :destroyOnClose="true"
    :maskClosable="false"
    :min-height="600"
    width="85%"
  >
    <div class="relative h-inherit max-h-inherit min-h-inherit">
      <div class="absolute w-full h-full">
        <div class="flex-1 h-full shrink-1">
          <BasicTable @register="registerTable" />
        </div>
      </div>
    </div>
  </BasicModal>
</template>

<script setup lang="ts">
  import { useModalInner } from '@/components/Modal';
  import { BasicTable, useTable } from '@/components/Table';
  import { FormSchema } from '@/components/Form';
  import { ref } from 'vue';
  import BasicModal from '@/components/Modal/src/BasicModal.vue';
  import { getPrepareList } from '@/api/stockout/production-preparation.js';
  import {
    prepareStateMap,
    prepareStateValueEnum,
    pickModeMap,
    pickModeValueEnum,
  } from '@/enums/stockoutEnum';
  import dayjs from 'dayjs';
  import { useMessage } from '@/hooks/web/useMessage';
  import { SERVER_ENUM } from '@/enums/serverEnum';
  import { useServerEnumStoreWithOut } from '@/store/modules/serverEnums';

  const serverEnumStore = useServerEnumStoreWithOut();
  const PlasmaType = serverEnumStore.getServerEnumText(SERVER_ENUM.PlasmaType);

  const { createMessage } = useMessage();
  const { warning } = createMessage;

  const emit = defineEmits(['success', 'register']);
  const [registerModal, { closeModal }] = useModalInner(async (data) => {
    console.log(data);
  });

  const columns = [
    {
      title: '投产准备号',
      dataIndex: 'prepareNo',
      width: 120,
    },
    {
      title: '投产类型',
      dataIndex: 'prodType',
      width: 80,
      format(text) {
        return `${PlasmaType(text)}`;
      },
    },
    {
      title: '挑浆模式',
      dataIndex: 'pickMode',
      width: 120,
      format(text) {
        return `${pickModeMap.get(text as pickModeValueEnum)}`;
      },
    },
    {
      title: '批次数量',
      dataIndex: 'batchCount',
      width: 80,
      customRender: ({ record }) => {
        if (record.summary && record.summary.batchCount !== null) {
          return record.summary.batchCount;
        }
        return '';
      },
    },
    {
      title: '分拣血浆数量',
      dataIndex: 'pickBagCount',
      customRender: ({ record }) => {
        if (record.summary && record.summary.pickBagCount !== null) {
          return record.summary.pickBagCount;
        }
        return '';
      },
      width: 110,
    },
    {
      title: '投产血浆数量',
      dataIndex: 'prodBagCount',
      customRender: ({ record }) => {
        if (record.summary && record.summary.prodBagCount !== null) {
          return record.summary.prodBagCount;
        }
        return '';
      },
      width: 110,
    },
    {
      title: '浆员数量',
      dataIndex: 'donorCount',
      customRender: ({ record }) => {
        if (record.summary && record.summary.donorCount !== null) {
          return record.summary.donorCount;
        }
        return '';
      },
      width: 80,
    },
    {
      title: '准备人',
      dataIndex: 'creator',
      width: 100,
    },
    {
      title: '准备时间',
      dataIndex: 'createAt',
      format(text) {
        return text ? dayjs(text).format('YYYY-MM-DD HH:mm:ss') : '-';
      },
      width: 140,
    },
    {
      title: '状态',
      dataIndex: 'prepareState',
      width: 80,
      format(text) {
        return `${prepareStateMap.get(text as prepareStateValueEnum)}`;
      },
    },
  ];

  const searchFormSchema: FormSchema[] = [
    {
      field: 'prepareNo',
      label: '投产准备号',
      component: 'Input',
      colProps: { span: 4 },
    },
    {
      field: 'prodType',
      label: '投产类型',
      component: 'Select',
      colProps: { span: 5 },
      defaultValue: [],
      componentProps: {
        options: serverEnumStore.getServerEnum(SERVER_ENUM.PlasmaType),
      },
    },
    {
      field: 'prepareStates',
      label: '状态',
      component: 'Select',
      colProps: { span: 5 },
      defaultValue: ['TPK', 'RPK'],
      componentProps: {
        mode: 'multiple',
        options: [...prepareStateMap.entries()].map(([key, value]) => ({
          value: key,
          label: `${value}`,
        })),
      },
    },
  ];
  // 表格选中行
  const selectedRow = ref<any>([]);

  const [registerTable, { clearSelectedRowKeys }] = useTable({
    api: getPrepareList,
    columns,
    formConfig: {
      labelWidth: 90,
      schemas: searchFormSchema,
    },
    immediate: true,
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    clickToRowSelect: true,
    rowSelection: {
      type: 'radio',
      onChange: (_, selectedRows: any) => {
        selectedRow.value = selectedRows;
      },
    },
    size: 'small',
    striped: false,
    useSearchForm: true,

    handleSearchInfoFn(info) {
      return info;
    },
    bordered: true,
    showIndexColumn: false,
    isCanResizeParent: true,
  });

  // 确认选择
  async function handleSubmit() {
    if (!selectedRow.value.length) {
      warning('请先选择一条数据!');
      return;
    }
    const firstSelectedItem: any = selectedRow.value[0];
    const prepareState = firstSelectedItem?.prepareState;
    if (prepareState !== 'TPK' && prepareState !== 'RPK' && prepareState !== 'CPK') {
      warning('当前准备号不可分拣!');
      return;
    }
    emit('success', firstSelectedItem);
    resetField();
  }

  function resetField() {
    closeModal();
    clearSelectedRowKeys();
  }
</script>
