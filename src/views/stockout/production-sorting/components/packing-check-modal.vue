<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    title="装箱信息核对"
    :destroyOnClose="true"
    :maskClosable="false"
    :showCancelBtn="false"
    :showOkBtn="false"
    :closeFunc="handleCloseFunc"
    width="70%"
  >
    <Form
      :model="filterForm"
      name="basic"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
      layout="inline"
    >
      <FormItem label="血浆箱号" name="boxNo">
        <Input v-model:value="boxNo" readonly />
      </FormItem>

      <FormItem label="血浆编号" name="bagNo">
        <Input
          v-model:value="bagNo"
          placeholder="请扫描"
          @keyup="handlePressEnter"
          ref="bagNoRef"
        />
      </FormItem>
      <FormItem label="已核对">
        <div class="w-30">{{ filterForm.checkedCount }}/{{ filterForm.totalCount }}</div>
      </FormItem>
    </Form>
    <BasicTable @register="registerTable" />
  </BasicModal>
</template>

<script setup lang="tsx">
  import { ref, nextTick } from 'vue';
  import { useModalInner } from '@/components/Modal';
  import { BasicTable, useTable } from '@/components/Table';
  import BasicModal from '@/components/Modal/src/BasicModal.vue';
  import {
    getSortBoxsList,
    checkBox,
  } from '@/api/stockout/production-sorting/production-sorting-main';
  import { pickBoxMap, pickBoxValueEnum, plasmaMap, plasmaValueEnum } from '@/enums/stockoutEnum';
  import { Form, FormItem, Input } from 'ant-design-vue';

  import dayjs from 'dayjs';
  import { debounce } from 'lodash-es';
  import { useMessage } from '@/hooks/web/useMessage';

  const { createMessage } = useMessage();
  const { warning, success } = createMessage;

  const filterForm = ref<any>({
    checkedCount: 0,
    totalCount: 0,
  }); // 本批数据
  const boxNo = ref(''); // 血浆箱号
  const bagNo = ref(''); // 血浆编号
  const bagNoRef = ref<any>(null);

  const emit = defineEmits(['success', 'register']);
  const [registerModal] = useModalInner(async (data) => {
    console.log(data);
    boxNo.value = data.record.boxNo;
    reload();
  });

  const columns = [
    {
      title: '血浆箱号',
      dataIndex: 'boxNo',
    },
    {
      title: '血浆编号',
      dataIndex: 'bagNo',
    },
    {
      title: '血浆状态',
      dataIndex: 'pickType',
      format(text) {
        return `${plasmaMap.get(text as plasmaValueEnum)}`;
      },
    },
    {
      title: '状态',
      dataIndex: 'state',
      format(text) {
        return `${pickBoxMap.get(text as pickBoxValueEnum)}`;
      },
    },
    {
      title: '核对人',
      dataIndex: 'checker',
    },
    {
      title: '核对日期',
      dataIndex: 'checkAt',
      format(text) {
        return text ? dayjs(text).format('YYYY-MM-DD') : '-';
      },
    },
  ];

  const [registerTable, { reload, setLoading }] = useTable({
    api: _getSortBoxsList,
    columns,
    beforeFetch: (p) => {
      return { ...p, boxNo: boxNo.value };
    },
    fetchSetting: {
      listField: 'list',
    },
    immediate: false,
    clickToRowSelect: false,
    size: 'small',
    striped: false,
    useSearchForm: false,
    showTableSetting: false,

    bordered: true,
    showIndexColumn: true,
    canResize: false,
  });

  // 请求表格数据(获取核对进度)
  async function _getSortBoxsList(p) {
    const res = await getSortBoxsList(p);
    filterForm.value.checkedCount = res?.checkedCount;
    filterForm.value.totalCount = res?.totalCount;
    return res;
  }

  // 血浆扫描
  async function keyupScan(e) {
    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
      if (!bagNo.value) {
        warning('请扫描血浆!');
        return;
      }
      if (!boxNo.value) {
        return;
      }
      const params = {
        boxNo: boxNo.value,
        bagNo: bagNo.value,
      };
      try {
        setLoading(true);
        await checkBox(params);
        success('核对成功!');
        reload();
      } finally {
        setLoading(false);
        bagNo.value = '';
        nextTick(() => {
          bagNoRef.value.focus();
        });
      }
    }
  }

  const handlePressEnter = debounce(function (e) {
    keyupScan(e);
  }, 500);

  // 关闭弹框前
  function handleCloseFunc() {
    emit('success');
    return true;
  }
</script>
