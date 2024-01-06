<template>
  <Modal
    v-bind="$attrs"
    v-on="$attrs"
    :open="true"
    @ok="hideModal"
    @cancel="hideModal"
    width="1400px"
    title="暂停记录"
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
        <FormItem label="复核人" name="checker">
          <Input v-model:value="searchForm.checker" disabled style="width: 180px" />
          <Button @click="goRegister">登录</Button>
        </FormItem>
        <FormItem label="备注" name="remark">
          <Textarea v-model:value="searchForm.remark" :cols="50" />
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            @click="confirm"
            :loading="submitLoading"
            style="margin-right: 10px"
            >暂停</Button
          >
          <Button @click="clickResume" :loading="resumeLoading">继续</Button>
        </FormItem>
      </Form>
      <Table
        :columns="columns"
        :data-source="tableData"
        bordered
        :pagination="false"
        :row-selection="rowSelection"
        :loading="loading"
        style="margin-top: 12px"
        :scroll="{ y: 350 }"
        row-key="bpId"
      >
        <!-- <template #title>
          <div style="text-align: right">
            <Button @click="clickResume" :loading="resumeLoading">继续</Button>
          </div>
        </template> -->
      </Table>
    </div>
  </Modal>
</template>

<script lang="ts" setup>
  import { ref, PropType, defineExpose } from 'vue';
  import {
    Modal,
    Form,
    FormItem,
    Input,
    Table,
    Textarea,
    Button,
    // Select,
    // SelectOption,
  } from 'ant-design-vue';
  import dayjs from 'dayjs';
  import { receivePause } from '@/api/inbound-management/receive-plasma';
  import { plasmaPauseBoxList } from '@/api/inbound-management/accept-plasma';
  import { useMessage } from '@/hooks/web/useMessage';

  const { createMessage } = useMessage();
  const { success, warning } = createMessage;

  const emit = defineEmits(['close', 'goRegister', 'clearInfo', 'refresh-data']);
  const props = defineProps({
    batchNo: String as PropType<any>,
  });

  interface SearchForm {
    batchNo: string;
    checker: string;
    remark: string;
    pattern: string; // BOX/BCH
  }

  // 表单数据
  const searchForm = ref<SearchForm>({
    batchNo: '',
    checker: '',
    remark: '',
    pattern: 'BCH',
  });

  searchForm.value.batchNo = props.batchNo;

  const columns = [
    {
      title: '验收人',
      dataIndex: 'creater',
    },
    {
      title: '复核人',
      dataIndex: 'reviewer',
    },
    {
      title: '暂停操作时间',
      dataIndex: 'createAt',
      customRender: ({ text }) => {
        if (text) {
          return dayjs(text).format('YYYY-MM-DD HH:mm:ss');
        }
        return '';
      },
    },
    {
      title: '继续操作时间',
      dataIndex: 'freeAt',
      customRender: ({ text }) => {
        if (text) {
          return dayjs(text).format('YYYY-MM-DD HH:mm:ss');
        }
        return '';
      },
    },
    {
      title: '继续操作人',
      dataIndex: 'freedBy',
    },
    {
      title: '继续复核人',
      dataIndex: 'reviewBy',
    },
  ];
  let tableData = ref<any[]>([]);

  const formRef = ref();
  const loading = ref(false);
  const submitLoading = ref(false);
  const resumeLoading = ref(false);

  const hideModal = () => {
    emit('close', false);
  };

  const goRegister = () => {
    emit('goRegister');
  };

  const getList = async () => {
    try {
      loading.value = true;
      const data = await plasmaPauseBoxList(searchForm.value.batchNo || null, 'BCH', 'ACC');
      if (data) {
        tableData.value = data;
      }
    } finally {
      loading.value = false;
    }
  };
  // 暂停
  const confirm = async () => {
    if (!searchForm.value.checker) {
      warning('请登录复核人');
      return;
    }
    if (!searchForm.value.remark) {
      warning('请填写备注!');
      return;
    }
    try {
      const params = {
        batchNo: searchForm.value.batchNo,
        checker: searchForm.value.checker,
        remark: searchForm.value.remark,
        state: 'PAUSE',
        type: 'ACC',
      };
      submitLoading.value = true;
      const data = await receivePause(params);
      if (data === null) {
        success('提交成功!');
        emit('close', false);
        emit('clearInfo');
      }
    } finally {
      submitLoading.value = false;
    }
  };

  let tableSelected = ref<any[]>([]);
  const rowSelection: any['rowSelection'] = {
    type: 'radio',
    onChange: (selectedRowKeys: any[], selectedRows: any[]) => {
      tableSelected.value = selectedRows;
    },
    getCheckboxProps: (record: any) => ({
      disabled: !!record.freedBy,
      // searchForm.value.pattern == 'BCH'
      //   ? !!record.freedBy
      //   : searchForm.value.pattern == 'BOX'
      //     ? boxSuspendEnum[record.state] != '已暂停'
      //     : undefined,
    }),
  };
  // 继续
  const clickResume = async () => {
    if (!tableSelected.value.length) {
      warning('请先选择一条数据!');
      return;
    }
    if (!searchForm.value.checker) {
      warning('请登录复核人');
      return;
    }
    try {
      const params = {
        batchNo: searchForm.value.batchNo,
        checker: searchForm.value.checker,
        state: 'RESTORE',
        type: 'ACC',
      };
      resumeLoading.value = true;
      const data = await receivePause(params);
      if (data === null) {
        success('操作成功!');
        getList();
        tableSelected.value = [];
      }
    } finally {
      resumeLoading.value = false;
      // emit('refresh-data');
      hideModal();
    }
  };

  defineExpose({
    searchForm,
    getList,
  });
</script>
<style lang="less" scoped>
  .content {
    padding: 12px;
  }
</style>
