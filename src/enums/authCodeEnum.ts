// 之前统一设置的审核按钮权限enum，不够通用因为有的场景不一定是单一的审核场景，可能是某个操作需要审核人登录，后续添加还是以模块划分比较合理

export enum ReCheckButtonEnum {
  ResultRegistrationCheck = 'E_960010',
  ResultRegistrationTiter = 'E_960020',
  TrayManageCheck = 'E_990020',
  NonconformityRegistrationCheck = 'E_920020',
  NonconformityPickCheck = 'E_920040',
  NonconformityPickCheckReview = 'E_920060',
  NonconformityInStoreCheck = 'E_920050',
  NonconformityInStoreCheckReview = 'E_920070',
  NonconformitySampleCheck = 'E_970020',
  NonconformitySampleRevokeRegisterCheck = 'E_970030',
  SampleRevokeVerifyCheck = 'E_970040',
  MissNumCheck = 'E_980020',
  MissNum = 'E_980021',
  UnqualifiedPlasmaCheck = 'E_980030',
  UnqualifiedPlasma = 'E_980031',
  UnqualifiedSampleCheck = 'E_980040',
  UnqualifiedSample = 'E_980041',
  RevokeVerifyCheck = 'E_980050',
  PlasmaVerifyReCheckLogin = 'E_980060',
  PlasmaVerifyComplete = 'E_9800130',
  PlasmaVerifyTrayIn = 'E_9800140',
  PlasmaVerifyTrayOut = 'E_9800150',
  PlasmaSuspendCheck = 'E_980070',
  PlasmaSuspendBox = 'E_980071',
  PlasmaSuspendBatch = 'E_980072',
  PlasmaReceiveSuspendCheck = 'E_980010',
  PlasmaReceiveSuspend = 'E_9800110',
  PlasmaReceiveTray = 'E_9800120',
  PlasmaReceiveBatch = 'E_9800160',
  PlasmaInboundRecordCheck = 'E_980080',
  RegisterWeightCheck = 'E_980090',
  ProductionSortingReCheck = 'E_910020',
  RequiredItemCheck = 'E_10008010',
  UnqualifiedStage = 'E_98003001',
  WeightRegister = 'E_98003002',
  VerifyRelease = 'E_98003003',
  VerifyList = 'E_98003004',
  VisualInspectionList = 'E_98003005',
  MaterialPreRegistrationUpdateDateCheck = 'E_9600300010',
  ResultReRegistCheck = 'E_9600100010',
  PMSAccept = 'E_98003006',
  PMSAcceptCancel = 'E_98003007',
  OverdueConfirmationCheck = 'E_950020001',
  TiterImportConfirmationCheck = 'E_9600100011',
  TiterSqImportConfirmationCheck = 'E_9600100012',
}

export enum BaseSettingButtonEnum {
  StationAdd = 'E_1000701',
  StationEdit = 'E_1000702',
  StationEnable = 'E_100070',
  StationDisable = 'E_100080',

  TiterTypeAdd = 'E_1000101',
  TiterTypeUpdate = 'E_1000102',
  TiterTypeDelete = 'E_1000103',
  TiterTypeDisable = 'E_1000104',
  TiterTypeEnable = 'E_1000105',

  InspectMethodAdd = 'E_1000201',
  InspectMethodUpdate = 'E_1000202',
  InspectMethodDelete = 'E_1000203',
  InspectMethodDisable = 'E_1000204',
  InspectMethodEnable = 'E_1000205',

  ItemSettingAdd = 'E_1000301',
  ItemSettingUpdate = 'E_1000302',
  ItemSettingDelete = 'E_1000303',
  ItemSettingDisable = 'E_1000304',
  ItemSettingEnable = 'E_1000305',

  DictionaryAdd = 'E_1000401',
  DictionaryUpdate = 'E_1000402',
  DictionaryDelete = 'E_1000403',
  DictionaryItemAdd = 'E_1000404',

  ReportAdd = 'E_1000501',
  ReportUpdate = 'E_1000502',

  RequiredItemAdd = 'E_1000801',
  RequiredItemUpdate = 'E_1000802',
  RequiredItemDelete = 'E_1000803',

  PlasmaFailedReasonAdd = 'E_1000901',
  PlasmaFailedReasonEdit = 'E_1000902',
  PlasmaFailedReasonEnable = 'E_1000903',
  PlasmaFailedReasonDisEnable = 'E_1000904',

