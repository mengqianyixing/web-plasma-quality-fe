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
          <Button type="primary" @click="queryTable('reset')">查询</Button>
        </FormItem>
        <FormItem>
          <Button @click="resetQuery">重置</Button>
        </FormItem>
      </Form>
      <Table
        :columns="columns"
        :data-source="tableData"
        :row-selection="rowSelection"
        bordered
        :pagination="pagination"
        :loading="loading"
        row-key="batchNo"
      >
        <template #bodyCell="{ column, text }">
          <template v-if="column.dataIndex === 'acceptState'">
            {{ optsTransMap(receiveOpts, 'code', 'name')[text] }}
          </template>
          <template v-else-if="column.dataIndex === 'verifyState'">
            {{ optsTransMap(checkOpts, 'code', 'name')[text] }}
          </template>
        </template>
      </Table>
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
  const props = defineProps({
    mode: String as PropType<any>,
  });

  const loading = ref(false);

  // 表单数据
  const searchForm = ref({
    stationNo: '',
    batchNo: '',
    acceptState: '',
    verifyState: '',
  });
  // 采浆公司备选项
  const companyOpts = ref([]);

  // 接收状态备选项
  const receiveOpts = ref([
    {
      code: 'W',
      name: '未接收',
    },
    {
      code: 'R',
      name: '接收中',
    },
    {
      code: 'S',
      name: '已接收',
    },
  ]);
  // 验收状态备选项
  const checkOpts = ref([
    {
      code: 'W',
      name: '未验收',
    },
    {
      code: 'R',
      name: '验收中',
    },
    {
      code: 'S',
      name: '已验收',
    },
  ]);
  // 备选项转map
  const optsTransMap = (arr: any[], code: any, name: any) => {
    if (!arr.length) return {};
    const obj = {};
    for (const item of arr) {
      obj[item[code]] = item[name];
    }
    return obj;
  };

  const hideModal = () => {
    emit('close', false);
  };
  const confirm = () => {
    if (!tableSelected.value.length) {
      warning('请先选择一条数据!');
      return;
    }
    if (props.mode === 'receive' && tableSelected.value[0].acceptState === 'S') {
      warning('当前批次已接收!');
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
    onChange: async (page, pageSize) => {
      pagination.value.current = page;
      pagination.value.pageSize = pageSize;
      await queryTable();
    },
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
      tableSelected.value = selectedRows;
    },
  };
  // 查询列表数据
  const queryTable = async (reset?) => {
    if (reset === 'reset') {
      pagination.value.pageSize = 10;
      pagination.value.current = 1;
    }
    const params = {
      ...searchForm.value,
      pageSize: pagination.value.pageSize,
      currPage: pagination.value.current,
    };
    try {
      loading.value = true;
      const res = await getBatchSummary(params);
      if (res) {
        pagination.value.total = res.totalCount;
        pagination.value.pageSize = res.pageSize;
        pagination.value.current = res.currPage;
        tableData.value = res.result;
        // dispatch 为对象，拆成两个字段作两列
        for (const item of tableData.value) {
          if (item.dispatch) {
            item.depositor = item.dispatch.depositor;
            item.optTime = item.dispatch.optTime;
          }
        }
      }
    } finally {
      loading.value = false;
    }
  };

  const resetQuery = () => {
    searchForm.value.stationNo = '';
    searchForm.value.batchNo = '';
    searchForm.value.acceptState = '';
    searchForm.value.verifyState = '';
    pagination.value.pageSize = 10;
    pagination.value.current = 1;
    pagination.value.total = 0;
    queryTable();
  };
  queryTable();
</script>
<style lang="less" scoped>
  .content {
    padding: 0 12px;
  }
</style>
