<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    title="装箱信息"
    :destroyOnClose="true"
    :maskClosable="false"
    :showCancelBtn="false"
    :showOkBtn="false"
    width="70%"
  >
    <BasicTable @register="registerTable">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                label: '核对',
                onClick: handleCheck.bind(null, record),
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
  </BasicModal>
  <PackingCheckModal @register="registerPackingCheckModal" @success="reload" />
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useModalInner, useModal } from '@/components/Modal';
  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { FormSchema } from '@/components/Form';
  import BasicModal from '@/components/Modal/src/BasicModal.vue';
  import { getSortBoxs } from '@/api/stockout/production-preparation.js';
  import { pickBoxMap, pickBoxValueEnum } from '@/enums/stockoutEnum';
  import dayjs from 'dayjs';
  import PackingCheckModal from '@/views/stockout/production-sorting/components/packing-check-modal.vue';

  const prepareNo = ref(''); // 投产准备号
  defineEmits(['success', 'register']);
  const [registerModal] = useModalInner(async (data) => {
    console.log(data);
    prepareNo.value = data.prepareNo;
  });

  const columns = [
    {
      title: '血浆箱号',
      dataIndex: 'boxNo',
      width: 180,
    },
    {
      title: '装箱类型',
      dataIndex: 'useType',
      width: 100,
    },
    {
      title: '血浆数量',
      dataIndex: 'bagCount',
    },
    {
      title: '装箱人',
      dataIndex: 'opeartor',
    },
    {
      title: '装箱日期',
      dataIndex: 'opearteAt',
      format(text) {
        return text ? dayjs(text).format('YYYY-MM-DD') : '-';
      },
    },
    {
      title: '状态',
      dataIndex: 'state',
      width: 100,
      format(text) {
        return `${pickBoxMap.get(text as pickBoxValueEnum)}`;
      },
    },
  ];

  const searchFormSchema: FormSchema[] = [
    {
      field: 'prepareNo',
      label: '装箱类型',
      component: 'Select',
      colProps: { span: 6 },
      // defaultValue: [],
      // componentProps: {
      //   options: [...prepareStateMap.entries()].map(([key, value]) => ({
      //     value: key,
      //     label: `${value}`,
      //   })),
      // },
    },
    {
      field: 'boxNo',
      label: '血浆箱号',
      component: 'Input',
      colProps: { span: 6 },
    },
    {
      field: 'state',
      label: '状态',
      component: 'Select',
      colProps: { span: 6 },
      componentProps: {
        options: [...pickBoxMap.entries()].map(([key, value]) => ({
          value: key,
          label: `${value}`,
        })),
      },
    },
  ];

  const [registerTable, { reload }] = useTable({
    api: getSortBoxs,
    columns,
    formConfig: {
      labelWidth: 90,
      schemas: searchFormSchema,
    },
    beforeFetch: (p) => {
      // return { ...p, prepareNo: prepareDetail.value };
      return { ...p, prepareNo: '123' };
    },
    immediate: true,
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    clickToRowSelect: false,
    size: 'small',
    striped: false,
    useSearchForm: true,
    showTableSetting: false,
    tableSetting: {
      size: false,
      redo: false,
      setting: false,
    },
    bordered: true,
    showIndexColumn: false,
    canResize: false,
    actionColumn: {
      width: 80,
      title: '操作',
      dataIndex: 'action',
      fixed: undefined,
    },
  });

  // 核对弹框
  function handleCheck(record) {
    openPackingCheckModal(true, {
      record,
    });
  }
  const [registerPackingCheckModal, { openModal: openPackingCheckModal }] = useModal();
</script>