  SystemSettingAdd = 'E_1001001',
  SystemSettingEdit = 'E_1001002',
  SystemSettingDelete = 'E_1001003',
}

export enum StoreButtonEnum {
  StoreSettingAdd = 'E_99001001',
  StoreSettingUpdate = 'E_99001002',
  StoreSettingDisable = 'E_99001004',
  StoreSettingEnable = 'E_99001005',

  TrayListPrint = 'E_99002001',
  TrayListRePrint = 'E_99002002',
  TrayListDisable = 'E_99002004',

  TrayInStore = 'E_99004001',
  TrayOutStore = 'E_99004002',

  PlasmaSiteAdd = 'E_99005001',
  PlasmaSiteUpdate = 'E_99005002',
  PlasmaSiteDisable = 'E_99005004',
  PlasmaSiteEnable = 'E_99005005',
}

export enum InspectButtonEnum {
  ResultRegistrationSelect = 'E_96001001',
  ResultRegistrationItemAdd = 'E_96001002',
  ResultRegistrationRegist = 'E_96001003',
  ResultRegistrationReRegist = 'E_96001004',

  ResultRegistrationItemDelete = 'E_96001005',
  ResultRegistrationItemNotCheck = 'E_96001006',
  ResultRegistrationItemUnq = 'E_96001007',

  ResultRegistrationTiterImport = 'E_96001008',
  ResultRegistrationTiterRegist = 'E_96001009',
  ResultRegistrationTiterNotCheck = 'E_960010010',

  ResultRegistrationMaterialRegist = 'E_960010011',
  ResultRegistrationMaterialReRegist = 'E_960010012',
  ResultRegistrationSqImport = 'E_960010013',
  ResultRegistrationTiterDelete = 'E_960010014',

  ReportReleaseCreate = 'E_96002001',
  ReportReleaseUnCreate = 'E_96002002',
  ReportReleaseProcess = 'E_96002003',
  ReportReleaseUnProcess = 'E_96002004',
  ReportReleaseRelease = 'E_96002005',
  ReportReleasePrint = 'E_96002006',
  KMReportReleasePrint = 'E_96002007',

  MaterialPreRegistrationAdd = 'E_96003001',
  MaterialPreRegistrationUpdate = 'E_96003002',
  MaterialPreRegistrationReview = 'E_96003003',
  MaterialPreRegistrationUnReview = 'E_96003004',
  MaterialPreRegistrationUpdateDate = 'E_96003007',
}

export enum QuarantineButtonEnum {
  OverdueConfirmationConfim = 'E_95001001',
  CreateQuarantine = 'E_95003001',
  ResetQuarantine = 'E_95003002',
  ReCheckQuarantine = 'E_95003003',
  PrintQuarantine = 'E_95003004',
  ExportQuarantine = 'E_95003005',

  NonconformityTrackingReport = 'E_95004001',
  StationDetectionNonconformityReport = 'E_95004002',

  StationRefuseExport = 'E_900022001',

  FactoryCheckFailExcel = 'E_900011001',
}

export enum QualityButtonEnum {
  PlasmaRestrictionAdd = 'E_94001001',
  PlasmaRestrictionRemove = 'E_94001002',
  PlasmaRestrictionReview = 'E_94001003',

  PlasmaCheckAdd = 'E_94002001',
  PlasmaCheckEdit = 'E_94002002',
  PlasmaCheckDelete = 'E_94002003',
  PlasmaCheckReCheck = 'E_94002004',
  PlasmaCheckCancelReCheck = 'E_94002005',
  PlasmaCheckPrint = 'E_94002006',
  PlasmaKMCheckPrint = 'E_94002008',
  PlasmaCheckApproval = 'E_94002007',

  BatchReleaseAdd = 'E_94003001',
  BatchReleaseUpdate = 'E_94003002',
  BatchReleaseReview = 'E_94003003',
  BatchReleaseRelease = 'E_94003004',
  BatchReleaseUnRelease = 'E_94003005',
  BatchReleasePrint = 'E_94003006',
  BatchReleaseCancelAdd = 'E_94003007',
  BatchReleaseCancelReview = 'E_94003008',
  BatchQuarantinePeriod = 'E_94003009',
  BatchReleasePrintKM = 'E_940030010',
}

export enum NonconformityButtonEnum {
  BoxAdd = 'E_92001001',
  BoxEdit = 'E_92001002',
  BoxDelete = 'E_92001003',
  BoxPrint = 'E_92001004',

