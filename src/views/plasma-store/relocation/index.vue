<template>
  <div class="h-full p-16px">
    <Tabs v-model:activeKey="activeKey" class="h-full bg-white">
      <TabPane key="1" tab="血浆托盘出库">Content of Tab Pane 1</TabPane>
      <TabPane key="2" tab="样品托盘出库" force-render>Content of Tab Pane 2</TabPane>
      <TabPane key="3" tab="空托盘出库">Content of Tab Pane 3</TabPane>
      <TabPane key="4" tab="托盘入库">Content of Tab Pane 3</TabPane>
      <TabPane key="5" tab="托盘打印">Content of Tab Pane 3</TabPane>
      <TabPane key="6" tab="托盘补打印">Content of Tab Pane 3</TabPane>
    </Tabs>
  </div>
</template>
<script setup lang="ts">
  import { ref } from 'vue';
  import { TabPane, Tabs } from 'ant-design-vue';

  const activeKey = ref('1');
</script>
