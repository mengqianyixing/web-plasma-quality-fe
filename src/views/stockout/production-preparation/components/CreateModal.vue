<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :title="getTitle"
    @ok="handleSubmit"
    @close="resetFields"
    width="450px"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { FormSchema, BasicForm, useForm } from '@/components/Form';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { bagFlagMap, pickModeMap } from '@/enums/stockoutEnum';
  import { addPrepare, updatePrepare } from '@/api/stockout/production-preparation.js';
  import { useMessage } from '@/hooks/web/useMessage';

  import { SERVER_ENUM } from '@/enums/serverEnum';
  import { useServerEnumStoreWithOut } from '@/store/modules/serverEnums';
  import { getSysParamsByParamKey } from '@/api/systemServer/params';
  import { SysParamsEnum } from '@/enums/sysParamsEnum';
  import {
    PostApiProductPrepareSaveRequest,
    PostApiProductPrepareUpdateRequest,
  } from '@/api/type/productionPreparation';

  const serverEnumStore = useServerEnumStoreWithOut();
  const { createMessage } = useMessage();
  const { success } = createMessage;

  const emit = defineEmits(['success', 'register']);

  const companyFlag = ref('');
  const isUpdate = ref(true);
  const prepareNo = ref(''); // 准备号
  const formSchema: FormSchema[] = [
    {
      field: 'prepareNo',
      label: '投产准备号',
      component: 'Input',
      colProps: { span: 24 },
      componentProps: { disabled: true },
    },
    {
      field: 'prodType',
      label: '投产类型',
      component: 'Select',
      colProps: { span: 24 },
      required: true,
      defaultValue: 'N',
      componentProps: {
        options: serverEnumStore.getServerEnum(SERVER_ENUM.PlasmaType),
      },
    },
    {
      field: 'bagFlag',
      label: '限制血浆',
      component: 'Select',
      colProps: { span: 24 },
      required: true,
      defaultValue: 'NO',
      componentProps: {
        options: [...bagFlagMap.entries()].map(([key, value]) => ({
          value: key,
          label: value,
        })),
      },
    },
    {
      field: 'pickMode',
      label: '挑浆模式',
      component: 'Select',
      colProps: { span: 24 },
      required: true,
    },
  ];
  const [registerForm, { resetFields, setFieldsValue, validate, updateSchema }] = useForm({
    labelWidth: 80,
    baseColProps: { span: 48 },
    schemas: formSchema,
    showActionButtonGroup: false,
  });

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    await resetFields();
    setModalProps({ confirmLoading: false });

    companyFlag.value = await getSysParamsByParamKey(SysParamsEnum.BloodProductionCompany);
    await updateSchema({
      field: 'pickMode',
      defaultValue: companyFlag.value === 'RS' ? 'B' : '',
      componentProps: {
        options:
          companyFlag.value === 'RS'
            ? [
                {
                  label: '投/暂不投/待放行',
                  value: 'B',
                },
              ]
            : [...pickModeMap.entries()].map(([key, value]) => ({
                value: key,
                label: `${key}，${value}`,
              })),
      },
    });
    isUpdate.value = !!data?.isUpdate;
    prepareNo.value = data?.record?.prepareNo;
    if (unref(isUpdate)) {
      await updateSchema({
        field: 'prepareNo',
        ifShow: true,
      });
      await setFieldsValue({
        ...data.record,
      });
    } else {
      // 新增不需要准备号字段
      await updateSchema({
        field: 'prepareNo',
        ifShow: false,
      });
    }
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增投产准备' : '编辑投产准备'));

  async function handleSubmit() {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });
      if (isUpdate.value) {
        await updatePrepare({
          ...values,
          prepareNo: prepareNo.value,
        } as PostApiProductPrepareUpdateRequest);
        success('修改成功!');
      } else {
        await addPrepare(values as PostApiProductPrepareSaveRequest);
        success('新增成功!');
      }
      closeModal();
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
