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
    <Description @register="register" :data="filterForm" class="mt-2" />
    <BasicTable @register="registerTable" />
  </BasicModal>
</template>

<script setup lang="tsx">
  import { ref, nextTick } from 'vue';
  import { useModalInner } from '@/components/Modal';
  import { BasicTable, useTable } from '@/components/Table';
  import Description from '@/components/Description/src/Description.vue';
  import { DescItem, useDescription } from '@/components/Description';
  import BasicModal from '@/components/Modal/src/BasicModal.vue';
  import {
    getSortBoxsList,
    checkBox,
  } from '@/api/stockout/production-sorting/production-sorting-main';
  import { pickBoxMap, pickBoxValueEnum, plasmaMap, plasmaValueEnum } from '@/enums/stockoutEnum';

  import dayjs from 'dayjs';
  import { useMessage } from '@/hooks/web/useMessage';
  import { debounce } from 'lodash-es';

  const { createMessage } = useMessage();
  const { warning, success } = createMessage;

  const filterForm = ref<any>({}); // 本批数据
  const boxNo = ref(''); // 血浆箱号
  const bagNo = ref(''); // 血浆编号
  const bagNoRef = ref<any>(null);

  const schema: DescItem[] = [
    {
      field: 'boxNo',
      label: '血浆箱号',
      contentMinWidth: 100,
      render() {
        return (
          <div class="flex items-center justify-center gap-2 w-[250px] -mt-1">
            <a-input value={boxNo} disabled />
          </div>
        );
      },
    },
    {
      field: 'bagNo',
      label: '血浆编号',
      contentMinWidth: 100,
      render() {
        return (
          <div class="flex items-center justify-center gap-2 w-[250px] -mt-1">
            <a-input
              placeholder="请扫描"
              ref={bagNoRef}
              value={bagNo}
              onChange={(event) => (bagNo.value = event.target.value)}
              onkeyup={debounce(handlePressEnter, 500)}
            />
          </div>
        );
      },
    },
    {
      field: 'checkedCount',
      label: '已核对',
      render() {
        return (
          <span>
            {filterForm.value?.checkedCount}/{filterForm.value?.totalCount}
          </span>
        );
      },
    },
  ];
  const [register] = useDescription({
    bordered: false,
    column: 3,
    contentStyle: {
      width: '80px',
    },
    schema: schema,
  });

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
  async function handlePressEnter(e) {
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

  // 关闭弹框前
  function handleCloseFunc() {
    filterForm.value = {};
    emit('success');
    return true;
  }
</script>
