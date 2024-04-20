<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="p-4">
    <div class="flex items-center justify-center h-full bg-white">
      <div class="w-600px">
        <BasicForm @register="registerForm" @submit="submit" />
      </div>
    </div>
  </PageWrapper>
</template>
<script setup lang="tsx">
  import { PageWrapper } from '@/components/Page';
  import { BasicForm, useForm } from '@/components/Form';
  import { message } from 'ant-design-vue';
  import { printRecord, replayPrintRecord } from '@/api/tag/printRecord';
  import { PutApiSysPrintingRecordRequest } from '@/api/type/printRecordManage';
  import { onMounted, ref } from 'vue';
  import { getTagDictionary } from '@/api/tag/encoding';
  import { TagDictionaryType } from '@/enums/dictionaryEnum';

  defineOptions({ name: 'TagReplay' });

  const labelTypeDictionary = ref<Recordable[] | undefined>([]);

  onMounted(async () => {
    const dictionaryArr = await getTagDictionary([TagDictionaryType.LabelType]);
    if (!dictionaryArr.length) return;
    labelTypeDictionary.value = dictionaryArr.find(
      (it) => it.dictNo === TagDictionaryType.LabelType,
    )?.dictImtes;
    await updateSchema({
      field: 'labelType',
      componentProps: {
        options: labelTypeDictionary.value,
      },
    });
  });
  const [registerForm, { clearValidate, validate, setProps, updateSchema, resetFields }] = useForm({
    labelWidth: 90,
    size: 'large',
    baseColProps: { span: 24 },
    schemas: [
      {
        field: 'labelType',
        component: 'Select',
        label: '标签类型',
        required: true,
      },
      {
        field: 'bssNo',
        component: 'Input',
        label: '标签编号',
        required: true,
      },
    ],
    showActionButtonGroup: true,
    showResetButton: false,
    submitButtonOptions: { text: '打印' },
    actionColOptions: { span: 4, push: 3 },
  });

  async function submit() {
    try {
      const values = await validate();
      await setProps({ submitButtonOptions: { loading: true } });
      const res = await replayPrintRecord(values as PutApiSysPrintingRecordRequest);
      const params = {
        ...res,
        dpi: res.resolution,
      };
      delete params.resolution;

      await printRecord(params);
      message.success('打印成功');
      await resetFields();
      await clearValidate();
    } finally {
      await setProps({ submitButtonOptions: { loading: false } });
    }
  }
</script>
