<template>
  <div :class="[prefixCls, getLayoutContentMode]">
    <RouterView>
      <template #default="{ Component, route }">
        <transition
          :name="
            getTransitionName({
              route,
              openCache,
              enableTransition: getEnableTransition,
              cacheTabs: getCaches,
              def: getBasicTransition,
            })
          "
        >
          <KeepAlive>
            <component :is="Component" :key="route.fullPath" />
          </KeepAlive>
        </transition>
      </template>
    </RouterView>
  </div>
</template>

<script lang="ts" setup>
  import { computed, unref } from 'vue';
  import { useRootSetting } from '@/hooks/setting/useRootSetting';

  import { useTransitionSetting } from '@/hooks/setting/useTransitionSetting';
  import { useMultipleTabSetting } from '@/hooks/setting/useMultipleTabSetting';
  import { getTransitionName } from './transition';
  import { useDesign } from '@/hooks/web/useDesign';
  import { useMultipleTabStore } from '@/store/modules/multipleTab';

  defineOptions({ name: 'RouterViewContainer' });
  const { prefixCls } = useDesign('layout-content');
  const { getShowMultipleTab } = useMultipleTabSetting();
  const tabStore = useMultipleTabStore();

  const { getOpenKeepAlive, getLayoutContentMode } = useRootSetting();

  const { getBasicTransition, getEnableTransition } = useTransitionSetting();

  const openCache = computed(() => unref(getOpenKeepAlive) && unref(getShowMultipleTab));

  const getCaches = computed((): string[] => {
    if (!unref(getOpenKeepAlive)) {
      return [];
    }
    return tabStore.getCachedTabList;
  });
</script>
<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-layout-content';

  .@{prefix-cls} {
    display: flex;
    width: inherit;
    height: inherit;
    min-height: inherit;
    overflow: auto;
  }
</style>
