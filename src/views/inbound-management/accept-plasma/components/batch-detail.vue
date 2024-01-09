<template>
  <Modal
    v-bind="$attrs"
    v-on="$attrs"
    :open="true"
    @cancel="hideModal"
    :footer="null"
    width="1600px"
    title="验收详情"
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
        :pagination="false"
        :loading="loading"
        style="margin-bottom: 16px"
        :scroll="{ y: 550 }"
      >
        <template #footer>
          <div style="text-align: right"> 血浆总袋数：{{ tableData.length }} </div>
        </template>
        <template #bodyCell="{ column, text }">
          <template v-if="column.dataIndex === 'verifyState'">
            {{ optsTransMap(props.checkOptsEnum, 'code', 'name')[text] }}
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
  import { getPlasmaBag } from '@/api/inbound-management/accept-plasma.js';
  import { useMessage } from '@/hooks/web/useMessage';

  const { createMessage } = useMessage();
  const { warning } = createMessage;

  const emit = defineEmits(['close']);
  const props = defineProps({
    checkOptsEnum: Array as PropType<any>,
  });

  const loading = ref(false);

  interface SearchForm {
    stationNo: string;
    stationName: string;
    batchNo: string;
    boxNo: string;
    verifyState: string | undefined;
    verifyResult: string | undefined;
  }

  // 表单数据
  const initSearchForm: SearchForm = {
    stationNo: '',
    stationName: '',
    batchNo: '',
    boxNo: '',
    verifyState: undefined,
    verifyResult: undefined,
  };
  const searchForm = ref<SearchForm>({ ...initSearchForm });

  // 验收结果备选项
  const verifyResultOpts = ref([
    {
      code: 0,
      name: '不合格',
    },
    {
      code: 1,
      name: '合格',
    },
  ]);
  // 验收状态备选项
  const checkOpts = ref([
    {
      code: 0,
      name: '未验收',
    },
    {
      code: 1,
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

  const columns = [
    {
      title: '箱号',
      dataIndex: 'boxNo',
    },
    {
      title: '血浆编号',
      dataIndex: 'bagNo',
    },
    {
      title: '采集日期',
      dataIndex: 'collectAt',
      customRender: ({ text }) => {
        if (text) {
          return dayjs(text).format('YYYY-MM-DD');
        }
        return '';
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
      customRender: ({ text }) => {
        if (text === 'M') {
          return '男';
        } else if (text === 'F') {
          return '女';
        }
        return '';
      },
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
        if (text) {
          return dayjs(text).format('YYYY-MM-DD');
        }
        return '';
      },
    },
    {
      title: '验收状态',
      dataIndex: 'verifyState',
    },
    {
      title: '血浆验收结果',
      dataIndex: 'bagResult',
    },
    {
      title: '样本验收结果',
      dataIndex: 'sampleResult',
    },
  ];
  let tableData = ref<any[]>([]);

  // 查询列表数据
  const queryTable = async () => {
    if (!searchForm.value.batchNo && !searchForm.value.boxNo) {
      warning('请选择批号或箱号!');
      return;
    }
    const params = { ...searchForm.value };
    delete (params as any).stationName;
    delete (params as any).stationNo;
    // 删除所有为空字符串的属性
    for (const key of Object.keys(params)) {
      if (params[key] === '') {
        delete params[key];
      }
    }
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
    // queryTable();
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
