export type List<T> = {
  currPage: Number;
  pageSize: Number;
  totalCount: Number;
  result: T[];
};
export type House = {
  houseName: string;
  capacity?: number;
  parentHouseNo: string;
  houseType: string;
  remark?: string;
  closed: string;
};
export type SettingResp = {
  houseNo: string;
  houseName: string;
  parentHouseId?: string;
  parentHouseName?: string;
  houseType: string;
  locationCount: string;
  locationUsedCount: string;
  closed: number;
  remark: string;
};

export type settingRes = {
  currPage: number;
  pageSize: number;
  houseNo?: number | string;
  houseName?: string;
};
