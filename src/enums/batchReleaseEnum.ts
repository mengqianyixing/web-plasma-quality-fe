export enum STATUS {
  ROD = 'ROD',
  TBR = 'TBR',
  WAT = 'WAT',
  DON = 'DON',
}
export const STATUS_TEXT: Map<string, string> = new Map([
  [STATUS.TBR, '待审核'],
  [STATUS.ROD, '待复核'],
  [STATUS.WAT, '待放行'],
  [STATUS.DON, '已放行'],
]);
export const statusList = Object.keys(STATUS).map((_) => ({ label: STATUS_TEXT.get(_), value: _ }));
