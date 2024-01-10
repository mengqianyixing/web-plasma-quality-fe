<!--
 * @Descripttion: 
 * @version: 
 * @Author: zcc
 * @Date: 2024-01-02 13:43:33
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-06 15:56:21
-->
<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="projectName + '详情'"
    width="800px"
    @close="close"
    cancelText="关闭"
    :show-ok-btn="false"
  >
    <Tabs v-model:activeKey="activeKey" @change="change" class="h-full bg-white tabs" size="small">
      <TabPane key="1" tab="合格样品">
        <component
          :is="componentMap['1']"
          checkResult="合格"
          :projectId="pid"
          type="QUALIFIED"
          :bsNo="bsno"
        />
      </TabPane>
      <TabPane key="2" tab="不合格样品">
        <component
          :is="componentMap['2']"
          checkResult="不合格"
          :checkType="checkType"
          :projectId="pid"
          type="UNQUALIFIED"
          :bsNo="bsno"
        />
      </TabPane>
      <TabPane key="3" tab="未检测样品">
        <component
          :is="componentMap['3']"
          checkResult="未检测"
          :projectId="pid"
          type="TO_BE_TESTED"
          :bsNo="bsno"
        />
      </TabPane>
    </Tabs>
  </BasicDrawer>
</template>
<script setup lang="ts">
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { TabPane, Tabs } from 'ant-design-vue';
  import { ref, markRaw } from 'vue';
  import DtTable from './dtTable.vue';
  import { methodsMappding } from './data';

  const activeKey = ref('1');
  const pid = ref('');
  const bsno = ref('');
  const projectName = ref('');
  const checkType = ref('2');
  const componentMap = ref({
    1: 'div',
    2: 'div',
    3: 'div',
  });

  const [registerDrawer] = useDrawerInner(async ({ projectId, projectAbbr, bsNo, methodAbbr }) => {
    projectName.value = projectAbbr;
    pid.value = projectId;
    bsno.value = bsNo;
    checkType.value = methodsMappding[methodAbbr];
    componentMap.value['1'] = markRaw(DtTable as any);
  });
  function change(activeKey) {
    componentMap.value[activeKey] = markRaw(DtTable);
  }
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
