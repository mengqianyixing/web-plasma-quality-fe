<template>
  <Modal
    v-bind="$attrs"
    v-on="$attrs"
    :open="true"
    @ok="hideModal"
    @cancel="hideModal"
    width="950px"
    title="接收单"
  >
    <div class="content">
      <Form
        :model="searchForm"
        layout="inline"
        :labelCol="{ style: { width: '70px' } }"
        ref="formRef"
      >
        <FormItem label="血浆批号" name="batchNo">
          <Input v-model:value="searchForm.batchNo" disabled />
        </FormItem>
        <FormItem>
          <Button type="primary" @click="confirm" :loading="submitLoading">提交</Button>
        </FormItem>
        <!-- <FormItem label="复核人" name="username" :rules="[{ required: true, message: '请输入' }]">
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
        </FormItem> -->
      </Form>
      <Table
        :columns="columns"
        :data-source="tableData"
        bordered
        :pagination="false"
        :loading="loading"
        style="margin-top: 12px"
        :scroll="{ y: 350 }"
      />
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
    Table,
    // Textarea,
    Button,
    // Select,
    // SelectOption,
  } from 'ant-design-vue';
  import dayjs from 'dayjs';
  import {
    commitAcceptation,
    getAcceptationList,
  } from '@/api/inbound-management/receive-plasma.ts';
  import { useMessage } from '@/hooks/web/useMessage';

  const { createMessage } = useMessage();
  const { success } = createMessage;

  const emit = defineEmits(['close', 'goRegister']);
  const props = defineProps({
    batchNo: String as PropType<any>,
  });

  interface SearchForm {
    batchNo: string;
    // username: string;
    // remark: string;
  }

  // 表单数据
  const searchForm = ref<SearchForm>({
    batchNo: '',
    // username: '',
    // remark: '',
  });

  searchForm.value.batchNo = props.batchNo;

  const columns = [
    {
      title: '接收人',
      dataIndex: 'operator',
    },
    {
      title: '复核人',
      dataIndex: 'checker',
    },
    {
      title: '创建时间',
      dataIndex: 'createAt',
      customRender: ({ text }) => {
        if (text) {
          return dayjs(text).format('YYYY-MM-DD HH:mm:ss');
        }
        return '';
      },
    },
    {
      title: '提交时间',
      dataIndex: 'commitAt',
      customRender: ({ text }) => {
        if (text) {
          return dayjs(text).format('YYYY-MM-DD HH:mm:ss');
        }
        return '';
      },
    },
    {
      title: '接收箱数',
      dataIndex: 'boxCount',
    },
  ];
  let tableData = ref<any[]>([]);

  const formRef = ref();
  const loading = ref(false);
  const submitLoading = ref(false);

  const hideModal = () => {
    emit('close', false);
  };

  // const goRegister = () => {
  //   emit('goRegister');
  // };

  const confirm = async () => {
    try {
      submitLoading.value = true;
      const data = await commitAcceptation(searchForm.value.batchNo);
      if (data === null) {
        success('提交成功!');
        getList();
      }
    } finally {
      submitLoading.value = false;
    }
  };

  const getList = async () => {
    try {
      loading.value = true;
      const data = await getAcceptationList(searchForm.value.batchNo);
      if (data) {
        tableData.value = data;
      }
    } finally {
      loading.value = false;
    }
  };
  getList();
</script>
<style lang="less" scoped>
  .content {
    padding: 12px;
  }
</style>
