<template>
  <PageWrapper contentFullHeight>
    <Description @register="register" :data="prepareData" />
    <div class="card-bar mt-1 mb-1 bg-[#fff] h-73.5">
      <div class="card-bar-header h-10 lh-10 pl-3 ]">{{ pickTitle.top }}</div>
      <div class="card-bar-body flex w-100% p-3 bg-[#fff] overflow-x-auto" ref="topBoxBarRef">
        <Card
          v-for="item in topBoxData"
          :key="item.title"
          size="small"
          :id="item.pickType === 'PRO' ? 'PRO' : item.immTypeName"
          class="one-card min-w-57.5 mr-3 flex-shrink-0 h-57.5"
          :class="{ selected: item.isSelected }"
          :title="`${item.title}(${item.sortCount}/${item.totalCount})`"
        >
          <template #extra
            ><a class="mr-1" @click="_sortingMouldAssembling(item)">合箱</a
            ><a @click="_sortingBoxSealing(item)">封箱</a></template
          >
          <div class="text-4" v-for="one in item.bagNos" :key="one">{{ one }}</div>
        </Card>
      </div>
    </div>
    <Description @register="registerBatch" :data="batchData" class="mt-3" />
    <div class="card-bar mt-1 mb-1 bg-[#fff] h-73.5">
      <div class="card-bar-header h-10 lh-10 pl-3">{{ pickTitle.bottom }}</div>
      <div class="card-bar-body flex w-100% p-3 bg-[#fff] overflow-x-auto" ref="bottomBoxBarRef">
        <Card
          v-for="item in bottomBoxData"
          :key="item.title"
          size="small"
          :id="item.immTypeName"
          class="one-card min-w-57.5 mr-3 flex-shrink-0 h-57.5"
          :class="{ selected: item.isSelected }"
          :title="`${item.title}(${item.sortCount}/${item.totalCount})`"
        >
          <template #extra
            ><a class="mr-1" @click="_sortingMouldAssembling(item)">合箱</a
            ><a @click="_sortingBoxSealing(item)">封箱</a></template
          >
          <div class="text-4" v-for="one in item.bagNos" :key="one">{{ one }}</div>
        </Card>
      </div>
    </div>
    <PrepareModal @register="registerPrepareModal" @success="prepareModalSuccess" />
    <PackingInfoModal @register="registerPackingInfoModal" />
    <PickBatchDetail @register="registerPickBatchDetailModal" />
    <PlasmaDetail @register="registerPlasmaDetailModal" />
    <InStoreModal @register="registerInStoreModal" />
    <OutStoreModal @register="registerOutStoreModal" />
    <UnqualifiedModal @register="registerUnqualifiedModal" @success="handleUnqualifiedSuccess" />
    <PrepareSuspendModal @register="registerPrepareSuspendModal" @success="PrepareSuspendSuccess" />
    <BatchSuspendModal @register="registerBatchSuspendModal" @success="PrepareSuspendSuccess" />
  </PageWrapper>
</template>

