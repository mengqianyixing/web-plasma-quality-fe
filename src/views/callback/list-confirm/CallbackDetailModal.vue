<template>
  <BasicModal v-bind="$attrs" @register="register" :title="getTitle" width="85%">
    <Description @register="registerDescription" :data="descriptionData" />
    <BasicTable @register="registerTable" />
  </BasicModal>
</template>
<script lang="tsx" setup>
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { computed, ref, unref } from 'vue';
  import { BasicTable, useTable } from '@/components/Table';
  import { callbackDetailModalColumns } from '@/views/callback/list-generation/generation.data';
  import { getCallbackDetail } from '@/api/callback/list-generation';
  import Description from '@/components/Description/src/Description.vue';
  import { DescItem, useDescription } from '@/components/Description';

  const selectedRow = ref<Recordable>([]);
  const isUpdate = ref(false);
  const batchNo = ref('');
  const cacheDonorNos = ref<string[]>([]);

  const descriptionData = ref({});

  const descriptionSchema: DescItem[] = [
    {
      field: 'planNo',
      label: '名单编号',
    },
    {
      field: 'stationName',
      label: '采浆公司',
    },
    {
      field: 'checker',
      label: '确认人',
    },
    {
      field: 'checkAt',
      label: '确认时间',
    },
    {
      field: 'creator',
      label: '生成人',
    },
    {
      field: 'createAt',
      label: '生成日期',
    },
    {
      field: 'state',
      label: '名单状态',
    },
  ];
  const [registerDescription] = useDescription({
    contentStyle: {
      width: '25%',
    },
    title: '名单信息',
    schema: descriptionSchema,
  });

  const [registerTable, { reload }] = useTable({
    api: getCallbackDetail,
    columns: callbackDetailModalColumns,
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    beforeFetch(params) {
      return {
        ...params,
        batchNo: batchNo.value,
      };
    },
    rowKey: 'donorNo',
    clickToRowSelect: true,
    rowSelection: {
      type: 'checkbox',
      onChange: (_, selectedRows: any) => {
        selectedRow.value = selectedRows;
      },
      onSelect(record, selected) {
        if (!selected) {
          cacheDonorNos.value.push(record.donorNo);
        } else {
          cacheDonorNos.value = cacheDonorNos.value.filter((it) => it !== record.donorNo);
        }
      },
      onSelectAll(selected, _, changeRows) {
        if (!selected) {
          cacheDonorNos.value.push(...changeRows.map((it) => it.donorNo));
        }
      },
    },
    size: 'small',
    striped: false,
    useSearchForm: false,

    bordered: true,
    showIndexColumn: false,
    canResize: false,
    immediate: true,
  });

  const getTitle = computed(() => (unref(isUpdate) ? '编辑名单' : '生成名单'));

  const [register] = useModalInner((data) => {
    isUpdate.value = data.isUpdate;
    batchNo.value = data.planNo;
    descriptionData.value = data;
    reload();
  });
</script>
