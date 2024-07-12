/*
 * @Descripttion:
 * @version:
 * @Author: zcc
 * @Date: 2024-01-25 09:42:11
 * @LastEditors: Ding 1326587277@qq.com
 * @LastEditTime: 2024-02-29 14:13:20
 */
import { BasicColumn, FormSchema } from '@/components/Table';
import { SERVER_ENUM } from '@/enums/serverEnum';
import { useServerEnumStoreWithOut } from '@/store/modules/serverEnums';

const serverEnumStore = useServerEnumStoreWithOut();
const ReportTemplateState = serverEnumStore.getServerEnumText(SERVER_ENUM.ReportTemplateState);
export const columns: BasicColumn[] = [
  {
    title: '文件编号',
    dataIndex: 'ctrlNo',
    width: 160,
  },
  {
    title: '报表名称',
    dataIndex: 'ctrlTitle',
    width: 200,
    ellipsis: false,
  },
  {
    title: '报表英文名称',
    dataIndex: 'ctrlEngTitle',
    width: 200,
    ellipsis: false,
  },
  {
    title: '版本号',
    dataIndex: 'ctrlVersion',
    width: 80,
  },
  {
    title: '起草人',
    dataIndex: 'creator',
    width: 100,
  },
  {
    title: '模版版本号',
    dataIndex: 'templateVersion',
    width: 100,
  },
  {
    title: '生效日期',
    dataIndex: 'effectiveDate',
    width: 100,
  },
  {
    title: '有效期至',
    dataIndex: 'expiredDate',
    width: 100,
  },
  {
    title: '修改人',
    dataIndex: 'updater',
    width: 100,
  },
  {
    title: '修改日期',
    dataIndex: 'updateAt',
    width: 100,
    format: (v) => v?.slice(0, 10),
  },
  {
    title: '状态',
    dataIndex: 'state',
    format: ReportTemplateState,
    width: 80,
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'ctrlNo',
    component: 'Input',
    label: '文件编号',
    required: true,
  },
  {
    field: 'ctrlTitle',
    component: 'Input',
    label: '报表名称',
    required: true,
  },
  {
    field: 'ctrlEngTitle',
    component: 'Input',
    label: '报表英文名称',
  },
  {
    field: 'ctrlVersion',
    component: 'Input',
    label: '版本号',
  },
  {
    field: 'effectiveDate',
    component: 'DatePicker',
    label: '生效日期',
    componentProps: {
      class: 'w-full',
      valueFormat: 'YYYY-MM-DD',
    },
  },
  {
    field: 'expiredDate',
    component: 'DatePicker',
    label: '有效期至',
    componentProps: {
      class: 'w-full',
      valueFormat: 'YYYY-MM-DD',
    },
  },
];
