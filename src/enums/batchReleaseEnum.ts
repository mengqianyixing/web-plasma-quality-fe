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
export const statusList = (() => {
  const list: Recordable = [];
  for (const [value, label] of STATUS_TEXT) {
    list.push({ label, value });
  }
  return list;
})();
