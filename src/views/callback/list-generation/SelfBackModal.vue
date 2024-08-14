<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="自主回访明细"
    width="1000px"
    :min-height="600"
    :showOkBtn="false"
    @fullscreen="redoHeight"
  >
    <div class="relative h-inherit max-h-inherit min-h-inherit">
      <div class="absolute flex flex-col w-full h-full">
        <BasicTable @register="registerTable" />
      </div>
    </div>
  </BasicModal>
</template>
<script lang="tsx" setup>
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { ref } from 'vue';
  import { BasicTable, useTable } from '@/components/Table';

  import { selfBackColumns } from '@/views/callback/list-generation/generation.data';
  import { getSelfBackDetail } from '@/api/callback/list-generation';

  const [registerTable, { reload, redoHeight }] = useTable({
    api: getSelfBackDetail,
    columns: selfBackColumns,
    formConfig: {
      schemas: [
        {
          field: 'cardNo',
          label: '浆员编号',
          component: 'Input',
        },
      ],
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
        planNo: planNo.value,
      };
    },
    clickToRowSelect: false,
    size: 'small',
    striped: false,
    useSearchForm: true,
    bordered: true,
    showIndexColumn: true,
    scroll: {
      x: 0,
    },
    isCanResizeParent: true,
    inset: true,
    immediate: false,
  });

  const planNo = ref('');

  const [register, { setModalProps }] = useModalInner((data) => {
    setModalProps({
      maskClosable: false,
      destroyOnClose: true,
    });
    planNo.value = data.record?.planNo;

    reload();
  });
</script>
