<template>
  <BasicModal v-bind="$attrs" @register="registerModal" title="预览" width="400px">
    <img class="w-[350px]" :src="previewUrl" alt="" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';

  defineOptions({ name: 'HistoryStylePreviewModal' });

  const previewUrl = ref('');

  const [registerModal, { setModalProps }] = useModalInner(async (data) => {
    setModalProps({ confirmLoading: false });
    previewUrl.value = `data:image/png;base64,${data.record}`;
  });
</script>