<script lang="tsx" setup>
  import { ref, createVNode, nextTick } from 'vue';
  import Description from '@/components/Description/src/Description.vue';
  import { DescItem, useDescription } from '@/components/Description';
  import PageWrapper from '@/components/Page/src/PageWrapper.vue';
  import { Card, Modal } from 'ant-design-vue';
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
  import { useModal } from '@/components/Modal';
  import { debounce } from 'lodash-es';
  import { useMessage } from '@/hooks/web/useMessage';
  import { useLoading } from '@/components/Loading';

  import PrepareModal from '@/views/stockout/production-sorting/components/prepare-modal.vue';
  import PackingInfoModal from '@/views/stockout/production-sorting/components/packing-info-modal.vue';
  import PickBatchDetail from '../components/PickBatchDetail.vue';
  import PlasmaDetail from '../components/PlasmaDetail.vue';
  import {
    prepareStateMap,
    prepareStateValueEnum,
    operationMap,
    operationValueEnum,
  } from '@/enums/stockoutEnum';
  import {
    getPrepareSorting,
    pickSortingBag,
    sortingBoxSealing,
    sortingMouldAssembling,
    sortingAllQua,
    completeSorting,
  } from '@/api/stockout/production-sorting/production-sorting-main';
  import InStoreModal from './components/in-store-modal.vue';
  import OutStoreModal from './components/out-store-modal.vue';
  import UnqualifiedModal from './components/unqualified-modal.vue';
  import PrepareSuspendModal from './components/prepare-suspend-modal.vue';
  import BatchSuspendModal from './components/batch-suspend-modal.vue';

  const { createMessage } = useMessage();
  const { warning, success } = createMessage;
  const [openFullLoading, closeFullLoading] = useLoading({});

  interface PrepareData {
    batchNoCount?: Number;
    sortTotal?: Number;
    sortCount?: Number;
    proTotal?: Number;
    proSortCount?: Number;
    prepareState?: String;
  }
  interface BatchData {
    batchSummary?: {
      batchNo: String;
      sortTotal: Number;
      sortCount: Number;
    };
    pros?: {
      totalCount: Number;
      sortCount: Number;
      immTypeName: String;
      immType: String;
      titerLevel: String;
      bagNos: [];
    };
    unPro?: {
      total: Number;
      sortCount: Number;
      sortImmTypes: [];
    };
    utrkUnPro?: {
      total: Number;
      sortCount: Number;
      sortImmTypes: [];
    };
  }

  let pickMode = ''; // 挑浆模式 A/B A包含：可投产、暂不投产  B包含：（可投产+不投产）、待放行
  const pickTitle = ref({
    top: '检疫期合格可投产血浆',
    bottom: '暂不投产血浆',
  });
  const prepareNo = ref(''); // 投产准备号
  const boxNo = ref(''); // 血浆箱号input
  const bagNo = ref(''); // 血浆编号input
  const bagNoRef = ref<any>(null);

  const prepareData = ref<PrepareData>({}); // 准备号相关数据
  const batchData = ref<BatchData>({}); // 本批次数据

  // 准备号栏信息
  const topBoxBarRef = ref();
  // top栏箱子
  const topBoxData = ref<any>([]);
  // 批次栏信息
  const bottomBoxBarRef = ref();
  // bottom栏箱子
  const bottomBoxData = ref<any>([]);

  const prepareSchema: DescItem[] = [
    {
      field: 'batchSampleNo',
      label: '投产准备号',
      span: 2,
      contentMinWidth: 100,
      render() {
        return (
          <div class="flex items-center justify-center gap-2 w-[300px] -mt-1">
            <a-input-search
              placeholder="请选择准备号"
              enter-button="选择"
              readonly
              value={prepareNo}
              onChange={(e) => (prepareNo.value = e.target.value)}
              onSearch={handleSelectPrepare}
            />
          </div>
        );
      },
    },
    {
      field: 'stationName',
      label: '状态',
      render() {
        return (
          <div>
            {prepareData.value.prepareState
              ? prepareStateMap.get(prepareData.value.prepareState as prepareStateValueEnum)
              : ''}
          </div>
        );
      },
    },
    {
      field: 'outWarehouseDate',
      label: '分拣批次',
      render() {
        return (
          <div className="text-blue-600 cursor-pointer" onClick={goPickBatchDetail}>
            {prepareData.value.batchNoCount ? prepareData.value.batchNoCount : ''}
          </div>
        );
      },
    },
    {
      field: 'bagCount',
      label: '分拣血浆',
      render() {
        return (
          <div>
            {prepareData.value.sortTotal ? (
              <span>
                <span>{prepareData.value.sortCount}/</span>
                <span className="text-blue-600 cursor-pointer" onClick={goPlasmaDetail}>
                  {prepareData.value.sortTotal}
                </span>
              </span>
            ) : (
              ''
            )}
          </div>
        );
      },
    },
    {
      field: 'totalCount',
      label: '投产血浆',
      render() {
        return (
          <div>
            {prepareData.value.sortTotal ? (
              <span>
                <span>{prepareData.value.proSortCount}/</span>
                <span
                  className="text-blue-600 cursor-pointer"
                  onClick={() => goPlasmaDetail('prepareProduce')}
                >
                  {prepareData.value.proTotal}
                </span>
              </span>
            ) : (
              ''
            )}
          </div>
        );
      },
    },
    {
      field: 'totalCount',
      label: '',
      span: 6,
      render() {
        return (
          <div class="flex items-center justify-end gap-2 -mt-1 w-100%">
            <a-button disabled={!prepareNo.value} onclick={_openBatchSuspendModal}>
              批次暂停
            </a-button>
            <a-button disabled={!prepareNo.value} onclick={_openPrepareSuspendModal}>
              准备号暂停
            </a-button>
            <a-button disabled={!prepareNo.value} onclick={pickBoxInfo}>
              装箱信息
            </a-button>
            <a-button
              disabled={!prepareNo.value}
              onclick={() => openOutStoreModal(true, { prepareNo: prepareNo.value })}
            >
              血浆出库
            </a-button>
            <a-button
              disabled={!prepareNo.value}
              onclick={() => openInStoreModal(true, { prepareNo: prepareNo.value })}
            >
              血浆入库
            </a-button>
            <a-button disabled={!prepareNo.value} onclick={_completeSorting}>
              分拣完成
            </a-button>
          </div>
        );
      },
    },
  ];
  const [register, { setDescProps }] = useDescription({
    bordered: false,
    column: 6,
    contentStyle: {
      width: '50px',
    },
    title: '投产准备号信息',
    schema: prepareSchema,
  });
  const batchSchema: DescItem[] = [
    {
      field: 'boxNo',
      label: '血浆箱号',
      contentMinWidth: 100,
      render() {
        return (
          <div class="flex items-center justify-center gap-2 w-[250px] -mt-1">
            <a-input
              placeholder="请扫描"
              value={boxNo}
              onChange={(event) => (boxNo.value = event.target.value)}
              onkeyup={debounce(_sortingAllQua, 500)}
            />
          </div>
        );
      },
    },
    {
      field: 'bagNo',
      label: '血浆编号',
      contentMinWidth: 100,
      render() {
        return (
          <div class="flex items-center justify-center gap-2 w-[250px] -mt-1">
            <a-input
              placeholder="请扫描"
              value={bagNo}
              ref={bagNoRef}
              onChange={(event) => (bagNo.value = event.target.value)}
              onkeyup={debounce(handlePressEnter, 500)}
            />
          </div>
        );
      },
    },
    {
      field: 'batchNo',
      label: '血浆批号',
      render() {
        return <div>{batchData.value?.batchSummary?.batchNo || ''}</div>;
      },
    },
    {
      field: 'sortTotal',
      label: '分拣血浆数量',
      render() {
        return (
          <div>
            {batchData.value?.batchSummary?.sortTotal
              ? `${batchData.value.batchSummary.sortCount}/${batchData.value.batchSummary.sortTotal}`
              : ''}
          </div>
        );
      },
    },
    {
      field: 'pros',
      label: '检疫期合格可投产',
      render() {
        return (
          <div>
            {batchData.value.pros?.totalCount
              ? `${batchData.value.pros?.sortCount}/${batchData.value.pros?.totalCount}`
              : ''}
          </div>
        );
      },
    },
  ];
  const [registerBatch, { setDescProps: setBatchDescProps }] = useDescription({
    bordered: false,
    column: 4,
    contentStyle: {
      width: '50px',
    },
    title: '当前批次信息',
    schema: batchSchema,
  });

  const [registerPrepareModal, { openModal: openPrepareModal }] = useModal();
  const [registerPackingInfoModal, { openModal: openPackingInfoModal }] = useModal();
  const [registerInStoreModal, { openModal: openInStoreModal }] = useModal();
  const [registerOutStoreModal, { openModal: openOutStoreModal }] = useModal();
  const [registerUnqualifiedModal, { openModal: openUnqualifiedModal }] = useModal();
  const [registerPrepareSuspendModal, { openModal: openPrepareSuspendModal }] = useModal();
  const [registerBatchSuspendModal, { openModal: openBatchSuspendModal }] = useModal();

  // 血浆扫描
  async function handlePressEnter(e) {
    if (e.code === 'Enter' || e.code === 'NumpadEnter' || e === true) {
      if (!bagNo.value) {
        warning('请扫描血浆编号!');
        return;
      }
      if (!prepareNo.value) {
        warning('请选择投产准备号!');
        return;
      }

      const params = {
        prepareNo: prepareNo.value,
        bagNo: bagNo.value,
        batchNo: batchData.value.batchSummary?.batchNo || null,
        pickFlag: e === true, // 特殊分拣情况:整箱血浆为合格/不合格血浆复核登录后进行分拣
      };
      let targetBox = {}; // 正在分拣的血浆属于的箱子,用于封箱
      try {
        openFullLoading();
        const res = await pickSortingBag(params);
        if (res.data.ok === true) {
          const data = res.data.data;
          // 血浆不合格
          if (data.track) {
            openUnqualifiedModal(true, {
              bagNo: bagNo.value,
              track: data.track,
            });
            return;
          }

          // 整箱血浆为合格
          if (data.fullBoxQua) {
            Modal.confirm({
              title: '提示?',
              icon: createVNode(ExclamationCircleOutlined),
              content: createVNode(
                'div',
                { style: 'color:red;' },
                '本箱全部为满足要求的血浆,要进行封箱操作并打印箱签吗?',
              ),
              onOk() {
                // 走整箱分拣操作
                _sortingAllQua(true, data.boxNo);
                // 走打印逻辑
                console.log('OK');
              },
              onCancel() {
                // 重新走一次分拣逻辑
                handlePressEnter(true);
              },
              class: 'test',
            });
            return;
          }

          success('分拣血浆成功!');
          bagNo.value = '';
          nextTick(() => {
            bagNoRef.value.focus();
          });

          // 准备号、批次详情数据
          prepareData.value = { ...data.preSummary };
          batchData.value = {
            batchSummary: data.batchSummary,
            pros: data.pros,
            unPro: data.unPro,
            utrkUnPro: data.utrkUnPro,
          };

          // 清空所有选中状态
          for (const item of topBoxData.value) {
            item.isSelected = false;
          }
          if (bottomBoxData.value) {
            for (const item of bottomBoxData.value) {
              item.isSelected = false;
            }
          }
          // 可投产箱子
          topBoxData.value[0].sortCount = data.pros?.sortCount;
          topBoxData.value[0].totalCount = data.pros?.totalCount;
          topBoxData.value[0].immType = data.pros?.immType;
          // topBoxData.value[0].immTypeName = data.pros?.immTypeName;
          if (data.pros?.bagNos?.length) {
            // 可投产血浆列表有长度，说明正在挑的是可投产的，更新血浆列表
            topBoxData.value[0].bagNos = data.pros?.bagNos;
            topBoxData.value[0].isSelected = true;
            targetBox = topBoxData.value[0];
            nextTick(() => {
              scollToBox(true, 'PRO');
            });
          }
          // B时的不投产箱子,A时为空
          if (data.unPro?.sortImmTypes?.length) {
            let scollToIndex = -1;
            // 挑第一袋时，topBoxData中只有可投产的箱，此处直接生成不投产箱子
            if (topBoxData.value && topBoxData.value.length === 1) {
              const unProArr = data.unPro?.sortImmTypes?.map((item, index) => {
                if (item?.bagNos?.length) {
                  scollToIndex = index + 1;
                }
                return {
                  immTypeName: item?.immTypeName,
                  immType: item?.immType,
                  pickType: data.unPro?.pickType,
                  title:
                    item?.immType === 'N'
                      ? `${item?.immType},普通`
                      : `${item?.immType}${item?.titerLevel},${operationMap.get(
                          item?.immType as operationValueEnum,
                        )}${item?.titerLevel === 'H' ? '高' : '低'}效价`,
                  sortCount: item?.sortCount,
                  totalCount: item?.totalCount,
                  bagNos: item?.bagNos,
                  // isSelected: !!item?.bagNos?.length,
                };
              });
              topBoxData.value.push(...unProArr);
            } else {
              data.unPro?.sortImmTypes.forEach((item, index) => {
                topBoxData.value[index + 1].sortCount =
                  data.unPro?.sortImmTypes?.[index]?.sortCount;
                topBoxData.value[index + 1].totalCount =
                  data.unPro?.sortImmTypes?.[index]?.totalCount;
                if (data.unPro?.sortImmTypes?.[index]?.bagNos?.length) {
                  topBoxData.value[index + 1].bagNos = data.unPro?.sortImmTypes?.[index]?.bagNos;
                  scollToIndex = index + 1;
                }
              });
            }
            if (scollToIndex !== -1) {
              targetBox = topBoxData.value[scollToIndex];
              nextTick(() => {
                topBoxData.value[scollToIndex].isSelected = true;
                // 滚动逻辑...
                scollToBox(true, topBoxData.value[scollToIndex].immTypeName);
              });
            }
          }
          // A时的不投产或B的待放行
          if (data.utrkUnPro?.sortImmTypes?.length) {
            // 挑第一袋时， bottomBoxData 列表数据为空,直接赋值列表
            let scollToIndex = -1;
            if (!bottomBoxData.value || !bottomBoxData.value.length) {
              bottomBoxData.value = data.utrkUnPro?.sortImmTypes?.map((item, index) => {
                if (item?.bagNos?.length) {
                  scollToIndex = index;
                }
                return {
                  immTypeName: item?.immTypeName,
                  immType: item?.immType,
                  pickType: data.utrkUnPro?.pickType,
                  title:
                    item?.immType === 'N'
                      ? `${item?.immType},普通`
                      : `${item?.immType}${item?.titerLevel},${operationMap.get(
                          item?.immType as operationValueEnum,
                        )}${item?.titerLevel === 'H' ? '高' : '低'}效价`,
                  sortCount: item?.sortCount,
                  totalCount: item?.totalCount,
                  bagNos: item?.bagNos,
                  // isSelected: !!item?.bagNos?.length,
                };
              });
            } else {
              bottomBoxData.value.forEach((item, index) => {
                item.sortCount = data.utrkUnPro?.sortImmTypes?.[index]?.sortCount;
                item.totalCount = data.utrkUnPro?.sortImmTypes?.[index]?.totalCount;
                if (data.utrkUnPro?.sortImmTypes?.[index]?.bagNos?.length) {
                  item.bagNos = data.utrkUnPro?.sortImmTypes?.[index]?.bagNos;
                  scollToIndex = index;
                }
              });
            }
            if (scollToIndex !== -1) {
              targetBox = bottomBoxData.value[scollToIndex];
              nextTick(() => {
                bottomBoxData.value[scollToIndex].isSelected = true;
                scollToBox(false, bottomBoxData.value[scollToIndex].immTypeName);
              });
            }
          }

          // 满箱
          if (data?.fullBox === true) {
            Modal.confirm({
              title: '提示?',
              icon: createVNode(ExclamationCircleOutlined),
              content: createVNode(
                'div',
                { style: 'color:red;' },
                '该箱已满,要进行封箱操作并打印箱签吗?',
              ),
              onOk() {
                // 走封箱操作 不需要提示
                _sortingBoxSealing(targetBox, true);
                // 走打印逻辑
                console.log('OK');
              },
              onCancel() {
                console.log('Cancel');
              },
              class: 'test',
            });
          }
        } else {
          Modal.confirm({
            title: '提示',
            icon: createVNode(ExclamationCircleOutlined),
            autoFocusButton: 'ok',
            cancelButtonProps: { style: { display: 'none' } },
            content: createVNode('div', { style: 'color:red;' }, res.data?.msg || '系统出错!'),
            onOk() {
              bagNo.value = '';
              nextTick(() => {
                bagNoRef.value.focus();
              });
            },
            class: 'test',
          });
        }
      } finally {
        closeFullLoading();
      }
    }
  }

  // 箱号扫描
  async function _sortingAllQua(e, boxNoNow?) {
    if (e.code === 'Enter' || e.code === 'NumpadEnter' || e === true) {
      if (!boxNo.value && e !== true) {
        warning('请扫描血浆箱号!');
        return;
      }
      if (!prepareNo.value && e !== true) {
        warning('请选择投产准备号!');
        return;
      }
      try {
        openFullLoading();
        const res = await sortingAllQua({
          prepareNo: prepareNo.value,
          boxNo: e === true ? boxNoNow : boxNo.value,
        });
        success('整箱分拣成功!');
        console.log('整箱扫描', res);
        // 请求总览数据
        prepareModalSuccess({ prepareNo: prepareNo.value, pickMode: pickMode });
      } finally {
        boxNo.value = '';
        closeFullLoading();
      }
    }
  }

  // 选择准备号
  function handleSelectPrepare() {
    openPrepareModal(true);
  }

  // 准备号框确认
  async function prepareModalSuccess(prepareNoData) {
    // 清除上次数据
    prepareData.value = {};
    batchData.value = {};
    topBoxData.value = [];
    bottomBoxData.value = [];

    prepareNo.value = prepareNoData.prepareNo;
    pickMode = prepareNoData.pickMode; // 挑浆模式
    try {
      openFullLoading();
      const data = await getPrepareSorting({ prepareNo: prepareNo.value });
      console.log('总览数据:', data, prepareNoData);
      // 准备号、批次详情数据
      prepareData.value = { ...data.preSummary };
      batchData.value = {
        batchSummary: data.batchSummary,
        pros: data.pros,
        unPro: data.unPro,
        utrkUnPro: data.utrkUnPro,
      };

      if (pickMode === 'A') {
        pickTitle.value.top = '检疫期合格可投产血浆';
        pickTitle.value.bottom = '暂不投产血浆';
        setDescProps({
          title: '挑浆模式-投/暂不投',
        });
        setBatchDescProps({
          schema: [
            ...batchSchema,
            {
              field: 'unPro',
              label: '暂不投产血浆',
              render() {
                return (
                  <div>
                    {batchData.value.utrkUnPro?.total
                      ? `${batchData.value.utrkUnPro?.sortCount}/${batchData.value.utrkUnPro?.total}`
                      : ''}
                  </div>
                );
              },
            },
          ],
        });
      }
      if (pickMode === 'B') {
        pickTitle.value.top = '检疫期合格可投产&检疫期合格暂不投产血浆';
        pickTitle.value.bottom = '检疫期待放行血浆';
        setDescProps({
          title: '挑浆模式-投/暂不投/待放行',
        });
        {
          setBatchDescProps({
            schema: [
              ...batchSchema,
              {
                field: 'unPro',
                label: '暂不投产血浆',
                render() {
                  return (
                    <div>
                      {batchData.value.unPro?.total
                        ? `${batchData.value.unPro?.sortCount}/${batchData.value.unPro?.total}`
                        : ''}
                    </div>
                  );
                },
              },
              {
                field: 'utrkUnPro',
                label: '检疫期待放行',
                render() {
                  return (
                    <div>
                      {batchData.value.utrkUnPro?.total
                        ? `${batchData.value.utrkUnPro?.sortCount}/${batchData.value.utrkUnPro?.total}`
                        : ''}
                    </div>
                  );
                },
              },
            ],
          });
        }
      }
      // 处理箱数据 pros => 投产列表  unPro => 不投产列表(A时为空、B时为不投产)  utrkUnPro => 不投产或待放行（A时为不投产、B时为待放行）作为 bottomBoxData 数据
      if (data.pros?.bagNos.length) {
        topBoxData.value.push({
          title: '可投产',
          immType: data.pros?.immType,
          pickType: 'PRO',
          sortCount: data.pros?.sortCount || '',
          totalCount: data.pros?.totalCount || '',
          bagNos: data.pros?.bagNos,
          isSelected: false,
        });
      } else {
        topBoxData.value.push({
          title: '可投产',
          pickType: 'PRO',
          immType: data.pros?.immType || '',
          sortCount:
            data.pros && Object.prototype.hasOwnProperty.call(data.pros, 'sortCount')
              ? data.pros.sortCount
              : '',
          totalCount:
            data.pros && Object.prototype.hasOwnProperty.call(data.pros, 'totalCount')
              ? data.pros.totalCount
              : '',
          bagNos: [],
          isSelected: false,
        });
      }
      const unProArr = data.unPro?.sortImmTypes?.map((item) => {
        return {
          immTypeName: item?.immTypeName,
          immType: item?.immType,
          pickType: data.unPro?.pickType,
          title:
            item?.immType === 'N'
              ? `${item?.immType},普通`
              : `${item?.immType}${item?.titerLevel},${operationMap.get(
                  item?.immType as operationValueEnum,
                )}${item?.titerLevel === 'H' ? '高' : '低'}效价`,
          sortCount: item?.sortCount,
          totalCount: item?.totalCount,
          bagNos: item?.bagNos,
          isSelected: false,
        };
      });
      unProArr?.length && topBoxData.value.push(...unProArr);

      bottomBoxData.value = data.utrkUnPro?.sortImmTypes?.map((item) => {
        return {
          immTypeName: item?.immTypeName,
          immType: item?.immType,
          pickType: data.utrkUnPro?.pickType,
          title:
            item?.immType === 'N'
              ? `${item?.immType},普通`
              : `${item?.immType}${item?.titerLevel},${operationMap.get(
                  item?.immType as operationValueEnum,
                )}${item?.titerLevel === 'H' ? '高' : '低'}效价`,
          sortCount: item?.sortCount,
          totalCount: item?.totalCount,
          bagNos: item?.bagNos,
          isSelected: false,
        };
      });
    } finally {
      closeFullLoading();
    }
  }

  // 定位到操作箱
  function scollToBox(isTop, childId) {
    const parentDom = isTop ? topBoxBarRef.value : bottomBoxBarRef.value;
    const childDom = parentDom.querySelector(`#${childId}`);
    parentDom.scrollTo({
      left: childDom.offsetLeft - 100,
      behavior: 'smooth',
    });
  }

  // 装箱信息
  function pickBoxInfo() {
    openPackingInfoModal(true, { prepareNo });
  }

  // 合箱
  async function _sortingMouldAssembling(data) {
    console.log('合箱', data);
    if (!prepareNo.value) {
      warning('请选择投产准备号!');
      return;
    }
    if (!data.bagNos || !data.bagNos.length) {
      warning('请先分拣血浆');
      return;
    }
    Modal.confirm({
      title: '提示?',
      icon: createVNode(ExclamationCircleOutlined),
      content: createVNode('div', { style: 'color:red;' }, '确认合箱重扫吗?'),
      async onOk() {
        const params = {
          prepareNo: prepareNo.value,
          bagNos: data.bagNos,
        };
        try {
          openFullLoading();
          const res = await sortingMouldAssembling(params);
          console.log('合箱成功:', res);
          success('合箱成功!');
          // 请求总览数据
          prepareModalSuccess({ prepareNo: prepareNo.value, pickMode: pickMode });
        } finally {
          closeFullLoading();
        }
      },
      onCancel() {
        console.log('Cancel');
      },
      class: 'test',
    });
  }

  // 封箱
  async function _sortingBoxSealing(data, noTip?) {
    console.log('封箱', data);
    if (!prepareNo.value) {
      warning('请选择投产准备号!');
      return;
    }
    if (!data.bagNos || !data.bagNos.length) {
      warning('请先分拣血浆');
      return;
    }
    if (noTip) {
      doThis();
    } else {
      Modal.confirm({
        title: '提示?',
        icon: createVNode(ExclamationCircleOutlined),
        content: createVNode('div', { style: 'color:red;' }, '确认封箱并打印箱标签吗?'),
        async onOk() {
          doThis();
        },
        onCancel() {
          console.log('Cancel');
        },
        class: 'test',
      });
    }
    async function doThis() {
      const params = {
        prepareNo: prepareNo.value,
        immType: data.immType,
        pickType: data.pickType,
        bagNos: data.bagNos,
        batchNo: batchData.value?.batchSummary?.batchNo || null,
      };
      try {
        openFullLoading();
        const res = await sortingBoxSealing(params);
        console.log('封箱成功:', res);
        success('封箱成功!');
        // 请求总览数据
        prepareModalSuccess({ prepareNo: prepareNo.value, pickMode: pickMode });
      } finally {
        closeFullLoading();
      }
    }
  }

  // 不合格血浆，确认分拣
  function handleUnqualifiedSuccess() {
    // 走分拣接口
    handlePressEnter(true);
  }

  // 完成分拣
  async function _completeSorting() {
    if (
      prepareData.value.sortTotal &&
      prepareData.value.sortTotal > 0 &&
      prepareData.value.sortTotal === prepareData.value.sortCount
    ) {
      Modal.confirm({
        title: '提示?',
        icon: createVNode(ExclamationCircleOutlined),
        content: createVNode('div', { style: 'color:red;' }, '确认要完成分拣吗?'),
        async onOk() {
          try {
            openFullLoading();
            await completeSorting({ prepareNo: prepareNo.value });
            success('操作成功!');
            // 清除上次数据
            prepareData.value = {};
            batchData.value = {};
            topBoxData.value = [];
            bottomBoxData.value = [];
            prepareNo.value = '';
            pickMode = '';
          } finally {
            closeFullLoading();
          }
        },
        onCancel() {
          console.log('Cancel');
        },
        class: 'test',
      });
    } else {
      warning('请先分拣完血浆!');
    }
  }

  // 分拣批次信息
  const [registerPickBatchDetailModal, { openModal: openPickBatchDetailModal }] = useModal();
  function goPickBatchDetail() {
    openPickBatchDetailModal(true, {
      record: { prepareNo: prepareNo.value },
    });
  }

  // 血浆明细
  const [registerPlasmaDetailModal, { openModal: openPlasmaDetailModal }] = useModal();
  function goPlasmaDetail(prepareProduce?) {
    openPlasmaDetailModal(true, {
      record: { prepareNo: prepareNo.value },
      prepareProduce: prepareProduce === 'prepareProduce',
    });
  }

  // 准备号暂停
  function _openPrepareSuspendModal() {
    openPrepareSuspendModal(true, {
      prepareNo: prepareNo.value,
    });
  }
  // 刷新页面数据
  function PrepareSuspendSuccess() {
    prepareModalSuccess({ prepareNo: prepareNo.value, pickMode: pickMode });
  }

  // 批号暂停
  function _openBatchSuspendModal() {
    openBatchSuspendModal(true, {
      prepareNo: prepareNo.value,
      batchNo: batchData.value?.batchSummary?.batchNo,
    });
  }
</script>
<style lang="less" scoped>
  .card-bar-header {
    border-bottom: 1px solid #eee;
  }

  .card-bar-body {
    .one-card {
      :deep(.ant-card-head-title) {
        margin-right: 12px;
      }

      :deep(.ant-card-body) {
        display: inline-block;
        width: 100%;
        height: 162px;
        overflow-y: auto;
      }
    }

    .one-card.selected {
      background-color: #ff0;
    }
  }
</style>
