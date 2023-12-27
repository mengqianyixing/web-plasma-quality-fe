export enum PLASMA_TYPE {
  N = 'N',
  B = 'B',
  R = 'R',
  T = 'T',
  C = 'C',
}
export enum PLASMA_TYPE_TEXT {
  N = '普通',
  B = '乙免',
  R = '狂免',
  T = '破免',
  C = '巨细胞',
}
export const PLASMA_TYPE_LIST = [
  { value: PLASMA_TYPE.N, label: PLASMA_TYPE_TEXT.N },
  { value: PLASMA_TYPE.B, label: PLASMA_TYPE_TEXT.B },
  { value: PLASMA_TYPE.R, label: PLASMA_TYPE_TEXT.R },
  { value: PLASMA_TYPE.T, label: PLASMA_TYPE_TEXT.T },
  { value: PLASMA_TYPE.C, label: PLASMA_TYPE_TEXT.C },
];
