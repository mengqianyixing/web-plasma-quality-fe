<!--
 * @Descripttion: 
 * @version: 
 * @Author: zcc
 * @Date: 2024-01-02 13:43:33
 * @LastEditors: zcc
 * @LastEditTime: 2024-02-01 16:16:19
-->
<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    showFooter
    :title="projectName + '详情'"
    width="800px"
    @cancel="close"
    :min-height="520"
    cancelText="关闭"
    :show-ok-btn="false"
  >
    <div class="flex h-inherit max-h-inherit min-h-inherit">
      <div class="flex-1 w-full">
        <Tabs
          v-model:activeKey="activeKey"
          @change="change"
          class="h-full bg-white tabs"
          type="card"
          size="small"
        >
          <TabPane key="1" tab="合格样本">
            <component
              :is="componentMap['1']"
              checkResult="合格"
              :projectId="pid"
              type="QUALIFIED"
              :bsNo="bsno"
            />
          </TabPane>
          <TabPane key="2" tab="不合格样本">
            <component
              :is="componentMap['2']"
              checkResult="不合格"
              :checkType="checkType"
              :projectId="pid"
              type="UNQUALIFIED"
              :bsNo="bsno"
            />
          </TabPane>
          <TabPane key="3" tab="未检测样本">
            <component
              :is="componentMap['3']"
              checkResult="未检测"
              :projectId="pid"
              type="TO_BE_TESTED"
              :bsNo="bsno"
            />
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
  import { methodsMappding } from './data';

  const emit = defineEmits(['close', 'confirm']);

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

  const [registerModal] = useModalInner(async ({ projectId, projectAbbr, bsNo, methodAbbr }) => {
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
    emit('close');
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
