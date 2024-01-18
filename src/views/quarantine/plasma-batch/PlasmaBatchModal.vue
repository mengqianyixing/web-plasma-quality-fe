<template>
  <BasicModal
    width="70%"
    :centered="false"
    v-bind="$attrs"
    @register="registerModal"
    :title="getTitle"
    @ok="handleSubmit"
  >
    <BasicTable @register="registerTable">
      <template #stationNo="{ record }">
        {{ getStationNameById(record?.stationNo) }}
      </template>
    </BasicTable>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref, onMounted, watchEffect } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { addPlasmaBatchRelease, getPlasmaBatchReleases } from '@/api/quarantine/plasma-batch';
  import { useStation } from '@/hooks/common/useStation';
  import { useTable, BasicTable } from '@/components/Table';
  import { columns, modalSearchFormSchema } from './plasma-batch.data';

  const emit = defineEmits(['success', 'register']);
  const isUpdate = ref(true);
  const { isLoading, stationOptions, getStationNameById } = useStation();
  const selectedRow = ref<Recordable>([]);

  onMounted(() => {
    watchEffect(() => {
      if (!isLoading) {
        getForm()?.updateSchema({
          field: 'stationNo',
          componentProps: {
            options: stationOptions.value,
          },
        });
      }
    });
  });

  const [registerTable, { reload, getForm, clearSelectedRowKeys }] = useTable({
    title: '血浆批次列表',
    api: getPlasmaBatchReleases,
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    columns: columns,
    formConfig: {
      labelWidth: 120,
      schemas: modalSearchFormSchema,
    },
    clickToRowSelect: false,
    rowKey: 'fkBpNo',
    rowSelection: {
      fixed: true,
      type: 'radio',
      onChange: (_, selectedRows: any) => {
        selectedRow.value = selectedRows;
      },
      getCheckboxProps: (record: any) => ({
        disabled: record.state != 'W', // 仅未复核状态可以操作
      }),
    },
    useSearchForm: true,
    showTableSetting: true,
    bordered: true,
    showIndexColumn: false,
    tableSetting: {
      size: false,
      redo: false,
      setting: false,
    },
    canResize: true,
  });

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    setModalProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;

    if (unref(isUpdate)) {
      //
    }
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增' : '修改'));

  async function handleSubmit() {
    try {
      // loading
      setModalProps({ confirmLoading: true });
      try {
        if (unref(isUpdate)) {
          //
        } else {
          addPlasmaBatchRelease(selectedRow.value[0]);
          // 成功
          reload();
          clearSelectedRowKeys();
        }
      } catch (e) {
        console.log(e);
      }
      setModalProps({ confirmLoading: false });
      closeModal();
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
