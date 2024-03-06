<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    title="打印箱签"
    width="500"
    :destroyOnClose="true"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm, FormSchema } from '@/components/Form';
  import { getPrintRecord } from '@/api/tag/printRecord';

  defineOptions({ name: 'ReprintModal' });

  const emit = defineEmits(['success', 'register']);

  const ReprintRecordFormSchema: FormSchema[] = [
    {
      field: 'boxNo',
      label: '血浆箱号',
      component: 'Input',
      colProps: {
        span: 18,
      },
      componentProps: {
        disabled: true,
      },
    },
    {
      field: 'reason',
      label: '是否打印',
      component: 'Switch',
      defaultValue: true,
      colProps: {
        span: 18,
      },
      required: true,
    },
    {
      field: 'times',
      label: '打印份数',
      component: 'Input',
      defaultValue: 0,
      colProps: {
        span: 18,
      },
      componentProps: {
        disabled: true,
      },
    },
  ];
  let labelObj = {}; // 标签样式

  const [registerForm, { updateSchema, validate }] = useForm({
    labelWidth: 170,
    baseColProps: { span: 32 },
    schemas: ReprintRecordFormSchema,
    showActionButtonGroup: false,
  });

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    // 获取标签相关样式
    const res = await getPrintRecord({
      labelType: 'PLAIN_BOX',
      bissNo: data.boxNo, // 箱号
    });
    labelObj = res;
    console.log(data, 'lllllllllll');
    updateSchema([
      {
        field: 'boxNo',
        defaultValue: data.boxNo,
      },
      {
        field: 'times',
        defaultValue: res.times,
      },
    ]);

    setModalProps({ confirmLoading: false });
  });

  async function handleSubmit() {
    try {
      const values = await validate();
      if (!values.reason || values.times == 0) {
        closeModal();
        return;
      }
      setModalProps({ confirmLoading: true });
      emit('success', { boxNo: values.boxNo, labelObj });
    } finally {
      setModalProps({ confirmLoading: false });
      closeModal();
    }
  }
</script>
