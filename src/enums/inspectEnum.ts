/** 血浆类型 */
export enum PLASMA_TYPE {
  N = 'N',
  B = 'B',
  R = 'R',
  A = 'A',
  T = 'T',
  G = 'G',
}
export enum PLASMA_TYPE_TEXT {
  N = '普通',
  B = '乙免',
  R = '狂免',
  A = '炭疽',
  T = '破免',
  G = '巨细胞',
}
export const PLASMA_TYPE_LIST = [
  { value: PLASMA_TYPE.N, label: PLASMA_TYPE_TEXT.N },
  { value: PLASMA_TYPE.B, label: PLASMA_TYPE_TEXT.B },
  { value: PLASMA_TYPE.R, label: PLASMA_TYPE_TEXT.R },
  { value: PLASMA_TYPE.A, label: PLASMA_TYPE_TEXT.A },
  { value: PLASMA_TYPE.T, label: PLASMA_TYPE_TEXT.T },
  { value: PLASMA_TYPE.G, label: PLASMA_TYPE_TEXT.G },
];
