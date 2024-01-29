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
          :id="item.immTypeName"
          class="one-card min-w-57.5 mr-3 flex-shrink-0 h-57.5"
          :class="{ selected: item.isSelected }"
          :title="`${item.title}(${item.sortCount}/${item.totalCount})`"
        >
          <template #extra
            ><a class="mr-1" @click="_sortingMouldAssembling(item)">合箱</a
            ><a @click="_sortingBoxSealing(item)">封箱</a></template
          >
          <div class="text-4" v-for="(one, i) in item.bagNos" :key="i">{{ one }}</div>
        </Card>
      </div>
    </div>
    <Description @register="registerBatch" :data="batchData" class="mt-3" />
    <div class="card-bar mt-1 mb-1 bg-[#fff] h-73.5">
      <div class="h-10 pl-3 card-bar-header lh-10">{{ pickTitle.bottom }}</div>
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
          <div class="text-4" v-for="(one, i) in item.bagNos" :key="i">{{ one }}</div>
        </Card>
      </div>
    </div>
    <PrepareModal @register="registerPrepareModal" @success="prepareModalSuccess" />
    <PackingInfoModal @register="registerPackingInfoModal" />
    <InStoreModal @register="registerInStoreModal" />
    <OutStoreModal @register="registerOutStoreModal" />
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
  import { getPrepareSorting, pickSortingBag } from '@/api/stockout/production-preparation.js';
  import { useMessage } from '@/hooks/web/useMessage';

  import PrepareModal from '@/views/stockout/production-sorting/components/prepare-modal.vue';
  import PackingInfoModal from '@/views/stockout/production-sorting/components/packing-info-modal.vue';
  import { prepareStateMap, prepareStateValueEnum } from '@/enums/stockoutEnum';
  import InStoreModal from './components/in-store-modal.vue';
  import OutStoreModal from './components/out-store-modal.vue';

  const { createMessage } = useMessage();
  const { warning, success } = createMessage;

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
  const topBoxData = ref<any>([
    // {
    //   title: '可投产',
    //   sortCount: 0,
    //   totalCount: 2222,
    //   isSelected: false,
    //   bagNos: [],
    // },
  ]);
  // 批次栏信息
  const bottomBoxBarRef = ref();
  // bottom栏箱子
  const bottomBoxData = ref<any>([
    // {
    //   title: 'BH,乙免低效价',
    //   sortCount: 0,
    //   totalCount: 2222,
    //   isSelected: false,
    //   bagNos: [],
    // },
  ]);

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
        return <div>{prepareData.value.batchNoCount ? prepareData.value.batchNoCount : ''}</div>;
      },
    },
    {
      field: 'bagCount',
      label: '分拣血浆',
      render() {
        return (
          <div>
            {prepareData.value.sortTotal
              ? `${prepareData.value.sortCount}/${prepareData.value.sortTotal}`
              : ''}
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
            {prepareData.value.proTotal
              ? `${prepareData.value.proSortCount}/${prepareData.value.proTotal}`
              : ''}
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
            <a-button>批次暂停</a-button>
            <a-button>准备号暂停</a-button>
            <a-button onclick={pickBoxInfo}>装箱信息</a-button>
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
            <a-button>分拣完成</a-button>
          </div>
        );
      },
    },
  ];
  const [register] = useDescription({
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
              onkeyup={debounce(handlePressEnter, 500)}
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

  // 血浆扫描
  async function handlePressEnter(e) {
    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
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
      };
      const data = await pickSortingBag(params);
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
      for (const item of bottomBoxData.value) {
        item.isSelected = false;
      }

      // 可投产箱子
      topBoxData.value[0].sortCount = data.pros?.sortCount;
      topBoxData.value[0].totalCount = data.pros?.totalCount;
      if (data.pros?.bagNos?.length) {
        // 可投产血浆列表有长度，说明正在挑的是可投产的，更新血浆列表
        topBoxData.value[0].bagNos = data.pros?.bagNos;
        topBoxData.value[0].isSelected = true;
        nextTick(() => {
          scollToBox(false, topBoxData.value[0].immTypeName);
        });
      }
      // B时的不投产箱子,A时为空
      if (data.unPro?.sortImmTypes?.length) {
        let scollToIndex = -1;
        topBoxData.value.forEach((item, index) => {
          topBoxData[index + 1].sortCount = data.unPro?.sortImmTypes?.[index]?.sortCount;
          topBoxData[index + 1].totalCount = data.unPro?.sortImmTypes?.[index]?.totalCount;
          if (data.unPro?.sortImmTypes?.[index]?.bagNos?.length) {
            topBoxData[index + 1].bagNos = data.unPro?.sortImmTypes?.[index]?.bagNos;
            scollToIndex = index + 1;
          }
        });
        nextTick(() => {
          topBoxData.value[scollToIndex].isSelected = true;
          // 滚动逻辑...
          scollToBox(false, topBoxData.value[scollToIndex].immTypeName);
        });
      }
      // A时的不投产或B的待放行
      // 挑第一袋时， bottomBoxData 列表数据为空,直接赋值列表
      if (!bottomBoxData.value.length) {
        bottomBoxData.value = data.utrkUnPro?.sortImmTypes?.map((item) => {
          return {
            immTypeName: item?.immTypeName,
            title: `${item?.titerLevel === 'H' ? '高' : '低'},${item?.immType}`,
            sortCount: item?.sortCount,
            totalCount: item?.totalCount,
            bagNos: item?.bagNos,
            isSelected: !!item?.bagNos?.length,
          };
        });
        nextTick(() => {
          scollToBox(false, bottomBoxData.value[0].immTypeName);
        });
      } else {
        let scollToIndex = -1;
        bottomBoxData.value.forEach((item, index) => {
          item.sortCount = data.utrkUnPro?.sortImmTypes?.[index]?.sortCount;
          item.totalCount = data.utrkUnPro?.sortImmTypes?.[index]?.totalCount;
          if (data.utrkUnPro?.sortImmTypes?.[index]?.bagNos?.length) {
            item.bagNos = data.utrkUnPro?.sortImmTypes?.[index]?.bagNos;
            scollToIndex = index;
          }
        });
        nextTick(() => {
          bottomBoxData.value[scollToIndex].isSelected = true;
          scollToBox(false, bottomBoxData.value[scollToIndex].immTypeName);
        });
      }

      if (data?.fullBox === true) {
        Modal.confirm({
          title: '提示?',
          icon: createVNode(ExclamationCircleOutlined),
          content: createVNode(
            'div',
            { style: 'color:red;' },
            '该箱已满请进行封箱操作，要打印箱签吗?',
          ),
          onOk() {
            console.log('OK');
          },
          onCancel() {
            console.log('Cancel');
          },
          class: 'test',
        });
      }
    }
  }

  // 选择准备号
  function handleSelectPrepare(value: string, event: MouseEvent) {
    console.log(value, event);
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
    console.log('复制后:', data, prepareNoData);

    if (pickMode === 'A') {
      pickTitle.value.top = '检疫期合格可投产血浆';
      pickTitle.value.bottom = '暂不投产血浆';
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
        sortCount: data.pros?.sortCount,
        totalCount: data.pros?.totalCount,
        bagNos: data.pros?.bagNos,
        isSelected: false,
      });
    } else {
      topBoxData.value.push({
        title: '可投产',
        sortCount: '',
        totalCount: '',
        bagNos: [],
        isSelected: false,
      });
    }
    const unProArr = data.unPro?.sortImmTypes?.map((item) => {
      return {
        immTypeName: item?.immTypeName,
        title: `${item?.titerLevel === 'H' ? '高' : '低'},${item?.immType}`,
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
        title: `${item?.titerLevel === 'H' ? '高' : '低'},${item?.immType}`,
        sortCount: item?.sortCount,
        totalCount: item?.totalCount,
        bagNos: item?.bagNos,
        isSelected: false,
      };
    });
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
    if (!prepareNo.value) {
      warning('请选择投产准备号!');
      return;
    }
    openPackingInfoModal(true, { prepareNo });
  }

  // 合箱
  async function _sortingMouldAssembling(data) {
    console.log('合箱', data);
  }

  // 封箱
  async function _sortingBoxSealing(data) {
    console.log('封箱', data);
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
