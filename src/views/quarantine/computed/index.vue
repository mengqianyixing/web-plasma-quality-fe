<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <div class="flex items-center justify-center h-full">
      <a-button @click="handleComputed" size="large" type="primary">检疫期计算</a-button>
    </div>
  </PageWrapper>
</template>
<script setup lang="ts">
  import { Modal } from 'ant-design-vue';
  import { PageWrapper } from '@/components/Page';

  function handleComputed() {
    Modal.confirm({
      content: '确认触发检疫期计算?',
      onOk: async () => {},
      onCancel: () => Modal.destroyAll(),
    });
  }
</script>
