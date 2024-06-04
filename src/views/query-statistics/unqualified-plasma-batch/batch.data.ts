import { FormSchema } from '@/components/Form';
import { BasicColumn } from '@/components/Table';
import { useStation } from '@/hooks/common/useStation';

const { stationOptions } = useStation();
export const columns: BasicColumn[] = [
  {
    title: '序号',
    dataIndex: 'index',
    width: 80,
  },
  {
    title: '采浆公司',
    dataIndex: 'stationName',
    width: 80,
  },
  {
    title: '批次号',
    dataIndex: 'batchNo',
    width: 130,
  },
  {
    title: '入库日期',
    dataIndex: 'inStoreDate',
    width: 100,
  },
  {
    title: '入库数量（袋）',
    dataIndex: 'inStoreNum',
    width: 100,
  },
  {
    title: '验收数量（袋）',
    dataIndex: 'verifyNum',
    width: 100,
  },
  {
    title: '验收合格数量（袋）',
    dataIndex: 'verifyPassNum',
    width: 100,
  },
  {
    title: '验收不合格',
    dataIndex: 'verifyUnqNum',
    children: [
      {
        title: '验收(献血浆者符合性)',
        dataIndex: 'plasmaDonorBlockNum',
        width: 150,
      },
      {
        title: '血浆验收(无样本)',
        dataIndex: 'plasmaMissSampleNum',
        width: 150,
      },
      {
        title: '验收(破袋)',
        dataIndex: 'plasmaDamagedNum',
        width: 100,
      },
      {
        title: '验收(无标签)',
        dataIndex: 'tagMissNum',
        width: 100,
      },
      {
        title: '验收(血浆标签内容缺失)',
        dataIndex: 'tagContentMissNum',
        width: 160,
      },
      {
        title: '验收(颜色异常)',
        dataIndex: 'plasmaColorErrNum',
        width: 140,
      },
      {
        title: '验收(脂血)',
        dataIndex: 'plasmaLipemia',
        width: 100,
      },
      {
        title: '验收(溶血)',
        dataIndex: 'plasmaHemolysisNum',
        width: 100,
      },
      {
        title: '验收(其他)',
        dataIndex: 'plasmaOtherNum',
        width: 100,
      },
      {
        title: '样本验收(献血浆者符合性)',
        dataIndex: 'sampleDonorBlockNum',
        width: 180,
      },
      {
        title: '验收(破管)',
        dataIndex: 'sampleDamagedNum',
        width: 120,
      },
      {
        title: '验收(样本标签信息无法识别)',
        dataIndex: 'sampleTagMissNum',
        width: 200,
      },
      {
        title: '验收(样本装量不足)',
        dataIndex: 'sampleLessNum',
        width: 150,
      },
      {
        title: '验收(样本颜色异常)',
        dataIndex: 'showColorErrNum',
        width: 150,
      },
      {
        title: '验收(样本脂血)',
        dataIndex: 'lipemiaNum',
        width: 120,
      },
      {
        title: '验收(样本溶血)',
        dataIndex: 'sampleHemolysisNum',
        width: 120,
      },
      {
        title: '验收(无样本)',
        dataIndex: 'sampleMissNum',
        width: 120,
      },
      {
        title: '验收(样本无标签)',
        dataIndex: 'sampleMissTagNum',
        width: 130,
      },
      {
        title: '验收不合格合计',
        dataIndex: 'verifyUnqNum',
        width: 120,
      },
      {
        title: '验收不合格比率',
        dataIndex: 'verifyUnqRate',
        width: 150,
      },
    ],
  },
  {
    title: '检测不合格',
    dataIndex: 'testUnqNum',
    children: [
      {
        title: '检测不合格ALT',
        dataIndex: 'altNum',
        width: 130,
      },
      {
        title: '检测不合格HBV-DNA',
        dataIndex: 'natHBsAgNum',
        width: 150,
      },
      {
        title: '检测不合格HBsAg',
        dataIndex: 'hbsAgNum',
        width: 150,
      },
      {
        title: '检测不合格HCV-RNA',
        dataIndex: 'natHCVNum',
        width: 150,
      },
      {
        title: '检测不合格HCV抗体',
        dataIndex: 'hcvNum',
        width: 150,
      },
      {
        title: '检测不合格HIV-1/HIV-2抗体',
        dataIndex: 'hivNum',
        width: 190,
      },
      {
        title: '检测不合格HIV-RNA',
        dataIndex: 'natHIVNum',
        width: 150,
      },
      {
        title: '检测不合格TP',
        dataIndex: 'tpNum',
        width: 130,
      },
      {
        title: '检测不合格TP抗体',
        dataIndex: 'tpTNum',
        width: 150,
      },
      {
        title: '检测不合格合计',
        dataIndex: 'testUnqNum',
        width: 150,
      },
      {
        title: '检测不合格比率',
        dataIndex: 'testUnqRate',
        width: 150,
      },
    ],
  },
  {
    title: '检疫期不合格',
    dataIndex: 'quarantineUnqNum',
    children: [
      {
        title: '检疫期献血浆者符合性',
        dataIndex: 'quarantineDonorBlockNum',
        width: 150,
      },
      {
        title: '检疫期不合格HBV-DNA',
        dataIndex: 'quarantineNatHBsAgNum',
        width: 160,
      },
      {
        title: '检疫期不合格HBsAg',
        dataIndex: 'quarantineHBsAgNum',
        width: 150,
      },
      {
        title: '检疫期不合格HCV-RNA',
        dataIndex: 'quarantineNatHCVNum',
        width: 160,
      },
      {
        title: '检疫期不合格HCV抗体',
        dataIndex: 'quarantineHCVNum',
        width: 155,
      },
      {
        title: '检疫期不合格HIV-1/HIV-2抗体',
        dataIndex: 'quarantineHIVNum',
        width: 200,
      },
      {
        title: '检疫期不合格HIV-RNA',
        dataIndex: 'quarantineNatHIVNum',
        width: 170,
      },
      {
        title: '检疫期不合格合计',
        dataIndex: 'quarantineUnqNum',
        width: 150,
      },
      {
        title: '检疫期不合格比率',
        dataIndex: 'quarantineUnqRate',
        width: 150,
      },
    ],
  },
  {
    title: '续追踪不合格',
    dataIndex: 'trackUnqNum',
    children: [
      {
        title: '续追踪不合格HBV-DNA',
        dataIndex: 'trackNatHBsAgNum',
        width: 160,
      },
      {
        title: '续追踪不合格HBsAg',
        dataIndex: 'trackHBsAgNum',
        width: 150,
      },
      {
        title: '续追踪不合格HCV-RNA',
        dataIndex: 'trackNatHCVNum',
        width: 160,
      },
      {
        title: '续追踪不合格HCV抗体',
        dataIndex: 'trackHCVNum',
        width: 150,
      },
      {
        title: '续追踪不合格HIV-1/HIV-2抗体',
        dataIndex: 'trackHIVNum',
        width: 200,
      },
      {
        title: '续追踪不合格HIV-RNA',
        dataIndex: 'trackNatHIVNum',
        width: 150,
      },
      {
        title: '续追踪不合格超一年',
        dataIndex: 'expnum',
        width: 150,
      },
      {
        title: '续追踪不合格合计',
        dataIndex: 'trackUnqNum',
        width: 150,
      },
      {
        title: '续追踪不合格比率',
        dataIndex: 'trackUnqRate',
        width: 150,
      },
    ],
  },
  {
    title: '其他不合格',
    dataIndex: 'otherUnqNum',
    children: [
      {
        title: '其他',
        dataIndex: 'otherNum',
        width: 60,
      },
      {
        title: '其他（破袋）',
        dataIndex: 'damagedNum',
        width: 100,
      },
      {
        title: '其他（外部告知追溯）',
        dataIndex: 'externalTraceNum',
        width: 150,
      },
      {
        title: '其他不合格合计',
        dataIndex: 'otherUnqNum',
        width: 130,
      },
      {
        title: '其他不合格比率',
        dataIndex: 'otherUnqRate',
        width: 130,
      },
    ],
  },
  {
    title: '合计',
    dataIndex: '',
    children: [
      {
        title: '数量',
        dataIndex: 'totalNum',
        width: 60,
      },
      {
        title: '比率',
        dataIndex: 'unqRate',
        width: 80,
      },
    ],
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'stationNo',
    component: 'Select',
    label: '采浆公司',
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
    field: '[verifyPubStartDate, verifyPubEndDate]',
    component: 'RangePicker',
    label: '验收发布日期',
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
    },
  },
  {
    field: '[inStoreStartDate, inStoreEndDate]',
    component: 'RangePicker',
    label: '入库日期起止',
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
    },
  },
  {
    field: '[issueStartDate, issueEndDate]',
    component: 'RangePicker',
    label: '检测发布日期',
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
    },
  },
  {
    field: '[unqInStoreStartDate, unqInStoreEndDate]',
    component: 'RangePicker',
    label: '不合格入库日期',
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
    },
  },
];
