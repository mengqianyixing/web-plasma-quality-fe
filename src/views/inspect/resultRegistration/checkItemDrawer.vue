<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    title="选择检测项目"
    width="700px"
    @ok="handleSubmit"
    @close="close"
  >
    <div class="flex h-full">
      <div class="container w-160px" v-for="item in state" :key="item.plasmaType">
        <div class="title">{{ item.plasmaType }}</div>
        <a-checkbox-group v-model:value="item.values" :options="item.options" />
      </div>
    </div>
  </BasicDrawer>
</template>
<script setup lang="ts">
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { ref, unref } from 'vue';
  import { CheckboxGroup as ACheckboxGroup, message } from 'ant-design-vue';
  import { getCheckItemListApi, addItemApi } from '@/api/inspect/resultRegistration';
  import { GetApiCoreLabRegistrationLabProjectsBsNoResponse } from '@/api/type/inspectManage';

  type CheckGrop = {
    values: string[];
    plasmaType: string;
    options: {
      label: string;
      value: string;
    }[];
  }[];
  const emit = defineEmits(['confirm']);
  const state = ref<CheckGrop & GetApiCoreLabRegistrationLabProjectsBsNoResponse>([]);
  const bsno = ref('');
  const [registerDrawer] = useDrawerInner(async ({ bsNo }) => {
    bsno.value = bsNo;
    const res = await getCheckItemListApi({ bsNo });
    state.value = res.map((_) => ({
      ..._,
      values: [],
      options: _.labProjects.map((_) => ({ value: _.projectId, label: _.projectAbbr })),
    }));
  });
  async function handleSubmit() {
    console.log(unref(state));
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
    await addItemApi(list);
    emit('confirm');
  }
  function close() {}
</script>
<style scoped>
  .container {
    height: 100%;
    margin: 0 5px;
    padding: 8px 0;
    border: 1px solid #e6e7e8;
    border-radius: 8px;
  }

  .title {
    padding: 10px 16px;
    border-bottom: 1px solid #e6e7e8;
    color: #000;
    font-size: 14px;
  }

  .container :deep(.ant-checkbox-wrapper) {
    margin: 10px;
  }
</style>
