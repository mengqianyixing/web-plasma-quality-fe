<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    :title="getTitle"
    width="85%"
    :min-height="600"
    :showOkBtn="false"
  >
    <div class="relative h-inherit max-h-inherit min-h-inherit">
      <div class="absolute flex flex-col w-full h-full">
        <Description @register="registerDescription" :data="descriptionData" />
        <BasicTable @register="registerTable" :columns="columnsComputed">
          <template #plasmaCount="{ record }">
            <span
              :class="
                !record?.plasmaCount
                  ? 'pointer-events-none'
                  : 'text-blue-500 underline cursor-pointer'
              "
              @click.stop.self="handleBagDetail(record)"
            >
              {{ record?.plasmaCount }}
            </span>
          </template>
        </BasicTable>
      </div>
    </div>

    <BagDetailModal @register="registerModal" />
  </BasicModal>
</template>
<script lang="tsx" setup>
  import { BasicModal, useModal, useModalInner } from '@/components/Modal';
  import { computed, ref, unref } from 'vue';
  import { BasicTable, useTable } from '@/components/Table';

  import {
    callbackDetailModalColumns,
    callbackDetailFormSchema,
  } from '@/views/callback/list-generation/generation.data';
  import { getCallbackDetail } from '@/api/callback/list-generation';
  import Description from '@/components/Description/src/Description.vue';
  import { DescItem, useDescription } from '@/components/Description';
  import { callbackModalEnum } from '@/enums/callbackEnum';

  import BagDetailModal from '@/views/callback/list-generation/BagDetailModal.vue';

  const [registerModal, { openModal }] = useModal();

  const isUpdate = ref(false);
  const isPreview = ref(false);
  const isShowTrackType = ref(false);
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
    schema: descriptionSchema,
  });

  const callbackModel = ref('');
  const columnsComputed = computed(() => {
    return callbackModel.value === callbackModalEnum.A
      ? isShowTrackType.value
        ? callbackDetailModalColumns.filter((it) => (it.dataIndex as string) !== 'minPlasmaNo')
        : callbackDetailModalColumns.filter(
            (it) => !['minPlasmaNo', 'trackType'].includes(it.dataIndex as string),
          )
      : callbackDetailModalColumns;
  });
  const [registerTable, { reload }] = useTable({
    api: getCallbackDetail,
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
    clickToRowSelect: false,
    size: 'small',
    striped: false,
    useSearchForm: true,
    bordered: true,
    showIndexColumn: true,

    isCanResizeParent: true,
    inset: true,
    immediate: true,
  });

  const getTitle = computed(() =>
    unref(isPreview) ? '名单详情' : unref(isUpdate) ? '编辑名单' : '生成名单',
  );

  const [register] = useModalInner((data) => {
    isUpdate.value = data.isUpdate;
    isPreview.value = data.isPreview;
    batchNo.value = data.planNo;
    callbackModel.value = data.model;
    isShowTrackType.value = data.isShowTrackType;

    descriptionData.value = data;
    reload();
  });

  function handleBagDetail(_record: Recordable) {
    openModal(true, {
      cardNo: _record.cardNo,
      planNo: batchNo.value,
    });
  }
</script>
