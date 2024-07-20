<template>
  <div class="h-full">
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleBinding" v-show="props.isBinding">
          绑定托盘
        </a-button>
        <a-button type="primary" @click="handleUnbinding" v-show="!props.isBinding">
          解绑托盘
        </a-button>
      </template>
    </BasicTable>
    <BasicModal
      @register="registerModal"
      width="300px"
      title="托盘绑定"
      @ok="confirm"
      :show-footer="true"
    >
      <BasicForm @register="registerForm" />
    </BasicModal>
  </div>
</template>
<script setup lang="ts">
  import { BasicTable, useTable } from '@/components/Table';
  import { BasicForm, useForm } from '@/components/Form';

  import { plasmaBoxHandSearchFormSchema, plasmaBoxHandColumns } from './relocation.data';
  import { BasicModal, useModal } from '@/components/Modal';
  import { message } from 'ant-design-vue';
  import { bindBoxApi, getBankBoxesList } from '@/api/tray/relocation';
  import { watch } from 'vue';
  import { useMessage } from '@/hooks/web/useMessage';
  import { cloneDeep, isEqual, isNull } from 'lodash-es';

  const { createMessage } = useMessage();

  const props = defineProps({
    isBinding: {
      type: Boolean,
    },
  });

  watch(
    () => props.isBinding,
    (val) => {
      if (!val) {
        setTimeout(() => {
          setColumns([
            ...plasmaBoxHandColumns,
            {
              title: '托盘编号',
              dataIndex: 'trayNo',
              width: 100,
            },
          ]);
          getForm().appendSchemaByField(
            {
              label: '托盘编号',
              field: 'trayNo',
              component: 'Input',
            },
            '',
            false,
          );
        }, 0);
      }
    },
    {
      immediate: true,
    },
  );
  const [registerModal, { openModal, setModalProps }] = useModal();
  const [registerForm, { validate, clearValidate, resetFields }] = useForm({
    labelWidth: 90,
    baseColProps: { span: 24 },
    schemas: [{ label: '托盘编号', required: true, component: 'Input', field: 'trayNo' }],
    showActionButtonGroup: false,
    showResetButton: false,
  });

  function isEmptyValue(value) {
    return !(
      isEqual(value, {}) || // 空对象
      typeof value === 'undefined' || // undefined
      isNull(value) || // null
      value === '' || // 空字符串
      (Array.isArray(value) && value.length === 0)
    );
  }

  function deleteInvalidProperties(obj, strict = true) {
    if (!obj) return obj;
    const copyObj = cloneDeep(obj);
    Object.entries(obj).forEach(([key, value]) => {
      if (value && typeof value === 'object') {
        copyObj[key] = deleteInvalidProperties(value, strict);
        value = copyObj[key];
      }
      if (!isEmptyValue(value)) {
        delete copyObj[key];
      }
    });
    return copyObj;
  }

  async function submitFunc() {
    const searchForm = getForm().getFieldsValue();

    const _searchForm = deleteInvalidProperties(searchForm);

    if (Object.keys(_searchForm).length === 0) {
      createMessage.error('请至少输入一个查询条件');
    } else {
      await reload();
    }
  }
  const [registerTable, { getSelectRows, reload, clearSelectedRowKeys, getForm, setColumns }] =
    useTable({
      immediate: false,
      beforeFetch: (params) => {
        return {
          ...params,
          type: props.isBinding ? 'bind' : 'unbind',
        };
      },
      api: getBankBoxesList,
      fetchSetting: {
        pageField: 'currPage',
        sizeField: 'pageSize',
        totalField: 'totalCount',
        listField: 'result',
      },
      formConfig: {
        schemas: plasmaBoxHandSearchFormSchema,
        submitFunc,
        submitOnReset: true,
      },
      columns: plasmaBoxHandColumns,
      useSearchForm: true,
      bordered: true,
      size: 'small',
      afterFetch: (res) => {
        clearSelectedRowKeys();
        return res;
      },
      rowSelection: { type: 'checkbox' },
    });

  const { createConfirm } = useMessage();

  function handleUnbinding() {
    const row = getSelectRows();
    if (row.length === 0) return message.warning('请选择数据');
    createConfirm({
      iconType: 'warning',
      content: '确认?',
      onOk: async () => {
        const boxes = row.map((_) => _.boxNo);

        await bindBoxApi({
          //必填项
          trayNo: 'demo',
          type: props.isBinding ? 'bind' : 'unbind',
          boxes: boxes,
          bizScen: 'handwork',
        });
        await reload();
      },
    });
  }
  function handleBinding() {
    const row = getSelectRows();
    if (row.length === 0) return message.warning('请选择数据');
    resetFields();
    clearValidate();
    openModal(true);
  }
  async function confirm() {
    try {
      const { trayNo } = await validate();
      const rows = getSelectRows();
      const boxes = rows.map((_) => _.boxNo);
      setModalProps({ confirmLoading: true });
      await bindBoxApi({
        trayNo: trayNo,
        type: props.isBinding ? 'bind' : 'unbind',
        boxes: boxes,
        bizScen: 'handwork',
      });
      setModalProps({ confirmLoading: false });
      openModal(false);
      clearSelectedRowKeys();
      await reload();
    } catch (e) {
      console.log(e);
    }
  }
</script>
