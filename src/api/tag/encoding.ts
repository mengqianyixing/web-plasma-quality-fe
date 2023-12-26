import { defHttp } from '@/utils/http/axios';
import {
  GetApiSysCodingRuleCodingTypeRequest,
  GetApiSysCodingRuleCodingTypeResponse,
  GetApiSysCodingRulesResponse,
  PutApiSysCodingRuleRequest,
} from '@/api/type/encodingManage';
import {
  PostApiSysDictionaryItemsRequest,
  PostApiSysDictionaryItemsResponse,
} from '@/api/type/dictionary';

enum Api {
  CODING_RULES = '/api/sys/codingRules',
  RESTFUL_CODING_RULE = '/api/sys/codingRule',
  CODING_DICTIONARY = '/api/sys/dictionaryItems',
}

export const getEncodingRules = () =>
  defHttp.get<GetApiSysCodingRulesResponse>({ url: Api.CODING_RULES });

export const getEncodingDetail = (params: GetApiSysCodingRuleCodingTypeRequest['codingType']) =>
  defHttp.get<GetApiSysCodingRuleCodingTypeResponse>({
    url: Api.RESTFUL_CODING_RULE + '/' + params,
  });

export const editEncoding = (params: PutApiSysCodingRuleRequest) =>
  defHttp.put({ url: Api.RESTFUL_CODING_RULE, params });

export const getTagDictionary = (params: PostApiSysDictionaryItemsRequest) =>
  defHttp.post<PostApiSysDictionaryItemsResponse>({ url: Api.CODING_DICTIONARY, params });
