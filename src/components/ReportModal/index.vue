<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    showFooter
    title="报表预览"
    width="90%"
    defaultFullscreen
    wrapClassName="report-model "
    cancelText="关闭"
    okText="打印"
    @ok="handlePrint"
    :minHeight="480"
  >
    <div class="h-inherit max-h-inherit min-h-inherit">
      <iframe
        frameborder="0"
        class="min-h-inherit"
        width="100%"
        height="99%"
        scrolling="auto"
        :src="link"
        ref="iframeRef"
      ></iframe>
    </div>
  </BasicModal>
</template>

<script setup lang="ts">
  import { ref, defineEmits } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';

  defineOptions({ name: 'ReportModal' });
  defineEmits(['register']);

  const iframeRef = ref<HTMLIFrameElement>();
  const link = ref('');

  const [registerModal, { setModalProps }] = useModalInner(async (blobURL) => {
    link.value = blobURL;
    setModalProps({ defaultFullscreen: true });
  });

  function handlePrint() {
    iframeRef.value?.contentWindow?.print();
  }
</script>
