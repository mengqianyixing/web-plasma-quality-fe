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
      <TabPane v-if="getPermission(StoreButtonEnum.TrayRelocation)" key="1" tab="托盘移库">
        <TrayRelocation />
      </TabPane>
      <TabPane
        v-if="getPermission(StoreButtonEnum.TrayPlasmaBoxScanBind)"
        key="2"
        tab="血浆箱扫描绑定"
      >
        <PlasmaBoxScan :is-binding="true" />
      </TabPane>
      <TabPane
        v-if="getPermission(StoreButtonEnum.TrayPlasmaBoxScanUnbind)"
        key="3"
        tab="血浆箱扫描解绑"
      >
        <PlasmaBoxScan :is-binding="false" />
      </TabPane>
      <TabPane v-if="getPermission(StoreButtonEnum.TrayPlasmaBoxBind)" key="4" tab="血浆箱手工绑定">
        <PlasmaBoxHand :is-binding="true" />
      </TabPane>
      <TabPane
        v-if="getPermission(StoreButtonEnum.TrayPlasmaBoxUnbind)"
        key="5"
        tab="血浆箱手工解绑"
      >
        <PlasmaBoxHand :is-binding="false" />
      </TabPane>
      <TabPane
        v-if="getPermission(StoreButtonEnum.TraySampleBoxScanBind)"
        key="6"
        tab="样本箱扫描绑定"
      >
        <SampleBoxScan :is-binding="true" />
      </TabPane>
      <TabPane
        v-if="getPermission(StoreButtonEnum.TraySampleBoxScanUnbind)"
        key="7"
        tab="样本箱扫描解绑"
      >
        <SampleBoxScanUnbind :is-binding="false" />
      </TabPane>
      <TabPane v-if="getPermission(StoreButtonEnum.TraySampleBoxBind)" key="8" tab="样本箱手工绑定">
        <SampleBoxHand :is-binding="true" />
      </TabPane>
      <TabPane
        v-if="getPermission(StoreButtonEnum.TraySampleBoxUnbind)"
        key="9"
        tab="样本箱手工解绑"
      >
        <SampleBoxHand :is-binding="false" />
      </TabPane>
    </Tabs>
  </PageWrapper>
</template>
<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  import { PageWrapper } from '@/components/Page';
  import { TabPane, Tabs } from 'ant-design-vue';
  import TrayRelocation from './trayRelocation.vue';
  import PlasmaBoxScan from './plasmaBoxScan.vue';
  import PlasmaBoxHand from './plasmaBoxHand.vue';
  import SampleBoxScan from './sampleBoxScan.vue';
  import SampleBoxScanUnbind from './sampleBoxScanUnbind.vue';
  import SampleBoxHand from './sampleBoxHand.vue';
  import { StoreButtonEnum } from '@/enums/authCodeEnum';
  import { useUserStoreWithOut } from '@/store/modules/user';

  defineOptions({ name: 'TrayRelocation' });

  const userStore = useUserStoreWithOut();
  const menuIds = userStore.getUserInfo.menuIds || [];
  const activeKey = ref('1');
  const getPermission = computed(() => (code: string) => menuIds.includes(code));
  const authCode = [
    StoreButtonEnum.TrayRelocation,
    StoreButtonEnum.TrayPlasmaBoxScanBind,
    StoreButtonEnum.TrayPlasmaBoxScanUnbind,
    StoreButtonEnum.TrayPlasmaBoxBind,
    StoreButtonEnum.TrayPlasmaBoxUnbind,
    StoreButtonEnum.TraySampleBoxScanBind,
    StoreButtonEnum.TraySampleBoxScanUnbind,
    StoreButtonEnum.TraySampleBoxBind,
    StoreButtonEnum.TraySampleBoxUnbind,
  ];
  onMounted(() => {
    const index = authCode.findIndex((code) => getPermission.value(code));
    activeKey.value = (index + 1).toString();
  });
</script>
