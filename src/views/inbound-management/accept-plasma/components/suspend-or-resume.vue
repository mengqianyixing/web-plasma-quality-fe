<template>
  <Modal
    v-bind="$attrs"
    v-on="$attrs"
    :open="true"
    @ok="hideModal"
    @cancel="hideModal"
    width="1400px"
    :footer="null"
    :title="`暂停${searchForm.pattern === 'BOX' ? '箱' : '批'}记录`"
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
        <FormItem v-if="searchForm.pattern === 'BOX'" label="血浆箱号" name="boxNo">
          <Input v-model:value="searchForm.boxNo" disabled />
        </FormItem>
        <FormItem v-if="searchForm.pattern === 'BCH'" label="复核人" name="checker">
          <Select v-model:value="searchForm.checker" allowClear disabled style="width: 180px">
            <SelectOption v-for="item in receiveManOpts" :key="item.value" :value="item.value">{{
              item.name
            }}</SelectOption>
          </Select>
          <Button @click="goRegister">登录</Button>
        </FormItem>
        <FormItem label="复核人" v-if="searchForm.pattern === 'BOX'" name="checker">
          <Input v-model:value="searchForm.checker" disabled />
        </FormItem>
        <FormItem label="备注" name="remark">
          <Textarea v-model:value="searchForm.remark" :cols="50" />
        </FormItem>
        <FormItem>
          <Button type="primary" @click="confirm" :loading="submitLoading">提交</Button>
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
        <template #title>
          <div style="text-align: right">
            <Button @click="clickResume" :loading="resumeLoading">继续</Button>
          </div>
        </template>
      </Table>
    </div>
  </Modal>
</template>

<script lang="ts" setup>
  import { ref, defineExpose } from 'vue';
  import {
    Modal,
    Form,
    FormItem,
    Input,
    Table,
    Textarea,
    Button,
    Select,
    SelectOption,
  } from 'ant-design-vue';
  import dayjs from 'dayjs';
  import {
    plasmaPauseBox,
    plasmaPauseBoxList,
    plasmaPauseBatch,
  } from '@/api/inbound-management/accept-plasma.ts';

  import { useMessage } from '@/hooks/web/useMessage';

  const { createMessage } = useMessage();
  const { success, warning } = createMessage;

  const emit = defineEmits(['close', 'goRegister', 'clearInfo']);
  // const props = defineProps({
  //   remark: String as PropType<any>,
  // });

  interface SearchForm {
    batchNo: string;
    boxNo?: string;
    remark: string;
    checker: string;
    pattern: string; // BOX/BCH
  }
  // 表单数据
  const searchForm = ref<SearchForm>({
    batchNo: '',
    boxNo: '',
    remark: '',
    checker: '',
    pattern: '',
  });

  const columns = ref([
    {
      title: '暂停时间',
      dataIndex: 'createAt',
      customRender: ({ text }) => {
        return dayjs(text).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    {
      title: '验收人',
      dataIndex: 'creater',
    },
    {
      title: '复核人',
      dataIndex: 'reviewer',
    },
    {
      title: '继续时间',
      dataIndex: 'freeAt',
      customRender: ({ text }) => {
        return dayjs(text).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    {
      title: '当前状态',
      dataIndex: 'state',
      customRender: ({ text }) => {
        return boxSuspendEnum[text];
      },
    },
  ]);

  let tableData = ref<any[]>([]);

  // 动态列
  const addCols = () => {
    if (searchForm.value.pattern === 'BCH') {
      columns.value.push(
        {
          title: '继续操作人',
          dataIndex: 'freedBy',
        },
        {
          title: '继续复核人',
          dataIndex: 'reviewBy',
        },
      );
    } else if (searchForm.value.pattern === 'BOX') {
      columns.value.push(
        {
          title: '血浆箱号',
          dataIndex: 'boxNo',
        },
        {
          title: '托盘编号',
          dataIndex: 'trayNo',
        },
        {
          title: '当前状态',
          dataIndex: 'state',
          customRender: ({ text }) => {
            return boxSuspendEnum[text];
          },
        },
      );
    }
  };

  const formRef = ref();
  const loading = ref(false);
  const submitLoading = ref(false);
  const resumeLoading = ref(false);
  const hideModal = () => {
    emit('close', false);
  };

  // 复核人登录备选项
  const receiveManOpts = ref([]);

  // 箱暂停状态枚举
  const boxSuspendEnum = {
    W: '未验收',
    R: '验收中',
    S: '已验收',
    P: '已暂停',
  };

  const goRegister = () => {
    emit('goRegister');
  };
  // 暂停
  const confirm = async () => {
    if (!searchForm.value.remark) {
      warning('请填写备注!');
      return;
    }
    if (searchForm.value.pattern === 'BOX') {
      try {
        const params = { ...searchForm.value, pauseType: 'PAUSE' };
        submitLoading.value = true;
        const data = await plasmaPauseBox(params);
        if (data === null) {
          success('提交成功!');
          emit('close', false);
          emit('clearInfo');
        }
      } finally {
        submitLoading.value = false;
      }
    } else if (searchForm.value.pattern === 'BCH') {
      try {
        const params = {
          batchNo: searchForm.value.batchNo,
          checker: searchForm.value.checker,
          remark: searchForm.value.remark,
          pauseType: 'PAUSE',
        };
        submitLoading.value = true;
        const data = await plasmaPauseBatch(params);
        if (data === null) {
          success('提交成功!');
          emit('close', false);
          emit('clearInfo');
        }
      } finally {
        submitLoading.value = false;
      }
    }
  };

  const getList = async () => {
    try {
      loading.value = true;
      const data = await plasmaPauseBoxList(
        searchForm.value.batchNo || null,
        searchForm.value.pattern,
      );
      if (data) {
        tableData.value = data;
        addCols();
      }
    } finally {
      loading.value = false;
    }
  };

  let tableSelected = ref<any[]>([]);
  const rowSelection: any['rowSelection'] = {
    type: 'radio',
    onChange: (selectedRowKeys: any[], selectedRows: any[]) => {
      tableSelected.value = selectedRows;
    },
  };
  // 继续
  const clickResume = async () => {
    if (!tableSelected.value.length) {
      warning('请先选择一条数据!');
      return;
    }
    const firstSelectedItem = tableSelected.value[0];
    console.log(firstSelectedItem);

    if (searchForm.value.pattern === 'BOX') {
      try {
        const params = {
          batchNo: searchForm.value.batchNo,
          boxNo: firstSelectedItem.boxNo,
          checker: searchForm.value.checker, // 传登录的复核人
          pauseType: 'RESTORE',
        };
        resumeLoading.value = true;
        const data = await plasmaPauseBox(params);
        if (data === null) {
          success('操作成功!');
          getList();
          tableSelected.value = [];
        }
      } finally {
        resumeLoading.value = false;
      }
    } else if (searchForm.value.pattern === 'BCH') {
      try {
        const params = {
          batchNo: searchForm.value.batchNo,
          checker: searchForm.value.checker, // 传登录的复核人
          pauseType: 'RESTORE',
        };
        resumeLoading.value = true;
        const data = await plasmaPauseBatch(params);
        if (data === null) {
          success('操作成功!');
          getList();
          tableSelected.value = [];
        }
      } finally {
        resumeLoading.value = false;
      }
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
