export enum tagTypeEnum {
  BACK_BOX = '回访浆箱',
  PLAIN_BOX = '普通浆箱',
  KEEP_BOX = '保留样品浆箱',
  TRAY = '托盘',
}

export enum tagTypeValueEnum {
  BACK_BOX = 'BACK_BOX',
  PLAIN_BOX = 'PLAIN_BOX',
  KEEP_BOX = 'KEEP_BOX',
  TRAY = 'TRAY',
}

export const tagTypeMap = new Map<tagTypeValueEnum, string>();

tagTypeMap.set(tagTypeValueEnum.BACK_BOX, tagTypeEnum.BACK_BOX);
tagTypeMap.set(tagTypeValueEnum.PLAIN_BOX, tagTypeEnum.PLAIN_BOX);
tagTypeMap.set(tagTypeValueEnum.KEEP_BOX, tagTypeEnum.KEEP_BOX);
tagTypeMap.set(tagTypeValueEnum.TRAY, tagTypeEnum.TRAY);

export enum tagStatusEnum {
  EAB = '可用',
  DSB = '不可用',
}

export enum tagStatusValueEnum {
  EAB = 'EAB',
  DSB = 'DSB',
}

export const tagStatusMap = new Map<tagStatusValueEnum, string>();

tagStatusMap.set(tagStatusValueEnum.EAB, tagStatusEnum.EAB);
tagStatusMap.set(tagStatusValueEnum.DSB, tagStatusEnum.DSB);

export enum tagStyleTypeEnum {
  Box = 'Box',
  Line = 'Line',
  Text = 'Text',
  Image = 'Image',
  Barcode = 'Barcode',
  QRCode = 'QRCode',
}

export const tagStyleTypeMap = new Map<tagStyleTypeEnum, string>();

tagStyleTypeMap.set(tagStyleTypeEnum.Box, 'Box');
tagStyleTypeMap.set(tagStyleTypeEnum.Line, 'Line');
tagStyleTypeMap.set(tagStyleTypeEnum.Image, 'Image');
tagStyleTypeMap.set(tagStyleTypeEnum.Text, 'Text');
tagStyleTypeMap.set(tagStyleTypeEnum.Barcode, 'Barcode');
tagStyleTypeMap.set(tagStyleTypeEnum.QRCode, 'QRCode');

export enum tagEncodingTypeEnum {
  CONSTANT_STR = '常量',
  DEPT_ID = '机构ID',
  YEAR_LAST_TWO = '年份末两位数字',
  YEAR = '年份',
  MONTH = '月份',
  DAY = '日期',
  PLASMA_TYPE = '血浆类型',
  SAMPLE_TYPE = '样本类型',
  SERIAL_NUMBER = '流水号',
  SEQ_NUMBER = '登记号',
  BATCH_NO = '批次号',
  PACKAGE_NO = '浆袋号',
  BOX_NO = '浆箱号',
  BOX_PACKAGE_NUM = '箱内浆袋数',
}

export enum tagEncodingTypeValueEnum {
  CONSTANT_STR = 'CONSTANT_STR',
  DEPT_ID = 'DEPT_ID',
  YEAR_LAST_TWO = 'YEAR_LAST_TWO',
  YEAR = 'YEAR',
  MONTH = 'MONTH',
  DAY = 'DAY',
  PLASMA_TYPE = 'PLASMA_TYPE',
  SAMPLE_TYPE = 'SAMPLE_TYPE',
  SERIAL_NUMBER = 'SERIAL_NUMBER',
  SEQ_NUMBER = 'SEQ_NUMBER',
  BATCH_NO = 'BATCH_NO',
  PACKAGE_NO = 'PACKAGE_NO',
  BOX_NO = 'BOX_NO',
  BOX_PACKAGE_NUM = 'BOX_PACKAGE_NUM',
}

export const tagEncodingTypeMap = new Map<tagEncodingTypeValueEnum, string>();

tagEncodingTypeMap.set(tagEncodingTypeValueEnum.CONSTANT_STR, tagEncodingTypeEnum.CONSTANT_STR);
tagEncodingTypeMap.set(tagEncodingTypeValueEnum.DEPT_ID, tagEncodingTypeEnum.DEPT_ID);
tagEncodingTypeMap.set(tagEncodingTypeValueEnum.YEAR_LAST_TWO, tagEncodingTypeEnum.YEAR_LAST_TWO);
tagEncodingTypeMap.set(tagEncodingTypeValueEnum.YEAR, tagEncodingTypeEnum.YEAR);
tagEncodingTypeMap.set(tagEncodingTypeValueEnum.MONTH, tagEncodingTypeEnum.MONTH);
tagEncodingTypeMap.set(tagEncodingTypeValueEnum.DAY, tagEncodingTypeEnum.DAY);
tagEncodingTypeMap.set(tagEncodingTypeValueEnum.PLASMA_TYPE, tagEncodingTypeEnum.PLASMA_TYPE);
tagEncodingTypeMap.set(tagEncodingTypeValueEnum.SAMPLE_TYPE, tagEncodingTypeEnum.SAMPLE_TYPE);
tagEncodingTypeMap.set(tagEncodingTypeValueEnum.SERIAL_NUMBER, tagEncodingTypeEnum.SERIAL_NUMBER);
tagEncodingTypeMap.set(tagEncodingTypeValueEnum.SEQ_NUMBER, tagEncodingTypeEnum.SEQ_NUMBER);
tagEncodingTypeMap.set(tagEncodingTypeValueEnum.BATCH_NO, tagEncodingTypeEnum.BATCH_NO);
tagEncodingTypeMap.set(tagEncodingTypeValueEnum.PACKAGE_NO, tagEncodingTypeEnum.PACKAGE_NO);
tagEncodingTypeMap.set(tagEncodingTypeValueEnum.BOX_NO, tagEncodingTypeEnum.BOX_NO);
tagEncodingTypeMap.set(
  tagEncodingTypeValueEnum.BOX_PACKAGE_NUM,
  tagEncodingTypeEnum.BOX_PACKAGE_NUM,
);
