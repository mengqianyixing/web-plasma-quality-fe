<!--
 * @Descripttion: 
 * @version: 
 * @Author: zcc
 * @Date: 2024-01-05 17:23:44
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-09 17:16:29
-->
<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    title="出库扫描"
    width="1200px"
    @cancel="emit('close')"
    :minHeight="600"
    cancelText="关闭"
    :showOkBtn="false"
    @fullscreen="fullscreen"
  >
    <div class="relative h-inherit max-h-inherit min-h-inherit">
      <div class="absolute w-full h-full">
        <div class="form flex-1 flex">
          <div class="form-item">
            <span class="form-label">血浆编号</span>
            <ScanInput
              :value="formData.bagNo"
              @enter="_submit"
              @keyup="handleKeyUp"
              size="lg"
              ref="bagNoRef"
              @scan-change="(code) => (formData.bagNo = code)"
            />
          </div>
        </div>
        <div class="flex flex-1" style="height: calc(100% - 60px)">
          <div class="h-full flex-1">
            <BasicTable @register="registerLeftTable" />
          </div>
          <div class="h-full flex-1">
            <BasicTable @register="registerRightTable" />
          </div>
        </div>
      </div>
    </div>
  </BasicModal>
</template>
<script setup lang="ts">
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { outLeftColumns, outRightColumns } from './plasmaOut.data';
  import { BasicTable, useTable } from '@/components/Table';
  import { scanApi, scanedApi, notScanApi } from '@/api/nonconformity/plasmaOut';
  import { reactive, ref } from 'vue';
  import { debounce } from 'lodash-es';
  import ScanInput from '@/components/Form/src/components/ScanInput.vue';

  const emit = defineEmits(['close']);

  const state = reactive({ no: '' });
  const formData = reactive({ bagNo: '' });
  const bagNoRef = ref();

  const [
    registerLeftTable,
    { reload: reloadLeft, setPagination: setPaginationLeft, redoHeight: lRedoHeight },
  ] = useTable({
    api: notScanApi,
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    columns: outLeftColumns,
    isCanResizeParent: true,
    inset: false,
    size: 'small',
    useSearchForm: false,
    bordered: true,
    beforeFetch: (p) => ({
      ...p,
      dlvNo: state.no,
    }),
  });
  const [
    registerRightTable,
    { reload: reloadRight, setPagination: setPaginationRight, redoHeight: rRedoHeight },
  ] = useTable({
    api: scanedApi,
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    columns: outRightColumns,
    size: 'small',
    isCanResizeParent: true,
    inset: false,

    useSearchForm: false,
    bordered: true,
    beforeFetch: (p) => ({
      ...p,
      dlvNo: state.no,
    }),
  });
  function fullscreen() {
    lRedoHeight();
    rRedoHeight();
  }
  const _submit = debounce(handleSubmit, 200);
  function handleKeyUp(e) {
    if (e.key === 'Enter') {
      _submit();
    }
  }
  async function handleSubmit() {
    const { bagNo } = formData;
    const focusedElement = document.activeElement as InputHTMLElement;

    await scanApi({ bagNo, no: state.no }, () => {
      setTimeout(() => {
        focusedElement.focus();
        focusedElement.select();
      }, 300);
    });
    focusedElement.focus();
    formData.bagNo = '';
    reloadLeft();
    reloadRight();
  }
  const [registerModal] = useModalInner(({ dlvNo }) => {
    state.no = dlvNo;
    formData.bagNo = '';
    bagNoRef.value.$el.focus();
    setPaginationLeft({ current: 1 });
    setPaginationRight({ current: 1 });
    reloadLeft();
    reloadRight();
  });
</script>
<style scoped lang="scss">
  .form-item {
    display: flex;
    align-items: center;
    width: 370px;
    margin-bottom: 15px;

    .form-label {
      width: 100px;
      margin-right: 10px;
      font-size: 16px;
      text-align: right;
    }
  }
</style>
