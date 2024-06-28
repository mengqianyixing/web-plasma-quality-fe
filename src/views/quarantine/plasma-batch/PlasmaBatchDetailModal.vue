<template>
  <BasicModal
    :centered="false"
    v-bind="$attrs"
    @register="registerModal"
    :title="modalTitle"
    :showOkBtn="false"
    cancelText="关闭22"
    width="1000px"
  >
    <BasicTable :columns="modalColumns" @register="registerTable">
      <template #unqReason="{ record }">
        {{ formatUnReason(record?.fkFailedCode) }}
      </template>
      <template #prodReason="{ record }">
        {{ formatProdReason(record?.fkUnProdCode) }}
      </template>
      <template #cardNo="{ record }: { record: Recordable }">
        <span
          class="text-blue-500 underline cursor-pointer"
          @click.stop.self="openModal(true, record)"
        >
          {{ record.cardNo }}
        </span>
      </template>
    </BasicTable>
    <DonorModel @register="registerDonorModal" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { BasicModal, useModalInner, useModal } from '@/components/Modal';
  import { useTable, BasicTable, BasicColumn } from '@/components/Table';
  import { modalCommonColumns, colMap, stateMap } from './plasma-batch.data';
  import { DictionaryEnum, getSysDictionary } from '@/api/_dictionary';
  import { getPlasmaBatchReleaseBags } from '@/api/quarantine/plasma-batch';
  import DonorModel from '@/__components/donor/donorModel.vue';

  const [registerDonorModal, { openModal }] = useModal();
  interface ParamsObj {
    state: string;
    ImmType?: string | null;
    brNo: string;
  }

  const paramsObj: ParamsObj = {
    state: '',
    brNo: '',
  };
  const modalTitle = ref<string>('');
  const modalColumns = ref<BasicColumn[]>([]);
  const plasmaUnqualifiedDictionary = ref<Recordable[] | undefined>([]);
  const unProdReasonDictionary = ref<Recordable[] | undefined>([]);

  async function getUnqualifiedDictionary() {
    const dictionaryArr = await getSysDictionary([
      DictionaryEnum.PlasmaFailedReason,
      DictionaryEnum.unProdReason,
    ]);
    if (!dictionaryArr.length) return;

    plasmaUnqualifiedDictionary.value = dictionaryArr.find(
      (it) => it.dictNo === DictionaryEnum.PlasmaFailedReason,
    )?.dictImtes;

    unProdReasonDictionary.value = dictionaryArr.find(
      (it) => it.dictNo === DictionaryEnum.unProdReason,
    )?.dictImtes;
  }

  onMounted(() => {
    getUnqualifiedDictionary();
  });

  function formatUnReason(unqReason: string) {
    return plasmaUnqualifiedDictionary.value?.find((it) => it.id === unqReason)?.label ?? unqReason;
  }

  function formatProdReason(unqReason: string) {
    return unProdReasonDictionary.value?.find((it) => it.id === unqReason)?.label ?? unqReason;
  }
  const [registerTable, { reload }] = useTable({
    api: getPlasmaBatchReleaseBags,
    size: 'small',
    maxHeight: 350,
    clickToRowSelect: false,
    rowKey: 'batchNo',
    useSearchForm: false,
    showTableSetting: false,
    bordered: true,
    showIndexColumn: true,
    canResize: true,
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    immediate: false,
    beforeFetch: (p) => {
      return { ...p, ...paramsObj };
    },
  });

  const [registerModal, { setModalProps }] = useModalInner(async (data) => {
    setModalProps({ confirmLoading: false });
    modalTitle.value = data.title + '详情';
    modalColumns.value = [...modalCommonColumns, ...colMap[data.type]];
    paramsObj.state = stateMap[data.type];
    if (data.type === 'trackedNormalBag') {
      paramsObj.ImmType = 'N';
    } else {
      paramsObj.ImmType && delete paramsObj.ImmType;
    }
    paramsObj.brNo = data.record.brNo;
    await reload();
  });
</script>
