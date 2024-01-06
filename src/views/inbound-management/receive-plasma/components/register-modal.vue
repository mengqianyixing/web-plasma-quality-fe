<template>
  <Modal
    v-bind="$attrs"
    v-on="$attrs"
    :open="true"
    @cancel="hideModal"
    @ok="confirm"
    okText="登录"
    width="350px"
    title="复核人登录"
  >
    <div class="content">
      <Form :model="searchForm" :labelCol="{ style: { width: '70px' } }" ref="formRef">
        <FormItem
          label="用户名"
          name="username"
          :rules="[{ required: true, message: '请输入用户名' }]"
        >
          <Input v-model:value="searchForm.username" />
        </FormItem>
        <FormItem label="密码" name="password" :rules="[{ required: true, message: '请输入密码' }]">
          <InputPassword v-model:value="searchForm.password" />
        </FormItem>
      </Form>
    </div>
    <template #footer>
      <Button @click="hideModal">取消</Button>
      <Button type="primary" :loading="loading" @click="confirm">登录</Button>
    </template>
  </Modal>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { Modal, Form, FormItem, Input, InputPassword, Button } from 'ant-design-vue';
  import { reCheckLogin } from '@/api/sys/login';
  import { useUserStore } from '@/store/modules/user';
  import { useMessage } from '@/hooks/web/useMessage';

  const { createMessage } = useMessage();
  const { warning } = createMessage;

  const emit = defineEmits(['close', 'login-data']);

  interface SearchForm {
    username: string;
    password: string;
  }

  // 表单数据
  const searchForm = ref<SearchForm>({
    username: '',
    password: '',
  });

  const formRef = ref();
  const loading = ref(false);
  const userInfo = useUserStore();

  const confirm = () => {
    formRef.value
      .validate()
      .then(async () => {
        try {
          loading.value = true;
          await reCheckLogin({
            account: searchForm.value.username,
            password: searchForm.value.password,
          }).then((res: any) => {
            if (res.username === userInfo.getUserInfo.username) {
              warning('复核人不能与当前登录人相同');
              return;
            } else {
              emit('login-data', res);
              hideModal();
            }
          });
        } finally {
          loading.value = false;
        }
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  const hideModal = () => {
    emit('close', false);
  };
</script>
<style lang="less" scoped>
  .content {
    padding: 0 12px;
  }
</style>
