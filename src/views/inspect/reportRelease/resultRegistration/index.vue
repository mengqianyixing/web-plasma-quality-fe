<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    showFooter
    title="检测明细"
    :showOkBtn="false"
    cancelText="关闭"
    default-fullscreen
    :can-fullscreen="false"
  >
    <div class="h-inherit bg-white">
      <div class="flex flex-col h-full">
        <Spin :spinning="spinning">
          <div class="title"> 基本信息 </div>
          <CellWapper
            :data="rowData || {}"
            cell-width="16.66%"
            labelWidth="160px"
            :cell-list="cellList"
            :gap="0"
          />
          <div class="title">样本汇总信息</div>
          <CellWapper :data="countData" :cell-list="plasmaCellList" :gap="0" />
        </Spin>

        <Tabs
          v-model:activeKey="activeKey"
          class="flex-1 bg-white mt-10px"
          type="card"
          size="small"
        >
          <TabPane key="1" tab="检测明细">
            <CheckPage :bs-no="bsNo" @reload="saveReload" />
          </TabPane>
          <TabPane key="2" tab="效价明细">
            <TiterPage :bs-no="bsNo" @reload="saveReload" />
          </TabPane>
          <TabPane key="3" tab="物料明细">
            <MaterialRegistration :bs-no="bsNo" @reload="saveReload" />
          </TabPane>
        </Tabs>
      </div>
    </div>
  </BasicModal>
</template>

<script setup lang="ts">
  import { CellWapper, Cell } from '@/components/CellWapper';
  import { cellList } from './resultRegistration.data';
  import { TabPane, Tabs, Spin } from 'ant-design-vue';
  import { ref } from 'vue';
  import CheckPage from './check/index.vue';
  import TiterPage from './titer/index.vue';
  import MaterialRegistration from './materialRegistration/index.vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { getPlasmaCountApi, getBatchInfoApi } from '@/api/inspect/resultRegistration';
  import { GetApiCoreLabItemBasicInfoBsNoResponse } from '@/api/type/inspectManage';
  import { sampleTypeEnum } from '@/enums/sampleEnum';
  import { SERVER_ENUM } from '@/enums/serverEnum';
  import { useServerEnumStoreWithOut } from '@/store/modules/serverEnums';

  defineOptions({ name: 'ResultRegistration' });

  const serverEnumStore = useServerEnumStoreWithOut();
  const PlasmaType = serverEnumStore.getServerEnumText(SERVER_ENUM.PlasmaType);
  const activeKey = ref('1');
  const spinning = ref(false);
  const bsNo = ref('');
  const rowData = ref<GetApiCoreLabItemBasicInfoBsNoResponse>();
  const countData = ref({});
  const plasmaCellList = ref<Cell[]>([]);
  const reloadMap = ref<Map<string, Function>>(new Map());

  function saveReload(fn: Function, activeKey: string) {
    bsNo.value && fn();
    reloadMap.value.set(activeKey, fn);
  }
  const [registerModal] = useModalInner(async (params) => {
    bsNo.value = params.bsNo;
    spinning.value = true;
    try {
      rowData.value = await getBatchInfoApi({ bsNo: params.bsNo });
      const res = await getPlasmaCountApi({ bsNo: params.bsNo });
      const initValue: { list: Cell[]; data: Record<number, number> } = {
        list: [],
        data: {},
      };
      const { list, data } = res.reduce((t, row, i) => {
        t.list.push({
          field: i.toString(),
          label:
            rowData.value?.sampleType === sampleTypeEnum.CallbackSample
              ? '样本数'
              : PlasmaType(row.plasmaType),
        });
        t.data[i] = row.count;
        return t;
      }, initValue);
      countData.value = data;
      plasmaCellList.value = list;
    } finally {
      spinning.value = false;
    }
  });
</script>
<style scoped lang="less">
  ::v-deep(.ant-tabs-content) {
    height: 100%;
  }

  .title {
    display: flex;
    position: relative;
    align-items: center;
    justify-content: space-between;
    margin: 10px 0;
    margin-left: 10px;
    color: #333;
    font-size: 16px;
    font-weight: 600;

    &::after {
      content: '';
      display: block;
      position: absolute;
      top: 50%;
      left: -10px;
      width: 2px;
      height: 16px;
      margin-top: -8px;
      background: @primary-color;
    }
  }
</style>
