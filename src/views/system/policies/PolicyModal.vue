<template>
  <BasicModal
    :centered="false"
    v-bind="$attrs"
    @register="registerModal"
    :min-height="500"
    :title="getTitle"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm">
      <template #v0="{ model, field }">
        <Select
          v-model:value="model[field]"
          allowClear
          showSearch
          placeholder="请选择角色"
          style="width: 100%"
          :filter-option="filterOption"
        >
          <SelectOption
            v-for="option in userOptions"
            :key="option.label + option.value"
            :value="option.value"
          >
            {{ option.label }}
          </SelectOption>
        </Select>
      </template>
    </BasicForm>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicForm, useForm } from '@/components/Form';
  import { formSchema } from './policies.data';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { Select, SelectOption } from 'ant-design-vue';
  import {
    getCasDoorAllPolicyRoles,
    addCasDoorPolicy,
    setCasDoorPolicy,
  } from '@/api/oauth/policies';

  const emit = defineEmits(['success', 'register']);
  const isUpdate = ref(true);
  const oldPolicyData = ref<any>({});
  const userOptions = ref<any[]>([]);

  getCasDoorAllPolicyRoles().then((res) => {
    userOptions.value = res.map((item) => {
      return {
        label: item.owner + '/' + item.name + '(' + (item.displayName || item.name) + ')',
        value: item.owner + '/' + item.name,
      };
    });
  });

  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 90,
    baseColProps: { span: 24 },
    schemas: formSchema,
    showActionButtonGroup: false,
  });

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    resetFields();
    setModalProps({ confirmLoading: false });

    isUpdate.value = !!data?.isUpdate;

    if (unref(isUpdate)) {
      oldPolicyData.value = data.record;
      setFieldsValue({
        ...data.record,
        oldPolicy: data.record,
      }).then(() => {});
    }
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增策略' : '编辑策略'));

  const filterOption = (input: string, option: any) => {
    return option.key.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };

  async function handleSubmit() {
    try {
      const values = await validate();
      // loading
      setModalProps({ confirmLoading: true });
      try {
        if (unref(isUpdate)) {
          await setCasDoorPolicy({
            newPolicy: {
              ...oldPolicyData.value,
              ...values,
            },
            oldPolicy: oldPolicyData.value,
          });
        } else {
          await addCasDoorPolicy({
            ...values,
          });
        }
      } catch (e) {
        console.log(e);
      }
      setModalProps({ confirmLoading: false });
      closeModal();
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
