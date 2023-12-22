<template>
  <Modal
    v-bind="$attrs"
    v-on="$attrs"
    :open="true"
    @cancel="hideModal"
    @ok="confirm"
    width="1300px"
    title="选择批号"
  >
    <div class="content">
      <Form layout="inline" :model="searchForm" style="margin-bottom: 16px">
        <FormItem label="采浆公司">
          <Select
            v-model:value="searchForm.stationNo"
            allowClear
            style="width: 180px"
            placeholder="请选择"
          >
            <SelectOption
              v-for="item in companyOpts"
              :key="item.stationNo"
              :value="item.stationNo"
              >{{ item.stationName }}</SelectOption
            >
          </Select>
        </FormItem>
        <FormItem label="血浆批次">
          <Input v-model:value="searchForm.batchNo" placeholder="请输入" style="width: 180px" />
        </FormItem>
        <FormItem label="接收状态">
          <Select
            v-model:value="searchForm.acceptState"
            allowClear
            style="width: 180px"
            placeholder="请选择"
          >
            <SelectOption v-for="item in receiveOpts" :key="item.code" :value="item.code">{{
              item.name
            }}</SelectOption>
          </Select>
        </FormItem>
        <FormItem label="验收状态">
          <Select
            v-model:value="searchForm.verifyState"
            allowClear
            style="width: 180px"
            placeholder="请选择"
          >
            <SelectOption v-for="item in checkOpts" :key="item.code" :value="item.code">{{
              item.name
            }}</SelectOption>
          </Select>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="queryTable">查询</Button>
        </FormItem>
        <FormItem>
          <Button>重置</Button>
        </FormItem>
      </Form>
      <Table
        :columns="columns"
        :data-source="tableData"
        :row-selection="rowSelection"
        bordered
        :pagination="pagination"
      />
    </div>
  </Modal>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import {
    Modal,
    Button,
    Select,
    SelectOption,
    Form,
    FormItem,
    Input,
    Table,
    TableProps,
  } from 'ant-design-vue';
  import dayjs from 'dayjs';
  import { getBatchSummary } from '@/api/inbound-management/receive-plasma';
  import { useMessage } from '@/hooks/web/useMessage';

  const { createMessage } = useMessage();
  const { warning } = createMessage;

  const emit = defineEmits(['close', 'confirm']);

  // 表单数据
  const searchForm = ref({
    stationNo: '',
    batchNo: '',
    acceptState: '',
    verifyState: '',
  });
  // 采浆公司备选项
  const companyOpts = ref([
    {
      stationNo: 1,
      stationName: '分宜',
    },
    {
      stationNo: 2,
      stationName: '惠州',
    },
  ]);

  // 接收状态备选项
  const receiveOpts = ref([
    {
      code: 'W',
      name: '等待',
    },
    {
      code: 'R',
      name: '操作中',
    },
    {
      code: 'S',
      name: '成功',
    },
  ]);
  // 验收状态备选项
  const checkOpts = ref([
    {
      code: 'W',
      name: '等待',
    },
    {
      code: 'R',
      name: '操作中',
    },
    {
      code: 'S',
      name: '成功',
    },
  ]);

  const hideModal = () => {
    emit('close', false);
  };
  const confirm = () => {
    if (!tableSelected.value.length) {
      warning('请先选择一条数据!');
      return;
    }
    const firstSelectedItem = tableSelected.value[0];
    if (firstSelectedItem && 'batchNo' in firstSelectedItem) {
      emit('confirm', firstSelectedItem.batchNo);
    }
  };

  const columns = [
    {
      title: '采浆公司',
      dataIndex: 'stationName',
    },
    {
      title: '血浆批次',
      dataIndex: 'batchNo',
    },
    {
      title: '接收状态',
      dataIndex: 'acceptState',
    },
    {
      title: '验收状态',
      dataIndex: 'verifyState',
    },
    {
      title: '血浆数量',
      dataIndex: 'plasmaCount',
    },
    {
      title: '血浆箱数',
      dataIndex: 'boxCount',
    },
    {
      title: '出库日期',
      dataIndex: 'optTime',
      customRender: ({ text }) => {
        return dayjs(text).format('YYYY-MM-DD');
      },
    },
    {
      title: '出库人',
      dataIndex: 'depositor',
    },
  ];
  let tableData = ref<any[]>([]);

  const pagination = ref({
    pageSize: 10,
    current: 1,
    total: 0,
  });

  interface DataType {
    id: string;
    company: string;
    batch: string;
    acceptState: string;
    verifyState: string;
    count: string;
    boxCount: string;
    date: string;
    man: string;
  }
  let tableSelected = ref<DataType[]>([]);
  const rowSelection: TableProps['rowSelection'] = {
    type: 'radio',
    onChange: (selectedRowKeys: any[], selectedRows: any[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      tableSelected.value = selectedRows;
    },
  };
  // 查询列表数据
  const queryTable = async () => {
    const params = { ...searchForm.value, ...pagination.value };
    const res = await getBatchSummary(params);
    pagination.value.total = res.totalCount;
    pagination.value.pageSize = res.pageSize;
    tableData.value = res.result;
    for (const item of tableData.value) {
      if (item.dispatch) {
        item.depositor = item.dispatch.depositor;
        item.optTime = item.dispatch.optTime;
      }
    }
  };
  queryTable();
</script>
<style lang="less" scoped>
  .content {
    padding: 0 12px;
  }
</style>
