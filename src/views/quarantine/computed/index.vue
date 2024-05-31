<!--
 * @Descripttion:
 * @version:
 * @Author: zcc
 * @Date: 2024-01-26 14:02:36
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-31 18:00:27
-->
<template>
  <PageWrapper dense contentFullHeight fixedHeight class="p-16px">
    <div class="flex items-center justify-center h-full bg-white">
      <a-button @click="handleComputed" size="large" type="primary" :loading="loading"
        >检疫期计算
      </a-button>
    </div>
  </PageWrapper>
</template>
<script setup lang="ts">
  import { message } from 'ant-design-vue';
  import { PageWrapper } from '@/components/Page';
  import { submitComputed } from '@/api/quarantine/computed';
  import { ref } from 'vue';
  import { useMessage } from '@/hooks/web/useMessage';

  defineOptions({ name: 'Computed' });

  const loading = ref(false);

  const { createConfirm } = useMessage();

  function handleComputed() {
    createConfirm({
      iconType: 'warning',
      content: '确认触发检疫期计算?',
      onOk: async () => {
        try {
          loading.value = true;
          await submitComputed();
          message.success('触发成功');
        } finally {
          loading.value = false;
        }
      },
    });
  }
</script>
