<template>
  <div>
    <Card title="修改密码" class="w-1/3 mx-auto" :bordered="false">
      <BasicForm @register="registerForm">
        <template #resetBefore="{}">
          <Button @click="handleLogout" class="mr-1">取消</Button>
        </template>
      </BasicForm>
    </Card>
  </div>
</template>
<script lang="ts" setup>
  import { Card, Button } from 'ant-design-vue';
  import { BasicForm, useForm } from '@/components/Form';
  import { useUserStoreWithOut } from '@/store/modules/user';
  import { setCasDoorUserPwd } from '@/api/oauth/users';
  import { passwordFormSchema } from '@/views/system/users/users.data';
  import { useMessage } from '@/hooks/web/useMessage';
  import { onMounted } from 'vue';

  const { createMessage } = useMessage();
  const userStore = useUserStoreWithOut();

  const [registerForm, { setFieldsValue, validate, setProps }] = useForm({
    labelWidth: 90,
    baseColProps: { span: 24 },
    actionColOptions: {
      span: 24,
    },
    schemas: passwordFormSchema,
    submitFunc,
    submitButtonOptions: {
      text: '提交',
    },
    showResetButton: false, // 重置按钮默认会清空表单，故自定义取消按钮
  });

  onMounted(() => {
    setFieldsValue({ userName: userStore.userInfo!.userAccount });
  });

  const { createConfirm } = useMessage();

  async function submitFunc() {
    const values = await validate();
    createConfirm({
      iconType: 'warning',
      content: '确认修改密码吗?',
      onOk: async () => {
        try {
          await setProps({ submitButtonOptions: { loading: true } });
          await setCasDoorUserPwd(values);
          createMessage.success('修改密码成功！将重新登录！');
          setTimeout(() => {
            userStore.logout(true);
          }, 2000);
        } catch (error) {
          await setProps({ submitButtonOptions: { loading: false } });
        }
      },
    });
  }

  function handleLogout() {
    createConfirm({
      iconType: 'warning',
      content: '取消修改密码将出系统，确认退出吗?',
      onOk: async () => {
        try {
          await setProps({ resetButtonOptions: { loading: true } });
          await userStore.logout(true);
        } catch (error) {
          await setProps({ resetButtonOptions: { loading: false } });
        }
      },
      onCancel: () => {},
    });
  }
</script>
