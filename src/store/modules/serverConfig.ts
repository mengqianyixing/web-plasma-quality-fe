import { defineStore } from 'pinia';
import { store } from '@/store';
import { getSysParamsContentByParamKey } from '@/api/systemServer/params';

interface EnumState {
  trayText: string;
  boxText: string;
  isRequestSuccess: boolean;
  loading: boolean;
}
export const useServerConfigStore = defineStore({
  id: 'ServerConfig',
  state: (): EnumState => ({
    trayText: '',
    boxText: '',
    isRequestSuccess: false,
    loading: false,
  }),
  getters: {
    getTrayText(state): string {
      return state.trayText;
    },
    getBoxText(state): string {
      return state.boxText;
    },
  },
  actions: {
    setServerConfig() {
      return new Promise((rs) => {
        if (this.isRequestSuccess || this.loading) {
          rs(true);
          return;
        }
        this.loading = true;
        getSysParamsContentByParamKey('regroupModel')
          .then((res) => {
            const data = JSON.parse(res);
            this.trayText = data.trayNo;
            this.boxText = data.boxNo;
            rs(true);
          })
          .catch(() => {
            rs(false);
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

export function useServerConfigStoreWithOut() {
  return useServerConfigStore(store);
}
