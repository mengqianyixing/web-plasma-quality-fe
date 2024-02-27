<template>
  <BasicModal
    width="50%"
    :centered="false"
    v-bind="$attrs"
    @register="registerModal"
    :title="getTitle"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm">
      <template #users="{ model, field }">
        <Select
          v-model:value="model[field]"
          mode="multiple"
          allowClear
          showSearch
          placeholder="请选择角色"
          style="width: 100%"
          :filter-option="filterOption"
        >
          <SelectOption
            v-for="option in roleOptions"
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
  import { addFormSchema, updateFormSchema, passwordFormSchema } from './users.data';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { addCasDoorUser, setCasDoorUserPwd, setCasDoorUser } from '@/api/oauth/users';
  import { getCasDoorAllPolicyRoles } from '@/api/oauth/policies';
  import { Select, SelectOption } from 'ant-design-vue';

  const emit = defineEmits(['success', 'register']);
  const isUpdate = ref(true);
  const isPassword = ref(false);
  const userId = ref('');
  const roleOptions = ref<any[]>([]);

  const getFormSchema = computed(() =>
    unref(isPassword) ? passwordFormSchema : !unref(isUpdate) ? addFormSchema : updateFormSchema,
  );

  getCasDoorAllPolicyRoles().then((res) => {
    roleOptions.value = res.map((item) => {
      return {
        label: item.displayName,
        value: item.name,
      };
    });
  });

  const filterOption = (input: string, option: any) => {
    return option.key.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };

  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 90,
    baseColProps: { span: 24 },
    schemas: getFormSchema,
    showActionButtonGroup: false,
  });

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    resetFields();
    setModalProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;
    isPassword.value = !!data?.isPassword;

    if (unref(isUpdate) || unref(isPassword)) {
      userId.value = data.record.name;
      setFieldsValue({
        ...data.record,
        forbidden: data.record.isForbidden,
        oldName: data.record.name,
        userName: data.record.name,
        roles: data.record.roles ? data.record.roles.map((_) => _.name) : '',
      });
    }
  });

  const getTitle = computed(() =>
    unref(isPassword) ? '重置密码' : !unref(isUpdate) ? '新增用户' : '编辑用户',
  );

  async function handleSubmit() {
    try {
      const values = await validate();
      // loading
      setModalProps({ confirmLoading: true });
      try {
        if (unref(isPassword)) {
          await setCasDoorUserPwd({
            ...values,
          });
        } else if (unref(isUpdate)) {
          await setCasDoorUser({
            ...values,
            oldName: userId.value,
          });
        } else {
          await addCasDoorUser({
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
