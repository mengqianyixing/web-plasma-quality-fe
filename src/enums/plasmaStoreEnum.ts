export enum TYPE_FLAG {
  N = 'N' /**普通库 */,
  F = 'F' /**不合格库 */,
}
export enum TYPE_FLAG_TEXT {
  N = '普通库',
  F = '不合格库',
}
export enum STORE_FLAG {
  S = 'S' /**高架库 */,
  F = 'F' /**平库 */,
}
export enum STORE_FLAG_TEXT {
  S = '高架库',
  F = '平库',
}
export enum AUTO_FLAG {
  M = 'M' /**否 */,
  A = 'A' /**是 */,
}
export enum AUTO_FLAG_TEXT {
  M = '否',
  A = '是',
}

export enum CLOSED {
  NORMAL = 'NORMAL' /**启用 */,
  CLOSED = 'CLOSED' /**禁用 */,
}

export enum CLOSED_TEXT {
  NORMAL = '是' /**启用 */,
  CLOSED = '否' /**禁用 */,
}
