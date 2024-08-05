<!--
 * @Descripttion:
 * @version:
 * @Author: zcc
 * @Date: 2024-01-04 16:30:55
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-17 17:18:34
-->
<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :title="'血浆批号【' + state.batchNo + '】托盘入库'"
    width="1060px"
    @cancel="emit('close')"
    :minHeight="600"
    @fullscreen="redoHeight"
  >
    <div class="flex h-inherit max-h-inherit min-h-inherit">
      <div class="flex-1 w-full">
        <BasicTable @register="registerTable" ref="tableRef">
          <template #toolbar>
            <a-button type="primary" @click="handleIn">入库</a-button>
            <a-button type="primary" @click="handleReBind">托盘重绑</a-button>
          </template>
        </BasicTable>
      </div>
    </div>
    <InModal @register="registerInModal" @success="rePage" />
    <BasicModal
      @register="registerBindModal"
      showFooter
      title="托盘重绑"
      width="360px"
      @ok="okFunction"
      @cancel="emit('close')"
    >
      <div class="form">
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
    </BasicModal>
  </BasicModal>
</template>
<script setup lang="ts">
  import { BasicModal, useModalInner, useModal } from '@/components/Modal';
  import { BasicTable, useTable } from '@/components/Table';
  import { columns, searchForm } from './data';
  import { message } from 'ant-design-vue';
  import { getListApi } from '@/api/tray/list';
  import InModal from '@/views/tray/outInStore/inModal.vue';
  import { nextTick, ref, reactive } from 'vue';
  import { bindVerifyBoxApi } from '@/api/tray/relocation';
  import ScanInput from '@/components/Form/src/components/ScanInput.vue';
  import { debounce } from 'lodash-es';

  const emit = defineEmits(['register', 'close']);
  defineOptions({ name: 'InStoreModal' });

  const formData = reactive({
    trayNo: '',
    boxId: '',
  });
  const state = reactive({
    batchNo: '',
    queryFlow: void 0,
    inOut: void 0,
  });
  const bizScen = ref('');
  const boxRef = ref();
  const trayRef = ref();

  const [registerInModal, { openModal: openInModal }] = useModal();
  const [registerBindModal, { openModal }] = useModal();

  const [registerModal] = useModalInner(async (data) => {
    state.batchNo = data.batchNo;
    state.queryFlow = data.queryFlow;
    state.inOut = data.inOut;
    bizScen.value = data.bizScen;
    rePage();
  });

  const [
    registerTable,
    { getSelectRows, reload, clearSelectedRowKeys, setPagination, redoHeight },
  ] = useTable({
    immediate: false,
    api: getListApi,
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    rowKey: 'trayNo',
    formConfig: {
      schemas: searchForm,
    },
    columns,
    useSearchForm: true,
    bordered: true,
    size: 'small',
    isCanResizeParent: true,
    rowSelection: { type: 'checkbox' },
    beforeFetch: (p) => ({ ...p, closed: '0', ...state }),
    afterFetch: (res) => {
      clearSelectedRowKeys();
      return res;
    },
  });
  function rePage() {
    setPagination({ current: 1 });
    reload();
  }

  function handleIn() {
    const rows = getSelections(false);
    if (rows.length === 0) return;
    if (rows.some((_) => _.wareHouseName)) return message.warning('所选托盘存在已入库!');
    openInModal(true, {
      data: rows,
      otherParams: {
        bizScen: bizScen.value,
      },
    });
  }

  async function handleReBind() {
    openModal();
    await nextTick();
    formData.boxId = '';
    formData.trayNo = '';
    trayRef.value.$el.focus();
  }

  const _submit = debounce(submit, 200);
  function handleKeyUp(e) {
    if (e.key === 'Enter') {
      _submit();
    }
  }
  async function okFunction() {
    await _submit();
  }
  async function submit() {
    const { boxId, trayNo } = formData;
    if (trayNo && !boxId) boxRef.value.$el.focus();
    if (!boxId || !trayNo) return message.warning('请扫描' + (boxId ? '托盘' : '箱号'));
    const focusedElement = document.activeElement as InputHTMLElement;
    await bindVerifyBoxApi({ boxes: [boxId], trayNo, type: 'bind' }, () => {
      setTimeout(() => {
        focusedElement.focus();
        focusedElement.select();
      }, 300);
    });
    formData.boxId = '';
    message.success('操作成功');
    reload();
  }
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
</script>
<style scoped lang="scss">
  .form-item {
    display: flex;
    align-items: center;
    width: 100%;
    margin-bottom: 15px;

    .form-label {
      width: 100px;
      margin-right: 10px;
      font-size: 16px;
      text-align: right;
    }
  }
</style>
