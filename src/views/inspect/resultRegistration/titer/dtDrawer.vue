<!--
 * @Descripttion: 
 * @version: 
 * @Author: zcc
 * @Date: 2023-12-29 15:36:12
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-02 19:16:32
-->
<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="projectName + '详情'"
    :width="isFull ? '100%' : '800px'"
    :show-ok-btn="false"
    cancelText="关闭"
    @ok="handleSubmit"
    @close="close"
  >
    <Tabs v-model:activeKey="activeKey" @change="change" class="h-full bg-white tabs" size="small">
      <TabPane key="1" tab="尚未有效价结果">
        <component :is="componentMap['1']" :projectId="pid" :bsNo="bsno" type="INVALID_PRICE" />
      </TabPane>
      <TabPane key="2" tab="已有效价结果">
        <component
          :is="componentMap['2']"
          checkResult="true"
          :projectId="pid"
          type="EFFECTIVE_PRICE"
          :bsNo="bsno"
        />
      </TabPane>
      <TabPane key="3" tab="未检测样品">
        <component :is="componentMap['3']" :projectId="pid" :bsNo="bsno" type="TO_BE_TESTED" />
      </TabPane>
    </Tabs>
  </BasicDrawer>
</template>
<script setup lang="ts">
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { TabPane, Tabs } from 'ant-design-vue';
  import { ref, markRaw } from 'vue';
  import DtTable from './dtTable.vue';

  const isFull = ref(false);
  const activeKey = ref('1');
  const pid = ref('');
  const bsno = ref('');
  const projectName = ref('');
  const componentMap = ref({
    1: 'div',
    2: 'div',
    3: 'div',
  });
  const [registerDrawer] = useDrawerInner(async ({ projectId, bsNo, projectAbbr }) => {
    pid.value = projectId;
    bsno.value = bsNo;
    projectName.value = projectAbbr;
    componentMap.value['1'] = markRaw(DtTable) as any;
  });
  function change(activeKey) {
    componentMap.value[activeKey] = markRaw(DtTable);
  }
  function handleSubmit() {}
  function close() {
    activeKey.value = '1';
    componentMap.value = {
      1: 'div',
      2: 'div',
      3: 'div',
    };
  }
</script>
<style scoped>
  .tabs :deep(.ant-tabs-content) {
    height: 100%;
  }
</style>
