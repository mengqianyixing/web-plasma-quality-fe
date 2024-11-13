export enum statusEnum {
  TBR = '待复核',
  RVD = '待审核',
  TBP = '待计划',
  PLI = '计划中',
  PBR = '计划待复核',
  PLD = '计划待审核',
  TBS = '待组垛',
  IST = '组垛中',
  SDN = '计划已审核',
  PVD = '待出库',
  OTD = '已出库',
  OUI = '出库中',
  ACT = '接收中',
  ACD = '已接收',
  ROD = '已撤销',
}

export enum statusValueEnum {
  TBR = 'TBR',
  RVD = 'RVD',
  TBP = 'TBP',
  PLI = 'PLI',
  PBR = 'PBR',
  PLD = 'PLD',
  TBS = 'TBS',
  IST = 'IST',
  SDN = 'SDN',
  PVD = 'PVD',
  OTD = 'OTD',
  OUI = 'OUI',
  ACT = 'ACT',
  ACD = 'ACD',
  ROD = 'ROD',
}

export const rsStatusMap = new Map<statusValueEnum, string>();

rsStatusMap.set(statusValueEnum.TBR, statusEnum.TBR);
rsStatusMap.set(statusValueEnum.RVD, statusEnum.RVD);
rsStatusMap.set(statusValueEnum.TBP, statusEnum.TBP);
rsStatusMap.set(statusValueEnum.PLI, statusEnum.PLI);
rsStatusMap.set(statusValueEnum.PBR, statusEnum.PBR);
rsStatusMap.set(statusValueEnum.PLD, statusEnum.PLD);
rsStatusMap.set(statusValueEnum.PVD, statusEnum.PVD);
rsStatusMap.set(statusValueEnum.OUI, statusEnum.OUI);
rsStatusMap.set(statusValueEnum.OTD, statusEnum.OTD);
rsStatusMap.set(statusValueEnum.ACT, statusEnum.ACT);
rsStatusMap.set(statusValueEnum.ACD, statusEnum.ACD);
// statusMap.set(statusValueEnum.ROD, statusEnum.ROD);

export const kmStatusMap = new Map<statusValueEnum, string>();

kmStatusMap.set(statusValueEnum.TBR, statusEnum.TBR);
kmStatusMap.set(statusValueEnum.RVD, statusEnum.RVD);
kmStatusMap.set(statusValueEnum.TBP, statusEnum.TBP);
kmStatusMap.set(statusValueEnum.PLI, statusEnum.PLI);
kmStatusMap.set(statusValueEnum.PBR, statusEnum.PBR);
kmStatusMap.set(statusValueEnum.PLD, statusEnum.PLD);
kmStatusMap.set(statusValueEnum.TBS, statusEnum.TBS);
kmStatusMap.set(statusValueEnum.IST, statusEnum.IST);
kmStatusMap.set(statusValueEnum.SDN, statusEnum.SDN);
kmStatusMap.set(statusValueEnum.OUI, statusEnum.OUI);
kmStatusMap.set(statusValueEnum.OTD, statusEnum.OTD);
kmStatusMap.set(statusValueEnum.ACD, statusEnum.ACD);

//审核结果
export enum auditResultEnum {
  PA = '通过',
  NA = '不通过',
}

export enum auditResultValueEnum {
  PA = 'PA',
  NA = 'NA',
}

export const auditResultMap = new Map<auditResultValueEnum, string>();

auditResultMap.set(auditResultValueEnum.PA, auditResultEnum.PA);
auditResultMap.set(auditResultValueEnum.NA, auditResultEnum.NA);

export enum expirationEnum {
  AY = '一年',
  TY = '三年',
}

export enum expirationValueEnum {
  AY = 'AY',
  TY = 'TY',
}

export const expirationMap = new Map<expirationValueEnum, string>();

expirationMap.set(expirationValueEnum.AY, expirationEnum.AY);
expirationMap.set(expirationValueEnum.TY, expirationEnum.TY);

// 投产准备状态
export enum prepareStateEnum {
  RUN = '准备中',
  REV = '待复核',
  TPK = '待分拣',
  RPK = '分拣中',
  CPK = '已分拣',
  OUT = '已出库',
  DEL = '已取消',
}

export enum prepareStateValueEnum {
  RUN = 'RUN',
  REV = 'REV',
  TPK = 'TPK',
  RPK = 'RPK',
  CPK = 'CPK',
  OUT = 'OUT',
  DEL = 'DEL',
}

export const prepareStateMap = new Map<prepareStateValueEnum, string>();

prepareStateMap.set(prepareStateValueEnum.RUN, prepareStateEnum.RUN);
prepareStateMap.set(prepareStateValueEnum.REV, prepareStateEnum.REV);
prepareStateMap.set(prepareStateValueEnum.TPK, prepareStateEnum.TPK);
prepareStateMap.set(prepareStateValueEnum.RPK, prepareStateEnum.RPK);
prepareStateMap.set(prepareStateValueEnum.CPK, prepareStateEnum.CPK);
prepareStateMap.set(prepareStateValueEnum.OUT, prepareStateEnum.OUT);
prepareStateMap.set(prepareStateValueEnum.DEL, prepareStateEnum.DEL);

