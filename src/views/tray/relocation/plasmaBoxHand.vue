<template>
  <div class="h-full">
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleBinding" v-show="props.isBinding">
          绑定托盘
        </a-button>
        <a-button type="primary" @click="handleUnbinding" v-show="!props.isBinding">
          解绑托盘
        </a-button>
      </template>
    </BasicTable>
    <BasicDrawer @register="registerDrawer" width="600px" @ok="confim" :show-footer="true">
      <BasicForm @register="registerForm" />
    </BasicDrawer>
  </div>
</template>
<script setup lang="ts">
  import { BasicTable, useTable } from '@/components/Table';
  import { BasicForm, useForm } from '@/components/Form';

  import { plasmaBoxHandSearchFormSchema, plasmaBoxHandColumns } from './relocation.data';
  import { BasicDrawer, useDrawer } from '@/components/Drawer';
  import { message, Modal } from 'ant-design-vue';

  const props = defineProps({
    isBinding: {
      type: Boolean,
    },
  });
  const [registerDrawer, { openDrawer, setDrawerProps }] = useDrawer();
  const [registerForm, { validate, clearValidate }] = useForm({
    labelWidth: 90,
    baseColProps: { span: 24 },
    schemas: [{ label: '托盘编号', required: true, component: 'Input', field: 'taryNo' }],
    showActionButtonGroup: false,
    showResetButton: false,
  });
  const [registerTable, { getSelectRows, reload }] = useTable({
    title: '',
    api: () => Promise.resolve({ result: [{}] }),
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    formConfig: {
      labelWidth: 100,
      schemas: plasmaBoxHandSearchFormSchema,
    },
    rowKey: 'houseNo',
    columns: plasmaBoxHandColumns,
    useSearchForm: true,
    bordered: true,
    size: 'small',
    rowSelection: { type: 'checkbox' },
  });
  function handleUnbinding() {
    const row = getSelectRows();
    if (row.length === 0) return message.warning('请选择数据');
    Modal.confirm({
      content: '确认?',
      onOk: async () => {
        reload();
      },
      onCancel: () => Modal.destroyAll(),
    });
  }
  function handleBinding() {
    const row = getSelectRows();
    if (row.length === 0) return message.warning('请选择数据');
    clearValidate();
    openDrawer(true);
  }
  async function confim() {
    try {
      const values = await validate();
      const row = getSelectRows();
      setDrawerProps({ confirmLoading: true });
      setDrawerProps({ confirmLoading: false });
      openDrawer(false);
      reload();
      console.log(values, row);
    } catch (e) {
      console.log(e);
    }
  }
</script>
