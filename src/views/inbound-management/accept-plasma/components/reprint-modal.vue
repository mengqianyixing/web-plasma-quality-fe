<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    title="打印箱签"
    width="500"
    :destroyOnClose="true"
    @ok="handleSubmit"
    @open-change="handleVisibleChange"
    class="print-modal"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { nextTick } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm, FormSchema } from '@/components/Form';
  import { getPrintRecord } from '@/api/tag/printRecord';
  import { useUserStore } from '@/store/modules/user';
  import dayjs from 'dayjs';

  const userInfo = useUserStore();
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
      field: 'ok',
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
      // defaultValue: 0,
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
    setModalProps({ confirmLoading: true });
    const acceptList = data.acceptList;
    const maxBagNo =
      acceptList
        .map((item) => item.bagNo)
        .sort((a, b) => {
          let numA = Number(a.match(/\d+$/)[0]);
          let numB = Number(b.match(/\d+$/)[0]);
          return numB - numA;
        })?.[0] || '';
    const minBagNo =
      acceptList
        .map((item) => item.bagNo)
        .sort((a, b) => {
          let numA = Number(a.match(/\d+$/)[0]);
          let numB = Number(b.match(/\d+$/)[0]);
          return numA - numB;
        })?.[0] || '';
    // 获取标签相关样式
    const res = await getPrintRecord({
      labelType: 'PLAIN_BOX',
      bissNo: data.boxNo, // 业务主键号
      param: {
        stationName: data.stationName,
        batchNo: data.batchNo,
        bagNo: `${minBagNo}-${maxBagNo}`,
        plasmaType: '暂写普通',
        bagCount: acceptList?.length,
        operator: userInfo.getUserInfo.username,
        packageDate: dayjs().format('YYYY-MM-DD'),
        boxNo: data.boxNo,
        barCode: data.boxNo,
      },
    });
    labelObj = res;
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
      if (!values.ok || values.times == 0) {
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

  function handleVisibleChange(visible) {
    if (visible) {
      nextTick(() => {
        const okButton = document.querySelector(
          '.ant-modal .print-modal .ant-btn-primary',
        ) as HTMLElement;
        if (okButton) okButton.focus();
        // console.log(document.activeElement);
      });
    }
  }
</script>
