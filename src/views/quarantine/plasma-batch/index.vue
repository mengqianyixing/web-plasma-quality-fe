<template>
  <div>
    <BasicTable @register="registerTable">
      <template #stationNo="{ record }">
        {{ getStationNameById(record?.stationNo) }}
      </template>
      <template
        v-for="col in slots"
        #[col.slots?.customRender]="data"
        :key="col.slots?.customRender"
      >
        <span
          class="empty-value text-blue-500 underline cursor-pointer"
          @click.stop.self="handleDetailClick(data.record, col.slots?.customRender, col.title)"
        >
          {{ get(data.record, ((col.dataIndex as any) || []).join('.')) }}
        </span>
      </template>

      <template #toolbar>
        <a-button
          type="primary"
          @click="handleCreate"
          v-auth="QuarantineButtonEnum.CreateQuarantine"
          >新增
        </a-button>
        <a-button
          :disabled="!selectedRow.length"
          type="primary"
          @click="handleOption('C', '撤销')"
          v-auth="QuarantineButtonEnum.ResetQuarantine"
        >
          撤销
        </a-button>
        <a-button
          :disabled="!selectedRow.length"
          type="primary"
          @click="handleOption('R', '复核')"
          v-auth="QuarantineButtonEnum.ReCheckQuarantine"
        >
          复核
        </a-button>
        <a-button type="primary" @click="handlePrint" v-auth="QuarantineButtonEnum.PrintQuarantine">
          打印
        </a-button>
      </template>
    </BasicTable>
    <PlasmaBatchDetailModal @register="registerDetailModal" />
    <PlasmaBatchModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';
  import {
    getPlasmaBatchReleases,
    setPlasmaBatchRelease,
    getPlasmaBatchRelease,
  } from '@/api/quarantine/plasma-batch';
  import { Modal } from 'ant-design-vue';

  import { useModal } from '@/components/Modal';
  import PlasmaBatchModal from './PlasmaBatchModal.vue';
  import PlasmaBatchDetailModal from './PlasmaBatchDetailModal.vue';

  import { columns, searchFormSchema } from './plasma-batch.data';
  import { useStation } from '@/hooks/common/useStation';
  import { onMounted, ref, watchEffect } from 'vue';
  import { QuarantineButtonEnum } from '@/enums/authCodeEnum';
  import { get } from 'lodash-es';

  defineOptions({ name: 'PlasmaBatchReport' });

  const selectedRow = ref<Recordable>([]);
  const { stationOptions, getStationNameById } = useStation();
  const slots = columns.filter((col) => col.slots);

  onMounted(() => {
    watchEffect(() => {
      getForm().updateSchema({
        field: 'stationNo',
        componentProps: {
          options: stationOptions.value,
        },
      });
    });
  });

  const [registerDetailModal, { openModal: openDetailModal }] = useModal();
  const [registerModal, { openModal }] = useModal();
  const [registerTable, { reload, getForm, clearSelectedRowKeys }] = useTable({
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
      schemas: searchFormSchema,
    },
    rowSelection: {
      fixed: true,
      type: 'radio',
      onChange: (_, selectedRows: any) => {
        selectedRow.value = selectedRows;
      },
    },
    useSearchForm: true,

    bordered: true,
    showIndexColumn: false,

    canResize: true,
  });

  function handleDetailClick(record: Recordable, type: string, title: any) {
    getPlasmaBatchRelease({ batchNo: record?.fkBpNo }).then((res) => {
      openDetailModal(true, {
        record,
        ...res,
        type,
        title,
      });
    });
  }

  function handleCreate() {
    openModal(true, {
      isUpdate: false,
    });
  }

  function handleOption(state: string, title: string) {
    Modal.confirm({
      content: '确认' + title + '?',
      onOk: async () => {
        setPlasmaBatchRelease({
          brNo: selectedRow.value[0].brNo,
          state,
        })
          .then(() => {
            clearSelectedRowKeys();
            reload();
          })
          .catch(() => {
            reload();
          });
      },
      onCancel: () => Modal.destroyAll(),
    });
  }

  function handlePrint() {
    clearSelectedRowKeys();
  }

  function handleSuccess() {
    reload();
  }
</script>
