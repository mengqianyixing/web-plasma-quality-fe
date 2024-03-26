<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    showFooter
    title="托盘入库"
    width="500px"
    :minHeight="400"
    @ok="handleSubmit"
    @fullscreen="redoHeight"
  >
    <div class="relative h-inherit max-h-inherit min-h-inherit">
      <div class="absolute w-full h-full">
        <BasicForm @register="registerForm" />
        <div class="flex-1 shrink-1" style="height: calc(100% - 56px)">
          <BasicTable @register="registerTable">
            <template #location="{ record }">
              {{ record.location || record.area }}
              <a-button v-show="state.columnLabel === '货位'" @click="selectLocation(record)">
                选择
              </a-button>
            </template>
          </BasicTable>
        </div>
      </div>
    </div>

    <LocationModal @register="registerLocationModal" @confim="confim" />
  </BasicModal>
</template>
<script setup lang="ts">
  import { BasicModal, useModalInner, useModal } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form';
  import { BasicTable, useTable } from '@/components/Table';
  import { reactive } from 'vue';
  import { inStoreFormSchema } from './outInStore.data';
  import LocationModal from '@/components/BusinessDrawer/locationDrawer/index.vue';
  import { STORE_FLAG, CLOSED } from '@/enums/plasmaStoreEnum';
  import { settingListApi } from '@/api/plasmaStore/setting';
  import { submitInHouseApi } from '@/api/tray/relocation';

  const emit = defineEmits(['success']);
  type Record = {
    area: string;
    location: string;
    trayNo: string;
  };
  type Select = { value: string; label: string; houseType: string };
  const [registerLocationModal, { openModal: openLocationModal }] = useModal();
  const state = reactive({
    data: [] as Record[],
    houseList: [] as Select[],
    columnLabel: '',
    record: {} as Record,
  });
  const [registerTable, { reload, redoHeight }] = useTable({
    api: getData,
    inset: true,
    isCanResizeParent: true,
    // canResize:true,
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
  const [registerForm, { resetFields, validate, updateSchema, validateFields }] = useForm({
    labelWidth: 80,
    baseColProps: { span: 24 },
    schemas: schemas,
    showActionButtonGroup: false,
  });
  const [registerModal, { setModalProps, closeModal }] = useModalInner(({ data }) => {
    setModalProps({ confirmLoading: false });
    resetFields();
    getHouseList();
    state.columnLabel = '';
    const list = data.map((_: Recordable) => ({ trayNo: _.trayNo }));
    clearRowsSelection(list);
    state.data = list;
    reload();
  });
  async function handleSubmit() {
    try {
      const { houseNo, subWareHouseNo } = await validate();
      const params = {
        recInfo: state.data.map((_) => ({
          trayNo: _.trayNo,
          wareHouseNo: (!_.location && (subWareHouseNo || houseNo)) || void 0,
          locationNo: _.location || void 0,
        })),
      };
      setModalProps({ confirmLoading: true });
      await submitInHouseApi(params);
      setModalProps({ confirmLoading: false });
      closeModal();
      emit('success');
    } catch {
      setModalProps({ confirmLoading: false });
    }
  }
  function clearRowsSelection(data: Record[]) {
    data.forEach((row) => {
      row.area = '';
      row.location = '';
    });
  }

  function houseChange(houseNo: string) {
    if (!houseNo) {
      state.columnLabel = '';
      return;
    }
    const { houseType } = state.houseList.find((_) => _.value === houseNo) as Select;
    clearRowsSelection(state.data);
    if (houseType[1] === STORE_FLAG.S) {
      state.columnLabel = '货位';
    } else if (houseType[1] === STORE_FLAG.F) {
      state.columnLabel = '库房';
      const { label } = state.houseList.find((_) => _.value === houseNo) as Select;
      state.data.forEach((_) => (_.area = label));
    }
  }

  async function getHouseList() {
    try {
      if (state.houseList.length) return;
      const res = await settingListApi({
        pageSize: '9999',
        currPage: '1',
        closed: CLOSED.NORMAL,
        normal: true,
      });
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
    openLocationModal(false);
    state.record.location = location.locationNo;
  }
  async function selectLocation(record: Record) {
    state.record = record;
    const res = await validateFields(['houseNo']);
    openLocationModal(true, {
      disabledKeys: state.data.filter((_) => _.location).map((_) => _.location),
      params: { houseNo: res.houseNo, locationStatus: 'IDLE' },
    });
  }
</script>
