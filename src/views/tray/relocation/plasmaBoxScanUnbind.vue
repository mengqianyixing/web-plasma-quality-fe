<!--
 * @Descripttion:
 * @version:
 * @Author: zcc
 * @Date: 2023-12-21 17:19:22
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-31 17:05:41
-->
<template>
  <div class="h-full">
    <Spin :spinning="spinning">
      <div style="box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%)" class="flex pt-12px m-24px mt-8px">
        <div class="flex flex-1 form">
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
              :value="formData.boxId"
              @enter="_submit"
              size="lg"
              ref="boxidRef"
              @keyup="handleKeyUp"
              @scan-change="(code) => (formData.boxId = code)"
            />
          </div>
        </div>
        <div class="w-100px text-[20px] text-red-400">箱数：{{ count }}</div>
      </div>
    </Spin>
    <BasicTable @register="registerTable" />
  </div>
</template>
<script setup lang="ts">
  import { BasicTable, useTable } from '@/components/Table';
  import { plasmaBoxScanSearchFormSchema, plasmaBoxScanColumns } from './relocation.data';
  import { bindBoxApi, getTrayBoxBindRecordApi, unbindPlasmaBoxApi } from '@/api/tray/relocation';
  import { message, Spin } from 'ant-design-vue';
  import { trayBoxListApi } from '@/api/tray/list';
  import { ref, nextTick, reactive } from 'vue';
  import ScanInput from '@/components/Form/src/components/ScanInput.vue';
  import { debounce } from 'lodash-es';
  import { useMessage } from '@/hooks/web/useMessage';

  const count = ref(0);
  const spinning = ref(false);
  const boxidRef = ref();
  const formData = reactive({
    trayNo: '',
    boxId: '',
  });
  const { createConfirm } = useMessage();

  const columns = plasmaBoxScanColumns(false);
  const [registerTable, { reload }] = useTable({
    api: getTrayBoxBindRecordApi,
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    formConfig: {
      schemas: plasmaBoxScanSearchFormSchema,
    },
    rowKey: 'houseNo',
    columns: columns,
    useSearchForm: true,
    bordered: true,
    beforeFetch: (p) => ({ ...p, operateType: 'unbind' }),
    size: 'small',
  });
  async function submit() {
    const { boxId, trayNo } = formData;
    const focusedElement = document.activeElement as InputHTMLElement;
    try {
      await bindBoxApi(
        {
          trayNo: trayNo,
          type: 'unbind',
          boxes: [boxId],
          bizScen: 'scanBox',
        },
        () => {
          setTimeout(() => {
            focusedElement.focus();
            focusedElement.select();
          }, 300);
        },
      );
      formData.boxId = '';
      message.success('操作成功');
      reload();
    } finally {
      await nextTick();
      focusedElement.focus();
    }
    trayBoxListApi({ trayNo }).then((res) => {
      count.value = res.length;
    });
  }
  const _submit = debounce(handleSubmit, 200);
  const _submitTray = debounce(handleTraySubmit, 200);
  function handleKeyUp(e) {
    if (e.key === 'Enter') {
      _submit();
    }
  }
  function handleTrayKeyUp(e) {
    if (e.key === 'Enter') {
      _submitTray();
    }
  }
  async function handleTraySubmit() {
    const { trayNo } = formData;
    if (!trayNo) return message.warning('请扫描托盘编号');
    const focusedElement = document.activeElement as InputHTMLElement;
    try {
      spinning.value = true;
      const msg = await unbindPlasmaBoxApi(
        {
          trayNo,
          confirm: false,
          type: 'unbind',
          bizScen: 'scanBox',
        },
        () => {
          setTimeout(() => {
            focusedElement.focus();
            focusedElement.select();
          }, 300);
        },
      );
      createConfirm({
        title: '确认',
        content: msg,
        iconType: 'warning',
        onOk: async () => {
          spinning.value = true;
          try {
            await unbindPlasmaBoxApi({
              ...formData,
              confirm: true,
              type: 'unbind',
              bizScen: 'scanBox',
            });
            reload();
            message.success('操作成功');
          } finally {
            spinning.value = false;
          }
        },
        onCancel: () => {
          boxidRef.value.$el.focus();
        },
      });
    } finally {
      await nextTick();
      focusedElement.focus();
      spinning.value = false;
    }
  }
  async function handleSubmit() {
    const { boxId, trayNo } = formData;
    if (boxId && !trayNo) message.warning('请扫描托盘编号');
    if (trayNo && !boxId) boxidRef.value.$el.focus();
    if (!boxId || !trayNo) return;
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
