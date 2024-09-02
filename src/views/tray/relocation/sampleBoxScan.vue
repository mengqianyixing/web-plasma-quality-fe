<!--
 * @Descripttion:
 * @version:
 * @Author: zcc
 * @Date: 2023-12-21 17:00:48
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-31 17:06:12
-->
<template>
  <div class="h-full">
    <Spin :spinning="spinning">
      <div style="box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%)" class="pt-12px m-24px mt-8px">
        <div class="flex flex-wrap">
          <div class="form-item">
            <span class="form-label">托盘编号</span>
            <ScanInput
              :value="formData.trayNo"
              @enter="_handleEnter"
              @keyup="_handleEnter"
              size="lg"
              @scan-change="(code) => (formData.trayNo = code)"
            />
          </div>
          <div class="form-item w-460px!">
            <span class="form-label">箱号</span>
            <ScanInput
              :value="formData.boxNo"
              size="lg"
              @enter="_submit"
              @keyup="handleKeyUp"
              @scan-change="(code) => (formData.boxNo = code)"
            />
            <span class="form-label number">袋数({{ formData.packCount }})</span>
            <a-button
              type="warning"
              :loading="printLoading"
              @click="print"
              :disabled="!formData.boxNo"
              >封箱</a-button
            >
          </div>
          <div class="form-item">
            <span class="form-label">样本袋号</span>
            <ScanInput
              :value="formData.packNo"
              @enter="_submit"
              size="lg"
              ref="packNoRef"
              @keyup="handleKeyUp"
              @scan-change="(code) => (formData.packNo = code)"
            />
          </div>
        </div>
      </div>
    </Spin>
    <BasicTable @register="registerTable" />
  </div>
</template>
<script setup lang="ts">
  import { BasicTable, useTable } from '@/components/Table';
  import { sampleBoxScanSearchFormSchema, sampleBoxScanColumns } from './relocation.data';
  import { bindSampleBoxApi, getTraySampleBoxBindRecordApi } from '@/api/tray/relocation';
  import { message, Spin } from 'ant-design-vue';
  import ScanInput from '@/components/Form/src/components/ScanInput.vue';
  import { debounce } from 'lodash-es';
  import { ref, nextTick, reactive } from 'vue';
  import { getPrintRecord, printRecord } from '@/api/tag/printRecord';

  const formData = reactive({
    trayNo: '',
    boxNo: '',
    packNo: '',
    packCount: 0,
  });
  const packNoRef = ref();
  const spinning = ref(false);
  const printLoading = ref(false);

  const props = defineProps({
    isBinding: {
      type: Boolean,
    },
  });
  const columns = sampleBoxScanColumns(props.isBinding);
  const [registerTable, { reload }] = useTable({
    api: getTraySampleBoxBindRecordApi,
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    formConfig: {
      schemas: sampleBoxScanSearchFormSchema,
    },
    rowKey: 'houseNo',
    columns: columns,
    useSearchForm: true,
    bordered: true,
    size: 'small',
    beforeFetch: (p) => ({ ...p, bindType: 1 }),
  });

  async function print() {
    try {
      printLoading.value = true;
      const res = await getPrintRecord({
        labelType: 'KEEP_SAMPLE_BOX',
        bissNo: formData.boxNo,
      });
      await printRecord({
        ...res,
        resolution: void 0,
        dpi: res.resolution,
      });
      formData.boxNo = '';
    } finally {
      printLoading.value = false;
    }
  }
  async function submit() {
    const focusedElement = document.activeElement as InputHTMLElement;
    try {
      const res = await bindSampleBoxApi(formData, () => {
        setTimeout(() => {
          focusedElement.focus();
          focusedElement.select();
        }, 300);
      });
      formData.packCount = res.packCount;
      formData.boxNo = res.boxNo || formData.boxNo;
      formData.packNo = '';
      reload();
      message.success('操作成功');
    } finally {
      await nextTick();
      focusedElement.focus();
    }
  }
  const _handleEnter = debounce((e) => {
    if (e.code === 'Enter') packNoRef.value.$el.focus();
  }, 300);
  const _submit = debounce(handleSubmit, 200);
  function handleKeyUp(e) {
    if (e.key === 'Enter') {
      _submit();
    }
  }
  async function handleSubmit() {
    const { packNo, trayNo, boxNo } = formData;
    if (!trayNo) return message.warning(`请扫描托盘`);
    if (!packNo && !boxNo) return message.warning(`请扫描箱号或者样本袋号`);
    try {
      spinning.value = true;
      await submit();
    } finally {
      spinning.value = false;
    }
  }
</script>
<style scoped lang="scss">
  .form-item {
    display: flex;
    align-items: center;
    width: 300px;
    margin-bottom: 15px;

    .form-label {
      width: 100px;
      margin-right: 10px;
      font-size: 16px;
      text-align: right;
    }

    .number {
      flex-shrink: 0;
      width: auto;
      margin: auto 10px;
      font-size: 14px;
      text-align: left;
    }
  }
</style>
