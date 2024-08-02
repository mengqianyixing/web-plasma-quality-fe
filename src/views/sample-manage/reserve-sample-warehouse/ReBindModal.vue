<template>
  <BasicModal
    @register="registerReBindModal"
    showFooter
    :title="'托盘重绑'"
    width="360px"
    @ok="okFunction"
    @cancel="emit('close')"
  >
    <div class="form">
      <div class="form-item">
        <span class="form-label">托盘编号</span>
        <ScanInput
          :value="formData.trayNo"
          @enter="_submit"
          @keyup="handleKeyUp"
          size="lg"
          ref="trayRef"
          @scan-change="(code) => (formData.trayNo = code)"
        />
      </div>
      <div class="form-item">
        <span class="form-label">箱号</span>
        <ScanInput
          :value="formData.boxId"
          @enter="_submit"
          size="lg"
          ref="boxRef"
          @keyup="handleKeyUp"
          @scan-change="(code) => (formData.boxId = code)"
        /> </div
    ></div>
  </BasicModal>
</template>

<script setup lang="ts">
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { message } from 'ant-design-vue';
  import { bindVerifyBoxApi } from '@/api/tray/relocation';
  import ScanInput from '@/components/Form/src/components/ScanInput.vue';
  import { debounce } from 'lodash-es';
  import { ref, reactive } from 'vue';

  const emit = defineEmits(['register', 'close']);

  const formData = reactive({
    trayNo: '',
    boxId: '',
  });
  const boxRef = ref();
  const trayRef = ref();
  const [registerReBindModal, { setModalProps }] = useModalInner(() => {
    setModalProps({ confirmLoading: false });
    formData.boxId = '';
    formData.trayNo = '';
    trayRef.value.$el.focus();
  });

  async function okFunction() {
    await _submit();
  }

  const _submit = debounce(submit, 200);
  function handleKeyUp(e) {
    if (e.key === 'Enter') {
      _submit();
    }
  }
  async function submit() {
    const { boxId, trayNo } = formData;
    if (trayNo && !boxId) boxRef.value.$el.focus();
    if (!boxId || !trayNo) return message.warning('请扫描' + (boxId ? '托盘' : '箱号'));
    await bindVerifyBoxApi({ boxes: [boxId], trayNo, type: 'bind' });
    formData.boxId = '';
    message.success('操作成功');
  }
</script>

<style scoped lang="scss">
  .form-item {
    display: flex;
    align-items: center;
    width: 100%;
    margin-bottom: 15px;

    .form-label {
      width: 100px;
      margin-right: 10px;
      font-size: 16px;
      text-align: right;
    }
  }
</style>
