<!--
 * @Descripttion: 
 * @version: 
 * @Author: zcc
 * @Date: 2024-01-02 13:43:33
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-08 15:17:54
-->
<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    title="选择检测项目"
    :width="(state.length || 1) * 200 + 50 + 'px'"
    cancelText="关闭"
    :mask="!!state.length"
    @ok="handleSubmit"
  >
    <div class="flex h-full ml-20px mr-20px">
      <div class="container flex-1 w-160px" v-for="item in state" :key="item.plasmaType">
        <div class="text-center text-white title bg-slate-100">
          {{ PLASMA_TYPE_TEXT[item.plasmaType] }}
        </div>
        <div class="title">
          <a-checkbox
            v-model:checked="item.checkAll"
            :indeterminate="item.indeterminate"
            @change="(value) => allChange(value, item)"
          >
            全选
          </a-checkbox>
        </div>
        <a-checkbox-group
          v-model:value="item.values"
          :options="item.options"
          @change="(values) => change(values, item)"
        />
      </div>
    </div>
  </BasicDrawer>
</template>
<script setup lang="ts">
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { ref, unref } from 'vue';
  import { CheckboxGroup as ACheckboxGroup, message, Checkbox as ACheckbox } from 'ant-design-vue';
  import { getCheckItemListApi, addItemApi } from '@/api/inspect/resultRegistration';
  import { GetApiCoreLabRegistrationLabProjectsBsNoResponse } from '@/api/type/inspectManage';
  import { PLASMA_TYPE_TEXT } from '@/enums/inspectEnum';

  type CheckGrop = {
    values: string[];
    plasmaType: string;
    checkAll: boolean;
    indeterminate: boolean;
    options: {
      label: string;
      value: string;
      disabled?: boolean;
    }[];
  };
  const emit = defineEmits(['confirm']);

  const state = ref<CheckGrop[] & GetApiCoreLabRegistrationLabProjectsBsNoResponse>([]);
  const bsno = ref('');
  const [registerDrawer, { setDrawerProps }] = useDrawerInner(async ({ bsNo }) => {
    bsno.value = bsNo;
    const res = await getCheckItemListApi({ bsNo });
    if (res.length === 0) {
      message.warning('检测项目已全部添加');
      return;
    }
    state.value = res
      .map((_) => {
        return {
          ..._,
          checkAll: false,
          indeterminate: false,
          values: [],
          options: _.labProjects.map((_) => ({
            value: _.projectId,
            label: _.projectAbbr,
          })),
        };
      })
      .filter((_) => _.options.length);
    state.value.forEach((it) => {
      change(it.values, it);
    });
  });
  async function handleSubmit() {
    const validate = unref(state).some((_) => _.values.length > 0);
    if (!validate) return message.warning('请选择项目');
    const list = unref(state).reduce((t, _) => {
      const l = _.values.map((projectId) => ({
        projectId,
        plasmaType: _.plasmaType,
        bsNo: unref(bsno),
      }));
      t.push(...l);
      return t;
    }, [] as unknown[]);
    try {
      setDrawerProps({ confirmLoading: true });
      await addItemApi(list);
      message.success('项目添加成功');
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
    emit('confirm');
  }
  function allChange(event: any, item: CheckGrop) {
    item.indeterminate = false;
    if (event.target.checked) {
      item.values = item.options.map((_) => _.value);
    } else {
      item.values.splice(0, item.values.length);
    }
  }
  function change(values: any[], item: CheckGrop) {
    if (values.length === item.options.length) {
      item.checkAll = true;
      item.indeterminate = false;
    } else if (values.length === 0) {
      item.checkAll = false;
      item.indeterminate = false;
    } else {
      item.checkAll = false;
      item.indeterminate = true;
    }
  }
</script>
<style scoped>
  .container {
    height: 100%;
    margin: 0 5px;
    overflow: hidden;
    border: 1px solid #e6e7e8;
    border-radius: 8px;
  }

  .title {
    padding: 10px 16px 10px 0;
    border-bottom: 1px solid #e6e7e8;
    color: #000;
    font-size: 14px;
  }

  .container :deep(.ant-checkbox-wrapper) {
    width: 100%;
    margin: 10px;
  }
</style>
