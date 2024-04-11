<template>
  <component :is="currentComponent" />
</template>

<script setup lang="ts">
  import Box from '@/views/inbound-management/receive-plasma/receive-box.vue';
  import Batch from '@/views/inbound-management/receive-plasma/receive-batch.vue';
  import { getSysParamsByParamKey } from '@/api/systemServer/params';
  import { SysParamsEnum } from '@/enums/sysParamsEnum';
  import { plasmaReceiveModeEnum } from '@/enums/plasmaEnum';
  import { ref, onMounted } from 'vue';

  const mode = ref('BOX');
  const currentComponent = ref<typeof Box | typeof Batch | null>(null);
  onMounted(async () => {
    await getSysParamsByParamKey(SysParamsEnum.PlasmaReceivePattern).then((res) => {
      mode.value = res;
      currentComponent.value = mode.value === plasmaReceiveModeEnum.BOX ? Box : Batch;
    });
  });
</script>
