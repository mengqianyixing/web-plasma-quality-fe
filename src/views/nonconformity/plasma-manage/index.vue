<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable">
      <template #unqReason="{ record }">
        {{ formatUnqReason(record?.unqReason) }}
      </template>
      <template #bagNo="{ record }">
        <span
          class="text-blue-500 underline cursor-pointer"
          @click.stop.self="handleBagNoClick(record)"
        >
          {{ record?.bagNo }}
        </span>
      </template>
      <template #toolbar>
        <a-button
          type="primary"
          @click="handlePickPlasma"
          v-auth="ReCheckButtonEnum.NonconformityPickCheck"
          >挑浆
        </a-button>
        <a-button
          type="primary"
          @click="handleInStore"
          v-auth="ReCheckButtonEnum.NonconformityInStoreCheck"
        >
          入库
        </a-button>
        <a-button
          type="primary"
          @click="handlePickPlasmaSystem"
          v-auth="NonconformityInStoreButtonEnum.NonconformityInStorePMS"
        >
          PMS出库
        </a-button>
        <a-button
          type="primary"
          @click="handleCheck"
          v-auth="NonconformityInStoreButtonEnum.NonconformityInStoreCheck"
          >审核
        </a-button>
        <a-button
          type="primary"
          @click="handleOpenCancelCheck"
          v-auth="NonconformityInStoreButtonEnum.NonconformityInStoreCancelCheck"
          >撤销审核
        </a-button>
      </template>
    </BasicTable>

    <PickPlasmaModal @register="registerPickModal" @success="handleSuccess" />
    <InStoreModal @register="registerInStoreModal" @success="handleSuccess" />
    <PlasmaDetailModal @register="registerDetailModal" />
    <BasicModal
      @register="registerUnCheckModal"
      @ok="handleCancelCheck"
      okText="提交"
      width="300px"
      title="撤销原因"
    >
      <div class="m-20px">
        <BasicForm @register="registerForm" />
      </div>
    </BasicModal>
  </PageWrapper>
</template>
<script setup lang="ts">
  import { BasicTable, useTable } from '@/components/Table';
  import { useModal, BasicModal } from '@/components/Modal';
  import { useMessage } from '@/hooks/web/useMessage';
  import { PageWrapper } from '@/components/Page';
  import { columns, searchSchema } from './manage.data';

  import { onMounted, ref } from 'vue';
  import {
    DictionaryItemKeyEnum,
    DictionaryReasonEnum,
    getSysSecondaryDictionary,
  } from '@/api/_dictionary';
  import {
    nonconformityCheck,
    nonconformityPlasmaList,
    nonconformityRedoCheck,
    nonconformityPMS,
  } from '@/api/nonconformity/plasma-manage';

  import PickPlasmaModal from '@/views/nonconformity/plasma-manage/PickPlasmaModal.vue';
  import InStoreModal from '@/views/nonconformity/plasma-manage/InStoreModal.vue';
  import PlasmaDetailModal from '@/views/nonconformity/plasma-manage/PlasmaDetailModal.vue';
  import { useStation } from '@/hooks/common/useStation';
  import { NonconformityInStoreButtonEnum, ReCheckButtonEnum } from '@/enums/authCodeEnum';
  import { BasicForm, useForm } from '@/components/Form';

  defineOptions({ name: 'PlasmaManage' });

  const selectedRow = ref<Recordable>([]);
  const plasmaUnqualifiedDictionary = ref<Recordable[] | undefined>([]);

  const { createConfirm, createMessage } = useMessage();
  const { stationOptions } = useStation();

  onMounted(async () => {
    await getForm().updateSchema({
      field: 'stationNo',
      componentProps: {
        options: stationOptions,
      },
    });

    plasmaUnqualifiedDictionary.value = await getSysSecondaryDictionary({
      dataKey: DictionaryReasonEnum.PlasmaFailedReason,
      dictItemTypes: [DictionaryItemKeyEnum.PlasmaFailed],
    });

    await getForm().updateSchema({
      field: 'unqReason',
      componentProps: {
        options: plasmaUnqualifiedDictionary.value.map((it) => ({
          label: it.label,
          value: it.value,
        })),
      },
    });
  });

  const [registerPickModal, { openModal: openPickModal }] = useModal();
  const [registerInStoreModal, { openModal: openInStoreModal }] = useModal();
  const [registerDetailModal, { openModal: openDetailModal }] = useModal();
  const [registerUnCheckModal, { openModal: openUnCheckModal, setModalProps }] = useModal();

  const [registerTable, { getForm, reload, clearSelectedRowKeys }] = useTable({
    api: nonconformityPlasmaList,
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    columns,
    scroll: {
      x: 0,
    },
    size: 'small',
    useSearchForm: true,
    showTableSetting: false,
    bordered: true,
    clickToRowSelect: true,
    rowSelection: {
      type: 'checkbox',
      onChange: (_, selectedRows: any) => {
        selectedRow.value = selectedRows;
      },
    },
    formConfig: {
      schemas: searchSchema,
      transformDateFunc(date) {
        return date ? date.format('YYYY-MM-DD') : '';
      },
    },
    showIndexColumn: false,
    canResize: true,
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

  function checkSelectedRows(onlyOne: boolean = true) {
    const length = selectedRow.value.length;
    if (!length) {
      createMessage.warn('请选择一条记录');
      return false;
    }
    if (onlyOne && length > 1) {
      createMessage.warn('只能选择一条记录');
      return false;
    }

    return true;
  }
  function handlePickPlasmaSystem() {
    if (!checkSelectedRows(false)) return;
    createConfirm({
      title: '确认',
      content: '请确认是否下发出库指令到挑浆系统？此操作不可回退，请谨慎操作！',
      iconType: 'warning',
      onOk: async () => {
        await nonconformityPMS(selectedRow.value.map((it) => it.bagNo));
        createMessage.success('下发出库指令到挑浆系统成功');
        clearSelectedRowKeys();
        await reload();
      },
    });
  }

  function handlePickPlasma() {
    openPickModal(true, {});
  }

  function handleInStore() {
    openInStoreModal(true, {});
  }

  function handleCheck() {
    if (!checkSelectedRows()) return;

    createConfirm({
      iconType: 'warning',
      title: '提示',
      content: '确定审核吗？',
      onOk: async () => {
        await nonconformityCheck(selectedRow.value[0]?.bagNo);

        await reload();
        clearSelectedRowKeys();
      },
    });
  }

  function handleOpenCancelCheck() {
    if (!checkSelectedRows()) return;
    const row = selectedRow.value[0];
    if (row.checked === '未审核') return createMessage.warn('未审核的数据不可撤销');
    openUnCheckModal(true);
    resetFields();
    clearValidate();
  }

  async function handleCancelCheck() {
    if (!checkSelectedRows()) return;
    try {
      const { reason } = await validate();
      setModalProps({ confirmLoading: true });
      await nonconformityRedoCheck({ bagNo: selectedRow.value[0]?.bagNo, reason });
      await reload();
      clearSelectedRowKeys();
      openUnCheckModal(false);
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }

  function formatUnqReason(unqReason: string) {
    return (
      plasmaUnqualifiedDictionary.value?.find((it) => it.value === unqReason)?.label ?? unqReason
    );
  }

  function handleBagNoClick(record: Recordable) {
    openDetailModal(true, {
      record: {
        bagNo: record?.bagNo,
        plasmaUnqualifiedDictionary: plasmaUnqualifiedDictionary.value,
      },
    });
  }

  function handleSuccess() {
    clearSelectedRowKeys();
    reload();
  }
</script>
