<!--
 * @Descripttion:
 * @version:
 * @Author: zcc
 * @Date: 2023-12-15 17:42:17
 * @LastEditors: zcc
 * @LastEditTime: 2024-02-01 16:13:13
-->
<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <Tabs v-model:activeKey="activeKey" class="h-full bg-white m-16px" type="card" size="small">
      <TabPane key="1" tab="托盘移库">
        <TrayRelocation />
      </TabPane>
      <TabPane key="2" tab="血浆箱扫描绑定">
        <PlasmaBoxScan :is-binding="true" />
      </TabPane>
      <TabPane key="3" tab="血浆箱扫描解绑">
        <PlasmaBoxScan :is-binding="false" />
      </TabPane>
      <TabPane key="4" tab="血浆箱手工绑定">
        <PlasmaBoxHand :is-binding="true" />
      </TabPane>
      <TabPane key="5" tab="血浆箱手工解绑">
        <PlasmaBoxHand :is-binding="false" />
      </TabPane>
      <TabPane key="6" tab="样本箱扫描绑定"> <SampleBoxScan :is-binding="true" /></TabPane>
      <TabPane key="7" tab="样本箱扫描解绑">
        <SampleBoxScan :is-binding="false" />
      </TabPane>
      <TabPane key="8" tab="样本箱手工绑定">
        <SampleBoxHand :is-binding="true" />
      </TabPane>
      <TabPane key="9" tab="样本箱手工解绑">
        <SampleBoxHand :is-binding="false" />
      </TabPane>
    </Tabs>
  </PageWrapper>
</template>
<script setup lang="ts">
  import { ref } from 'vue';
  import { PageWrapper } from '@/components/Page';
  import { TabPane, Tabs } from 'ant-design-vue';
  import TrayRelocation from './trayRelocation.vue';
  import PlasmaBoxScan from './plasmaBoxScan.vue';
  import PlasmaBoxHand from './plasmaBoxHand.vue';
  import SampleBoxScan from './sampleBoxScan.vue';
  import SampleBoxHand from './sampleBoxHand.vue';

  defineOptions({ name: 'TrayRelocation' });

  const activeKey = ref('1');
</script>
