<!--
 * @Descripttion: 
 * @version: 
 * @Author: zcc
 * @Date: 2023-12-21 18:22:50
 * @LastEditors: Ding 1326587277@qq.com
 * @LastEditTime: 2024-03-01 10:17:46
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
  <Login
    @register="registerLoginModal"
    @success="login"
    :auth-code="ReCheckButtonEnum.TrayManageCheck"
  />
</template>
<script lang="ts" setup>
  import Login from '@/__components/ReviewLoginModal/index.vue';
  import { BasicTable, useTable, FormSchema } from '@/components/Table';
  import { itemColumns, itemSearchFormSchema } from './dictionary.data';
  import { useModal } from '@/components/Modal';
  import { useRoute } from 'vue-router';
  import ItemFormModal from './itemFormDrawer.vue';
  import { message, Modal } from 'ant-design-vue';
  import {
    getDictListApi,
    getDictItemListApi,
    removeDictItemApi,
    updateDictItemApi,
    getDictColumnsApi,
  } from '@/api/dictionary';
  import { getEnumsItems } from '@/api/enums';
  import { ref, onMounted } from 'vue';
  import { ReCheckButtonEnum } from '@/enums/authCodeEnum';

  const currentRoute = useRoute();
  const dictId = ref(currentRoute.meta.dictId);
  // const dictName = ref('');
  console.log('currentRoute', currentRoute);
  const systemLevel = ref(currentRoute.meta.systemLevel || 0);
  const linkMap = ref(new Map());
  const enumsMap = ref(new Map());
  const formSchema = ref<FormSchema[]>([]);
  let updataFormSchema = ref<FormSchema[]>([]);
  let isDelete = ref(true);
  const [registerItemFormModal, { openModal }] = useModal();
  const [registerTable, { getSelectRows, clearSelectedRowKeys, reload, setColumns, setProps }] =
    useTable({
      title: '',
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
      canResize: true,
      beforeFetch: (params) => {
        return { ...params, dataDictId: dictId.value };
      },
      afterFetch: async (res) => {
        clearSelectedRowKeys();
        return res;
      },
      rowSelection: { type: 'radio' },
    });

  const [registerLoginModal, { openModal: openLoginModal }] = useModal();
  onMounted(() => {
    setData();
  });
  const setData = async () => {
    const res = await getDictListApi({ pageSize: 1000, currPage: 1, queryMenu: true });
    const result = res.result.filter((x) => x.dictId === dictId.value);
    const data = result && result.length > 0 ? result[0] : {};
    if (data.header) {
      const _columns = itemColumns.slice();
      const columns = data.header
        .map((_) => {
          if (_.key === 'itemKey') {
            const index = _columns.findIndex((x) => x.dataIndex === 'itemKey');
            _columns[index].title = _.name;
          } else {
            return {
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
            };
          }
        })
        .filter((x) => x);
      _columns.splice(2, 0, ...columns);
      setColumns(_columns);
      const links = data.header.filter((_) => _.linkedDict);
      const linkRes = await Promise.all(
        links.map((_) => getDictColumnsApi({ linkedDict: _.linkedDict })),
      );
      links.forEach((x, i) => {
        if (x.type === 'fsLink' && x.linkedDictKey) {
          linkRes[i][0].linkedDictKey = x.linkedDictKey;
        }
      });
      linkRes.forEach((res: any, i) => {
        links[i].options = (res?.[0]?.dictImtes ?? []).map((item) => ({
          label: `${item.label}`,
          value: res[0].linkedDictKey ? item[res[0].linkedDictKey] : item.id,
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
      formSchema.value = [
        ...data.header.map((_) => ({
          field: _.key,
          required: _.required,
          component:
            _.linkedDict || _.enumKey ? 'Select' : _.type === 'int' ? 'InputNumber' : 'Input',
          label: _.name,
          ifDisable: _.disable,
          componentProps: {
            options: _.options,
            maxlength: _.maxSize,
          },
          dynamicRules: () => {
            return [
              {
                required: _.required,
                validator: (x, value) => {
                  if (_.required && (!value || value === '')) {
                    return Promise.reject(`必填!`);
                  }
                  if (_.required && _.minSize && value.length < _.minSize) {
                    return Promise.reject(`长度必须大于${_.minSize}!`);
                  }
                  return Promise.resolve();
                },
              },
            ];
          },
        })),
        {
          field: 'itemDesc',
          label: '描述',
          component: 'InputTextArea',
          colProps: { span: 24 },
        },
      ];
      updataFormSchema.value = formSchema.value.map((_) => ({
        ..._,
        componentProps: {
          ...(_.componentProps || {}),
          disabled: _.componentProps ? _.ifDisable : false,
        },
      }));
    } else {
      formSchema.value = [];
      setColumns(itemColumns.slice());
    }
    if (data.query) {
      const formConfig = {
        schemas: [],
      };
      const links = data.query.filter((_) => _.linkedDict);
      const linkRes = await Promise.all(
        links.map((_) => getDictColumnsApi({ linkedDict: _.linkedDict })),
      );
      links.forEach((x, i) => {
        if (x.type === 'fsLink' && x.linkedDictKey) {
          linkRes[i][0].linkedDictKey = x.linkedDictKey;
        }
      });
      linkRes.forEach((res: any, i) => {
        links[i].options = (res?.[0]?.dictImtes ?? []).map((item) => ({
          label: item.label,
          value: res[0].linkedDictKey ? item[res[0].linkedDictKey] : item.id,
        }));
        linkMap.value.set(
          links[i].key,
          links[i].options.reduce((t, c) => {
            t.set(c.value, c.label);
            return t;
          }, new Map()),
        );
      });
      data.query.forEach(async (x) => {
        const d = {
          field: x.key,
          label: x.name,
          component: 'Select',
          componentProps: {
            options: x.options,
          },
        };
        if (formConfig.schemas.filter((q) => q.field === d.field).length === 0) {
          formConfig.schemas.push(d);
        }
      });
      setProps({ formConfig });
    }
    reload();
  };
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
  async function login() {
    const rows = getSelectRows();
    const [row] = rows;
    if (isDelete.value) {
      await removeDictItemApi({ dictItemId: row.dictItemId });
      clearSelectedRowKeys();
    } else {
      await updateDictItemApi({ dictItemId: row.dictItemId, ...row, enable: false });
      clearSelectedRowKeys();
    }
    reload();
  }
  function handleCreate() {
    openModal(true, { data: { dictId: dictId.value }, formSchema: formSchema.value });
  }
  function handleUpdate() {
    const [row] = getSelectRow();
    if (!row) return;
    openModal(true, {
      data: { ...row, dictId: dictId.value, linkMap: linkMap.value },
      formSchema: updataFormSchema.value,
      isUpdate: true,
    });
  }
  function handleRemove() {
    const [row] = getSelectRow();
    if (!row) return;
    Modal.confirm({
      content: `确定删除${row.itemKey}？`,
      onOk: async () => {
        isDelete.value = true;
        openLoginModal(true, {});
        // await removeDictItemApi({ dictItemId: row.dictItemId });
        // clearSelectedRowKeys();
        // reload();
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
        if (!enable) {
          isDelete.value = false;
          openLoginModal(true, {});
          return;
        }

        await updateDictItemApi({ dictItemId: row.dictItemId, ...row, enable });
        clearSelectedRowKeys();
        reload();
      },
      onCancel: () => Modal.destroyAll(),
    });
  }
</script>
