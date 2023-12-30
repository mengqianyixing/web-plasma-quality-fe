<template>
  <BasicDrawer v-bind="$attrs" @register="register" :title="getTitle" width="85%">
    <BasicTable @register="registerTable" ref="table">
      <template #toolbar>
        <a-button type="primary" @click="handleSelect">选择</a-button>
      </template>
    </BasicTable>
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { computed, ref, unref } from 'vue';
  import { BasicTable, useTable } from '@/components/Table';
  import {
    callbackDrawerSearchFromSchema,
    callbackDrawerColumns,
  } from '@/views/callback/list-generation/generation.data';
  import { generateCallback, getNeedCallbackList } from '@/api/callback/list-generation';
  import { xor } from 'lodash-es';

  const emit = defineEmits(['success', 'register']);

  const selectedRow = ref<Recordable>([]);
  const isUpdate = ref(false);
  const stationNo = ref('');
  const cacheDonorNos = ref<string[]>([]);

  const [registerTable, { reload, getForm, setSelectedRowKeys, getRawDataSource }] = useTable({
    title: '样本批次列表',
    api: getNeedCallbackList,
    columns: callbackDrawerColumns,
    formConfig: {
      labelWidth: 150,
      schemas: callbackDrawerSearchFromSchema,
    },
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'pageVO.totalCount',
      listField: 'pageVO.result',
    },
    afterFetch: (data) => {
      const allDonorNos = data.map((it) => it.donorNo);
      setSelectedRowKeys(xor(allDonorNos, cacheDonorNos.value));
    },
    rowKey: 'donorNo',
    clickToRowSelect: true,
    rowSelection: {
      type: 'checkbox',
      onChange: (_, selectedRows: any) => {
        selectedRow.value = selectedRows;
      },
      onSelect(record, selected) {
        if (!selected) {
          cacheDonorNos.value.push(record.donorNo);
        } else {
          cacheDonorNos.value = cacheDonorNos.value.filter((it) => it !== record.donorNo);
        }
      },
      onSelectAll(selected, _, changeRows) {
        if (!selected) {
          cacheDonorNos.value.push(...changeRows.map((it) => it.donorNo));
        }
      },
    },
    size: 'small',
    striped: false,
    useSearchForm: true,
    showTableSetting: true,
    tableSetting: {
      size: false,
      redo: false,
      setting: false,
    },
    bordered: true,
    showIndexColumn: false,
    canResize: false,
    immediate: false,
  });

  const getTitle = computed(() => (unref(isUpdate) ? '编辑名单' : '生成名单'));

  const table = ref(null);
  const [register, { closeDrawer }] = useDrawerInner(async (data) => {
    isUpdate.value = data.isUpdate;
    stationNo.value = data.record.stationNo;
    if (data.reload) {
      await getForm().updateSchema({
        field: 'stationNo',
        componentProps: {
          options: data.record.options,
        },
      });
      await getForm().setFieldsValue({
        stationNo: data.record.stationNo,
      });
      await reload({
        searchInfo: {
          ...getForm().getFieldsValue(),
        },
      });
    }
  });

  async function handleSelect() {
    const orginDonorNos = getRawDataSource().donorNos;
    await generateCallback({
      stationNo: stationNo.value,
      donorNos: xor(orginDonorNos, cacheDonorNos.value),
    });

    cacheDonorNos.value = [];
    emit('success');
    closeDrawer();
  }
</script>
