<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    :title="getTitle"
    showFooter
    width="85%"
    :min-height="600"
    @cancel="handleCancel"
  >
    <div class="relative h-inherit max-h-inherit min-h-inherit">
      <div class="absolute h-full w-full flex flex-col">
        <BasicForm
          class="search-form"
          @register="registerForm"
          :submitButtonOptions="{ loading: tableLoading }"
        />
        <div class="flex-1">
          <vxe-grid
            v-bind="gridOptions"
            ref="vxeRef"
            :loading="tableLoading"
            :data="tableData"
            :columns="columnsComputed"
          >
            <template #plasmaCount="{ row }">
              <span
                :class="
                  !row?.plasmaCount
                    ? 'pointer-events-none'
                    : 'text-blue-500 underline cursor-pointer'
                "
                @click.stop.self="handleBagDetail(row)"
              >
                {{ row?.plasmaCount }}
              </span>
            </template>
            <template #toolbar>
              <div class="h-40px bg-#ffffff mt-2 flex items-center">
                <a-button type="primary" @click="handleSelectAll" class="absolute right-45">
                  全部添加
                </a-button>
                <a-button type="primary" @click="handleAdd" class="absolute right-20">
                  筛选添加
                </a-button>
                <a-button type="primary" @click="handleDelete" class="absolute right-2">
                  撤销
                </a-button>
              </div>
            </template>
          </vxe-grid>
        </div>
        <div>
          <a-pagination
            class="float-right mb-10px"
            @change="handlePageChange"
            @show-size-change="handleSizeChange"
            size="small"
            show-size-changer
            show-quick-jumper
            v-model:current="pager.currPage"
            v-model:pageSize="pager.pageSize"
            :total="pager.total"
            :show-total="(total) => `共 ${total} 条数据`"
          />
        </div>
      </div>
    </div>

    <template #footer>
      <a-button type="primary" @click="handleOk">确定</a-button>
    </template>

    <AddCallbackPersonnelListModal @register="registerAddModal" @success="submitFunc" />
    <BagDetailModal @register="registerBagDetailModal" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicModal, useModal, useModalInner } from '@/components/Modal';
  import { computed, nextTick, reactive, ref, unref } from 'vue';
  import { useMessage } from '@/hooks/web/useMessage';

  import {
    callbackModalSearchFromSchema,
    callbackModalColumns,
  } from '@/views/callback/list-generation/generation.data';
  import {
    getCallbackDetail,
    revokeCallback,
    selectAllCallbackDonor,
  } from '@/api/callback/list-generation';
  import dayjs from 'dayjs';
  import { BasicForm, useForm } from '@/components/Form';
  import {
    GetApiSearchDonorCallbackDetailRequest,
    GetApiSearchDonorCallbackDetailResponse,
  } from '@/api/type/callbackManage';
  import { VxeGridProps, VxeTableInstance } from 'vxe-table';
  import { Pagination as APagination } from 'ant-design-vue';

  import AddCallbackPersonnelListModal from '@/views/callback/list-generation/AddCallbackPersonnelListModal.vue';
  import BagDetailModal from '@/views/callback/list-generation/BagDetailModal.vue';

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
  const vxeRef =
    ref<VxeTableInstance<NonNullable<GetApiSearchDonorCallbackDetailResponse['result']>[number]>>();

  const tableData = ref<GetApiSearchDonorCallbackDetailResponse['result']>([]);

  const { createConfirm } = useMessage();

  const [registerForm, { getFieldsValue, removeSchemaByField }] = useForm({
    showAdvancedButton: false,
    schemas: callbackModalSearchFromSchema,
    baseColProps: { flex: '0 0 370px' },
    actionColOptions: { flex: '1 1 150px', style: 'max-width:unset;' },

    transformDateFunc(date) {
      return dayjs(date).format('YYYY-MM-DD');
    },
    submitFunc,
    submitOnReset: true,
  });

  const gridOptions = reactive<VxeGridProps<any>>({
    height: '100%',
    border: true,
    rowConfig: {
      isHover: true,
    },
    showOverflow: false,
    align: 'center',
    size: 'small',
    exportConfig: {},
    columnConfig: {
      resizable: true,
    },

    checkboxConfig: {
      highlight: true,
      trigger: 'row',
      range: true,
    },

    showFooter: false,
    autoResize: true,
  });

  const tableLoading = ref(false);
  const pager = reactive({
    pageSize: 100,
    currPage: 1,
    total: 0,
  });
  async function initTableData() {
    try {
      tableLoading.value = true;

      const originRes = await getCallbackDetail({
        ...getFieldsValue(),
        currPage: pager.currPage,
        pageSize: pager.pageSize,
        batchNo: batchNo.value,
      } as unknown as GetApiSearchDonorCallbackDetailRequest);
      tableData.value = originRes.result!;
      pager.total = originRes.totalCount!;

      await nextTick(() => {
        vxeRef.value?.setAllCheckboxRow(true);
      });
    } finally {
      tableLoading.value = false;
    }
  }

  async function submitFunc() {
    vxeRef.value?.clearScroll();
    pager.currPage = 1;
    await initTableData();
  }

  const getTitle = computed(() => (unref(isUpdate) ? '编辑名单' : '生成名单'));

  const [registerAddModal, { openModal }] = useModal();
  const [registerBagDetailModal, { openModal: openBagDetailModal }] = useModal();
  const [register, { setModalProps, closeModal }] = useModalInner((data) => {
    setModalProps({
      maskClosable: false,
      destroyOnClose: true,
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

        await submitFunc();

        emit('success');
      },
    });
  }

  function handleOk() {
    handleCancel();
  }

  function handleCancel() {
    emit('success');
    pager.currPage = 1;
    tableData.value = [];
    closeModal();
  }

  async function handlePageChange(e) {
    pager.currPage = e;

    await initTableData();
  }

  async function handleSizeChange(_, size) {
    pager.pageSize = size;

    await initTableData();
  }

  function handleBagDetail(_record: Recordable) {
    openBagDetailModal(true, {
      cardNo: _record.cardNo,
      planNo: batchNo.value,
    });
  }

  async function handleSelectAll() {
    createConfirm({
      iconType: 'warning',
      title: '确认',
      content: '确认添加所有待回访的浆员？',
      onOk: async () => {
        await selectAllCallbackDonor({
          batchNo: batchNo.value,
          stationNo: stationNo.value,
        });

        await submitFunc();

        emit('success');
      },
    });
  }
</script>
<style scoped>
  ::v-deep(.ant-form-item-control-input-content button) {
    margin-right: 8px;
    margin-left: 4px;
    float: right;
  }
</style>
