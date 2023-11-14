<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm">
      <template #roleSelect="{ model, field }">
        <ApiSelect
          :api="getRoleListByPage"
          :params="selectParams"
          mode="multiple"
          :value="defaultSelectValue"
          @change="model[field]"
          resultField="result"
          labelField="roleName"
          valueField="roleId"
        />
      </template>
    </BasicForm>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { ApiSelect, BasicForm, useForm } from '/@/components/Form/index';
  import { accountFormSchema } from './account.data';
  import { addUser, editUser, getRoleListByPage } from '/@/api/systemServer/system';
  import { PostSysUserRequest } from '@/api/type/userManage';

  export default defineComponent({
    name: 'AccountModal',
    components: { ApiSelect, BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const rowId = ref('');
      const selectParams = {
        currPage: 1,
        pageSize: 999,
      };
      const defaultSelectValue = ref([]);
      const userId = ref('');

      const [registerForm, { setFieldsValue, resetFields, validate }] = useForm({
        labelWidth: 100,
        baseColProps: { span: 24 },
        schemas: accountFormSchema,
        showActionButtonGroup: false,
        actionColOptions: {
          span: 23,
        },
      });

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        resetFields();
        setModalProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;

        if (unref(isUpdate)) {
          defaultSelectValue.value = data.record.roles.map((it) => it.roleId);
          userId.value = data.record.userId;
          rowId.value = data.record.id;
          setFieldsValue({
            ...data.record,
          });
        } else {
          defaultSelectValue.value = [];
        }
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增账号' : '编辑账号'));

      async function handleSubmit() {
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });
          if (unref(isUpdate)) {
            await editUser({
              ...values,
              userId: userId.value,
            });
          } else {
            await addUser({
              ...values,
            } as PostSysUserRequest);
          }
          closeModal();
          emit('success', { isUpdate: unref(isUpdate), values: { ...values, id: rowId.value } });
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      return {
        registerModal,
        registerForm,
        getTitle,
        handleSubmit,
        selectParams,
        defaultSelectValue,
      };
    },
    methods: { getRoleListByPage },
  });
</script>
