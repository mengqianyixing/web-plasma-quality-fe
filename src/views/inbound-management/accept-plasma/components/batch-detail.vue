<template>
  <Modal
    v-bind="$attrs"
    v-on="$attrs"
    :open="true"
    @cancel="hideModal"
    :footer="null"
    width="1600px"
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
        <FormItem label="血浆批号">
          <Select
            v-model:value="searchForm.batchNo"
            allowClear
            style="width: 180px"
            placeholder="请选择"
          >
            <SelectOption v-for="item in batchNoOpts" :key="item.code" :value="item.code">{{
              item.name
            }}</SelectOption>
          </Select>
        </FormItem>
        <FormItem label="血浆箱号">
          <Input v-model:value="searchForm.boxNo" placeholder="请输入" style="width: 180px" />
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
        <FormItem label="验收结果">
          <Select
            v-model:value="searchForm.verifyResult"
            allowClear
            style="width: 180px"
            placeholder="请选择"
          >
            <SelectOption v-for="item in verifyResultOpts" :key="item.code" :value="item.code">{{
              item.name
            }}</SelectOption>
          </Select>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="queryTable">查询</Button>
        </FormItem>
        <FormItem>
          <Button @click="resetQuery">重置</Button>
        </FormItem>
      </Form>
      <Table
        :columns="columns"
        :data-source="tableData"
        bordered
        :loading="loading"
        style="margin-bottom: 16px"
      >
        <template #footer>
          <div style="text-align: right"> 血浆总袋数：3000 </div>
        </template>
        <template #bodyCell="{ column, text }">
          <template v-if="column.dataIndex === 'acceptState' || column.dataIndex === 'verifyState'">
            {{ optsTransMap(verifyResultOpts, 'code', 'name')[text] }}
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
  } from 'ant-design-vue';
  import dayjs from 'dayjs';
  import { getPlasmaBag } from '@/api/inbound-management/accept-plasma.ts';

  const emit = defineEmits(['close']);

  const loading = ref(false);

  // 表单数据
  const initSearchForm = {
    stationNo: '',
    batchNo: '',
    boxNo: '',
    verifyState: '',
    verifyResult: '',
  };
  const searchForm = ref(initSearchForm);
  // 采浆公司备选项
  const companyOpts = ref([]);
  // 批号备选项
  const batchNoOpts = ref([]);
  // 验收结果备选项
  const verifyResultOpts = ref([]);
  // 验收状态备选项
  const checkOpts = ref([
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

  const columns = [
    {
      title: '箱号',
      dataIndex: 'boxNo',
    },
    {
      title: '袋号',
      dataIndex: 'bagNo',
    },
    {
      title: '采集日期',
      dataIndex: 'collectAt',
      customRender: ({ text }) => {
        return dayjs(text).format('YYYY-MM-DD');
      },
    },
    {
      title: '浆员编号',
      dataIndex: 'donorNo',
    },
    {
      title: '浆员名称',
      dataIndex: 'donorName',
    },
    {
      title: '性别',
      dataIndex: 'gender',
    },
    {
      title: '血型',
      dataIndex: 'bloodType',
    },
    {
      title: '浆站重量(g)',
      dataIndex: 'rawWeight',
    },
    {
      title: '验收净重(g)',
      dataIndex: 'netWeight',
    },
    {
      title: '验收人',
      dataIndex: 'verifyUser',
    },
    {
      title: '复核人',
      dataIndex: 'checker',
    },
    {
      title: '验收时间',
      dataIndex: 'verifyAt',
      customRender: ({ text }) => {
        return dayjs(text).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    {
      title: '验收状态',
      dataIndex: 'verifyState',
    },
    {
      title: '血浆验收结果',
      dataIndex: 'bagVerifyResult',
    },
    {
      title: '样本验收结果',
      dataIndex: 'sampleResult',
    },
  ];
  let tableData = ref<any[]>([]);

  // 查询列表数据
  const queryTable = async () => {
    const params = { ...searchForm.value };
    try {
      loading.value = true;
      const res = await getPlasmaBag(params);
      if (res) {
        tableData.value = res;
      }
    } finally {
      loading.value = false;
    }
  };

  const resetQuery = () => {
    searchForm.value = { ...initSearchForm };
    queryTable();
  };
  queryTable();
</script>
<style lang="less" scoped>
  .content {
    padding: 0 12px;
  }
</style>
