import { defineStore } from 'pinia';
import { store } from '@/store';
import { getServerEnumsApi } from '@/api/sys';
import { SERVER_ENUM } from '@/enums/serverEnum';

interface ITEM {
  value: string;
  label: string;
}
interface EnumState {
  enumMapData: Map<SERVER_ENUM | string, ITEM[]>;
  enumTextMapData: Map<string, Map<string, string>>;
  isRequestSuccess: boolean;
  loading: boolean;
}
export const useServerEnumStore = defineStore({
  id: 'ServerEnum',
  state: (): EnumState => ({
    enumMapData: new Map(),
    enumTextMapData: new Map(),
    isRequestSuccess: false,
    loading: false,
  }),
  getters: {
    getServerEnum(state): Function {
      return (type: SERVER_ENUM): ITEM[] => state.enumMapData.get(type) || [];
    },
    getServerEnumText(state): Function {
      return (type: SERVER_ENUM) => {
        const textMap = state.enumTextMapData.get(type) || new Map();
        return (code: string) => textMap.get(code);
      };
    },
  },
  actions: {
    setServerEnum() {
      return new Promise((rs) => {
        if (this.isRequestSuccess || this.loading) {
          rs(true);
          return;
        }
        this.loading = true;
        getServerEnumsApi()
          .then((res) => {
            res.forEach((it) => {
              this.enumMapData.set(
                it.path,
                it.enumObjList.map((it) => ({ value: it.key, label: it.show })),
              );
              this.enumTextMapData.set(
                it.path,
                it.enumObjList.reduce((t, c) => {
                  t.set(c.key, c.show);
                  return t;
                }, new Map()),
              );
            });
            this.isRequestSuccess = true;
            rs(true);
          })
          .catch(() => {
            rs(false);
          })
          .finally(() => {
            this.loading = false;
          });
      });
    },
  },
});

export function useServerEnumStoreWithOut() {
  return useServerEnumStore(store);
}
