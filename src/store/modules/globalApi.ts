import { defineStore } from 'pinia';
import { store } from '@/store';
import { stationNameList } from '@/api/callback/list-generation';
import { getSysParamsByParamKey } from '@/api/systemServer/params';

interface ITEM {
  value: string;
  label: string;
}
type ResolveHandler<T> = (value: T) => void;
interface EnumState {
  stations: ITEM[];
  stationRequestSuccess: boolean;
  stationLoading: boolean;
  stationRequestCache: ResolveHandler<ITEM[]>[];
  sysParamsMap: Map<string, any>;
}
const sysParamsDefaultValue = {
  maxPageSize: 50000,
};
export const useGlobalApiStore = defineStore({
  id: 'GlobalApi',
  state: (): EnumState => ({
    stations: [],
    stationRequestSuccess: false,
    stationLoading: false,
    stationRequestCache: [],
    sysParamsMap: new Map(),
  }),
  getters: {
    getStationList(state) {
      return state.stations;
    },
    getStationMap(state) {
      return state.stations.reduce((map, station) => {
        map.set(station.value, station.label);
        return map;
      }, new Map());
    },
  },
  actions: {
    setStationList() {
      return new Promise((rs: ResolveHandler<ITEM[]>) => {
        if (this.stationRequestSuccess) {
          return rs(this.stations);
        } else if (this.stationLoading) {
          this.stationRequestCache.push(rs);
        } else {
          this.stationLoading = true;
          stationNameList()
            .then((res) => {
              const formatData = res.map((it) => ({
                value: it.stationNo,
                label: it.shortName,
              })) as ITEM[];
              this.stations.push(...formatData);
              rs(formatData);
              this.stationLoading = false;
              this.stationRequestSuccess = true;
              this.stationRequestCache.forEach((rs) => rs(this.stations));
              this.stationRequestCache = [];
            })
            .catch(() => {
              this.stationLoading = false;
            });
        }
      });
    },
    setSysParamsValue(key: string, value: any) {
      this.sysParamsMap.set(key, value);
    },
    getSysParamsValue(key: string) {
      return new Promise((rs) => {
        const value = this.sysParamsMap.get(key);
        if (value !== void 0) {
          return rs(value);
        }
        getSysParamsByParamKey(key)
          .then((res) => {
            this.setSysParamsValue(key, res ?? sysParamsDefaultValue[key]);
            rs(res ?? sysParamsDefaultValue[key]);
          })
          .catch(() => {
            rs(sysParamsDefaultValue[key]);
          });
      });
    },
  },
});

export function useGlobalApiStoreWithOut() {
  return useGlobalApiStore(store);
}
