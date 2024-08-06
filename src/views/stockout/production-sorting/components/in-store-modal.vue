<!--
 * @Descripttion:
 * @version:
 * @Author: zcc
 * @Date: 2024-01-29 10:43:03
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-30 17:07:34
-->
<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    showFooter
    :title="`托盘入库`"
    width="1200px"
    :show-ok-btn="false"
    cancelText="关闭"
    :min-height="600"
    @cancel="cancel"
  >
    <div class="relative h-inherit max-h-inherit min-h-inherit">
      <div class="absolute flex flex-col w-full h-full">
        <Tabs
          v-model:activeKey="state.activeKey"
          @change="change"
          class="h-full bg-white tabs"
          type="card"
          size="small"
        >
          <TabPane tab="分拣血浆箱" key="1">
            <Spin :spinning="state.spinning">
              <div class="form flex">
                <div class="form-item">
                  <span class="form-label">托盘编号</span>
                  <ScanInput
                    :value="formData.trayNo"
                    @enter="_submit"
                    @keyup="handleKeyUp"
                    size="lg"
                    ref="trayRef"
                    @scan-change="(code) => (formData.trayNo = code)"
                  />
                </div>
                <div class="form-item">
                  <span class="form-label">箱号</span>
                  <ScanInput
                    :value="formData.boxId"
                    @enter="_submit"
                    size="lg"
                    ref="boxRef"
                    @keyup="handleKeyUp"
                    @scan-change="(code) => (formData.boxId = code)"
                  /> </div
              ></div>
            </Spin>
            <div class="border border-slate-100"></div>
            <div style="height: calc(100% - 60px)">
              <BasicTable @register="registerBindTable">
                <template #toolbar>
                  <a-button type="primary" @click="handleUnbind">解绑</a-button>
                </template>
              </BasicTable>
            </div>
          </TabPane>
          <TabPane tab="托盘入库" key="2">
            <BasicTable @register="registerTable">
              <template #toolbar>
                <a-button type="primary" @click="handleInStore">入库</a-button>
              </template>
            </BasicTable>
          </TabPane>
        </Tabs>
      </div>
    </div>
    <InModal @register="registerInModal" @success="reload" />
  </BasicModal>
