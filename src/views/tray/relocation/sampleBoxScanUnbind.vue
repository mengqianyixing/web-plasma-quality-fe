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
              @enter="handleTrayKeyUp"
              @keyup="handleTrayKeyUp"
              size="lg"
              @scan-change="(code) => (formData.trayNo = code)"
            />
          </div>
          <div class="form-item">
            <span class="form-label">箱号</span>
            <ScanInput
              :value="formData.boxNo"
              size="lg"
              @enter="handleBoxKeyUp"
              @keyup="handleBoxKeyUp"
              @scan-change="(code) => (formData.boxNo = code)"
            />
          </div>
          <div class="form-item">
            <span class="form-label">样本袋号</span>
            <ScanInput
              :value="formData.packNo"
              @enter="handlePackKeyUp"
              size="lg"
              ref="packNoRef"
              @keyup="handlePackKeyUp"
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
  import { unbindSampleBoxApi, getTraySampleBoxUnBindRecordApi } from '@/api/tray/relocation';
  import { message, Spin } from 'ant-design-vue';
  import ScanInput from '@/components/Form/src/components/ScanInput.vue';
  import { debounce } from 'lodash-es';
  import { ref, reactive, nextTick } from 'vue';
  import { useMessage } from '@/hooks/web/useMessage';

  const formData = reactive({
    trayNo: '',
    boxNo: '',
    packNo: '',
  });
  const packNoRef = ref();
  const spinning = ref(false);

  const props = defineProps({
    isBinding: {
      type: Boolean,
    },
  });
  const { createConfirm } = useMessage();

  const columns = sampleBoxScanColumns(props.isBinding);
  const [registerTable, { reload }] = useTable({
    api: getTraySampleBoxUnBindRecordApi,
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
    beforeFetch: (p) => ({ ...p, bindType: 0 }),
  });

  async function submit() {
    const focusedElement = document.activeElement as InputHTMLElement;
    try {
      await unbindSampleBoxApi(formData, () => {
        setTimeout(() => {
          focusedElement.focus();
          focusedElement.select();
        }, 300);
      });
      const { packNo, boxNo, trayNo } = formData;
      let msg = '';
      if (packNo) {
        msg = `该托盘绑定x箱样本，是否解绑托盘与所有箱关系`;
      } else if (boxNo) {
        msg = `是否解绑托盘${trayNo}与箱号${boxNo}关系`;
      } else {
        msg = `是否解绑样本箱${boxNo}与样本袋${packNo}关系`;
      }
      createConfirm({
        title: '确认',
        content: msg,
        iconType: 'warning',
        onOk: () => {
          spinning.value = true;
          reload();
          spinning.value = false;
        },
        onCancel: () => {
          focusedElement.focus();
          focusedElement.select();
        },
      });
      message.success('操作成功');
    } finally {
      await nextTick();
      focusedElement.focus();
    }
  }
  const _submitTray = debounce(handleSubmit, 200);
  function handleTrayKeyUp(e) {
    if (e.key === 'Enter') {
      if (!formData.trayNo) return message.warn('请扫描托盘编号');
      _submitTray();
    }
  }
  const _submitBox = debounce(handleSubmit, 200);
  function handleBoxKeyUp(e) {
    if (e.key === 'Enter') {
      if (!formData.boxNo) return message.warn('请扫描箱号');
      else if (!formData.trayNo) return message.warn('请扫描托盘编号');
      _submitBox();
    }
  }
  const _submitPack = debounce(handleSubmit, 200);
  function handlePackKeyUp(e) {
    if (e.key === 'Enter') {
      if (!formData.packNo) return message.warn('请扫描样本袋号');
      if (!formData.boxNo) return message.warn('请扫描箱号');
      else if (!formData.trayNo) return message.warn('请扫描托盘编号');
      _submitPack();
    }
  }
  async function handleSubmit() {
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
  }
</style>
