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
  </Modal>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { Modal, Form, FormItem, Input, InputPassword } from 'ant-design-vue';

  const emit = defineEmits(['close']);

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

  const confirm = () => {
    formRef.value
      .validate()
      .then(() => {
        console.log('校验通过！！');
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
