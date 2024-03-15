<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable">
      <template #batchNo="{ record }">
        <span
          class="text-blue-500 underline cursor-pointer"
          @click.stop.self="handleOpenBatchDetail(record)"
        >
          {{ record?.batchNo }}
        </span>
      </template>
      <template #boxNum="{ record }">
        <span
          class="text-blue-500 underline cursor-pointer"
          @click.stop.self="handleOpenBoxDetail(record)"
        >
          {{ record?.boxNum }}
        </span>
      </template>
      <template #passBagNum="{ record }">
        <span
          class="text-blue-500 underline cursor-pointer"
          @click.stop.self="handleOpenBatchDetail(record, 1)"
        >
          {{ record?.passBagNum }}
        </span>
      </template>
      <template #noPassBagNum="{ record }">
        <span
          class="text-blue-500 underline cursor-pointer"
          @click.stop.self="handleOpenBatchDetail(record, 0)"
        >
          {{ record?.noPassBagNum }}
        </span>
      </template>
      <template #lackNoNum="{ record }">
        <span
          class="text-blue-500 underline cursor-pointer"
          @click.stop.self="handleOpenBatchDetail(record, 2)"
        >
          {{ record?.lackNoNum }}
        </span>
      </template>
      <template #toolbar>
        <a-button
          type="primary"
          @click="handleUnqualifiedStage"
          v-auth="ReCheckButtonEnum.UnqualifiedStage"
        >
          不合格暂存
        </a-button>
        <a-button
          type="primary"
          @click="handleWeightRegister"
          v-auth="ReCheckButtonEnum.WeightRegister"
        >
          重量登记
        </a-button>
        <a-button
          type="primary"
          @click="handleVerifyRelease"
          v-auth="ReCheckButtonEnum.VerifyRelease"
        >
          验收发布
        </a-button>
        <a-button type="primary" @click="handleVerifyList" v-auth="ReCheckButtonEnum.VerifyList">
          验收清单
        </a-button>
        <a-button
          type="primary"
          @click="handleVisualInspectionList"
          v-auth="ReCheckButtonEnum.VisualInspectionList"
        >
          外观检查清单
        </a-button>
      </template>
    </BasicTable>

    <BatchDetailModal @register="registerBatchModal" @close="handleBatchDetailClose" />
    <BoxDetailModal @register="registerBoxModal" @success="handleGoBatchDetailModal" />
    <RegisterWeightModal @register="registerWeightModal" @success="handleSuccess" />
    <UnqualifiedStageModal @register="registerStage" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';
  import { useModal } from '@/components/Modal';
  import { columns, searchFormSchema } from './record.data';
  import { useMessage } from '@/hooks/web/useMessage';
  import { onMounted, ref, watchEffect } from 'vue';
  import { useStation } from '@/hooks/common/useStation';

  import { PageWrapper } from '@/components/Page';
  import {
    getPlasmaInboundList,
    plasmaVerifyPublish,
  } from '@/api/inbound-management/plasma-inbound-record';
  import BatchDetailModal from '../components/PlasmaBatchDetailModal/index.vue';
  import BoxDetailModal from '../components/PlasmaBoxDetailModal/index.vue';
  import RegisterWeightModal from '@/views/inbound-management/plasma-inbound-record/RegisterWeightModal.vue';
  import UnqualifiedStageModal from '@/views/inbound-management/plasma-inbound-record/UnqualifiedStageModal.vue';
  import { omit } from 'lodash-es';
  import { ReCheckButtonEnum } from '@/enums/authCodeEnum';

  const { stationOptions, getStationNameById } = useStation();
  const { createMessage, createConfirm } = useMessage();

  onMounted(() => {
    watchEffect(() => {
      getForm().updateSchema({
        field: 'stationNo',
        componentProps: {
          options: stationOptions,
        },
      });
    });
  });

  defineOptions({ name: 'PlasmaInboundRecord' });

  const [registerWeightModal, { openModal: openWeightModal }] = useModal();
  const [registerBatchModal, { openModal: openBatchModal }] = useModal();
  const [registerBoxModal, { openModal: openBoxModal }] = useModal();
  const [registerStage, { openModal: openStageModal }] = useModal();

  const selectedRowsRef = ref<Recordable>([]);
  const [registerTable, { getForm, reload }] = useTable({
    api: getPlasmaInboundList,
    columns,
    formConfig: {
      schemas: searchFormSchema,
      transformDateFunc(date) {
        return date ? date.format('YYYY-MM-DD') : '';
      },
    },
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    clickToRowSelect: true,
    rowSelection: {
      type: 'radio',
      onChange(_, selectedRows) {
        selectedRowsRef.value = selectedRows;
      },
    },
    size: 'small',
    striped: false,
    useSearchForm: true,
    showTableSetting: false,
    bordered: true,
    showIndexColumn: false,
    canResize: true,
  });

  function handleUnqualifiedStage() {
    if (!selectedRowsRef.value.length) {
      createMessage.warning('请选择一条数据');
      return;
    }

    if (selectedRowsRef.value[0].state !== 'VFD') {
      createMessage.warning('该状态不支持该操作!');
      return;
    }

    openStageModal(true, {
      record: selectedRowsRef.value[0],
    });
  }

  function handleWeightRegister() {
    if (!selectedRowsRef.value.length) {
      createMessage.warning('请选择一条数据');
      return;
    }

    if (selectedRowsRef.value[0].state !== 'VFD') {
      createMessage.warning('该状态不支持该操作!');
      return;
    }

    openWeightModal(true, {
      record: selectedRowsRef.value[0],
    });
  }

  async function handleVerifyRelease() {
    if (!selectedRowsRef.value.length) {
      createMessage.warning('请选择一条数据');
      return;
    }

    createConfirm({
      title: '确认',
      content: '确定要验收发布改批次吗？',
      iconType: 'warning',
      onOk: async () => {
        await plasmaVerifyPublish(selectedRowsRef.value[0]?.batchNo);

        createMessage.success('验收发布成功');

        await reload();
      },
    });
  }

  function handleVerifyList() {
    createMessage.warn('开发中 : ( ');
  }

  function handleVisualInspectionList() {
    createMessage.warn('开发中 : ( ');
  }

  function handleSuccess() {
    reload();
  }

  function handleOpenBatchDetail(record, field: Nullable<number> = null) {
    openBatchModal(true, {
      record: {
        ...record,
        stationName: getStationNameById(record.stationNo),
        field,
      },
    });
  }

  function handleOpenBoxDetail(record) {
    openBoxModal(true, {
      record: omit(
        {
          ...record,
          stationName: getStationNameById(record.stationNo),
        },
        ['boxNo'],
      ),
    });
  }

  function handleGoBatchDetailModal(record) {
    openBatchModal(true, {
      record: {
        ...record,
        stationName: getStationNameById(record.stationNo),
      },
    });
  }

  function handleBatchDetailClose(record) {
    handleOpenBoxDetail(record);
  }
</script>