</template>
<script setup lang="ts">
  import { BasicModal, useModalInner, useModal } from '@/components/Modal';
  import { BasicTable, useTable } from '@/components/Table';
  import { message, TabPane, Tabs, Spin } from 'ant-design-vue';
  import { nextTick, reactive, ref } from 'vue';
  import {
    trayInStoreColumns,
    trayInStoreFormSchema,
    bindSearchFormSchema,
    sortingBoxBindColumns,
  } from '../production-sorting.data';
  import InModal from '@/views/tray/outInStore/inModal.vue';
  import { bindBoxApi } from '@/api/tray/relocation';
  import { getInStoreListApi, getSortingBoxListApi } from '@/api/stockout/production-sorting';
  import { TRAY_STORE_STATE } from '@/enums/stockoutEnum';
  import { SERVER_ENUM } from '@/enums/serverEnum';
  import { useServerEnumStoreWithOut } from '@/store/modules/serverEnums';
  import { useMessage } from '@/hooks/web/useMessage';
  import ScanInput from '@/components/Form/src/components/ScanInput.vue';
  import { debounce } from 'lodash-es';

  const formData = reactive({
    trayNo: '',
    boxId: '',
  });
  const boxRef = ref();
  const trayRef = ref();
  const serverEnumStore = useServerEnumStoreWithOut();
  const BankTrayStatusEnum = serverEnumStore.getServerEnumText(SERVER_ENUM.BankTrayStatusEnum);
  const state = reactive({
    activeKey: '1',
    prepareNo: '',
    spinning: false,
  });
  const emit = defineEmits(['close']);
  const [registerModal] = useModalInner(async ({ prepareNo }) => {
    state.prepareNo = prepareNo;
    formData.boxId = '';
    formData.trayNo = '';
    change(state.activeKey);
  });
  const [registerInModal, { openModal: openInModal }] = useModal();

  const [
    registerBindTable,
    {
      getSelectRows: getBindSelectRows,
      clearSelectedRowKeys: clearBindSelectedRowKeys,
      reload: reloadBind,
    },
  ] = useTable({
    immediate: false,
    api: getSortingBoxListApi,
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    columns: sortingBoxBindColumns,
    inset: true,
    isCanResizeParent: true,
    size: 'small',
    useSearchForm: true,
    showTableSetting: false,
    bordered: true,
    rowSelection: { type: 'radio' },
    beforeFetch: (p) => ({ ...p, prepareNo: state.prepareNo }),
    afterFetch: (res) => {
      clearBindSelectedRowKeys();
      return res;
    },
    formConfig: {
      schemas: bindSearchFormSchema,
    },
  });
  const [registerTable, { getSelectRows, clearSelectedRowKeys, reload }] = useTable({
    immediate: false,
    api: getInStoreListApi,
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    columns: trayInStoreColumns,
    inset: true,
    isCanResizeParent: true,
    size: 'small',
    useSearchForm: true,
    showTableSetting: false,
    bordered: true,
    rowSelection: { type: 'checkbox' },
    beforeFetch: (p) => ({ ...p, prepareNo: state.prepareNo }),
    afterFetch: (res) => {
      clearSelectedRowKeys();
      return res;
    },
    formConfig: {
      schemas: trayInStoreFormSchema,
    },
  });
  async function change(activeKey) {
    const map = {
      1: reloadBind,
      2: reload,
    };
    await nextTick();
    map[activeKey]();
  }
  function cancel() {
    emit('close');
  }

  const { createConfirm } = useMessage();

  function handleUnbind() {
    const rows: Recordable[] = getBindSelectRows();
    if (rows.length === 0) return message.warning('请选择数据');
    const [row] = rows;
    if (!row.trayNo) return message.warning('请选择已绑定托盘的数据');
    createConfirm({
      iconType: 'warning',
      content: '确定解绑箱号【' + row.boxNo + '】?',
      onOk: async () => {
        await bindBoxApi({ trayNo: row.trayNo, type: 'unbind', boxes: [row.boxNo] });
        message.success('解绑成功');
        await reloadBind();
      },
    });
  }
  function handleInStore() {
    const rows: Recordable[] = getSelectRows();
    if (rows.length === 0) return message.warning('请选择数据');
    if (rows.some((_) => _.state !== TRAY_STORE_STATE.OUT)) {
      return message.warning('请选择【' + BankTrayStatusEnum(TRAY_STORE_STATE.OUT) + '】的数据');
    }
    openInModal(true, { data: rows });
  }
  const _submit = debounce(submit, 200);
  function handleKeyUp(e) {
    if (e.key === 'Enter') {
      _submit();
    }
  }
  async function submit() {
    const { boxId, trayNo } = formData;
    if (trayNo && !boxId) boxRef.value.$el.focus();
    if (!boxId || !trayNo) return message.warning('请扫描' + (boxId ? '托盘' : '箱号'));
    const focusedElement = document.activeElement as InputHTMLElement;
    try {
      state.spinning = true;
      await bindBoxApi(
        {
          trayNo: trayNo,
          type: 'bind',
          boxes: [boxId],
          bizScen: 'plasmaSort',
          prepareNo: state.prepareNo,
        },
        () => {
          setTimeout(() => {
            focusedElement.focus();
            focusedElement.select();
          }, 300);
        },
      );
      formData.boxId = '';
      message.success('绑定成功');
      reloadBind();
    } finally {
      await nextTick();
      state.spinning = false;
      focusedElement.focus();
    }
  }
</script>
<style scoped lang="scss">
  .tabs :deep(.ant-tabs-content) {
    height: 100%;
  }

  .form-item {
    display: flex;
    align-items: center;
    width: 400px;
    margin-bottom: 15px;

    .form-label {
      width: 100px;
      margin-right: 10px;
      font-size: 16px;
      text-align: right;
    }
  }
</style>