  PlasmaOutAdd = 'E_92003001',
  PlasmaOutUpdate = 'E_92003002',
  PlasmaOutRemove = 'E_92003003',
  PlasmaOutProcess = 'E_92003004',
  PlasmaOutUnProcess = 'E_92003005',
  PlasmaOutScan = 'E_92003006',
  PlasmaOutTransferPrint = 'E_92003007',
  PlasmaOutPlasmaPrint = 'E_92003008',
  PlasmaOutDestructionPrint = 'E_92003009',
  KMPlasmaOutTransferPrint = 'E_92003010',
  KMPlasmaOutPlasmaPrint = 'E_92003011',
  KMPlasmaOutDestructionPrint = 'E_92003012',
}

export enum StockOutButtonEnum {
  ProductionPreparationAdd = 'E_91001001',
  ProductionPreparationEdit = 'E_91001002',
  ProductionPreparationDelete = 'E_91001003',
  ProductionPreparationSelect = 'E_91001004',
  ProductionPreparationFinish = 'E_91001005',
  ProductionPreparationReset = 'E_91001006',
  ProductionPreparationReCheck = 'E_91001007',
  ProductionPreparationResetReCheck = 'E_91001008',
  ProductionPreparationDetailExport = 'E_91001009',
  ProductionPreparationSortTask = 'E_91001010',
  ProductionPreparationAutoSorting = 'E_91001011',
  ProductionPreparationManualSorting = 'E_91001012',

  ProductionOrderAdd = 'E_91003001',
  ProductionOrderEdit = 'E_91003002',
  ProductionOrderDelete = 'E_91003003',
  ProductionOrderRecheck = 'E_91003004',
  ProductionOrderCancelRecheck = 'E_91003005',
  ProductionOrderExamine = 'E_91003006',
  ProductionOrderCancelExamine = 'E_91003007',
  ProductionOrderPrint = 'E_91003008',

  ProductionPlanPick = 'E_91004001',
  ProductionPlanComplate = 'E_91004002',
  ProductionPlanReComplate = 'E_91004003',
  ProductionPlanReview = 'E_91004004',
  ProductionPlanReReview = 'E_91004005',
  ProductionPlanCheck = 'E_91004006',
  ProductionPlanReCheck = 'E_91004007',
  ProductionPlanCheckListReport = 'E_91004008',
  ProductionPlanTransferReport = 'E_91004009',
  ProductionPlanMaterialReport = 'E_910040010',
  ProductionPlanPlasmaReport = 'E_910040011',
  ProductionPlanPMS = 'E_910040012',
  ProductionPlanSummary = 'E_910040013',
  ProductionPlanSummaryKunMing = 'E_910040014',
  PlasmaProductionApplication = 'E_910040015',
  PlasmaProductionRecordsOfQualified = 'E_910040016',
  PlasmaProductionRecordsOfQualifiedSummary = 'E_910040017',
  PlasmaProductionPutIntoSummary = 'E_910040018',
  PlasmaProductionPutIntoSummaryOfQualified = 'E_910040019',
  PlasmaProductionPrint = 'E_910040020',
  KMPlasmaProductionPrint = 'E_910040021',
  KMRawPlasmaHandoverRecord = 'E_910040022',

  PutIntoTrayStockOut = 'E_91005001',
  PutIntoBoxStockOut = 'E_91005002',
  PutIntoBatchStockOut = 'E_91005003',
  PutIntoPickPlasmaSystem = 'E_91005004',
  PutIntoCancelStockOut = 'E_91005005',
  PutIntoBoxReceive = 'E_91005006',
  PutIntoBatchReceive = 'E_91005007',
  PutIntoCancelExamine = 'E_91005008',

  NonPutIntoAdd = 'E_91006001',
  NonPutIntoEdit = 'E_91006002',
  NonPutIntoCancel = 'E_91006003',
  NonPutIntoCompletePrepare = 'E_91006004',
  NonPutIntoCancelPrepare = 'E_91006005',
  NonPutIntoReCheck = 'E_91006006',
  NonPutIntoCancelReCheck = 'E_91006007',
  NonPutIntoCheck = 'E_91006008',
  NonPutIntoCancelCheck = 'E_91006009',
  NonPutIntoScan = 'E_91006010',
  NonPlasmaTransferRecordReport = 'E_91006011',
  PlasmaTransferApplyReport = 'E_91006012',
  NonPutIntoPickPlasmaSystem = 'E_91006013',
  PlasmaSummaryReport = 'E_91007001',
  KMPlasmaSummaryReport = 'E_91007002',
  QuarantineTrackUnqualifiedPlasmaRecords = 'E_91007003',

