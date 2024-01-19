<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    title="重量登记"
    width="23%"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm">
      <template #check="{ model, field }">
        <a-input
          disabled
          placeholder="请点击登录按钮"
          v-model:value="model[field]"
          style="width: calc(100% - 80px)"
        />
        <a-button type="primary" @click="handleLogin" class="ml-3">登录</a-button>
      </template>
    </BasicForm>

    <LoginModal @register="registerLoginModal" @success="handleSuccess" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicModal, useModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form';
  import { useMessage } from '@/hooks/web/useMessage';

  import { pick } from 'lodash-es';
  import { registerPlasmaWeight } from '@/api/inbound-management/plasma-inbound-record';
  import { PostApiCoreBatchPlasmaWeightRequest } from '@/api/type/batchManage';
  import LoginModal from '@/__components/ReviewLoginModal/index.vue';

  const { createMessage } = useMessage();
  defineOptions({ name: 'PickPlasmaModal' });

  const emit = defineEmits(['success', 'register']);

  const [registerLoginModal, { openModal: openLoginModal }] = useModal();

  const [registerForm, { resetFields, validate, setFieldsValue, getFieldsValue }] = useForm({
    schemas: [
      {
        field: 'reviewer',
        label: '复核人',
        component: 'Input',
        colProps: { span: 20 },
        slot: 'check',
        componentProps: {
          disabled: true,
        },
        required: true,
      },
      {
        field: 'verifyNum',
        label: '血浆袋数',
        component: 'Input',
        componentProps: {
          disabled: true,
        },
      },
      {
        field: 'totalGrossWeight',
        label: '血浆总毛重(g)',
        helpMessage() {
          return '不允许输入小数！';
        },
        component: 'InputNumber',
        required: true,
        componentProps: {
          precision: 0,
          onChange: (e: number) => {
            if (!e) {
              setFieldsValue({
                netWeight: undefined,
                singleBagGrossWeight: undefined,
              });
              return;
            }
            //todo 36是单袋毛重要走基础设置
            const netWeight = Number(e) - 36 * Number(getFieldsValue().verifyNum);

            //尾数做平
            const flag = Number(netWeight) % Number(getFieldsValue().verifyNum);
            const myopiaValue = Math.floor(Number(netWeight) / Number(getFieldsValue().verifyNum));
            const singleBagGrossWeight = flag ? myopiaValue + 1 : myopiaValue;

            setFieldsValue({
              netWeight,
              singleBagGrossWeight,
            });
          },
        },
      },
      {
        field: 'netWeight',
        label: '总净重(g)',
        component: 'InputNumber',
        componentProps: {
          disabled: true,
        },
      },
      {
        field: 'singleBagGrossWeight',
        label: '单袋净重(g)',
        component: 'Input',
        componentProps: {
          disabled: true,
        },
      },
      {
        field: 'batchNo',
        label: '血浆批次',
        component: 'Input',
        ifShow: false,
      },
    ],
    showActionButtonGroup: false,
    transformDateFunc(date) {
      return date ? date.format('YYYY-MM-DD') : '';
    },
  });

  const [registerModal, { setModalProps, closeModal }] = useModalInner((data) => {
    setFieldsValue({
      verifyNum: data.record.verifyNum,
      totalGrossWeight: data.record.verifyWeight * 1000 + 36 * data.record.verifyNum,
      batchNo: data.record.batchNo,
    });
  });

  async function handleSubmit() {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });

      if (Number(values.singleBagGrossWeight) > 600) {
        createMessage.error('单袋净重超过 600g，录入不成功');
        return;
      }

      const _values = {
        ...values,
        netWeight: Number(values.netWeight),
      };
      console.log(pick(_values, ['reviewer', 'batchNo', 'netWeight']), _values);

      await registerPlasmaWeight(
        pick(_values, ['reviewer', 'batchNo', 'netWeight']) as PostApiCoreBatchPlasmaWeightRequest,
      );

      createMessage.success('登记成功');

      await resetFields();
      closeModal();
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }

  function handleLogin() {
    openLoginModal(true);
  }

  function handleSuccess(nickname: string) {
    setFieldsValue({ reviewer: nickname });
  }
</script>
