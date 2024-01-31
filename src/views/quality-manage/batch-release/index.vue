<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate()">新增</a-button>
        <a-button type="primary" @click="handleUpdate()">编辑</a-button>
        <a-button type="primary" @click="handleReview">复核</a-button>
        <a-button type="primary" @click="handleRelease">放行</a-button>
        <a-button type="primary" @click="handleCancelRelease">取消放行</a-button>
        <a-button type="primary">打印</a-button>
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
  import { ref } from 'vue';
  import { BasicForm, useForm } from '@/components/Form';
  import {
    getListApi,
    submitReviewApi,
    submitCancelReleaseApi,
    submitReleaseApi,
    getNonconformityListApi,
  } from '@/api/quality/batch-release';
  import { getSysParamsList } from '@/api/systemServer/params';
  import { STATUS, STATUS_TEXT } from '@/enums/batchReleaseEnum';

  const open = ref(false);
  const confirmLoading = ref(false);
  const releaseUnqualifiedStorage = ref(false);

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
      console.log(releaseUnqualifiedStorage.value);
      if (releaseUnqualifiedStorage.value) {
        const res = await getNonconformityListApi({ orderNo: row.orderNo });
        if (res.length) {
          openNonconModal(true, res);
        } else {
          iterator = handleNext(row, openFormModal, true, { ...row, title: '新增' });
          iterator.next();
        }
      } else {
        iterator = handleNext(row, openFormModal, true, { ...row, title: '新增' });
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
  function* handleNext(row: Recordable, fn: Function, ...arg: any) {
    if (row.bagFlag) yield openPRModal(true, row);
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
      iterator = handleNext(row, () => {
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
      iterator = handleNext(row, () => {
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
  function handleCancelRelease() {
    getSelections(true, ([row]) => {
      if (row.state !== STATUS.DON) {
        return message.warning(`请选择【${STATUS_TEXT.get(STATUS.DON)}】的数据`);
      }
      clearValidate();
      resetFields();
      open.value = true;
    });
  }
  async function confirmCancel() {
    const values = await validate();
    getSelections(true, async ([row]) => {
      confirmLoading.value = true;
      try {
        await submitCancelReleaseApi({ prNo: row.prNo, reason: values.reason });
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
