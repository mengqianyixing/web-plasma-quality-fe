<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    showFooter
    :title="state.planNo ? '编辑' : '新增'"
    cancelText="关闭"
    :showActionButtonGroup="false"
    width="1050px"
    @ok="handleSubmit"
    :minHeight="520"
  >
    <div class="flex h-inherit max-h-inherit min-h-inherit">
      <div class="w-4/5 h-inherit max-h-inherit min-h-inherit">
        <div class="h-full">
          <BasicTable @register="registerTable" />
        </div>
      </div>
      <div class="h-inherit max-h-inherit min-h-inherit">
        <BasicForm @register="registerForm">
          <template #batchList="{ field, model }">
            <div class="border h-200px overscroll-auto border-neutral-200 p-4px">
              <a-tag closable v-for="tag in model[field]" @close="() => tagClose(tag)" :key="tag">{{
                tag
              }}</a-tag>
            </div>
          </template>
        </BasicForm>
      </div>
    </div>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { reactive, computed, watch } from 'vue';
  import { BasicForm, useForm } from '@/components/Form';
  import { formListSchema, batchColumns, batchSearchForm } from './data';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import {
    submitAddApi,
    submitUpdateApi,
    getBatchListApi,
    getFormDtApi,
  } from '@/api/sample-manage/test-plan';
  import { BasicTable, useTable } from '@/components/Table';
  import { Tag as ATag } from 'ant-design-vue';

  const emit = defineEmits(['success', 'register']);

  defineOptions({ name: 'FormModel' });
  const state = reactive<{
    planNo: string;
    batchMap: Map<String, Recordable>;
  }>({ planNo: '', batchMap: new Map() });
  const batchList = computed(() => [...state.batchMap.values()]);
  const batchNumber = computed(() =>
    batchList.value.reduce((t, c) => {
      t += c.sampleCount || 0;
      return t;
    }, 0),
  );
  watch(
    () => batchNumber.value,
    (number) => {
      setFieldsValue({ number });
    },
  );

  const [registerTable, { setPagination, reload, getDataSource, setSelectedRowKeys, getForm }] =
    useTable({
      immediate: false,
      api: getBatchListApi,
      fetchSetting: {
        pageField: 'currPage',
        sizeField: 'pageSize',
        totalField: 'totalCount',
        listField: 'result',
      },
      rowKey: 'batchNo',
      columns: batchColumns,
      size: 'small',
      useSearchForm: true,
      showIndexColumn: false,
      showTableSetting: false,
      bordered: true,
      isCanResizeParent: true,
      inset: true,
      rowSelection: {
        type: 'checkbox',
        onChange(selectedRowKeys, selectedRows) {
          const datas = getDataSource();
          datas.forEach((record) => state.batchMap.delete(record.batchNo));
          selectedRows.forEach((record) => state.batchMap.set(record.batchNo, record));
          const options = batchList.value.map((it) => ({ value: it.batchNo, label: it.batchNo }));
          updateSchema({ field: 'batchList', componentProps: { options: options } });
          setFieldsValue({ batchList: options.map((it) => it.value) });
        },
      },
      formConfig: {
        schemas: batchSearchForm,
      },
    });
  const [registerForm, { validate, setFieldsValue, clearValidate, resetFields, updateSchema }] =
    useForm({
      labelWidth: 80,
      baseColProps: { span: 24 },
      schemas: formListSchema,
      showActionButtonGroup: false,
    });
  function tagClose(batchNo) {
    state.batchMap.delete(batchNo);
    setSelectedRowKeys([...state.batchMap.keys()] as any);
  }
  const [registerModal, { setModalProps, closeModal }] = useModalInner(async ({ planNo }) => {
    state.planNo = planNo;
    if (planNo) {
      const res = await getFormDtApi({ planNo });
      const values = res.batchList?.map((it) => it.batchNo);
      setFieldsValue({ ...res, batchList: values });
      res.batchList?.forEach((record) => state.batchMap.set(record.batchNo as string, record));
      setSelectedRowKeys(values as any);
    } else {
      setSelectedRowKeys([]);
      state.batchMap.clear();
      resetFields();
    }
    getForm().resetFields();
    setPagination({ current: 1 });
    reload();
    clearValidate();
  });
  async function handleSubmit() {
    try {
      const { planDate, mixType } = await validate();
      setModalProps({ confirmLoading: true });
      const batchListData = batchList.value.map((it, i) => ({
        batchNo: it.batchNo,
        sampleCount: it.sampleCount,
        orderNum: i + 1,
      }));
      if (state.planNo) {
        await submitUpdateApi({
          planDate,
          mixType,
          planNo: state.planNo,
          batchList: batchListData,
        });
      } else {
        await submitAddApi({ planDate, mixType, batchList: batchListData });
      }
      setModalProps({ confirmLoading: false });
      closeModal();
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
