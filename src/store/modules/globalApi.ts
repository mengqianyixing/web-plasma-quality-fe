import { defineStore } from 'pinia';
import { store } from '@/store';
import { stationNameList } from '@/api/callback/list-generation';

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
}
export const useGlobalApiStore = defineStore({
  id: 'GlobalApi',
  state: (): EnumState => ({
    stations: [],
    stationRequestSuccess: false,
    stationLoading: false,
    stationRequestCache: [],
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
  },
});

export function useGlobalApiStoreWithOut() {
  return useGlobalApiStore(store);
}
