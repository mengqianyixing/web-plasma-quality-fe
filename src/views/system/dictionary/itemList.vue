<!--
 * @Descripttion: 
 * @version: 
 * @Author: zcc
 * @Date: 2023-12-21 18:22:50
 * @LastEditors: Ding 1326587277@qq.com
 * @LastEditTime: 2024-02-23 17:34:14
-->
<template>
  <div class="flex h-inherit max-h-inherit min-h-inherit">
    <div class="flex-1 w-full">
      <BasicTable @register="registerTable">
        <template #toolbar>
          <a-button type="primary" @click="handleCreate">新增</a-button>
          <a-button type="primary" @click="handleUpdate">编辑</a-button>
          <template v-if="!(systemLevel > 0)">
            <a-button type="primary" @click="handleRemove">删除</a-button>
            <a-button type="primary" @click="handleSwitch(true)">启用</a-button>
            <a-button type="primary" @click="handleSwitch(false)">禁用</a-button>
          </template>
        </template>
      </BasicTable>
    </div>
  </div>

  <ItemFormModal @register="registerItemFormModal" @success="formSuccess" />
</template>
<script lang="ts" setup>
  import { BasicTable, useTable, FormSchema } from '@/components/Table';
  import { itemColumns, itemSearchFormSchema } from './dictionary.data';
  import { useModalInner, useModal } from '@/components/Modal';
  import { useRoute } from 'vue-router';
  import ItemFormModal from './itemFormDrawer.vue';
  import { message, Modal } from 'ant-design-vue';
  import {
    getDictItemListApi,
    removeDictItemApi,
    updateDictItemApi,
    getDictColumnsApi,
  } from '@/api/dictionary';
  import { getEnumsItems } from '@/api/enums';
  import { ref } from 'vue';

  const currentRoute = useRoute();
  const dictId = ref(currentRoute.meta.dictId);
  const dictName = ref('');
  const systemLevel = ref(currentRoute.meta.systemLevel || 0);
  const linkMap = ref(new Map());
  const enumsMap = ref(new Map());
  const formSchema = ref<FormSchema[]>([]);
  const [registerItemFormModal, { openModal }] = useModal();
  const [registerTable, { getSelectRows, clearSelectedRowKeys, reload, setColumns }] = useTable({
    title: '',
    isCanResizeParent: true,
    api: getDictItemListApi,
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    rowKey: 'dictItemId',
    columns: itemColumns,
    size: 'small',
    formConfig: {
      schemas: itemSearchFormSchema,
    },
    useSearchForm: true,
    showTableSetting: false,
    bordered: true,
    beforeFetch: (params) => {
      return { ...params, dataDictId: dictId.value };
    },
    afterFetch: async (res) => {
      clearSelectedRowKeys();
      const data = res[0];
      setData(data);
      return res;
    },
    rowSelection: { type: 'radio' },
  });
  const setData = async (data) => {
    if (data.header) {
      const columns = data.header.map((_) => ({
        title: _.name,
        dataIndex: _.key,
        className: 'empty-value',
        format: (text: string) => {
          if (_.linkedDict) {
            return linkMap.value.get(_.key)?.get(text) ?? text;
          }
          if (_.enumKey) {
            return enumsMap.value.get(_.key)?.get(text) ?? text;
          }
          return text;
        },
      }));
      const _columns = itemColumns.slice();
      _columns.splice(2, 0, ...columns);
      setColumns(_columns);
      const links = data.header.filter((_) => _.linkedDict);
      const linkRes = await Promise.all(
        links.map((_) => getDictColumnsApi({ linkedDict: _.linkedDict })),
      );
      linkRes.forEach((res: any, i) => {
        links[i].options = (res?.[0]?.dictImtes ?? []).map((item) => ({
          label: `${item.label}(${item.id}) ${item.value}`,
          value: item.id,
        }));
        linkMap.value.set(
          links[i].key,
          links[i].options.reduce((t, c) => {
            t.set(c.value, c.label);
            return t;
          }, new Map()),
        );
      });
      const enums = data.header.filter((_) => _.enumKey);
      const enumsRes = await Promise.all(enums.map((_) => getEnumsItems(_.enumKey)));
      enumsRes.forEach((res: any, i) => {
        enums[i].options = (res?.dataList?.[0]?.enumObjList ?? []).map((item) => ({
          label: `${item.show}(${item.key})`,
          value: item.key,
        }));
        enumsMap.value.set(
          enums[i].key,
          enums[i].options.reduce((t, c) => {
            t.set(c.value, c.label);
            return t;
          }, new Map()),
        );
      });
      formSchema.value = data.header.map((_) => ({
        field: _.key,
        required: _.require,
        component: _.linkedDict || _.enumKey ? 'Select' : 'Input',
        label: _.name,
        componentProps: { options: _.options },
      }));
    } else {
      formSchema.value = [];
      setColumns(itemColumns.slice());
    }
    // reload();
  };
  const [{ setModalProps }] = useModalInner(async ({ data }) => {
    dictId.value = data.dictId;
    dictName.value = data.dictName;
    systemLevel.value = data.systemLevel;
    setModalProps({ confirmLoading: false });
    if (data.header) {
      const columns = data.header.map((_) => ({
        title: _.name,
        dataIndex: _.key,
        className: 'empty-value',
        format: (text: string) => {
          if (_.linkedDict) {
            return linkMap.value.get(_.key)?.get(text) ?? text;
          }
          if (_.enumKey) {
            return enumsMap.value.get(_.key)?.get(text) ?? text;
          }
          return text;
        },
      }));
      const _columns = itemColumns.slice();
      _columns.splice(2, 0, ...columns);
      setColumns(_columns);
      const links = data.header.filter((_) => _.linkedDict);
      const linkRes = await Promise.all(
        links.map((_) => getDictColumnsApi({ linkedDict: _.linkedDict })),
      );
      linkRes.forEach((res: any, i) => {
        links[i].options = (res?.[0]?.dictImtes ?? []).map((item) => ({
          label: `${item.label}(${item.id}) ${item.value}`,
          value: item.id,
        }));
        linkMap.value.set(
          links[i].key,
          links[i].options.reduce((t, c) => {
            t.set(c.value, c.label);
            return t;
          }, new Map()),
        );
      });
      const enums = data.header.filter((_) => _.enumKey);
      const enumsRes = await Promise.all(enums.map((_) => getEnumsItems(_.enumKey)));
      enumsRes.forEach((res: any, i) => {
        enums[i].options = (res?.dataList?.[0]?.enumObjList ?? []).map((item) => ({
          label: `${item.show}(${item.key})`,
          value: item.key,
        }));
        enumsMap.value.set(
          enums[i].key,
          enums[i].options.reduce((t, c) => {
            t.set(c.value, c.label);
            return t;
          }, new Map()),
        );
      });
      formSchema.value = data.header.map((_) => ({
        field: _.key,
        required: _.require,
        component: _.linkedDict || _.enumKey ? 'Select' : 'Input',
        label: _.name,
        componentProps: { options: _.options },
      }));
    } else {
      formSchema.value = [];
      setColumns(itemColumns.slice());
    }
    reload();
  });
  function formSuccess() {
    reload();
    clearSelectedRowKeys();
  }
  function getSelectRow() {
    const rows = getSelectRows();
    if (rows.length === 0) {
      message.warning('请选择数据');
      return [];
    }
    return rows;
  }
  function handleCreate() {
    openModal(true, { data: { dictId: dictId.value }, formSchema: formSchema.value });
  }
  function handleUpdate() {
    const [row] = getSelectRow();
    if (!row) return;
    openModal(true, {
      data: { ...row, dictId: dictId.value, linkMap: linkMap.value },
      formSchema: formSchema.value,
      isUpdate: true,
    });
  }
  function handleRemove() {
    const [row] = getSelectRow();
    if (!row) return;
    Modal.confirm({
      content: `确定删除${row.itemKey}？`,
      onOk: async () => {
        await removeDictItemApi({ dictItemId: row.dictItemId });
        clearSelectedRowKeys();
        reload();
      },
      onCancel: () => Modal.destroyAll(),
    });
  }
  function handleSwitch(enable: boolean) {
    const [row] = getSelectRow();
    if (!row) return;
    if (enable === !!row.enable) return message.warning('状态不需要变更');
    Modal.confirm({
      content: '确认' + (enable ? '启用' : '禁用') + row.itemKey + '?',
      onOk: async () => {
        await updateDictItemApi({ dictItemId: row.dictItemId, ...row, enable });
        clearSelectedRowKeys();
        reload();
      },
      onCancel: () => Modal.destroyAll(),
    });
  }
</script>
