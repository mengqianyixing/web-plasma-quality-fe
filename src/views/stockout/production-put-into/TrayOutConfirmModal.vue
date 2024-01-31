<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="托盘出库"
    showFooter
    width="30%"
    @ok="handleOk"
  >
    <BasicForm @register="registerTable" ref="table" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form';
  import { useMessage } from '@/hooks/web/useMessage';
  import { ref } from 'vue';
  import { submitOutHouseApi } from '@/api/tray/relocation';
  import { getHouseSiteApi } from '@/api/plasmaStore/site';

  const { createMessage } = useMessage();

  const houseNo = ref('');
  const [registerTable, { updateSchema, setFieldsValue, validate, resetFields }] = useForm({
    showActionButtonGroup: false,
    schemas: [
      {
        field: 'trayNos',
        label: '托盘编号',
        component: 'Select',
        componentProps: {
          mode: 'multiple',
        },
        colProps: { span: 15 },
        required: true,
      },
      {
        field: 'siteId',
        label: '站点ID',
        component: 'ApiSelect',
        required: true,
      },
    ],
  });

  const emit = defineEmits(['success', 'register']);
  const dlvInfo = ref<Recordable[]>([]);
  const orderNo = ref('');
  const [register, { setModalProps, closeModal }] = useModalInner(async (data) => {
    setModalProps({
      maskClosable: false,
    });

    dlvInfo.value = data.record.dlvInfo;
    orderNo.value = data.record.orderNo;
    houseNo.value = data.record.houseNo;
    await updateSchema([
      {
        field: 'trayNos',
        componentProps: {
          options: dlvInfo.value.map((item: any) => ({
            label: item.trayNo,
            value: item.trayNo,
          })),
        },
      },
      {
        field: 'siteId',
        componentProps: {
          api: getHouseSiteApi,
          params: {
            houseNo: houseNo.value,
          },
          labelField: 'label',
          valueField: 'value',
        },
        colProps: {
          span: 15,
        },
        show: !!data.record.automatic,
      },
    ]);

    await setFieldsValue({
      trayNos: dlvInfo.value.map((it) => it.trayNo),
    });
  });

  async function handleOk() {
    const fnStack: Promise<any>[] = [];
    const errArr: string[] = [];

    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });

      values.trayNos.forEach((it) => {
        fnStack.push(
          submitOutHouseApi({ dlvInfo: [it], orderNo: orderNo.value })
            .then((res) => ({ res, dlv: it, type: 'success' }))
            .catch((e) => ({ e, dlv: it, type: 'error' })),
        );
      });

      const res = await Promise.all([...fnStack]);

      if (res.some((it) => it.type === 'error')) {
        res.forEach((it) => {
          if (it.type === 'error') {
            errArr.push(it.dlv);
          }
        });

        await setFieldsValue({
          trayNos: errArr,
        });
      } else {
        createMessage.success('出库成功');
        await resetFields();
        closeModal();
        emit('success');
      }
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
