<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    title="选择批次"
    @ok="handleSubmit"
    @cancel="resetField"
    :destroyOnClose="true"
    :maskClosable="false"
    width="85%"
  >
    <BasicTable @register="registerTable" :searchInfo="searchInfo">
      <template #bodyCell="{ column, text }">
        <template v-if="column.dataIndex === 'acceptState'">
          {{ optsTransMap(receiveOpts, 'value', 'label')[text] }}
        </template>
        <template v-else-if="column.dataIndex === 'verifyState'">
          {{
            optsTransMap([...checkOpts, { value: 'H', label: '已验收' }], 'value', 'label')[text]
          }}
        </template>
      </template>
    </BasicTable>
  </BasicModal>
</template>

<script setup lang="ts">
  import { useModalInner } from '@/components/Modal';
  import { BasicTable, useTable } from '@/components/Table';
  import { FormSchema } from '@/components/Form';
  import { ref } from 'vue';
  import BasicModal from '@/components/Modal/src/BasicModal.vue';
  import { getBatchSummary } from '@/api/inbound-management/receive-plasma';
  import { stationNameList } from '@/api/callback/list-generation';
  import dayjs from 'dayjs';
  import { useMessage } from '@/hooks/web/useMessage';

  const { createMessage } = useMessage();
  const { warning } = createMessage;

  const mode = ref('receive');

  const emit = defineEmits(['success', 'register']);
  const [registerModal, { closeModal }] = useModalInner(async (data) => {
    // 验收页面打开
    if (data.isAccept) {
      mode.value = 'accept';
      // 设置接收状态默认值
      await getForm().updateSchema({
        field: 'acceptState',
        defaultValue: ['R', 'S'],
      });
      await getForm().updateSchema({
        field: 'verifyState',
        defaultValue: ['R', 'W'],
      });
    } else {
      // 接收页面打开
      await getForm().updateSchema({
        field: 'acceptState',
        defaultValue: ['R', 'W'],
      });
    }
    if (data.fresh) {
      setTimeout(() => {
        reload();
      });
    }
  });

  // 接收状态备选项
  const receiveOpts = ref([
    {
      value: 'W',
      label: '未接收',
    },
    {
      value: 'R',
      label: '接收中',
    },
    {
      value: 'S',
      label: '已接收',
    },
  ]);
  // 验收状态备选项
  const checkOpts = ref([
    {
      value: 'W',
      label: '未验收',
    },
    {
      value: 'R',
      label: '验收中',
    },
    {
      value: 'S',
      label: '已验收',
    },
  ]);
  // 备选项转map
  const optsTransMap = (arr: any[], value: any, label: any) => {
    if (!arr.length) return {};
    const obj = {};
    for (const item of arr) {
      obj[item[value]] = item[label];
    }
    return obj;
  };

  // 表格列
  const columns = [
    {
      title: '采浆公司',
      dataIndex: 'stationName',
    },
    {
      title: '血浆批次',
      dataIndex: 'batchNo',
    },
    {
      title: '接收状态',
      dataIndex: 'acceptState',
    },
    {
      title: '验收状态',
      dataIndex: 'verifyState',
    },
    {
      title: '血浆数量',
      dataIndex: 'plasmaCount',
    },
    {
      title: '血浆箱数',
      dataIndex: 'boxCount',
    },
    // dispatch 中的 optTime 作为表格列
    {
      title: '出库人',
      customRender: ({ record }) => {
        if (record.dispatch && record.dispatch.depositor) {
          return record.dispatch.depositor;
        }
        return '-';
      },
    },
    {
      title: '出库日期',
      customRender: ({ record }) => {
        if (record.dispatch && record.dispatch.optTime) {
          return dayjs(record.dispatch.optTime).format('YYYY-MM-DD');
        }
        return '-';
      },
    },
  ];

  // 表单搜索列
  const searchFormSchema: FormSchema[] = [
    {
      field: 'stationNo',
      label: '采浆公司',
      component: 'ApiSelect',
      colProps: { span: 4 },
      componentProps: {
        api: stationNameList,
        labelField: 'stationName',
        valueField: 'stationNo',
        immediate: true,
      },
    },
    {
      field: 'batchNo',
      label: '血浆批次',
      component: 'Input',
      colProps: { span: 4 },
    },
    {
      field: 'acceptState',
      label: '接收状态',
      component: 'Select',
      colProps: { span: 5 },
      defaultValue: [],
      componentProps: {
        mode: 'multiple',
        options: receiveOpts,
      },
    },
    {
      field: 'verifyState',
      label: '验收状态',
      component: 'Select',
      colProps: { span: 5 },
      defaultValue: [],
      componentProps: {
        mode: 'multiple',
        options: checkOpts,
      },
    },
  ];
  // 表格选中行
  const selectedRow = ref<any>([]);
  const searchInfo = ref<any>({});

  const [registerTable, { clearSelectedRowKeys, reload, getForm }] = useTable({
    api: getBatchSummary,
    columns,
    formConfig: {
      labelWidth: 75,
      schemas: searchFormSchema,
    },
    immediate: true,
    beforeFetch: (p) => {
      // 已验收需加上 H（已发布）
      if (p.verifyState && p.verifyState.findIndex((item) => item === 'S') !== -1) {
        p.verifyState.push('H');
      }
      return { ...p };
    },
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    clickToRowSelect: false,
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
      console.log('handleSearchInfoFn', info);
      return info;
    },
    bordered: true,
    showIndexColumn: false,
    canResize: false,
  });

  // 确认选择批号
  async function handleSubmit() {
    if (!selectedRow.value.length) {
      warning('请先选择一条数据!');
      return;
    }
    const firstSelectedItem = selectedRow.value[0];
    if (firstSelectedItem && 'batchNo' in firstSelectedItem) {
      if (mode.value === 'receive') {
        if (firstSelectedItem.acceptState === 'S') {
          warning('当前批次已接收');
        }
      }
      if (mode.value === 'accept') {
        if (firstSelectedItem.acceptState === 'W') {
          warning('当前批次未接收');
        }
        if (firstSelectedItem.verifyState === 'S') {
          warning('当前批次已验收');
        }
      }
      emit('success', firstSelectedItem.batchNo);
      resetField();
    }
  }

  function resetField() {
    closeModal();
    clearSelectedRowKeys();
  }
</script>
