import { withInstall } from '@/utils';
import impExcel from './src/ImportExcel.vue';
import expExcelModal from './src/ExportExcelModal.vue';
import { pick, get } from 'lodash-es';
import { isArray } from '@/utils/is';

export const ImpExcel = withInstall(impExcel);
export const ExpExcelModal = withInstall(expExcelModal);
export * from './src/typing';
export { jsonToSheetXlsx, aoaToSheetXlsx } from './src/Export2Excel';

function mergeDeepField(deepField: string, char = '') {
  return Array.prototype.join.call(deepField, char);
}
/** col 必须带有 dataIndex  */
export const formatData = (columns: any[], data: any[]) => {
  const mergeColumns = columns.map((col) => ({ field: mergeDeepField(col.dataIndex), ...col }));
  const fields = mergeColumns.map((col) => col.field);
  const deepFields = columns.filter((col) => isArray(col.dataIndex)).map((col) => col.dataIndex);
  const formatCols = mergeColumns.filter((col) => col.format);

  return data.map((row) => {
    deepFields.forEach((field) => {
      row[mergeDeepField(field)] = get(row, field.join('.'));
    });
    formatCols.forEach((col) => {
      row[col.field] = col.format(get(row, mergeDeepField(col.field, '.') || col.field));
    });
    return pick(row, fields);
  });
};

export const getHeader = (columns: any[]) =>
  columns.reduce((header, col) => {
    header[mergeDeepField(col.dataIndex)! as string] = col.title;
    return header;
  }, {});
