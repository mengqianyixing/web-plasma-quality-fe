<!--
 * @Descripttion:
 * @version:
 * @Author: zcc
 * @Date: 2023-12-21 17:19:22
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-22 16:13:36
-->
<template>
  <div class="h-full">
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleBinding" v-if="props.isBinding"> 绑定 </a-button>
        <a-button type="primary" @click="handleUnbinding" v-if="!props.isBinding"> 解绑 </a-button>
      </template>
    </BasicTable>
    <BasicModal
      @register="registerModal"
      width="400px"
      title="绑定"
      @ok="confim"
      :show-footer="true"
    >
      <BasicForm @register="registerForm" />
    </BasicModal>
  </div>
</template>
<script setup lang="ts">
  import { BasicTable, useTable } from '@/components/Table';
  import { BasicForm, useForm } from '@/components/Form';
  import {
    handBindSampleBoxApi,
    handUnbindSampleBoxApi,
    getTraySampleHandBoxBindRecordApi,
    getTraySampleBoxHandUnBindRecordApi,
  } from '@/api/tray/relocation';
  import {
    sampleBoxHandBindSearchFormSchema,
    sampleBoxHandUnbindSearchFormSchema,
    sampleBoxHandBindColumns,
    sampleBoxHandUnbindColumns,
  } from './relocation.data';
  import { BasicModal, useModal } from '@/components/Modal';
  import { message } from 'ant-design-vue';
  import { useMessage } from '@/hooks/web/useMessage';
  import { onMounted } from 'vue';

  const props = defineProps({
    isBinding: {
      type: Boolean,
    },
  });
  onMounted(() => {
    if (props.isBinding) {
      setProps({
        formConfig: { schemas: sampleBoxHandBindSearchFormSchema, submitFunc },
        columns: sampleBoxHandBindColumns,
        api: getTraySampleHandBoxBindRecordApi,
      });
    } else {
      setProps({
        formConfig: { schemas: sampleBoxHandUnbindSearchFormSchema, submitFunc },
        columns: sampleBoxHandUnbindColumns,
        api: getTraySampleBoxHandUnBindRecordApi,
      });
    }
  });
  const [registerModal, { openModal, setModalProps }] = useModal();
  const [registerForm, { validate, clearValidate }] = useForm({
    labelWidth: 90,
    baseColProps: { span: 24 },
    schemas: [
      { label: '托盘编号', required: true, component: 'Input', field: 'taryNo' },
      { label: '样本箱号', required: true, component: 'Input', field: 'boxNo' },
    ],
    showActionButtonGroup: false,
    showResetButton: false,
  });
  const [registerTable, { getSelectRows, reload, setProps, getForm }] = useTable({
    immediate: false,
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    useSearchForm: true,
    bordered: true,
    size: 'small',
    rowSelection: { type: 'checkbox' },
  });
  function getFormIsNotNull() {
    const values = getForm().getFieldsValue();
    return Object.values(values).some((v) => v);
  }
  function submitFunc() {
    if (getFormIsNotNull()) {
      reload();
      return Promise.resolve();
    }
    message.warning('请选择或输入条件进行查询');
    return Promise.reject();
  }
  const { createConfirm } = useMessage();

  function handleUnbinding() {
    const rows = getSelectRows();
    if (rows.length === 0) return message.warning('请选择数据');
    createConfirm({
      iconType: 'warning',
      content: '确认?',
      onOk: async () => {
        const packNoList = rows.map((_) => _.packNo);
        await handUnbindSampleBoxApi({ packNoList, trayNo: '', boxNo: '' });
        reload();
      },
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
      const { trayNo, boxNo } = await validate();
      const rows = getSelectRows();
      const packNoList = rows.map((_) => _.packNo);
      setModalProps({ confirmLoading: true });
      await handBindSampleBoxApi({ trayNo: trayNo, boxNo, packNoList });
      openModal(false);
      reload();
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
