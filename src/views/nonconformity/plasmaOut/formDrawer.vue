<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    :title="state.title"
    width="1200px"
    @close="emit('close')"
  >
    <div class="flex flex-col">
      <BasicForm @register="registerForm" />
      <div class="flex justify-end line">
        <a-button
          type="primary"
          v-if="state.title !== '查看'"
          @click="methods.submit"
          :loading="state.loading"
        >
          保存申请单
        </a-button>
      </div>
      <div class="flex-1">
        <BasicTable @register="registerTable">
          <template #toolbar v-if="state.title !== '查看'">
            <a-button type="primary" @click="methods.addClick">添加</a-button>
            <a-button type="primary" @click="methods.removeClick">移除</a-button>
          </template>
        </BasicTable>
      </div>
    </div>
    <PlasmaDtDrawer @register="registerDtDrawer" @close="methods.close" />
  </BasicDrawer>
</template>
<script setup lang="ts">
  import { BasicDrawer, useDrawerInner, useDrawer } from '@/components/Drawer';
  import { BasicForm, useForm } from '@/components/Form';
  import { formSchema, dtColumns } from './plasmaOut.data';
  import { BasicTable, useTable } from '@/components/Table';
  import PlasmaDtDrawer from './plasmaDtDrawer.vue';
  import {
    addFormApi,
    updateFormApi,
    dtFormApi,
    dtTableApi,
    removeTableApi,
  } from '@/api/nonconformity/plasmaOut';
  import { reactive } from 'vue';
  import { message, Modal } from 'ant-design-vue';

  const emit = defineEmits(['close']);

  const state = reactive({ dlvNo: '', loading: false, title: '' });
  const [registerDtDrawer, { openDrawer }] = useDrawer();
  const [registerForm, { validate, clearValidate, resetFields, updateSchema, setFieldsValue }] =
    useForm({
      labelWidth: 90,
      baseColProps: { span: 8 },
      schemas: formSchema,
      showActionButtonGroup: false,
    });
  const [
    registerTable,
    { getSelectRows, clearSelectedRowKeys, reload, setPagination, setTableData },
  ] = useTable({
    api: dtTableApi,
    immediate: false,
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    columns: dtColumns,
    size: 'small',
    useSearchForm: false,
    bordered: true,
    rowSelection: { type: 'checkbox' },
    beforeFetch: (p) => ({
      dlvNo: state.dlvNo,
      ...p,
    }),
    afterFetch: (res) => {
      clearSelectedRowKeys();
      return res;
    },
  });
  const [registerDrawer] = useDrawerInner(async ({ disabled, dlvNo }) => {
    state.dlvNo = dlvNo;
    updateSchema(
      formSchema.slice(1).map((_) => ({ ..._, componentProps: { disabled: !!disabled } })),
    );
    if (dlvNo) {
      dtFormApi({ no: dlvNo }).then((res) => {
        setFieldsValue(res);
        clearValidate();
      });
      setPagination({ current: 1 });
      reload();
      state.title = '编辑';
      updateSchema([{ field: 'useTo', componentProps: { disabled: true } }]);
    } else {
      setPagination({ total: 0 });
      setTableData([]);
      state.title = '新增';
    }
    if (disabled) state.title = '查看';

    resetFields();
    clearValidate();
  });

  const methods = {
    addClick: () => {
      if (!state.dlvNo) return message.warning('请先保存申请单');
      openDrawer(true, state);
    },
    removeClick: () => {
      const rows = getSelectRows();
      if (rows.length === 0) return message.warning('请选择一条数据');
      if (rows.length > 1) return message.warning('只能选择一条数据');
      const [row] = rows;
      Modal.confirm({
        content: '确认删除' + row.bagNo + '?',
        onOk: async () => {
          await removeTableApi({ bagNo: row.bagNo });
          reload();
        },
        onCancel: () => Modal.destroyAll(),
      });
    },
    submit: async () => {
      const values = await validate();
      state.loading = true;
      try {
        if (state.dlvNo) {
          await updateFormApi({ ...values, dlvNo: state.dlvNo } as any);
          message.success('申请单更新成功');
        } else {
          const res = await addFormApi(values as any);
          state.dlvNo = res;
          message.success('申请单保存成功');
        }
      } finally {
        state.loading = false;
      }
    },
    close: () => {
      openDrawer(false);
      setPagination({ current: 1 });
      reload();
    },
  };
</script>
<style scoped lang="less">
  .line {
    margin-bottom: 12px;
    padding-bottom: 12px;
    border-bottom-width: 1px;
    border-color: @border-color-base;
  }
</style>
