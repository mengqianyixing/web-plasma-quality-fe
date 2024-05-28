<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    showFooter
    title="托盘入库"
    width="80%"
    :minHeight="650"
    @fullscreen="redoHeight"
  >
    <div class="relative h-inherit max-h-inherit min-h-inherit">
      <div class="absolute w-full h-full">
        <BasicTable @register="registerTable">
          <template #boxCount="{ record }">
            <span
              :class="
                !record?.boxCount ? 'pointer-events-none' : 'text-blue-500 underline cursor-pointer'
              "
              @click.stop.self="handleBoxCountClick(record)"
            >
              {{ record?.boxCount }}
            </span>
          </template>
          <template #packCount="{ record }">
            <span
              :class="
                !record?.packCount
                  ? 'pointer-events-none'
                  : 'text-blue-500 underline cursor-pointer'
              "
              @click.stop.self="handlePackCountClick(record)"
            >
              {{ record?.packCount }}
            </span>
          </template>
          <template #toolbar>
            <a-button type="primary" @click="handleInBand">入库</a-button>
            <a-button type="primary" @click="handleTrayBind">托盘重绑</a-button>
          </template>
        </BasicTable>
      </div>
    </div>

    <BoxDetailModal @register="registerBox" />
    <BagDetailModal @register="registerBag" />
    <InModal @register="registerInModal" />
    <ReBindModal @register="registerReBindModal" />
  </BasicModal>
</template>
<script setup lang="ts">
  import { BasicModal, useModalInner, useModal } from '@/components/Modal';
  import { BasicTable, useTable } from '@/components/Table';
  import { getTrayList } from '@/api/sample-manage/reserve-sample-destory';

  import BoxDetailModal from '@/views/sample-manage/reserve-sample-warehouse/BoxDetailModal.vue';
  import BagDetailModal from '@/views/sample-manage/reserve-sample-warehouse/BagDetailModal.vue';
  import InModal from '@/views/tray/outInStore/inModal.vue';
  import ReBindModal from '@/views/sample-manage/reserve-sample-warehouse/ReBindModal.vue';
  import { ref } from 'vue';
  import { useMessage } from '@/hooks/web/useMessage';

  const [registerBox, { openModal: openBoxModal }] = useModal();
  const [registerBag, { openModal: openBagModal }] = useModal();
  const [registerInModal, { openModal: openInModal }] = useModal();
  const [registerReBindModal, { openModal: openReBindModal }] = useModal();

  defineEmits(['register']);

  const [registerTable, { reload, redoHeight, getSelectRows, clearSelectedRowKeys }] = useTable({
    api: getTrayList,
    beforeFetch: (params) => {
      return {
        ...params,
        batchNo: batchNo.value,
      };
    },
    afterFetch: (data) => {
      clearSelectedRowKeys();
      return data;
    },
    inset: true,
    isCanResizeParent: true,
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    clickToRowSelect: true,
    rowSelection: {
      type: 'checkbox',
    },
    columns: [
      {
        title: '托盘编号',
        dataIndex: 'trayNo',
      },
      {
        title: '箱数',
        dataIndex: 'boxCount',
        slots: { customRender: 'boxCount' },
      },
      {
        title: '样本袋数',
        dataIndex: 'packCount',
        slots: { customRender: 'packCount' },
      },
      {
        title: '样本数量',
        dataIndex: 'sampleCount',
      },
      {
        title: '状态',
        dataIndex: 'state',
      },
      {
        title: '存放库房',
        dataIndex: 'houseName',
      },
      {
        title: '存放货位',
        dataIndex: 'locationNo',
      },
    ],
    useSearchForm: true,
    formConfig: {
      schemas: [
        {
          label: '样本袋号',
          field: 'packNo',
          component: 'Input',
          colProps: {
            span: 6,
          },
        },
        {
          label: '托盘编号',
          field: 'trayNo',
          component: 'Input',
          colProps: {
            span: 6,
          },
        },
      ],
      transformDateFunc(date) {
        return date ? date.format('YYYY-MM-DD') : '';
      },
    },
    bordered: true,
  });

  const batchNo = ref('');
  const [registerModal, { setModalProps }] = useModalInner((data) => {
    setModalProps({ confirmLoading: false });
    batchNo.value = data.batchNo;

    reload();
  });

  const { createMessage } = useMessage();
  function handleInBand() {
    if (!getSelectRows().length) {
      return createMessage.error('请选择托盘');
    }
    openInModal(true, {
      data: getSelectRows(),
    });
  }

  function handleTrayBind() {
    openReBindModal();
  }

  function handleBoxCountClick(record) {
    openBoxModal(true, {
      ...record,
    });
  }

  function handlePackCountClick(record) {
    openBagModal(true, {
      ...record,
    });
  }
</script>