// 限制血浆
export enum bagFlagEnum {
  ALL = '是',
  NO = '否',
}

export enum bagFlagValueEnum {
  ALL = 'ALL',
  NO = 'NO',
}

export const bagFlagMap = new Map<bagFlagValueEnum, string>();

bagFlagMap.set(bagFlagValueEnum.ALL, bagFlagEnum.ALL);
bagFlagMap.set(bagFlagValueEnum.NO, bagFlagEnum.NO);

// 挑浆模式
export enum pickModeEnum {
  A = '投/暂不投',
  B = '投/暂不投/待放行',
}

export enum pickModeValueEnum {
  A = 'A',
  B = 'B',
}

export const pickModeMap = new Map<pickModeValueEnum, string>();

pickModeMap.set(pickModeValueEnum.A, pickModeEnum.A);
pickModeMap.set(pickModeValueEnum.B, pickModeEnum.B);

// 合格状态
export enum BagTrackEnum {
  UTRK = '待追',
  PASS = '检疫期合格',
  FAIL = '检疫期不合格',
  FTRK = '续追踪不合格',
  EXPR = '效期不合格',
  BLOK = '献浆员者不符合',
}

export enum BagTrackValueEnum {
  UTRK = 'UTRK',
  PASS = 'PASS',
  FAIL = 'FAIL',
  FTRK = 'FTRK',
  EXPR = 'EXPR',
  BLOK = 'BLOK',
}

export const BagTrackMap = new Map<BagTrackValueEnum, string>();

BagTrackMap.set(BagTrackValueEnum.UTRK, BagTrackEnum.UTRK);
BagTrackMap.set(BagTrackValueEnum.PASS, BagTrackEnum.PASS);
BagTrackMap.set(BagTrackValueEnum.FAIL, BagTrackEnum.FAIL);
BagTrackMap.set(BagTrackValueEnum.FTRK, BagTrackEnum.FTRK);
BagTrackMap.set(BagTrackValueEnum.EXPR, BagTrackEnum.EXPR);
BagTrackMap.set(BagTrackValueEnum.BLOK, BagTrackEnum.BLOK);

// 装箱状态
export enum pickBoxEnum {
  TBR = '待复核',
  RVD = '已复核',
}

export enum pickBoxValueEnum {
  TBR = 'TBR',
  RVD = 'RVD',
}

export const pickBoxMap = new Map<pickBoxValueEnum, string>();

pickBoxMap.set(pickBoxValueEnum.TBR, pickBoxEnum.TBR);
pickBoxMap.set(pickBoxValueEnum.RVD, pickBoxEnum.RVD);

// 血浆状态
export enum plasmaEnum {
  PRO = '合格投产',
  UPR = '合格不投产',
  UNQ = '不合格',
  WV = '待追踪',
}

export enum plasmaValueEnum {
  PRO = 'PRO',
  UPR = 'UPR',
  UNQ = 'UNQ',
  WV = 'WV',
}

export const plasmaMap = new Map<plasmaValueEnum, string>();

plasmaMap.set(plasmaValueEnum.PRO, plasmaEnum.PRO);
plasmaMap.set(plasmaValueEnum.UPR, plasmaEnum.UPR);
plasmaMap.set(plasmaValueEnum.UNQ, plasmaEnum.UNQ);
plasmaMap.set(plasmaValueEnum.WV, plasmaEnum.WV);

// 装箱类型
export enum boxTypeEnum {
  PRO = '合格投产',
  UPR = '合格不投产',
  WV = '待追踪',
}

export enum boxTypeValueEnum {
  PRO = 'PRO',
  UPR = 'UPR',
  WV = 'WV',
}

export const boxTypeMap = new Map<boxTypeValueEnum, string>();

boxTypeMap.set(boxTypeValueEnum.PRO, boxTypeEnum.PRO);
boxTypeMap.set(boxTypeValueEnum.UPR, boxTypeEnum.UPR);
boxTypeMap.set(boxTypeValueEnum.WV, boxTypeEnum.WV);

export enum TRAY_STORE_STATE {
  DLV = 'DLV',
  REC = 'REC',
  MVE = 'MVE',
  FRY = 'FRY',
  IN = 'IN',
  OUT = 'OUT',
}
// 分拣状态
export enum sortingEnum {
  F = '待分拣',
  T = '已分拣',
}

export enum sortingValueEnum {
  F = 'false',
  T = 'true',
}

export const sortingMap = new Map<sortingValueEnum, string>();

sortingMap.set(sortingValueEnum.F, sortingEnum.F);
sortingMap.set(sortingValueEnum.T, sortingEnum.T);

// 这准备投产
export enum prepareProduceEnum {
  F = '否',
  T = '是',
}

export enum prepareProduceValueEnum {
  F = 'false',
  T = 'true',
}

export const prepareProduceMap = new Map<prepareProduceValueEnum, string>();

prepareProduceMap.set(prepareProduceValueEnum.F, prepareProduceEnum.F);
prepareProduceMap.set(prepareProduceValueEnum.T, prepareProduceEnum.T);
