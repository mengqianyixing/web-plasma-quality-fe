export enum genderEnum {
  M = '男',
  F = '女',
}

export enum genderValueEnum {
  M = 'M',
  F = 'F',
}

export const genderMap = new Map<genderValueEnum, string>();

genderMap.set(genderValueEnum.M, genderEnum.M);
genderMap.set(genderValueEnum.F, genderEnum.F);
