/*
 * @Descripttion:
 * @version:
 * @Author: zcc
 * @Date: 2024-01-02 13:49:26
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-30 10:42:02
 */
/** 血浆类型 */
export enum PLASMA_TYPE {
  N = 'N',
  B = 'B',
  R = 'R',
  A = 'A',
  T = 'T',
  G = 'G',
  C = 'C',
}
export enum PLASMA_TYPE_TEXT {
  N = 'N,普通',
  B = 'B,乙免',
  R = 'R,狂免',
  A = 'A,炭疽',
  T = 'T,破免',
  C = 'C,新冠',
  G = 'G,巨细胞',
}
export const PLASMA_TYPE_LIST = [
  { value: PLASMA_TYPE.N, label: PLASMA_TYPE_TEXT.N },
  { value: PLASMA_TYPE.B, label: PLASMA_TYPE_TEXT.B },
  { value: PLASMA_TYPE.R, label: PLASMA_TYPE_TEXT.R },
  { value: PLASMA_TYPE.A, label: PLASMA_TYPE_TEXT.A },
  { value: PLASMA_TYPE.T, label: PLASMA_TYPE_TEXT.T },
  { value: PLASMA_TYPE.G, label: PLASMA_TYPE_TEXT.G },
];
