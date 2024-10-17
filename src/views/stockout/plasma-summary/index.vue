<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button
          type="primary"
          @click="handlePrint(PrintServerEnum.PLASMA_SUMMARY)"
          v-auth="StockOutButtonEnum.PlasmaSummaryReport"
          :loading="reportLoading"
        >
          打印
        </a-button>
        <span v-auth="[StockOutButtonEnum.KMPlasmaSummaryReport]">
          <a-dropdown>
            <a-button type="primary" :loading="reportLoading"> 打印 </a-button>
            <template #overlay>
              <Menu>
                <span v-auth="StockOutButtonEnum.KMPlasmaSummaryReport">
                  <MenuItem>
                    <a-button type="link" @click="handlePrint(PrintServerEnum.PLASMA_SUMMARY)">
                      原料血浆汇总表
                    </a-button>
                  </MenuItem>
                </span>
                <!--                <span v-auth="StockOutButtonEnum.QuarantineTrackUnqualifiedPlasmaRecords">-->
                <!--                  <MenuItem>-->
                <!--                    <a-button-->
                <!--                      type="link"-->
                <!--                      @click="handlePrint(PrintServerEnum.FOLLOW_TRACK_UNQUALIFIED)"-->
                <!--                    >-->
                <!--                      检疫期续追踪不合格血浆记录-->
                <!--                    </a-button>-->
                <!--                  </MenuItem>-->
                <!--                </span>-->
              </Menu>
            </template>
          </a-dropdown>
        </span>
      </template>
    </BasicTable>
    <ReportModal @register="registerReportModal" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { PageWrapper } from '@/components/Page';
  import { BasicTable, useTable, BasicColumn, FormSchema } from '@/components/Table';
  import dayjs from 'dayjs';
  import { getPlasmaSummary } from '@/api/stockout/plasma-summary';
  import { useStation } from '@/hooks/common/useStation';
  import { message, Dropdown as ADropdown, MenuItem, Menu } from 'ant-design-vue';
  import { StockOutButtonEnum } from '@/enums/authCodeEnum';

  import { ref } from 'vue';
  import ReportModal from '@/components/ReportModal/index.vue';
  import { getReportApi } from '@/api/report';
  import { useModal } from '@/components/Modal';
  import { PrintServerEnum } from '@/enums/printServerEnum';
  import { useGlobalApiStoreWithOut } from '@/store/modules/globalApi';

  const globalApiStore = useGlobalApiStoreWithOut();

  const reportLoading = ref(false);
  const [registerReportModal, { openModal: openReportModal }] = useModal();

  const { stationOptions } = useStation();
  defineOptions({ name: 'PlasmaSummary' });

  const columns: BasicColumn[] = [
    {
      title: '血浆批号',
      dataIndex: 'batchNo',
      width: 110,
      sorter: true,
    },
    {
      title: '采浆公司',
      dataIndex: 'stationName',
      width: 80,
    },
    {
      title: '血浆总数',
      dataIndex: 'bagCount',
      width: 80,

      // slots: { customRender: 'boxCount' },
    },
    {
      title: '投产出库数量(袋)',
      dataIndex: 'proOutCount',
      width: 140,
    },
    {
      title: '非投产出库数量(袋)',
      dataIndex: 'unProOutCount',
      width: 140,
    },
    {
      title: '不合格数量',
      dataIndex: 'unqualifiedCount',
      width: 100,
    },
    {
      title: '状态',
      dataIndex: 'printState',
      customRender: ({ text }) => {
        if (text === true) {
          return '已打印';
        } else if (text === false) {
          return '未打印';
        }
        return '';
      },
      width: 80,
    },
    {
      title: '汇总日期',
      dataIndex: 'createAt',
      format: (text) => (text ? dayjs(text).format('YYYY-MM-DD') : '-'),
      width: 100,
      sorter: true,
    },
    {
      title: '打印人',
      dataIndex: 'printor',
      width: 100,
      ellipsis: false,
    },
    {
      title: '打印日期',
      dataIndex: 'printAt',
      format: (text) => (text ? dayjs(text).format('YYYY-MM-DD') : '-'),
      width: 100,
    },
  ];

  const searchFormschema: FormSchema[] = [
    {
      label: '采浆公司',
      component: 'Select',
      field: 'stationNo',
      componentProps: {
        options: stationOptions,
      },
    },
    {
      field: 'batchNo',
      component: 'Input',
      label: '血浆批号',
    },
    {
      field: '[printAtBegin,printAtEnd]',
      component: 'RangePicker',
      label: '打印日期',
    },
    {
      field: 'printState',
      label: '状态',
      component: 'Select',
      defaultValue: false,
      componentProps: {
        options: [
          {
            value: true,
            label: '已打印',
          },
          {
            value: false,
            label: '未打印',
          },
        ],
      },
    },
  ];

  const [registerTable, { clearSelectedRowKeys, getSelectRows }] = useTable({
    api: getPlasmaSummary,
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    columns: columns,
    size: 'small',
    useSearchForm: true,
    showTableSetting: false,
    bordered: true,
    rowSelection: {
      fixed: true,
      type: 'radio',
    },
    beforeFetch: (p) => {
      if (p.order) {
        if (p.order === 'ascend') p.sortOrder = 'ASC';
        if (p.order === 'descend') p.sortOrder = 'DESC';
        p.sortIdx = p.field;
        delete p.order;
        delete p.field;
      }
      return {
        ...p,
        beginTime: p.beginTime?.slice(0, 10),
        endTime: p.endTime?.slice(0, 10),
      };
    },
    formConfig: {
      schemas: searchFormschema,
      transformDateFunc(date) {
        return date ? date.format('YYYY-MM-DD') : ''; // 时间格式只要日期
      },
    },
  });
  function getSelections(onlyOne: boolean, fn?: (rows: Recordable[]) => void) {
    const rows = getSelectRows();
    if (rows.length === 0) {
      message.warning('请选择一条数据');
      return [];
    } else if (rows.length > 1 && onlyOne) {
      message.warning('只能选择一条数据');
      return [];
    }
    fn?.(rows);
    return rows;
  }

  async function handlePrint(reportType: string) {
    getSelections(true, async ([row]) => {
      try {
        reportLoading.value = true;
        const date = (await globalApiStore.getSysParamsValue('historyReportDate')) as string;
        if (row.printAt && dayjs(date).isAfter(row.printAt)) {
          return message.warning('历史报表请查阅纸质文档');
        }
        const res = await getReportApi({ reportKey: reportType, contentKey: row.batchNo });
        openReportModal(true, window.URL.createObjectURL(res));
        clearSelectedRowKeys();
      } finally {
        reportLoading.value = false;
      }
    });
  }
</script>
