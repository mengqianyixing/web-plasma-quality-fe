<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :title="`准备号${prepareNo}暂停分拣记录`"
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
  import { useMessage } from '@/hooks/web/useMessage';
  import { useModalInner } from '@/components/Modal';
  import { BasicTable, useTable } from '@/components/Table';
  import { Modal } from 'ant-design-vue';
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
  import dayjs from 'dayjs';
  import { ref, createVNode } from 'vue';
  import {
    getPauseList,
    preparePause,
  } from '@/api/stockout/production-sorting/production-sorting-main';

  const emit = defineEmits(['success']);
  const { createMessage } = useMessage();
  const { success } = createMessage;

  const prepareNo = ref(''); // 投产准备号
  const [registerModal, { closeModal }] = useModalInner((data) => {
    prepareNo.value = data.prepareNo;
    reload();
  });
  function closeModalThis() {
    emit('success');
    closeModal();
  }

  // 表格列
  const columns = [
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
  const [registerTable, { reload, setLoading }] = useTable({
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
      return { prepareNo: prepareNo.value, pattern: 'PREPARE' };
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
    Modal.confirm({
      title: '暂停准备号分拣',
      icon: createVNode(ExclamationCircleOutlined),
      content: createVNode(
        'div',
        { style: 'color:red;' },
        `是否暂停分拣准备号[${prepareNo.value}]?`,
      ),
      async onOk() {
        try {
          setLoading(true);
          await preparePause({ prepareNo: prepareNo.value, state: 'PAUSE' });
          success('暂停准备号成功!');
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
    Modal.confirm({
      title: '继续准备号分拣',
      icon: createVNode(ExclamationCircleOutlined),
      content: createVNode(
        'div',
        { style: 'color:red;' },
        `是否继续分拣准备号[${prepareNo.value}]?`,
      ),
      async onOk() {
        try {
          setLoading(true);
          await preparePause({ prepareNo: prepareNo.value, state: 'RESTORE' });
          success('继续准备号成功!');
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
</script>
