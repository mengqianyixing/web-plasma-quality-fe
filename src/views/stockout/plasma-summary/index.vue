<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-dropdown
          v-auth="[
            StockOutButtonEnum.PlasmaSummaryPlasmaSummaryReport,
            StockOutButtonEnum.PlasmaSummaryPlasmaTrackUnqReport,
          ]"
        >
          <a-button type="primary" :loading="reportLoading">
            打印
            <DownOutlined />
          </a-button>
          <template #overlay>
            <Menu>
              <MenuItem>
                <a-button
                  type="link"
                  @click="handlePrint('PLASMA_SUMMARY')"
                  v-auth="StockOutButtonEnum.PlasmaSummaryPlasmaSummaryReport"
                >
                  血浆汇总表
                </a-button>
              </MenuItem>
              <MenuItem>
                <a-button
                  type="link"
                  @click="handlePrint('PLASMA_TRACK_UNQ_RECORD')"
                  v-auth="StockOutButtonEnum.PlasmaSummaryPlasmaTrackUnqReport"
                >
                  续追踪不合格记录
                </a-button>
              </MenuItem>
            </Menu>
          </template>
        </a-dropdown>
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
  import { Dropdown as ADropdown, MenuItem, Menu, message } from 'ant-design-vue';
  import { StockOutButtonEnum } from '@/enums/authCodeEnum';

  import { ref } from 'vue';
  import ReportModal from '@/components/ReportModal/index.vue';
  import { getReportApi } from '@/api/report';
  import { useModal } from '@/components/Modal';

  const reportLoading = ref(false);
  const [registerReportModal, { openModal: openReportModal }] = useModal();

  const { stationOptions } = useStation();
  defineOptions({ name: 'PlasmaSummary' });

  const columns: BasicColumn[] = [
    {
      title: '血浆批号',
      dataIndex: 'batchNo',
    },
    {
      title: '采浆公司',
      dataIndex: 'stationName',
    },
    {
      title: '血浆总数',
      dataIndex: 'bagCount',
      // slots: { customRender: 'boxCount' },
    },
    {
      title: '投产出库数量袋',
      dataIndex: 'ProOutCount',
    },
    {
      title: '非投产出库数量袋',
      dataIndex: 'unProOutCount',
    },
    {
      title: '不合格数量',
      dataIndex: 'unqualifiedCount',
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
    },
    {
      title: '打印人',
      dataIndex: 'printor',
    },
    {
      title: '打印时间',
      dataIndex: 'printAt',
      format: (text) => (text ? dayjs(text).format('YYYY-MM-DD HH:mm:ss') : '-'),
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
    beforeFetch: (p) => ({
      ...p,
      beginTime: p.beginTime?.slice(0, 10),
      endTime: p.endTime?.slice(0, 10),
    }),
    formConfig: {
      schemas: searchFormschema,
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
        const res = await getReportApi({ reportKey: reportType, contentKey: row.batchNo });
        openReportModal(true, window.URL.createObjectURL(res));
        clearSelectedRowKeys();
      } finally {
        reportLoading.value = false;
      }
    });
  }
</script>
