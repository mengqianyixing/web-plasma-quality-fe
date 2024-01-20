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
  import { addPlasmaBatchRelease, getPlasmaBatchUnReleases } from '@/api/quarantine/plasma-batch';
  import { useStation } from '@/hooks/common/useStation';
  import { useTable, BasicTable } from '@/components/Table';
  import { modalColumns, modalSearchFormSchema } from './plasma-batch.data';
  import { useMessage } from '@/hooks/web/useMessage';

  const emit = defineEmits(['success', 'register']);
  const isUpdate = ref(true);
  const { isLoading, stationOptions, getStationNameById } = useStation();
  const selectedRow = ref<Recordable>([]);
  const { createMessage } = useMessage();

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
    api: getPlasmaBatchUnReleases,
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    size: 'small',
    maxHeight: 300,
    columns: modalColumns,
    formConfig: {
      labelWidth: 120,
      schemas: modalSearchFormSchema,
    },
    clickToRowSelect: false,
    rowKey: 'batchNo',
    rowSelection: {
      fixed: true,
      type: 'radio',
      onChange: (_, selectedRows: any) => {
        selectedRow.value = selectedRows;
      },
      // getCheckboxProps: (record: any) => ({
      //   disabled: record.state != 'W', // 仅未复核状态可以操作
      // }),
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
    if (selectedRow.value.length == 0) {
      createMessage.warn('请选择要操作的数据');
      return;
    }
    try {
      // loading
      setModalProps({ confirmLoading: true });
      try {
        if (unref(isUpdate)) {
          //
        } else {
          await addPlasmaBatchRelease(selectedRow.value[0]);
          clearSelectedRowKeys();
        }
      } catch (e) {
        return;
      }
      closeModal();
      emit('success');
    } finally {
      reload();
      setModalProps({ confirmLoading: false });
    }
  }
</script>
