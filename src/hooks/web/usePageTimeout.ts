import { onUnmounted } from 'vue';
import { throttle } from 'lodash-es';
import { useMessage } from '@/hooks/web/useMessage';
import { useUserStoreWithOut } from '@/store/modules/user';
import oauth from '@/api/oauth/oauth';
import dayjs from 'dayjs';

const TIMEOUT = 10 * 60;
let timerId;
let isTrigger = false;
const { createConfirm } = useMessage();
const userStore = useUserStoreWithOut();

export function usePageTimeout(time: string | number, delay: number) {
  function confirmModel() {
    if (isTrigger) return;
    isTrigger = true;
    createConfirm({
      title: '提示',
      content: '长时间未操作，系统自动登出，是否回到登录页面？',
      iconType: 'warning',
      onOk: () => {
        oauth.goToCasDoorLogin().then((res) => {
          return (window.location.href = res.data ?? window.location.href);
        });
      },
    });
  }
  function restartTimer() {
    localStorage.setItem('timeout', dayjs().valueOf().toString());
    startTimer();
  }
  function getTimeDiff() {
    const beforeTime = localStorage.getItem('timeout') || dayjs().valueOf().toString();
    const currentTime = dayjs().valueOf();
    return currentTime - parseInt(beforeTime);
  }
  async function startTimer() {
    if (timerId) clearTimeout(timerId);
    const timer = ((parseInt(time) || TIMEOUT) - delay) * 1000;
    console.log((parseInt(time) || TIMEOUT) * 1000, getTimeDiff());
    timerId = setTimeout(async () => {
      if (getTimeDiff() - timer < 99) {
        startTimer();
        return;
      }
      clearEvent();
      await userStore.pageTimeOutLogout();
      confirmModel();
    }, timer - getTimeDiff());
  }
  const fn = throttle(restartTimer, 1000);
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
    restartTimer,
  };
}
