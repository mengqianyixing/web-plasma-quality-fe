<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm">
      <template #resource="{ model, field }">
        <BasicTree
          v-model:value="model[field]"
          :treeData="treeData"
          :checkedKeys="checkedKeys"
          :fieldNames="{ title: 'menuName', key: 'menuId' }"
          checkable
          checkStrictly
          toolbar
          title="菜单分配"
        />
      </template>
    </BasicForm>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref, watch } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './resource.data';

  import {
    addResource,
    editResource,
    getMenuTree,
    getResourceDetail,
  } from '/@/api/systemServer/system';
  import { BasicTree, TreeItem } from '@/components/Tree';
  import {
    GetApiSysResourceIdResponse,
    PostApiSysResourceRequest,
    PutApiSysResourceRequest,
  } from '@/api/type/resourcesManage';

  export default defineComponent({
    name: 'DeptModal',
    components: { BasicTree, BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const treeData = ref<TreeItem[]>([]);
      const checkedKeys = ref<Array<string>>([]);
      const resourceId = ref('');

      const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
        labelWidth: 100,
        baseColProps: { span: 24 },
        schemas: formSchema,
        showActionButtonGroup: false,
      });

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        resetFields();
        setModalProps({ confirmLoading: false });

        if (unref(treeData).length === 0) {
          treeData.value = (await getMenuTree()) as unknown as TreeItem[];
        }
        isUpdate.value = !!data?.isUpdate;

        if (unref(isUpdate)) {
          resourceId.value = data.record.resourceId;
          const res = (await getResourceDetail(resourceId.value)).menuTree;
          checkedKeys.value = flattenTreeArr(res, []);
          setFieldsValue({
            ...data.record,
          });
        }
      });

      watch(
        () => checkedKeys.value,
        (val) => {
          console.log(val);
        },
        {
          immediate: true,
        },
      );

      function flattenTreeArr(
        tree: GetApiSysResourceIdResponse['menuTree'],
        arr: any,
      ): Array<string> {
        if (tree) {
          tree.forEach((item) => {
            const { children, ...props } = item;
            props.check && arr.push(props.menuId);
            if (children && children.length != 0) {
              flattenTreeArr(children as unknown as GetApiSysResourceIdResponse['menuTree'], arr);
            }
          });
        }
        return arr;
      }

      const getTitle = computed(() => (!unref(isUpdate) ? '新增资源' : '编辑资源'));

      async function handleSubmit() {
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });
          if (isUpdate.value) {
            await editResource({
              ...values,
              resourceMenuList: values.menuIds.checked,
              resourceId: resourceId.value,
            } as PutApiSysResourceRequest);
          } else {
            await addResource({
              ...values,
              resourceMenuList: values.menuIds.checked,
            } as PostApiSysResourceRequest);
          }
          closeModal();
          emit('success');
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      return { registerModal, registerForm, getTitle, handleSubmit, treeData, checkedKeys };
    },
  });
</script>
