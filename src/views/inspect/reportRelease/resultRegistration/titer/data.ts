import { BasicColumn, FormSchema } from '@/components/Table';
import { SERVER_ENUM } from '@/enums/serverEnum';
import { useServerEnumStoreWithOut } from '@/store/modules/serverEnums';

const serverEnumStore = useServerEnumStoreWithOut();
const PlasmaType = serverEnumStore.getServerEnumText(SERVER_ENUM.PlasmaType);

export const columns: BasicColumn[] = [
  { title: '检测项目', dataIndex: 'projectAbbr', slots: { customRender: 'projectAbbr' } },
  { title: '检测方法', dataIndex: 'methodAbbr' },
  { title: '高效价总数', dataIndex: 'totalHighTiter' },
  { title: '低效价总数', dataIndex: 'totalLowTiter' },
  { title: '无效价总数', dataIndex: 'totalNormal' },
  { title: '未检测样本总数', dataIndex: 'totalNotCheck' },
];
export const dtRusultColumns: BasicColumn[] = [
  {
    title: '血浆类型',
    dataIndex: 'plasmaType',
    customRender: ({ record }) => {
      return PlasmaType(record.plasmaType);
    },
    width: 80,
  },

  {
    title: '效价结果',
    dataIndex: 'conclusionShow',
    width: 100,
  },
  {
    title: '检测日期',
    dataIndex: 'checkAt',
    format: (t) => t?.slice(0, 10),
    width: 100,
  },
  {
    title: '效价值',
    dataIndex: 'titerValue',
    width: 80,
  },
];
type getColumns = (checkResult: string) => BasicColumn[];
export const dtColumns: getColumns = (checkResult) => [
  {
    title: '样本编号',
    dataIndex: 'sampleNo',
    width: 120,
  },
  {
    title: '浆员编号',
    dataIndex: 'cardNo',
    width: 120,
  },
  {
    title: '浆员姓名',
    dataIndex: 'name',
    width: 100,
  },
  {
    title: '血型',
    dataIndex: 'bloodType',
    width: 60,
  },
  ...(checkResult ? dtRusultColumns : []),
];
export const dtSearchSchema: FormSchema[] = [
  {
    field: 'sampleNo',
    label: '样本编号',
    component: 'Input',
  },
  {
    field: 'valenceResult',
    label: '效价结果',
    component: 'Select',
    componentProps: {
      options: serverEnumStore.getServerEnum(SERVER_ENUM.TiterLevel),
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
