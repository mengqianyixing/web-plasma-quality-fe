import { onUnmounted } from 'vue';
import { debounce } from 'lodash-es';
import { useMessage } from '@/hooks/web/useMessage';
import { useUserStoreWithOut } from '@/store/modules/user';
import { router } from '@/router';
import { PageEnum } from '@/enums/pageEnum';

const TIMEOUT = 10 * 60;
let timerId;
let isTrigger = false;
const { createConfirm } = useMessage();
const userStore = useUserStoreWithOut();

export function usePageTimeout(time: string | number) {
  function checkToken() {
    if (isTrigger) return;
    setInterval(() => {
      if (userStore.getToken) {
        checkToken();
      } else {
        confirmModel();
      }
    }, 10 * 1000);
  }
  function confirmModel() {
    if (isTrigger) return;
    isTrigger = true;
    createConfirm({
      title: '提示',
      content: '长时间未操作，系统自动登出，是否回到登录页面？',
      iconType: 'warning',
      onOk: () => {
        router.push(PageEnum.BASE_LOGIN);
      },
    });
  }
  async function startTimer() {
    if (timerId) clearTimeout(timerId);
    console.log((parseInt(time) || TIMEOUT) * 1000);
    timerId = setTimeout(async () => {
      clearEvent();
      await userStore.pageTimeOutLogout();
      confirmModel();
    }, TIMEOUT * 1000);
  }
  checkToken();
  const fn = debounce(startTimer, 1000);
  document.addEventListener('mousemove', fn, true);
  document.addEventListener('mousedown', fn, true);
  document.addEventListener('keypress', fn, true);
  document.addEventListener('scroll', fn, true);
  function clearEvent() {
    document.removeEventListener('mousemove', fn, true);
    document.removeEventListener('mousedown', fn, true);
    document.removeEventListener('keypress', fn, true);
    document.removeEventListener('scroll', fn, true);
  }
  onUnmounted(() => {
    clearEvent();
  });
  return {
    startTimer,
  };
}
