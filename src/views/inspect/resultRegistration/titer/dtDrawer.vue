<!--
 * @Descripttion: 
 * @version: 
 * @Author: zcc
 * @Date: 2023-12-29 15:36:12
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-15 10:35:26
-->
<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    showFooter
    :title="projectName + '详情'"
    width="1000px"
    :show-ok-btn="false"
    cancelText="关闭"
    :min-height="520"
    @ok="handleSubmit"
    @cancel="close"
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
          <TabPane key="1" tab="尚未有效价结果">
            <component :is="componentMap['1']" :projectId="pid" :bsNo="bsno" type="INVALID_PRICE" />
          </TabPane>
          <TabPane key="2" tab="已有效价结果">
            <component
              :is="componentMap['2']"
              checkResult="true"
              :projectId="pid"
              type="EFFECTIVE_PRICE"
              :plasmaType="plasmaType"
              :pv="pv"
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

  const activeKey = ref('1');
  const pid = ref('');
  const bsno = ref('');
  const projectName = ref('');
  const plasmaType = ref('');
  const pv = ref(0);
  const componentMap = ref({
    1: 'div',
    2: 'div',
    3: 'div',
  });
  const [registerModal] = useModalInner(async (data) => {
    pv.value = data.priceValidBit;
    pid.value = data.projectId;
    bsno.value = data.bsNo;
    projectName.value = data.projectAbbr;
    plasmaType.value = data.plasmaType;
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
