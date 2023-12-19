<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    title="托盘出库"
    width="500px"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
    <BasicTable @register="registerTable">
      <template #location="{ record }">
        {{ record.location || record.area }}
        <a-button v-show="state.columnLabel === '货位'" @click="selectLocation(record)"
          >选择
        </a-button>
      </template>
    </BasicTable>
    <LocationModal @register="registerLocationDrawer" />
  </BasicDrawer>
</template>
<script setup lang="ts">
  import { BasicDrawer, useDrawerInner, useDrawer } from '@/components/Drawer';
  import { BasicForm, useForm } from '@/components/Form';
  import { BasicTable, useTable } from '@/components/Table';
  import { reactive } from 'vue';
  import { inStoreAreaSchema, inStoreFormSchema } from './outInStore.data';
  import LocationModal from './locationModal.vue';

  type Record = {
    area: string;
    location: string;
    trayNo: string;
  };
  const [registerLocationDrawer, { openDrawer: openLocationDrawer }] = useDrawer();
  const state = reactive({
    data: [] as Record[],
    houseList: [] as any,
    columnLabel: '',
    record: {},
  });
  const [registerTable, { reload }] = useTable({
    api: getData,
    fetchSetting: {
      listField: 'result',
    },
    rowKey: 'trayNo',
    columns: [
      { title: '托盘编号', dataIndex: 'trayNo' },
      {
        title: '货位',
        dataIndex: 'location',
        slots: { customRender: 'location' },
        customHeaderCell: (column) => {
          column.title = state.columnLabel;
          return column;
        },
      },
    ],
    useSearchForm: false,
    bordered: true,
    pagination: false,
  });
  const schemas = inStoreFormSchema(houseChange);
  const [
    registerForm,
    { resetFields, validate, updateSchema, removeSchemaByField, appendSchemaByField },
  ] = useForm({
    labelWidth: 80,
    baseColProps: { span: 24 },
    schemas: schemas,
    showActionButtonGroup: false,
  });
  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(({ data }) => {
    setDrawerProps({ confirmLoading: false });
    resetFields();
    getHouseList();
    state.columnLabel = '';
    const list = data.map((_: string) => ({ trayNo: _ }));
    clearRowsSelection(list);
    state.data = list;
    reload();
  });
  async function handleSubmit() {
    setDrawerProps({ confirmLoading: true });
    await validate();
    setDrawerProps({ confirmLoading: false });
    closeDrawer();
  }
  function clearRowsSelection(data: Record[]) {
    data.forEach((row) => {
      console.log(row);
      row.area = '';
      row.location = '';
    });
  }
  function houseChange(houseNo: string) {
    if (!houseNo) return (state.columnLabel = '');
    const { houseType } = state.houseList.find((_) => _.value === houseNo);
    clearRowsSelection(state.data);
    if (houseType[1] === 'S') {
      removeSchemaByField(inStoreAreaSchema.field);
      state.columnLabel = '货位';
    } else if (houseType[1] === 'F') {
      appendSchemaByField(inStoreAreaSchema, schemas[schemas.length - 1].field);
      state.columnLabel = '区域';
    }
  }

  function getHouseList() {
    state.houseList = [
      { houseType: 'HSF', value: '123', label: '123' },
      { houseType: 'HFF', value: '333', label: '333' },
    ];
    updateSchema([{ field: 'houseNo', componentProps: { options: state.houseList } }]);
  }
  function getData() {
    return new Promise((rs) => rs({ result: state.data }));
  }
  function selectLocation(record: Record) {
    state.record = record;
    openLocationDrawer(true, {
      disabledKeys: state.data.filter((_) => _.location).map((_) => _.location),
    });
  }
</script>
