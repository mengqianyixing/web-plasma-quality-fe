<template>
  <Modal
    v-bind="$attrs"
    v-on="$attrs"
    :open="true"
    @ok="confirm"
    @cancel="hideModal"
    width="950px"
    :title="props.modalTitle"
  >
    <div class="content">
      <Form
        :model="searchForm"
        layout="inline"
        :labelCol="{ style: { width: '70px' } }"
        ref="formRef"
      >
        <FormItem label="复核人" name="username" :rules="[{ required: true, message: '请输入' }]">
          <Select v-model:value="searchForm.username" allowClear disabled style="width: 180px">
            <SelectOption v-for="item in receiveManOpts" :key="item.value" :value="item.value">{{
              item.name
            }}</SelectOption>
          </Select>
          <Button @click="goRegister">登录</Button>
        </FormItem>
        <FormItem
          label="不合格项目"
          name="unqualified"
          :rules="[{ required: true, message: '请选择' }]"
        >
          <Select v-model:value="searchForm.unqualified" allowClear disabled style="width: 180px">
            <SelectOption v-for="item in unqualifiedOpts" :key="item.value" :value="item.value">{{
              item.name
            }}</SelectOption>
          </Select>
        </FormItem>
        <FormItem label="血浆编号" name="plasmaNo">
          <Input v-model:value="searchForm.plasmaNo" disabled />
        </FormItem>
        <FormItem label="备注" name="remark" :rules="[{ required: true, message: '请输入' }]">
          <Textarea v-model:value="searchForm.remark" />
        </FormItem>
      </Form>
    </div>
  </Modal>
</template>

<script lang="ts" setup>
  import { ref, withDefaults } from 'vue';
  import {
    Modal,
    Form,
    FormItem,
    Input,
    // Textarea,
    Button,
    Select,
    SelectOption,
  } from 'ant-design-vue';
  // import dayjs from 'dayjs';
  // import { useMessage } from '@/hooks/web/useMessage';

  // const { createMessage } = useMessage();
  // const { success } = createMessage;

  const emit = defineEmits(['close', 'goRegister']);

  interface Props {
    modalTitle?: string; // 弹框标题
  }
  const props = withDefaults(defineProps<Props>(), {
    modalTitle: '不合格登记', // 不合格登记、不合格样品登记、缺号登记
  });

  interface SearchForm {
    plasmaNo?: string;
    unqualified?: string;
    username: string;
    remark?: string;
  }

  // 表单数据
  const searchForm = ref<SearchForm>({
    plasmaNo: '',
    username: '',
    remark: '',
  });

  const receiveManOpts = ref([]);
  const unqualifiedOpts = ref([]);

  const formRef = ref();

  const hideModal = () => {
    emit('close', false);
  };

  const goRegister = () => {
    emit('goRegister');
  };

  const confirm = async () => {};
</script>
<style lang="less" scoped>
  .content {
    padding: 12px;
  }
</style>
