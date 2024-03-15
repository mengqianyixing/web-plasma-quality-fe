<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button
          type="primary"
          @click="handleCreate()"
          :loading="loading.add"
          v-auth="QualityButtonEnum.BatchReleaseAdd"
          >新增</a-button
        >
        <a-button
          type="primary"
          @click="handleUpdate()"
          v-auth="QualityButtonEnum.BatchReleaseUpdate"
          >编辑</a-button
        >
        <a-button
          type="primary"
          @click="handleCancelCreate"
          v-auth="QualityButtonEnum.BatchReleaseCancelAdd"
          >取消审核</a-button
        >
        <a-button
          type="primary"
          @click="handleReview"
          :loading="loading.review"
          v-auth="QualityButtonEnum.BatchReleaseCancelReview"
          >复核</a-button
        >
        <a-button
          type="primary"
          @click="handleCancelReview"
          v-auth="QualityButtonEnum.BatchReleaseUpdate"
          >取消复核</a-button
        >
        <a-button
          type="primary"
          @click="handleRelease"
          :loading="loading.release"
          v-auth="QualityButtonEnum.BatchReleaseRelease"
          >放行</a-button
        >
        <a-button
          type="primary"
          @click="handleCancelRelease"
          v-auth="QualityButtonEnum.BatchReleaseUnRelease"
          >取消放行</a-button
        >
        <a-button type="primary" v-auth="QualityButtonEnum.BatchReleasePrint">打印</a-button>
      </template>
      <template #mesId="{ record }: { record: Recordable }">
        <span
          v-if="record.prNo"
          class="text-blue-500 underline cursor-pointer"
          @click.stop.self="handleDetails(record)"
        >
          {{ record.mesId }}
        </span>
        <span v-else> {{ record.mesId }}</span>
      </template>
    </BasicTable>
    <NonconformityModal @register="registerNonconModal" />
    <PlasmaRestrictionModal @register="registerPRModal" @ok="okFun" />
    <FormModal @register="registerFormModal" @success="reload" />
    <Modal
      :open="open"
      @cancel="open = false"
      @ok="confirmCancel"
      okText="提交"
      width="300px"
      :confirmLoading="confirmLoading"
      :title="'取消原因'"
    >
      <div class="m-20px">
        <BasicForm @register="registerForm" />
      </div>
    </Modal>
  </PageWrapper>
