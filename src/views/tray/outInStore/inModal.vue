<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    title="托盘入库"
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
    <LocationModal @register="registerLocationDrawer" @confim="confim" />
  </BasicDrawer>
</template>
<script setup lang="ts">
  import { BasicDrawer, useDrawerInner, useDrawer } from '@/components/Drawer';
  import { BasicForm, useForm } from '@/components/Form';
  import { BasicTable, useTable } from '@/components/Table';
  import { reactive } from 'vue';
  import { inStoreAreaSchema, inStoreFormSchema } from './outInStore.data';
  import LocationModal from './locationModal.vue';
  import { STORE_FLAG } from '@/enums/plasmaStoreEnum';
  import { settingListApi, areaListApi } from '@/api/plasmaStore/setting';
  import { message } from 'ant-design-vue';

  const emit = defineEmits(['success']);
  type Record = {
    area: string;
    location: string;
    trayNo: string;
  };
  type Select = { value: string; label: string; houseType: string };
  const [registerLocationDrawer, { openDrawer: openLocationDrawer }] = useDrawer();
  const houseAreaMap: Map<string, Recordable<any>> = new Map();
  const state = reactive({
    data: [] as Record[],
    houseList: [] as Select[],
    columnLabel: '',
    record: {} as Record,
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
    {
      resetFields,
      validate,
      updateSchema,
      removeSchemaByField,
      appendSchemaByField,
      validateFields,
    },
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
    await validate();
    const isValidate = state.data.every((_) => _.area || _.location);
    if (!isValidate) return message.warning('请选择货位');
    setDrawerProps({ confirmLoading: true });
    setDrawerProps({ confirmLoading: false });
    closeDrawer();
    emit('success');
  }
  function clearRowsSelection(data: Record[]) {
    data.forEach((row) => {
      console.log(row);
      row.area = '';
      row.location = '';
    });
  }
  function areaChange(areaNo: string, list: Select[]) {
    const item = list.find((_) => _.value === areaNo);
    if (!item) return;
    state.data.forEach((_) => (_.area = item.label));
  }
  function houseChange(houseNo: string) {
    if (!houseNo) {
      state.columnLabel = '';
      return;
    }
    const { houseType } = state.houseList.find((_) => _.value === houseNo) as Select;
    clearRowsSelection(state.data);
    removeSchemaByField(inStoreAreaSchema.field);
    if (houseType[1] === STORE_FLAG.S) {
      state.columnLabel = '货位';
    } else if (houseType[1] === STORE_FLAG.F) {
      state.columnLabel = '区域';
      getAreaListFn(houseNo);
    }
  }
  async function getAreaListFn(houseNo: any) {
    let list = houseAreaMap.get(houseNo);
    if (!list) {
      const res = await areaListApi({ houseNo });
      const data = (res.subHouseList || []).map((_) => ({ value: _.houseNo, label: _.houseName }));
      houseAreaMap.set(houseNo, data);
      list = data;
    }
    if (list.length > 0) {
      const componentProps = {
        options: list,
        onChange: (value: string) => areaChange(value, list as Select[]),
      };
      appendSchemaByField({ ...inStoreAreaSchema, componentProps }, void 0);
    } else {
      state.columnLabel = '库房';
      const { label } = state.houseList.find((_) => _.value === houseNo) as Select;
      state.data.forEach((_) => (_.area = label));
    }
  }
  async function getHouseList() {
    try {
      if (state.houseList.length) return;
      const res = await settingListApi({ pageSize: '9999', currPage: '1' });
      const options = (res.result || []).map((_) => ({
        value: _.houseNo,
        label: _.houseName,
        houseType: _.houseType,
      }));
      state.houseList = options as Select[];
      updateSchema([{ field: 'houseNo', componentProps: { options } }]);
    } catch (e) {
      console.error(e);
    }
  }
  function getData() {
    return new Promise((rs) => rs({ result: state.data }));
  }
  function confim([location]) {
    openLocationDrawer(false);
    state.record.location = location.locationNo;
  }
  async function selectLocation(record: Record) {
    state.record = record;
    const res = await validateFields(['houseNo']);
    openLocationDrawer(true, {
      disabledKeys: state.data.filter((_) => _.location).map((_) => _.location),
      houseNo: res.houseNo,
    });
  }
</script>
