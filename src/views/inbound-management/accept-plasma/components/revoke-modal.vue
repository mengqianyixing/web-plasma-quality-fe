<template>
  <Modal
    v-bind="$attrs"
    v-on="$attrs"
    :open="true"
    @cancel="hideModal"
    :footer="false"
    width="500px"
    title="撤销验收"
  >
    <div class="content">
      <Form :model="searchForm">
        <FormItem label="复核人" name="checker" :rules="[{ required: true }]">
          <Input v-model:value="searchForm.checker" disabled style="width: 180px" />
          <Button @click="handleLogin">登录</Button>
        </FormItem>
        <FormItem label="原因" :rules="[{ required: true }]">
          <Textarea v-model:value="searchForm.remark" :cols="40" />
        </FormItem>
        <FormItem :wrapperCol="{ offset: 20 }">
          <Button type="primary" @click="confirm" :loading="loading">提交</Button>
        </FormItem>
      </Form>
    </div>
    <LoginModal @register="registerLoginModal" @success="handleSuccess" />
  </Modal>
</template>

<script lang="ts" setup>
  import { ref, defineExpose } from 'vue';
  import { Modal, Textarea, Form, FormItem, Button, Input } from 'ant-design-vue';
  import { useMessage } from '@/hooks/web/useMessage';
  import { plasmaRevokeBag } from '@/api/inbound-management/accept-plasma.js';
  import LoginModal from '@/__components/nonconformity-registration/LoginModal.vue';
  import { useModal } from '@/components/Modal';

  const { createMessage } = useMessage();
  const { success, warning } = createMessage;

  const emit = defineEmits(['close', 'query', 'goRegister']);

  const searchForm = ref({
    remark: '',
    checker: '',
  });

  const rowInfow = ref<any>({});

  const hideModal = () => {
    emit('close', false);
  };

  const loading = ref(false);

  const confirm = async () => {
    if (!searchForm.value.checker) {
      warning('请登录复核人!');
      return;
    }
    if (!searchForm.value.remark) {
      warning('请填写原因!');
      return;
    }

    try {
      const params = {
        batchNo: rowInfow.value.batchNo,
        boxNo: rowInfow.value.boxNo,
        bagNo: rowInfow.value.bagNo,
        trayNo: rowInfow.value.trayNo,
        checker: searchForm.value.checker,
        remark: searchForm.value.remark,
      };
      loading.value = true;
      const data = await plasmaRevokeBag(params);
      if (data === null) {
        success('撤销成功');
        emit('close', false);
        emit('query', rowInfow.value.batchNo);
      }
    } finally {
      loading.value = false;
    }
  };

  const [registerLoginModal, { openModal }] = useModal();

  // 点击登录按钮
  function handleLogin() {
    openModal(true);
  }

  // 登录成功事件
  function handleSuccess(nickname: string) {
    searchForm.value.checker = nickname;
  }

  defineExpose({
    searchForm,
    rowInfow,
  });
</script>
<style lang="less" scoped>
  .content {
    padding: 0 12px 12px;
  }
</style>
