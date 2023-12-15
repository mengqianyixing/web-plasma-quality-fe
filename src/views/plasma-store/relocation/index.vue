<template>
  <div class="h-full p-16px">
    <Tabs v-model:activeKey="activeKey" class="h-full bg-white">
      <TabPane key="1" tab="血浆托盘出库">
        <PlasmaTray />
      </TabPane>
      <TabPane key="2" tab="样品托盘出库"><SampleTray /></TabPane>
      <TabPane key="3" tab="空托盘出库"><EmpryTray /></TabPane>
      <TabPane key="4" tab="托盘入库"><TrayInStore /></TabPane>
      <TabPane key="5" tab="托盘打印"><TrayPrint /></TabPane>
    </Tabs>
  </div>
</template>
<script setup lang="ts">
  import { ref } from 'vue';
  import { TabPane, Tabs } from 'ant-design-vue';
  import PlasmaTray from './plasmaTray.vue';
  import SampleTray from './sampleTray.vue';
  import EmpryTray from './emptyTray.vue';
  import TrayInStore from './trayInStore.vue';
  import TrayPrint from './trayPrint.vue';

  const activeKey = ref('1');
</script>
