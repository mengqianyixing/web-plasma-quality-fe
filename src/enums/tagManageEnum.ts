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
