import { ref } from 'vue';
import { useGlobalApiStoreWithOut } from '@/store/modules/globalApi';

const globalApiStore = useGlobalApiStoreWithOut();
globalApiStore.setStationList();

export function useStation() {
  const stationOptions = ref<Recordable[]>([]);

  globalApiStore.setStationList().then((res) => {
    stationOptions.value.push(...res);
  });

  function getStationNameById(id: string) {
    return globalApiStore.getStationMap.get(id);
  }

  return { stationOptions, getStationNameById };
}
