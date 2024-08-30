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
        <div class="form flex-1 flex">
          <div class="form-item">
            <span class="form-label">托盘编号</span>
            <ScanInput
              :value="formData.trayNo"
              @enter="_submit"
              @keyup="handleKeyUp"
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
  import { bindBoxApi, getTrayBoxBindRecordApi } from '@/api/tray/relocation';
  import { message, Spin } from 'ant-design-vue';
  import { trayBoxListApi } from '@/api/tray/list';
  import { ref, nextTick, reactive } from 'vue';
  import ScanInput from '@/components/Form/src/components/ScanInput.vue';
  import { debounce } from 'lodash-es';

  const count = ref(0);
  const spinning = ref(false);
  const boxidRef = ref();
  const formData = reactive({
    trayNo: '',
    boxId: '',
  });

  const props = defineProps({
    isBinding: {
      type: Boolean,
    },
  });
  const columns = plasmaBoxScanColumns(props.isBinding);
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
    beforeFetch: (p) => ({ ...p, operateType: props.isBinding ? 'bind' : 'unbind' }),
    size: 'small',
  });
  async function submit() {
    const { boxId, trayNo } = formData;
    const focusedElement = document.activeElement as InputHTMLElement;
    try {
      await bindBoxApi(
        {
          trayNo: trayNo,
          type: props.isBinding ? 'bind' : 'unbind',
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
  function handleKeyUp(e) {
    if (e.key === 'Enter') {
      _submit();
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
