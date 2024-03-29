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
    <template #footer>
      <a-button @click="closeModal">取消</a-button>
      <a-button type="primary" @click="handleDownload" v-if="downloadFileName">下载</a-button>
      <a-button type="primary" @click="handlePrint">打印</a-button>
    </template>
    <div class="h-inherit max-h-inherit min-h-inherit">
      <iframe
        frameborder="0"
        class="min-h-inherit"
        width="100%"
        height="99%"
        scrolling="auto"
        :src="link + '#toolbar=0'"
        ref="iframeRef"
      ></iframe>
    </div>
  </BasicModal>
</template>

<script setup lang="ts">
  import { ref, defineEmits } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { updateReportPrintApi } from '@/api/report';

  defineOptions({ name: 'ReportModal' });
  defineEmits(['register']);

  const iframeRef = ref<HTMLIFrameElement>();
  const link = ref('');
  const downloadFileName = ref('');

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (blobHelper) => {
    if (typeof blobHelper !== 'string' && Reflect.has(blobHelper, 'downloadFileName')) {
      downloadFileName.value = blobHelper.downloadFileName;
      link.value = blobHelper.blob;
    } else {
      link.value = blobHelper;
    }
    setModalProps({ defaultFullscreen: true });
  });

  function handlePrint() {
    iframeRef.value?.contentWindow?.print();
    updateReportPrintApi();
  }

  function handleDownload() {
    const a = document.createElement('a');
    a.href = link.value;
    a.download = downloadFileName.value;
    a.click();
  }
</script>
