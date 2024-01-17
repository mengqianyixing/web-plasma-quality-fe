import { ref, unref } from 'vue';
import { stationNameList } from '@/api/callback/list-generation';

export function useStation() {
  const isLoading = ref(false);
  const stationOptions = ref<Recordable[]>([]);

  stationNameList()
    .then((res) => {
      stationOptions.value = res.map((it) => {
        return {
          label: it.stationName,
          value: it.stationNo,
        };
      });
    })
    .catch((e) => {
      throw e;
    })
    .finally(() => {
      isLoading.value = false;
    });

  function getStationNameById(id: string) {
    return stationOptions.value.find((it) => it.value === id)?.label;
  }

  return { stationOptions, getStationNameById, isLoading: unref(isLoading) };
}
