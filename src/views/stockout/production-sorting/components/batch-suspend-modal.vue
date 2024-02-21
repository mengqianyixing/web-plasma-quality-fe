<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :title="`准备号${prepareNo}血浆批次暂停分拣记录`"
    @cancel="closeModalThis"
    :maskClosable="false"
    :destroyOnClose="true"
    width="85%"
    :footer="null"
  >
    <BasicTable @register="registerTable">
      <template #toolbar>
        <div class="flex gap-2">
          <a-button @click="suspend"> 暂停 </a-button>
          <a-button @click="resume"> 继续 </a-button>
        </div>
      </template>
    </BasicTable>
  </BasicModal>
</template>

<script setup lang="tsx">
  import BasicModal from '@/components/Modal/src/BasicModal.vue';
  import { useModalInner } from '@/components/Modal';
  import { useMessage } from '@/hooks/web/useMessage';
  import { BasicTable, useTable } from '@/components/Table';
  import { Modal } from 'ant-design-vue';
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
  import dayjs from 'dayjs';
  import { ref, createVNode } from 'vue';

  import {
    getPauseList,
    batchPause,
  } from '@/api/stockout/production-sorting/production-sorting-main';

  const emit = defineEmits(['success']);
  const { createMessage } = useMessage();
  const { warning, success } = createMessage;

  const prepareNo = ref(''); // 投产准备号
  const batchNo = ref(''); // 批号
  const [registerModal, { closeModal }] = useModalInner((data) => {
    prepareNo.value = data.prepareNo;
    batchNo.value = data.batchNo;
    reload();
  });
  function closeModalThis() {
    emit('success');
    closeModal();
  }

  // 表格列
  const columns = [
    {
      title: '血浆批号',
      dataIndex: 'batchNo',
    },
    {
      title: '暂停操作时间',
      dataIndex: 'createAt',
      customRender: ({ text }) => {
        if (text) {
          return dayjs(text).format('YYYY-MM-DD HH:mm:ss');
        }
        return '';
      },
    },
    {
      title: '暂停操作人',
      dataIndex: 'creater',
    },
    {
      title: '继续操作时间',
      dataIndex: 'freeAt',
      customRender: ({ text }) => {
        if (text) {
          return dayjs(text).format('YYYY-MM-DD HH:mm:ss');
        }
        return '';
      },
    },
    {
      title: '继续操作人',
      dataIndex: 'freedBy',
    },
  ];
  const selectedRow = ref<any>([]);
  const [registerTable, { reload, setLoading, clearSelectedRowKeys }] = useTable({
    api: getPauseList,
    searchInfo: {},
    columns,
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    beforeFetch: () => {
      return { prepareNo: prepareNo.value, pattern: 'BATCH' };
    },
    rowSelection: {
      type: 'radio',
      onChange: (_, selectedRows: any) => {
        selectedRow.value = selectedRows;
      },
      getCheckboxProps: (record) => ({
        disabled: record.freedBy,
      }),
    },
    clickToRowSelect: false,
    size: 'small',
    immediate: false,
    striped: false,
    handleSearchInfoFn(info) {
      return info;
    },
    bordered: true,
    showIndexColumn: false,
    canResize: false,
  });

  function suspend() {
    if (!batchNo.value) {
      warning('请先进行分拣');
      return;
    }
    Modal.confirm({
      title: '暂停批分拣',
      icon: createVNode(ExclamationCircleOutlined),
      content: createVNode(
        'div',
        { style: 'color:red;' },
        `是否确定暂停分拣血浆批号[${batchNo.value}]?`,
      ),
      async onOk() {
        try {
          setLoading(true);
          await batchPause({
            prepareNo: prepareNo.value,
            batchNo: batchNo.value,
            state: 'PAUSE',
          });
          success('暂停批号成功!');
          reload();
        } finally {
          setLoading(false);
        }
      },
      onCancel() {
        console.log('Cancel');
      },
      class: 'test',
    });
  }

  function resume() {
    if (!selectedRow.value.length) {
      warning('请先选择批号!');
      return;
    }
    const selected = selectedRow.value[0];
    Modal.confirm({
      title: '继续批分拣',
      icon: createVNode(ExclamationCircleOutlined),
      content: createVNode(
        'div',
        { style: 'color:red;' },
        `是否继续分拣血浆批号[${selected.batchNo}]?`,
      ),
      async onOk() {
        try {
          setLoading(true);
          await batchPause({
            prepareNo: prepareNo.value,
            batchNo: selected.batchNo,
            state: 'RESTORE',
          });
          success('继续批号成功!');
          reload();
          clearSelectedRowKeys();
        } finally {
          setLoading(false);
        }
      },
      onCancel() {
        console.log('Cancel');
      },
      class: 'test',
    });
  }
</script>
