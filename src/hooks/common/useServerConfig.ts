import { computed, unref } from 'vue';
import { useServerConfigStoreWithOut } from '@/store/modules/serverConfig';

const serverConfigStore = useServerConfigStoreWithOut();

export function useServerConfig() {
  const trayText = computed(() => serverConfigStore.getTrayText);
  const boxText = computed(() => serverConfigStore.getBoxText);
  return { trayText: unref(trayText), boxText: unref(boxText) };
}
