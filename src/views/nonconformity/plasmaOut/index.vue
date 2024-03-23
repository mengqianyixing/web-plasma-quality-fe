<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button
          type="primary"
          @click="openModal(true, {})"
          v-auth="NonconformityButtonEnum.PlasmaOutAdd"
          >新增
        </a-button>
        <a-button
          type="primary"
          @click="handleEdit"
          v-auth="NonconformityButtonEnum.PlasmaOutUpdate"
          >编辑
        </a-button>
        <a-button
          type="primary"
          @click="handleRemove"
          v-auth="NonconformityButtonEnum.PlasmaOutRemove"
          >撤销
        </a-button>
        <a-button
          type="primary"
          @click="handleProcess"
          v-auth="NonconformityButtonEnum.PlasmaOutProcess"
          >审核
        </a-button>
        <a-button
          type="primary"
          @click="handleUnProcess"
          v-auth="NonconformityButtonEnum.PlasmaOutUnProcess"
          >取消审核
        </a-button>
        <a-button type="primary" @click="handleScan" v-auth="NonconformityButtonEnum.PlasmaOutScan">
          出库扫描
        </a-button>
        <a-dropdown>
          <a-button
            type="primary"
            :reportLoading="reportLoading"
            v-auth="[
              NonconformityButtonEnum.PlasmaOutTransferPrint,
              NonconformityButtonEnum.PlasmaOutPlasmaPrint,
              NonconformityButtonEnum.PlasmaOutDestructionPrint,
            ]"
          >
            打印
          </a-button>
          <template #overlay>
            <Menu>
              <MenuItem @click="handlePrint(PrintServerEnum.UNQUALIFIED_PLASMA_TRANSFER)">
                <a-button
                  type="link"
                  :disabled="!disabledTransfer"
                  v-auth="NonconformityButtonEnum.PlasmaOutTransferPrint"
                  >不合格原料血浆转移记录
                </a-button>
              </MenuItem>
              <MenuItem @click="handlePrint(PrintServerEnum.UNQUALIFIED_RAW_PLASMA)">
                <a-button
                  type="link"
                  :disabled="disabledTransfer"
                  v-auth="NonconformityButtonEnum.PlasmaOutPlasmaPrint"
                  >不合格原料血浆信息清单
                </a-button>
              </MenuItem>
              <MenuItem @click="handlePrint(PrintServerEnum.DESTROYED_UNQUALIFIED_PLASMA)">
                <a-button
                  type="link"
                  :disabled="disabledTransfer"
                  v-auth="NonconformityButtonEnum.PlasmaOutDestructionPrint"
                  >不合格原理血浆销毁处理申请审批表
                </a-button>
              </MenuItem>
            </Menu>
          </template>
        </a-dropdown>
      </template>
      <template #dlvNo="{ record }: { record: Recordable }">
        <span class="text-blue-500 underline cursor-pointer" @click.stop.self="handleDt(record)">
          {{ record.dlvNo }}
        </span>
      </template>
    </BasicTable>
    <Modal
      :open="open"
      @cancel="open = false"
      @ok="confirmRemove"
      okText="提交"
      width="300px"
      :confirmLoading="confirmLoading"
      :title="type + '原因'"
    >
      <div class="m-20px">
        <BasicForm @register="registerForm" />
      </div>
    </Modal>
    <FormModal @register="registerModal" @close="reload" />
    <OutModal @register="registerOutModal" />
    <ReportModal @register="registerReportModal" />
  </PageWrapper>
