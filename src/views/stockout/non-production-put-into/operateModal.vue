<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :title="getTitle"
    @ok="handleSubmit"
    width="1200px"
  >
    <div>
      <BasicForm @register="registerForm" />
      <div class="flex justify-end">
        <a-button type="primary"> 保存申请单 </a-button>
      </div>
      <a-tabs default-active-key="detail" v-model:activeKey="currentKey" @change="handleTabChange">
        <a-tab-pane key="batch" tab="血浆批号" />
        <a-tab-pane key="box" tab="血浆箱号" />
        <a-tab-pane key="detail" tab="血浆明细" />
      </a-tabs>
      <BasicTable @register="registerTable" />
    </div>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { computed, ref, unref } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicTable, useTable } from '@/components/Table';
  import { BasicForm, useForm } from '@/components/Form';
  import {} from './non.data';
  import { Tabs, TabPane } from 'ant-design-vue';

  const ATabs = Tabs;
  const ATabPane = TabPane;
  defineOptions({ name: 'OperateModal' });

  const emit = defineEmits(['success', 'register']);
  const isUpdate = ref(false);

  const [registerForm, { resetFields, validate, setFieldsValue }] = useForm({
    labelWidth: 120,
    baseColProps: { span: 48 },
    schemas: [
      {
        field: '',
        label: '申请单号',
        component: 'Input',
        required: true,
      },
      {
        field: '',
        label: '申请日期',
        component: 'Input',
        required: true,
      },
      {
        field: '',
        label: '转移申请人',
        component: 'Input',
        required: true,
      },
      {
        field: '',
        label: '转移部门',
        component: 'Input',
        required: true,
      },
      {
        field: '',
        label: '转移原因',
        component: 'Input',
        required: true,
      },
    ],
    showActionButtonGroup: false,
  });

  const currentKey = ref('detail');
  const [registerTable] = useTable();

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    await resetFields();
    setModalProps({ confirmLoading: false });

    isUpdate.value = !!data.isUpdate;

    await setFieldsValue({
      ...data.record,
    });
  });

  const getTitle = computed(() => (unref(isUpdate) ? '' : '新增'));

  async function handleSubmit() {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });
      emit('success', values);
      closeModal();
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }

  function handleTabChange(flag) {
    console.log(flag);
  }
</script>
