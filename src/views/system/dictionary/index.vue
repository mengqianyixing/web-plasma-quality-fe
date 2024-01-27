<!--
 * @Descripttion:
 * @version:
 * @Author: zcc
 * @Date: 2023-12-21 17:29:52
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-27 11:46:13
-->
<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex" class="p-16px">
    <BasicTable @register="registerTable" @expand="expand">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">新增</a-button>
        <a-button type="primary" @click="handleUpdate">编辑</a-button>
        <a-button type="primary" @click="handleRemove">删除</a-button>
        <a-button type="primary" @click="handleCreateItem()">字典项配置</a-button>
      </template>
    </BasicTable>
    <FormModel @register="registerModal" @success="formSuccess" />
    <ItemListModal @register="registerItemModal" @close="formSuccess" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';
  import { PageWrapper } from '@/components/Page';
  import { columns, searchFormSchema } from './dictionary.data';
  import { useModal } from '@/components/Modal';
  import { message, Modal } from 'ant-design-vue';
  import FormModel from './formDrawer.vue';
  import ItemListModal from './itemListDrawer.vue';
  import { getDictListApi, removeDictApi, getDictItemListApi } from '@/api/dictionary';
  import { PostApiSysDictsResponse } from '@/api/type/dictionary';

  defineOptions({ name: 'Dictionary' });

  const [registerModal, { openModal }] = useModal();
  const [registerItemModal, { openModal: openItemModal }] = useModal();

  let id = 1;
  const [registerTable, { getSelectRows, reload, clearSelectedRowKeys, setLoading }] = useTable({
    api: getDictListApi,
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    showIndexColumn: false,
    columns,
    size: 'small',
    formConfig: {
      schemas: searchFormSchema,
    },
    rowKey: 'id',
    useSearchForm: true,
    showTableSetting: false,
    bordered: true,
    afterFetch: (res: PostApiSysDictsResponse['result']) => {
      clearSelectedRowKeys();
      return res?.map((_) => ({ ..._, id: ++id, children: _.systemLevel > 1 ? [] : void 0 }));
    },
    rowSelection: { type: 'radio' },
    canResize: true,
  });
  function formSuccess() {
    reload();
    clearSelectedRowKeys();
  }
  function handleCreate() {
    openModal(true, { data: {} });
  }
  async function expand(expanded: boolean, row: Recordable) {
    if (row.children.length) return;
    try {
      setLoading(true);
      const res = await getDictItemListApi({ dataDictId: row.dictId, pageSize: 1000, currPage: 1 });
      row.children.push(
        ...(res.result || []).map((_) => ({
          id: ++id,
          dictId: _.fkLink,
          dictName: _.itemKey,
          dictNo: _.itemValue,
          dictDesc: _.itemDesc,
          systemLevel: row.systemLevel,
          creater: _.createAt,
          createAt: _.createAt,
          updater: _.updater,
          updateAt: _.updateAt,
        })),
      );
    } finally {
      setLoading(false);
    }
  }
  function handleUpdate() {
    const [row] = getSelectRow();
    if (!row) return;
    if (row.systemLevel > 0) return message.warning('系统字典不可修改');
    openModal(true, { data: row, isUpdate: true });
  }
  function handleRemove() {
    const [row] = getSelectRow();
    if (!row) return;
    if (row.systemLevel > 0) return message.warning('系统字典不可删除');
    Modal.confirm({
      content: `确定删除${row.dictName}？`,
      onOk: async () => {
        removeDictApi({ dictId: row.dictId });
        clearSelectedRowKeys();
        reload();
      },
      onCancel: () => Modal.destroyAll(),
    });
  }
  function handleCreateItem() {
    const [row] = getSelectRow();
    if (!row) return;
    console.log(row);
    openItemModal(true, { data: row });
  }
  function getSelectRow() {
    const rows = getSelectRows();
    if (rows.length === 0) {
      message.warning('请选择数据');
      return [];
    }
    return rows;
  }
</script>
