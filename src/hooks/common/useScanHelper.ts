// 项目有扫描功能的需求，如果一直通过获取焦点的方式来触发扫描，会导致用户体验不好，这里通过监听键盘事件，核心是通过扫描枪的键入间隔来判断是否是扫描枪输入
import { useEventListener } from '@/hooks/event/useEventListener';
import { ref } from 'vue';

export function useScanHelper(validScanInterval = 80) {
  const barCode = ref('');
  const enterFlag = ref(false);
  let lastTime = 0;
  let currCode = '';

  const el = window;
  const startEvent = () =>
    useEventListener({
      el,
      name: 'keypress',
      listener: handleListener as unknown as EventListener,
      wait: 0,
    });

  function clearEffect(): void {
    barCode.value = '';
    lastTime = 0;
  }

  function handleListener(e: KeyboardEvent): void {
    enterFlag.value = false;
    currCode = e.key;

    const currDate = new Date().getTime();

    if (lastTime > 0) {
      if (currDate - lastTime <= validScanInterval) {
        barCode.value += currCode;
      } else {
        clearEffect();
      }
    } else {
      barCode.value = currCode;
    }

    lastTime = currDate;

    if (e.key === 'Enter') {
      barCode.value = barCode.value.slice(0, -5);
      enterFlag.value = true;
      lastTime = 0;
    }
  }
  return { barCode, enterFlag, startEvent };
}
