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
          <div style="text-align: right"> 血浆总箱数：100 </div>
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
  import { getPlasmaBox } from '@/api/inbound-management/accept-plasma.ts';

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
      title: '接收人',
      dataIndex: 'acceptUser',
    },
    {
      title: '未验收数量',
      dataIndex: 'unVerifyCount',
    },
    {
      title: '已验收数量',
      dataIndex: 'verifyCount',
    },
    {
      title: '验收合格数量',
      dataIndex: 'qualifiedCount',
    },
    {
      title: '验收人',
      dataIndex: 'verifyUser',
    },
    {
      title: '验收复核人',
      dataIndex: 'checker',
    },
    {
      title: '托盘编号',
      dataIndex: 'trayNo',
    },
    {
      title: '验收状态',
      dataIndex: 'verifyState',
    },
  ];
  let tableData = ref<any[]>([]);

  // 查询列表数据
  const queryTable = async () => {
    const params = { ...searchForm.value };
    try {
      loading.value = true;
      const res = await getPlasmaBox(params);
      if (res) {
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
