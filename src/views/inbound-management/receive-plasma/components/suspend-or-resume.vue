<template>
  <Modal
    v-bind="$attrs"
    v-on="$attrs"
    :open="true"
    @cancel="hideModal"
    @ok="confirm"
    okText="确认"
    width="350px"
    title="暂停批接收"
  >
    <div class="content">
      <Form :model="searchForm" :labelCol="{ style: { width: '70px' } }" ref="formRef">
        <FormItem label="血浆批号" name="batch">
          <Input v-model:value="searchForm.batch" disabled />
        </FormItem>
        <FormItem label="复核人" name="username" :rules="[{ required: true, message: '请输入' }]">
          <Select v-model:value="searchForm.username" allowClear disabled style="width: 180px">
            <SelectOption
              v-for="item in props.receiveManOpts"
              :key="item.value"
              :value="item.value"
              >{{ item.name }}</SelectOption
            >
          </Select>
          <Button @click="goRegister">登录</Button>
        </FormItem>
        <FormItem label="备注" name="remark" :rules="[{ required: true, message: '请输入' }]">
          <Textarea v-model:value="searchForm.remark" />
        </FormItem>
      </Form>
    </div>
  </Modal>
</template>

<script lang="ts" setup>
  import { ref, PropType } from 'vue';
  import {
    Modal,
    Form,
    FormItem,
    Input,
    Textarea,
    Button,
    Select,
    SelectOption,
  } from 'ant-design-vue';

  const emit = defineEmits(['close', 'goRegister']);
  const props = defineProps({
    receiveManOpts: Array as PropType<any>,
  });

  interface SearchForm {
    batch: string;
    username: string;
    remark: string;
  }

  // 表单数据
  const searchForm = ref<SearchForm>({
    batch: '',
    username: '',
    remark: '',
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

  const goRegister = () => {
    emit('goRegister');
  };
</script>
<style lang="less" scoped>
  .content {
    padding: 0 12px;
  }
</style>
