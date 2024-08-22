import { Ref, onMounted, ref, unref } from 'vue';
import { PositionType } from 'ant-design-vue/es/image/style';
import { throttle } from 'lodash-es';

const defaultOption = {
  bodyClass: 'ant-table-body',
};
type PositionStyle = {
  position: PositionType;
  top: number | string;
  bottom: number | string;
};
export const useSticky = (componentRef: Ref<any>, option?: { bodyClass?: string }) => {
  const mergeOptions = { ...defaultOption, ...option };
  const positionStyle = ref<PositionStyle>({
    position: 'sticky',
    top: 0,
    bottom: 0,
  });
  const _resize = throttle(async (entries: ResizeObserverEntry[]) => {
    for (const entry of entries) {
      let bodyDom = entry.target;
      if (bodyDom.tagName === 'TABLE') {
        bodyDom = bodyDom.parentElement!;
      }
      const bodyHeight = bodyDom.getBoundingClientRect().height;
      const tableHeight = bodyDom.querySelector('table')!.getBoundingClientRect().height;
      const lastTr: HTMLElement | null = bodyDom.querySelector('tr:last-child');
      if (!lastTr) return;
      const lastTrHeight = lastTr.getBoundingClientRect().height;
      const previousElement = lastTr.previousElementSibling as HTMLElement;
      let offsetTop = 0;
      if (previousElement) {
        offsetTop = previousElement.offsetTop + previousElement.getBoundingClientRect().height;
      }
      if (tableHeight < bodyHeight) {
        positionStyle.value.position = 'relative';
        positionStyle.value.top = bodyHeight - lastTrHeight - offsetTop - 15 + 'px';
        positionStyle.value.bottom = 'unset';
      } else {
        positionStyle.value.position = 'sticky';
        positionStyle.value.top = 'unset';
        positionStyle.value.bottom = '0';
      }
    }
  }, 500);
  const resizeObserver = new ResizeObserver(_resize);
  onMounted(() => {
    console.log(componentRef);
    const tabelEl: HTMLElement = unref(componentRef).$el.querySelector(
      `.${mergeOptions.bodyClass} > table`,
    );
    const tabelBodyEl: HTMLElement = tabelEl.parentElement!;
    tabelBodyEl!.style.position = 'relative';
    resizeObserver.observe(tabelBodyEl);
    resizeObserver.observe(tabelEl);
  });
  return positionStyle;
};
