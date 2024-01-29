<!--
 * @Descripttion: 
 * @version: 
 * @Author: zcc
 * @Date: 2024-01-29 10:43:03
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-29 11:18:10
-->
<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    showFooter
    :title="`血浆入库`"
    width="1200px"
    :show-ok-btn="false"
    cancelText="关闭"
    :min-height="600"
    @cancel="cancel"
  >
    <div class="relative h-inherit max-h-inherit min-h-inherit">
      <div class="absolute flex flex-col w-full h-full">
        <Tabs
          v-model:activeKey="state.activeKey"
          @change="change"
          class="h-full bg-white tabs"
          size="small"
        >
          <TabPane tab="分拣血浆箱" key="1" />
          <TabPane tab="托盘入库" key="2">
            <BasicTable @register="registerTable">
              <template #toolbar>
                <a-button type="primary" @click="handleInStore">入库</a-button>
              </template>
            </BasicTable>
          </TabPane>
        </Tabs>
      </div>
    </div>
    <InModal @register="registerInModal" @success="reload" />
  </BasicModal>
</template>
<script setup lang="ts">
  import { BasicModal, useModalInner, useModal } from '@/components/Modal';
  import { BasicTable, useTable } from '@/components/Table';
  import { message, TabPane, Tabs } from 'ant-design-vue';
  import { reactive } from 'vue';
  import { trayInStoreColumns, trayInStoreFormSchema } from '../production-sorting.data';
  import InModal from '@/views/tray/outInStore/inModal.vue';

  const state = reactive({
    activeKey: '2',
    prepareNo: '',
  });
  const emit = defineEmits(['close']);
  const [registerModal] = useModalInner(async ({ prepareNo }) => {
    state.prepareNo = prepareNo;
  });
  const [registerInModal, { openModal: openInModal }] = useModal();
  const [registerTable, { getSelectRows, clearSelectedRowKeys, reload }] = useTable({
    api: () => Promise.resolve({ result: [{}] }),
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    columns: trayInStoreColumns,
    inset: true,
    isCanResizeParent: true,
    size: 'small',
    useSearchForm: true,
    showTableSetting: false,
    bordered: true,
    rowSelection: { type: 'checkbox' },
    beforeFetch: (p) => ({ ...p, prepareNo: state.prepareNo }),
    afterFetch: (res) => {
      clearSelectedRowKeys();
      return res;
    },
    formConfig: {
      schemas: trayInStoreFormSchema,
    },
  });
  function change() {}
  function cancel() {
    emit('close');
  }
  function handleInStore() {
    const rows: Recordable[] = getSelectRows();
    if (rows.length === 0) return message.warning('请选择数据');
    if (rows.some((_) => _.status)) return message.warning('请选择未入库的数据');
    openInModal(true, { data: rows });
  }
</script>
<style scoped>
  .tabs :deep(.ant-tabs-content) {
    height: 100%;
  }
</style>
