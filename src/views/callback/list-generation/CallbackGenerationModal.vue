<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    :title="getTitle"
    showFooter
    width="85%"
    :min-height="680"
    @close="handleCancel"
  >
    <div class="relative h-inherit max-h-inherit min-h-inherit">
      <BasicForm @register="registerForm" :submitButtonOptions="{ loading: tableLoading }" />

      <vxe-grid
        v-bind="gridOptions"
        ref="vxeRef"
        :loading="tableLoading"
        :data="tableData"
        :columns="columnsComputed"
      >
        <template #toolbar>
          <div class="h-40px bg-#ffffff mt-2 flex items-center">
            <a-button type="primary" @click="handleAdd" class="absolute right-20"> 新增 </a-button>
            <a-button type="primary" @click="handleDelete" class="absolute right-2">
              撤销
            </a-button>
          </div>
        </template>
      </vxe-grid>
    </div>

    <template #footer>
      <a-button type="primary" @click="handleOk">确定</a-button>
    </template>

    <AddCallbackPersonnelListModal @register="registerAddModal" @success="initTableData" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicModal, useModal, useModalInner } from '@/components/Modal';
  import { computed, nextTick, reactive, ref, unref } from 'vue';
  import { useMessage } from '@/hooks/web/useMessage';

  import AddCallbackPersonnelListModal from '@/views/callback/list-generation/AddCallbackPersonnelListModal.vue';
  import {
    callbackModalSearchFromSchema,
    callbackModalColumns,
  } from '@/views/callback/list-generation/generation.data';
  import { getCallbackDetail, revokeCallback } from '@/api/callback/list-generation';
  import dayjs from 'dayjs';
  import { BasicForm, useForm } from '@/components/Form';
  import {
    GetApiCoreDonorCallbackDetailRequest,
    GetApiCoreDonorCallbackDetailResponse,
  } from '@/api/type/callbackManage';
  import { VxeGridProps, VxeTableInstance } from 'vxe-table';

  const emit = defineEmits(['success', 'register']);

  const isUpdate = ref(false);
  const isShowTrackType = ref(false);

  const columnsComputed = computed(() =>
    isShowTrackType.value
      ? callbackModalColumns
      : callbackModalColumns.filter((it) => it.field !== 'trackType'),
  );
  const stationNo = ref('');
  const batchNo = ref('');
  const vxeRef = ref<VxeTableInstance<GetApiCoreDonorCallbackDetailResponse[number]>>();

  const tableData = ref<GetApiCoreDonorCallbackDetailResponse>([]);

  const { createConfirm } = useMessage();

  const [registerForm, { getFieldsValue, removeSchemaByField }] = useForm({
    showAdvancedButton: false,
    schemas: callbackModalSearchFromSchema,
    transformDateFunc(date) {
      return dayjs(date).format('YYYY-MM-DD');
    },
    submitFunc,
    submitOnReset: true,
  });

  const gridOptions = reactive<VxeGridProps<any>>({
    height: 600,
    border: true,
    showOverflow: true,
    align: 'center',
    size: 'small',
    exportConfig: {},
    columnConfig: {
      resizable: true,
    },
    scrollY: {
      enabled: true,
    },
    checkboxConfig: {
      highlight: true,
      trigger: 'row',
      range: true,
    },
    toolbarConfig: {
      refresh: false,
      loading: false,
      export: false,
      custom: false,
    },
    showFooter: true,
    autoResize: true,
  });

  const tableLoading = ref(false);
  async function initTableData() {
    try {
      tableLoading.value = true;
      tableData.value = await getCallbackDetail({
        ...getFieldsValue(),
        batchNo: batchNo.value,
      } as GetApiCoreDonorCallbackDetailRequest);

      await nextTick(() => {
        vxeRef.value?.setAllCheckboxRow(true);
      });
    } finally {
      tableLoading.value = false;
    }
  }

  async function submitFunc() {
    await initTableData();
  }

  const getTitle = computed(() => (unref(isUpdate) ? '编辑名单' : '生成名单'));

  const [registerAddModal, { openModal }] = useModal();
  const [register, { setModalProps, closeModal }] = useModalInner((data) => {
    setModalProps({
      maskClosable: false,
    });

    isUpdate.value = data.isUpdate;
    stationNo.value = data.record.stationNo;
    batchNo.value = data.record.batchNo;
    isShowTrackType.value = data.record.isShowTrackType;

    !isShowTrackType.value && removeSchemaByField('trackType');

    initTableData();
  });

  async function handleAdd() {
    openModal(true, {
      reload: true,
      record: {
        stationNo: stationNo.value,
        batchNo: batchNo.value,
        isShowTrackType: isShowTrackType.value,
      },
    });
  }

  async function handleDelete() {
    createConfirm({
      iconType: 'warning',
      title: '确认',
      content: '确认撤消选中名单吗？',
      onOk: async () => {
        await revokeCallback({
          batchNo: batchNo.value,
          donorNos: vxeRef.value!.getCheckboxRecords().map((it) => it?.donorNo)!,
        });

        await initTableData();

        emit('success');
      },
    });
  }

  function handleOk() {
    emit('success');
    closeModal();
  }

  function handleCancel() {
    emit('success');
    closeModal();
  }
</script>
