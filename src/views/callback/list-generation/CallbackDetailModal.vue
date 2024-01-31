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

  import {
    callbackDetailModalColumns,
    callbackDetailFormSchema,
  } from '@/views/callback/list-generation/generation.data';
  import { getCallbackDetail } from '@/api/callback/list-generation';
  import Description from '@/components/Description/src/Description.vue';
  import { DescItem, useDescription } from '@/components/Description';

  const isUpdate = ref(false);
  const batchNo = ref('');

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
    bordered: false,
    contentStyle: {
      width: '25%',
    },
    title: '名单信息',
    schema: descriptionSchema,
  });

  const [registerTable, { reload }] = useTable({
    api: getCallbackDetail,
    columns: callbackDetailModalColumns,
    formConfig: {
      schemas: callbackDetailFormSchema,
      transformDateFunc(date) {
        return date ? date.format('YYYY-MM-DD') : '';
      },
    },
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
    clickToRowSelect: false,
    size: 'small',
    striped: false,
    useSearchForm: true,
    showTableSetting: true,
    tableSetting: {
      size: false,
      redo: false,
      setting: false,
    },
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
