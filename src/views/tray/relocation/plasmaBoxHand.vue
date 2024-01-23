<!--
 * @Descripttion: 
 * @version: 
 * @Author: zcc
 * @Date: 2023-12-21 17:19:22
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-13 18:04:02
-->
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
    <BasicModal @register="registerModal" width="600px" @ok="confim" :show-footer="true">
      <BasicForm @register="registerForm" />
    </BasicModal>
  </div>
</template>
<script setup lang="ts">
  import { BasicTable, useTable } from '@/components/Table';
  import { BasicForm, useForm } from '@/components/Form';

  import { plasmaBoxHandSearchFormSchema, plasmaBoxHandColumns } from './relocation.data';
  import { BasicModal, useModal } from '@/components/Modal';
  import { message, Modal } from 'ant-design-vue';
  import { bindBoxApi } from '@/api/tray/relocation';

  const props = defineProps({
    isBinding: {
      type: Boolean,
    },
  });
  const [registerModal, { openModal, setModalProps }] = useModal();
  const [registerForm, { validate, clearValidate }] = useForm({
    labelWidth: 90,
    baseColProps: { span: 24 },
    schemas: [{ label: '托盘编号', required: true, component: 'Input', field: 'trayNo' }],
    showActionButtonGroup: false,
    showResetButton: false,
  });
  const [registerTable, { getSelectRows, reload }] = useTable({
    api: () => Promise.resolve({ result: [{}] }),
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    formConfig: {
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
    openModal(true);
  }
  async function confim() {
    try {
      const { trayNo } = await validate();
      const rows = getSelectRows();
      const boxes = rows.map((_) => _.boxId);
      setModalProps({ confirmLoading: true });
      await bindBoxApi({ trayNo: trayNo, type: props.isBinding ? 'bind' : 'unbind', boxes: boxes });
      setModalProps({ confirmLoading: false });
      openModal(false);
      reload();
    } catch (e) {
      console.log(e);
    }
  }
</script>