  AutomaticSorting = 'E_91007004',
  SwitchToManualSorting = 'E_91007005',
  ProductionSortingBatch = 'E_91007006',
  ProductionSortingPP = 'E_91007007',
  ProductionSortingBox = 'E_91007008',
  ProductionSortingTrayIn = 'E_91007009',
  ProductionSortingTrayOut = 'E_910070010',
  ProductionSortingTrayComplete = 'E_910070011',
}

export enum SampleManageButtonEnum {
  SampleAccept = 'E_970010001',
  SampleRelease = 'E_97003001',
  SampleArrange = 'E_97003002',
  TestPlanAdd = 'E_97004001',
  TestPlanUpdate = 'E_97004002',
  NonconformitySampleRevokeRegister = 'E_97002010',
  CompleteSampleVerify = 'E_97002020',
  RevokeSampleVerify = 'E_97002030',

  SampleDestroyAdd = 'E_97004003',
  SampleDestroyEdit = 'E_97004004',
  SampleDestroySubmit = 'E_97004005',
  SampleDestroyCancelApply = 'E_97004006',
  SampleDestroyCheck = 'E_97004007',
  SampleDestroyCancelCheck = 'E_97004008',
  SampleDestroyOutBand = 'E_97004009',
  SampleDestroyOutBandWMS = 'E_97004019',
  SampleDestroyPrint = 'E_97004010',

  SampleWarehouseAdd = 'E_97004011',
  SampleWarehouseEdit = 'E_97004012',
  SampleWarehouseSubmit = 'E_97004013',
  SampleWarehouseCancelApply = 'E_97004014',
  SampleWarehouseCheck = 'E_97004015',
  SampleWarehouseCancelCheck = 'E_97004016',
  SampleWarehouseOutBand = 'E_97004017',
  SampleWarehouseOutBandWMS = 'E_97004020',
  SampleWarehouseExport = 'E_97004018',

  ReserveSampleWarehouseIn = 'E_970110010',
  ReserveSampleWarehouseAccept = 'E_970110020',
}

export enum CallbackButtonEnum {
  ListGeneAdd = 'E_93001001',
  ListGeneEdit = 'E_93001002',
  ListGeneDelete = 'E_93001003',
  ListGeneEnter = 'E_93001004',
  ListGeneExport = 'E_93001005',
}

export enum SearchManager {
  LocationExport = 'E_900017001',

  PlasmaBatchExport = 'E_90003001',

  ERPReportExport = 'E_90002401',

  DonorStateExport = 'E_90001401',

  CallbackExport = 'E_90002501',

  CallbackBatchExport = 'E_90002601',

  PlasmaQualifiedInventoryExport = 'E_900033001',

  PlasmaBagCollectExport = 'E_900034001',

  PlasmaRawInStoragePrint = 'E_900035001',

  SampleQueryExport = 'E_900013001',

  EntryPlasmaExport = 'E_9900600001',

  StoreInventoryExport = 'E_90001001',

  PlasmaQueryExport = 'E_90002001',

  StereoWarehouseExport = 'E_900018001',

  UnqualifiedPlasmaByBatchExport = 'E_900029101',

  UnqualifiedPlasmaByStationExport = 'E_900029001',

  ERPEntryStoreExport = 'E_900023001',

  ERPOutStoreExport = 'E_900023101',

  PlasmaStoreWarnExport = 'E_900036001',
}

export enum TagManageButtonEnum {
  TagStyleAdd = 'E_89001001',
  TagStyleEdit = 'E_89001002',
  TagStyleDelete = 'E_89001003',
  TagStyleCopy = 'E_89001004',
  TagStyleHistory = 'E_89001005',
  TagStylePreview = 'E_89001006',
  TagStyleOpen = 'E_89001007',
  TagStyleClose = 'E_89001008',
}

export enum NonconformityInStoreButtonEnum {
  NonconformityInStoreCheck = 'E_92005001',
  NonconformityInStoreCancelCheck = 'E_92005002',
  NonconformityInStorePMS = 'E_92005003',
}

export enum PlasmaInboundRecordButtonEnum {
  VerifyReport = 'E_98008001',
}

export enum SysButtonEnum {
  AddDept = 'E_1010211',
  UpdateDept = 'E_1010212',
  RemoveDept = 'E_1010213',
}
