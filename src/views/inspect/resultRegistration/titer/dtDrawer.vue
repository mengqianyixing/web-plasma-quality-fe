<!--
 * @Descripttion: 
 * @version: 
 * @Author: zcc
 * @Date: 2023-12-29 15:36:12
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-12 18:04:14
-->
<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    showFooter
    :title="projectName + '详情'"
    :width="isFull ? '100%' : '800px'"
    :show-ok-btn="false"
    cancelText="关闭"
    :min-height="520"
    @ok="handleSubmit"
    @close="close"
  >
    <div class="flex h-inherit max-h-inherit min-h-inherit">
      <div class="flex-1 w-full">
        <Tabs
          v-model:activeKey="activeKey"
          @change="change"
          class="h-full bg-white tabs"
          size="small"
        >
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
          <TabPane key="3" tab="未检测样本">
            <component :is="componentMap['3']" :projectId="pid" :bsNo="bsno" type="TO_BE_TESTED" />
          </TabPane>
        </Tabs>
      </div>
    </div>
  </BasicModal>
</template>
<script setup lang="ts">
  import { BasicModal, useModalInner } from '@/components/Modal';
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
  const [registerModal] = useModalInner(async ({ projectId, bsNo, projectAbbr }) => {
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
