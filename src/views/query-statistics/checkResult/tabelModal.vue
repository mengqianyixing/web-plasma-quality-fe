<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    showFooter
    :title="`检测样本详情`"
    :minHeight="520"
    width="1000px"
    :showOkBtn="false"
    cancelText="关闭"
    @fullscreen="redoHeight"
  >
    <div class="relative h-inherit max-h-inherit min-h-inherit">
      <div class="absolute w-full h-full">
        <BasicTable @register="registerTable" />
      </div>
    </div>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { reactive } from 'vue';
  import { dtColumns } from './data';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicTable, useTable } from '@/components/Table';
  import { getDtApi } from '@/api/query-statistics/checkResult';
  import { SERVER_ENUM } from '@/enums/serverEnum';
  import { useServerEnumStoreWithOut } from '@/store/modules/serverEnums';

  const serverEnumStore = useServerEnumStoreWithOut();
  const state = reactive({ batchNo: '', sampleType: '' });

  const [registerTable, { redoHeight, reload, setPagination }] = useTable({
    immediate: false,
    api: getDtApi,
    columns: dtColumns,
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    size: 'small',
    useSearchForm: true,
    bordered: true,
    formConfig: {
      schemas: [
        {
          field: 'conclusion',
          label: '检测结果',
          component: 'Select',
          componentProps: {
            options: serverEnumStore.getServerEnum(SERVER_ENUM.ConclusionType),
          },
        },
      ],
    },
    isCanResizeParent: true,
    inset: false,
    beforeFetch: (p) => {
      return { ...p, ...state };
    },
  });
  const [registerModal] = useModalInner(async ({ bsNo, sampleType }) => {
    state.batchNo = bsNo;
    state.sampleType = sampleType;
    setPagination({ current: 1 });

    reload();
  });
</script>
