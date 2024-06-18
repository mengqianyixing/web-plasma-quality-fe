<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="回访明细"
    width="85%"
    :min-height="700"
    :showOkBtn="false"
  >
    <div class="relative h-inherit max-h-inherit min-h-inherit">
      <div class="absolute flex flex-col w-full h-full">
        <BasicTable @register="registerTable" :columns="columnsComputed">
          <template #bagNum="{ record }">
            <span
              :class="
                !record?.bagNum ? 'pointer-events-none' : 'text-blue-500 underline cursor-pointer'
              "
              @click.stop.self="handleBagDetail(record)"
            >
              {{ record?.bagNum }}
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
  import { computed, ref } from 'vue';
  import { BasicTable, useTable } from '@/components/Table';

  import {
    callbackCustomFormSchema,
    callbackDetailCustomColumns,
  } from '@/views/callback/list-generation/generation.data';
  import { getDetailByState } from '@/api/callback/list-generation';
  import { CallBackDetailState } from '@/enums/callbackEnum';

  import BagDetailModal from '@/views/callback/list-generation/BagDetailModal.vue';

  const [registerModal, { openModal }] = useModal();

  const [registerTable, { reload }] = useTable({
    api: getDetailByState,
    formConfig: {
      schemas: callbackCustomFormSchema,
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
        state: state.value,
        planNo: planNo.value,
      };
    },
    clickToRowSelect: false,
    size: 'small',
    striped: false,
    useSearchForm: true,
    bordered: true,
    showIndexColumn: false,
    scroll: {
      x: 0,
    },
    isCanResizeParent: true,
    inset: true,
    immediate: false,
  });

  const state = ref<CallBackDetailState>(CallBackDetailState.SUCCESS);

  const columnsComputed = computed(() => {
    if (state.value === CallBackDetailState.FAIL || state.value === CallBackDetailState.NOVISIT) {
      return callbackDetailCustomColumns.filter(
        (it) => !['callbackDate', 'collDate'].includes(it.dataIndex as string),
      );
    } else if (state.value === CallBackDetailState.RESUME) {
      return callbackDetailCustomColumns
        .filter((it) => !['callbackDate'].includes(it.dataIndex as string))
        .map((it) => {
          if (it.dataIndex === 'collDate') {
            return {
              ...it,
              title: '恢复采浆日期',
            };
          } else {
            return {
              ...it,
            };
          }
        });
    } else {
      return callbackDetailCustomColumns;
    }
  });
  const planNo = ref('');

  const [register, { setModalProps }] = useModalInner((data) => {
    setModalProps({
      maskClosable: false,
      destroyOnClose: true,
    });
    state.value = data.state;
    planNo.value = data.planNo;

    reload();
  });

  function handleBagDetail(record: Recordable) {
    openModal(true, {
      cardNo: record?.cardNo,
    });
  }
</script>
