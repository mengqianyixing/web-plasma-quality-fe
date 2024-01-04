<template>
  <Modal
    v-bind="$attrs"
    v-on="$attrs"
    :open="true"
    @cancel="hideModal"
    :footer="null"
    width="1600px"
    title="本批详情"
  >
    <div class="content">
      <Form layout="inline" :model="searchForm" style="margin-bottom: 16px">
        <FormItem label="采浆公司">
          <Input v-model:value="searchForm.stationName" disabled style="width: 180px" />
        </FormItem>
        <FormItem label="血浆批号">
          <Input v-model:value="searchForm.batchNo" placeholder="请输入" style="width: 180px" />
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
            <SelectOption v-for="item in props.checkOpts" :key="item.code" :value="item.code">{{
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
        :pagination="false"
        style="margin-bottom: 16px"
        :scroll="{ y: 550 }"
      >
        <template #footer>
          <div style="text-align: right"> 血浆总箱数：{{ tableData.length }} </div>
        </template>
        <template #bodyCell="{ text, record, column }">
          <template v-if="column.dataIndex === 'verifyState'">
            {{ optsTransMap(checkOpts, 'code', 'name')[text] }}
          </template>
          <template v-if="column.dataIndex === 'boxNo'">
            <Button type="link" @click="showBatchDetail(record)">{{ text }}</Button>
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
  import { useMessage } from '@/hooks/web/useMessage';

  const { createMessage } = useMessage();
  const { warning } = createMessage;

  const emit = defineEmits(['close']);
  const props = defineProps({
    checkOpts: Array as PropType<any>,
  });

  const loading = ref(false);

  // 表单数据
  const initSearchForm = {
    stationNo: '',
    stationName: '',
    batchNo: '',
    boxNo: '',
    verifyState: '',
  };
  const searchForm = ref({ ...initSearchForm });

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
    if (!searchForm.value.batchNo) {
      warning('请选择批号!');
      return;
    }
    const params = { ...searchForm.value };
    delete (params as any).stationName;
    delete (params as any).stationNo;
    for (const key of Object.keys(params)) {
      if (params[key] === '') {
        delete params[key];
      }
    }
    try {
      loading.value = true;
      const res = await getPlasmaBox(params);
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

  const showBatchDetail = (row) => {
    console.log(row);
  };
  defineExpose({
    searchForm,
    queryTable,
  });
</script>
<style lang="less" scoped>
  .content {
    padding: 0 12px;
  }
</style>
