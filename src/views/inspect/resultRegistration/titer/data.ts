import { BasicColumn, FormSchema } from '@/components/Table';
import { getDictItemListByNoApi } from '@/api/dictionary';

export const columns: BasicColumn[] = [
  { title: '检测项目', dataIndex: 'projectAbbr', slots: { customRender: 'projectAbbr' } },
  { title: '检测方法', dataIndex: 'methodAbbr' },
  { title: '高效价总数', dataIndex: 'totalHighTiter' },
  { title: '低效价总数', dataIndex: 'totalLowTiter' },
  { title: '无效价总数', dataIndex: 'totalNormal' },
  { title: '未检测样品总数', dataIndex: 'totalNotCheck' },
];
export const dtRusultColumns: BasicColumn[] = [
  {
    title: '血浆类型',
    dataIndex: 'plasmaType',
  },
  {
    title: '效价类型',
    dataIndex: 'titerType',
  },
  {
    title: '效价结果',
    dataIndex: 'conclusion',
  },
  {
    title: '检测日期',
    dataIndex: 'checkAt',
  },
  {
    title: 'OD值',
    dataIndex: 'od',
  },
  {
    title: '效价结果值',
    dataIndex: '',
  },
  {
    title: '版号',
    dataIndex: '',
  },
];
type getColumns = (checkResult: string) => BasicColumn[];
export const dtColumns: getColumns = (checkResult) => [
  {
    title: '样品编号',
    dataIndex: 'sampleId',
  },
  {
    title: '浆员编号',
    dataIndex: 'donorNo',
  },
  {
    title: '浆员姓名',
    dataIndex: 'name',
  },
  {
    title: '血型',
    dataIndex: '',
  },
  ...(checkResult ? dtRusultColumns : []),
];
export const dtSearchSchema: FormSchema[] = [
  {
    field: 'sampleId',
    label: '样品编号',
    component: 'Input',
  },
  {
    field: '',
    label: '板号',
    component: 'Input',
  },
  {
    field: 'conclusion',
    label: '效价结果',
    component: 'ApiSelect',
    componentProps: {
      api: () =>
        new Promise((rs, rj) => {
          getDictItemListByNoApi(['titerResult'])
            .then((res) => {
              rs(res[0]['dictImtes']);
            })
            .catch(rj);
        }),
    },
  },
  {
    field: 'checkAt',
    label: '检测日期',
    component: 'DatePicker',
    componentProps: {
      class: 'w-full',
    },
  },
];
export const enterFormSchema: FormSchema[] = [
  { field: 'conclusion', component: 'Select', label: '效价结果', required: true },
  { field: 'checkAt', component: 'DatePicker', label: '检测日期', required: true },
];
export const enterColumns: BasicColumn[] = [
  {
    title: '样品编号',
    dataIndex: 'sampleId',
  },
  {
    title: '浆员编号',
    dataIndex: 'donorNo',
  },
  {
    title: '浆员姓名',
    dataIndex: 'name',
  },
];

export const cellList = [
  {
    field: 'name',
    label: '文件名称',
  },
  {
    field: '',
    label: '数据总数',
  },
  {
    field: '',
    label: '保存成功总数',
  },
  {
    field: '',
    label: '保存失败总数',
  },
];
export const importSuccessColumns: BasicColumn[] = [
  { title: '样品编号', dataIndex: '' },
  { title: '浆员编号', dataIndex: '' },
  { title: '浆员姓名', dataIndex: '' },
  { title: '血浆类型', dataIndex: '' },
  { title: '效价类型', dataIndex: '' },
];

export const importFailColumns: BasicColumn[] = [
  { title: '无法保存数据', dataIndex: '' },
  { title: '备注', dataIndex: '' },
];