</template>
<script setup lang="ts">
  import { PageWrapper } from '@/components/Page';
  import { BasicTable, useTable } from '@/components/Table';
  import { columns, searchFormSchema } from './batch-release.data';
  import NonconformityModal from './nonconformity-modal.vue';
  import PlasmaRestrictionModal from './plasma-restriction-modal.vue';
  import FormModal from './form-modal.vue';
  import { useModal } from '@/components/Modal';
  import { message, Modal } from 'ant-design-vue';
  import { ref, reactive } from 'vue';
  import { BasicForm, useForm } from '@/components/Form';
  import {
    getListApi,
    submitReviewApi,
    submitCancelReleaseApi,
    submitReleaseApi,
    getNonconformityListApi,
    submitCancelCreateApi,
    submitCancelReviewApi,
  } from '@/api/quality/batch-release';
  import { getSysParamsList } from '@/api/systemServer/params';
  import { STATUS, STATUS_TEXT } from '@/enums/batchReleaseEnum';
  import { getBindBoxsListApi } from '@/api/quality/plasma-restriction';
  import { QualityButtonEnum } from '@/enums/authCodeEnum';

  defineOptions({ name: 'BatchRelease' });

  const open = ref(false);
  const confirmLoading = ref(false);
  const releaseUnqualifiedStorage = ref(false);
  const addLoading = ref(false);
  type LoadingKey = 'add' | 'review' | 'release';
  const loading = reactive<Record<LoadingKey, boolean>>({
    add: false,
    review: false,
    release: false,
  });

  const [registerForm, { resetFields, clearValidate, validate }] = useForm({
    labelWidth: 80,
    baseColProps: { span: 24 },
    schemas: [
      {
        field: 'reason',
        component: 'Input',
        label: '原因',
        required: true,
      },
    ],
    showActionButtonGroup: false,
  });
  const [registerFormModal, { openModal: openFormModal }] = useModal();
  const [registerPRModal, { openModal: openPRModal }] = useModal();
  const [registerNonconModal, { openModal: openNonconModal }] = useModal();
  const [registerTable, { clearSelectedRowKeys, getSelectRows, reload }] = useTable({
    api: getListApi,
    size: 'small',
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    formConfig: {
      schemas: searchFormSchema,
    },
    columns: columns,
    useSearchForm: true,
    bordered: true,
    rowSelection: { type: 'radio' },
    afterFetch: (res) => {
      clearSelectedRowKeys();
      return res;
    },
  });
  function handleDetails(record: Recordable) {
    openFormModal(true, { ...record, title: '查看' });
  }
  function getSelections(onlyOne: boolean, fn?: (rows: Recordable[]) => void) {
    const rows = getSelectRows();
    if (rows.length === 0) {
      message.warning('请选择一条数据');
      return [];
    } else if (rows.length > 1 && onlyOne) {
      message.warning('只能选择一条数据');
      return [];
    }
    fn?.(rows);
    return rows;
  }
  let iterator;
  function handleCreate() {
    getSelections(true, async ([row]) => {
      if (row.state !== STATUS.TBR) {
        return message.warning(`请选择【${STATUS_TEXT.get(STATUS.TBR)}】的数据`);
      }
      if (releaseUnqualifiedStorage.value) {
        try {
          loading.add = true;
          const res = await getNonconformityListApi({ orderNo: row.orderNo });
          loading.add = false;
          if (res.length) {
            openNonconModal(true, res);
          } else {
            iterator = handleNext(row, 'add', openFormModal, true, { ...row, title: '新增' });
            iterator.next();
          }
        } catch {
          loading.add = false;
        }
      } else {
        iterator = handleNext(row, 'add', openFormModal, true, { ...row, title: '新增' });
        iterator.next();
      }
    });
  }

  async function handleUpdate() {
    getSelections(true, ([row]) => {
      if (row.state !== STATUS.ROD) {
        return message.warning(`请选择【${STATUS_TEXT.get(STATUS.ROD)}】的数据`);
      }
      openFormModal(true, { ...row, title: '编辑' });
    });
  }
  async function* handleNext(row: Recordable, type: LoadingKey, fn: Function, ...arg: any) {
    loading[type] = true;
    addLoading.value = true;
    try {
      const res = await getBindBoxsListApi({
        batchNos: row.batchNos,
        currPage: '1',
        pageSize: '1',
      });
      loading[type] = false;
      if (res.totalCount) yield openPRModal(true, row);
    } catch {
      loading[type] = false;
      yield;
    }
    yield fn(...arg);
  }
  function success() {
    clearSelectedRowKeys();
    reload();
  }

  function okFun() {
    iterator.next();
  }
  function handleReview() {
    getSelections(true, ([row]) => {
      if (row.state !== STATUS.ROD) {
        return message.warning(`请选择【${STATUS_TEXT.get(STATUS.ROD)}】的数据`);
      }
      iterator = handleNext(row, 'review', () => {
        Modal.confirm({
          content: '确认复核制造批号【' + row.mesId + '】?',
          onOk: async () => {
            await submitReviewApi({ prNo: row.prNo });
            success();
            message.success('复核成功');
          },
          onCancel: () => Modal.destroyAll(),
        });
      });
      iterator.next();
    });
  }
  function handleRelease() {
    getSelections(true, ([row]) => {
      if (row.state !== STATUS.WAT) {
        return message.warning(`请选择【${STATUS_TEXT.get(STATUS.WAT)}】的数据`);
      }
      iterator = handleNext(row, 'release', () => {
        Modal.confirm({
          content: '确认放行制造批号【' + row.mesId + '】?',
          onOk: async () => {
            await submitReleaseApi({ prNo: row.prNo });
            success();
            message.success('放行成功');
          },
          onCancel: () => Modal.destroyAll(),
        });
      });
      iterator.next();
    });
  }
  let dialogCallBackFn;
  function openDialog() {
    clearValidate();
    resetFields();
    open.value = true;
  }
  function handleCancelCreate() {
    getSelections(true, ([row]) => {
      if (row.state !== STATUS.ROD) {
        return message.warning(`请选择【${STATUS_TEXT.get(STATUS.ROD)}】的数据`);
      }
      dialogCallBackFn = submitCancelCreateApi;
      openDialog();
    });
  }
  function handleCancelReview() {
    getSelections(true, ([row]) => {
      if (row.state !== STATUS.WAT) {
        return message.warning(`请选择【${STATUS_TEXT.get(STATUS.WAT)}】的数据`);
      }
      dialogCallBackFn = submitCancelReviewApi;
      openDialog();
    });
  }
  function handleCancelRelease() {
    getSelections(true, ([row]) => {
      if (row.state !== STATUS.DON) {
        return message.warning(`请选择【${STATUS_TEXT.get(STATUS.DON)}】的数据`);
      }
      dialogCallBackFn = submitCancelReleaseApi;
      openDialog();
    });
  }
  async function confirmCancel() {
    const values = await validate();
    getSelections(true, async ([row]) => {
      confirmLoading.value = true;
      try {
        await dialogCallBackFn({ prNo: row.prNo, reason: values.reason });
        success();
        message.success('取消成功');
        open.value = false;
      } finally {
        confirmLoading.value = false;
      }
    });
  }
  getSysParamsList({ currPage: '1', pageSize: '1', paramKey: 'releaseUnqualifiedStorage' }).then(
    (res) => {
      const data = res.result || [];
      releaseUnqualifiedStorage.value = data[0]?.paramValue === '1';
    },
  );
</script>