</template>
<script setup lang="ts">
  import { BasicTable, useTable } from '@/components/Table';
  import { PageWrapper } from '@/components/Page';
  import { useModal } from '@/components/Modal';

  import ReportModal from '@/components/ReportModal/index.vue';
  import FormModal from './formDrawer.vue';
  import OutModal from './outDrawer.vue';

  import { columns, searchFormschema, PROCESS_STATE_TEXT } from './plasmaOut.data';
  import {
    getListApi,
    removeFormApi,
    processApi,
    unProcessApi,
  } from '@/api/nonconformity/plasmaOut';
  import { ref } from 'vue';
  import { message, Modal, Dropdown as ADropdown, MenuItem, Menu } from 'ant-design-vue';
  import { BasicForm, useForm } from '@/components/Form';
  import { NonconformityButtonEnum } from '@/enums/authCodeEnum';
  import { PrintServerEnum } from '@/enums/printServerEnum';
  import { getReportApi } from '@/api/report';

  defineOptions({ name: 'PlasmaOut' });

  const open = ref(false);
  const confirmLoading = ref(false);
  const reportLoading = ref(false);
  const type = ref('');

  let api = removeFormApi;
  const disabledTransfer = ref(false);

  const [registerModal, { openModal }] = useModal();
  const [registerOutModal, { openModal: openOutModal }] = useModal();
  const [registerReportModal, { openModal: openReportModal }] = useModal();
  const [registerTable, { getSelectRows, clearSelectedRowKeys, reload }] = useTable({
    api: getListApi,
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    columns: columns,
    size: 'small',
    useSearchForm: true,
    showTableSetting: false,
    bordered: true,
    rowSelection: {
      type: 'radio',
      onChange: (_, selectedRows: any) => {
        disabledTransfer.value = selectedRows[0]?.useTo !== '销毁';
      },
    },
    beforeFetch: (p) => ({
      ...p,
      endDate: p.endDate?.slice(0, 10),
      begnDate: p.begnDate?.slice(0, 10),
    }),
    afterFetch: (res) => {
      clearSelectedRowKeys();
      return res;
    },
    formConfig: {
      schemas: searchFormschema,
    },
  });
  const [registerForm, { resetFields, clearValidate, validate }] = useForm({
    labelWidth: 80,
    baseColProps: { span: 24 },
    schemas: [
      {
        field: 'cause',
        component: 'Input',
        label: '原因',
        required: true,
      },
    ],
    showActionButtonGroup: false,
  });
  function getSelections(onlyOne: boolean) {
    const rows = getSelectRows();
    if (rows.length === 0) {
      message.warning('请选择一条数据');
      return [];
    } else if (rows.length > 1 && onlyOne) {
      message.warning('只能选择一条数据');
      return [];
    }
    return rows;
  }

  function handleEdit() {
    const [row] = getSelections(true);
    if (!row) return;
    if (row.state !== PROCESS_STATE_TEXT.AUT) return message.warning('已审核的数据不可修改');
    openModal(true, { ...row });
  }
  function handleDt(record: Recordable) {
    openModal(true, { ...record, disabled: true });
  }
  function handleRemove() {
    const [row] = getSelections(true);
    if (!row) return;
    type.value = '撤销';
    open.value = true;
    api = removeFormApi;
    resetFields();
    clearValidate();
  }
  async function confirmRemove() {
    const { cause } = await validate();
    const [row] = getSelections(true);
    try {
      confirmLoading.value = true;
      await api({ no: row.dlvNo, cause });
      open.value = false;
      message.success(type.value + '成功');
      reload();
    } finally {
      confirmLoading.value = false;
    }
  }
  async function handleProcess() {
    const [row] = getSelections(true);
    if (!row) return;
    Modal.confirm({
      content: '确认审核' + row.dlvNo + '?',
      onOk: async () => {
        await processApi({ no: row.dlvNo });
        message.success('审核成功');
        clearSelectedRowKeys();
        reload();
      },
      onCancel: () => Modal.destroyAll(),
    });
  }
  async function handleUnProcess() {
    const [row] = getSelections(true);
    if (!row) return;
    type.value = '取消审核';
    open.value = true;
    api = unProcessApi;
    await resetFields();
    await clearValidate();
  }
  async function handleScan() {
    const [row] = getSelections(true);
    if (!row) return;

    openOutModal(true, row);
  }
  async function handlePrint(field: PrintServerEnum) {
    const [row] = getSelections(true);
    if (!row) return;

    try {
      reportLoading.value = true;
      const res = await getReportApi({ reportKey: field, contentKey: row.dlvNo });
      openReportModal(true, window.URL.createObjectURL(res));
      clearSelectedRowKeys();
    } finally {
      reportLoading.value = false;
    }
  }
</script>
