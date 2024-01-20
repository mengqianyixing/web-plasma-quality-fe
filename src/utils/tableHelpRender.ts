import { formatDate } from 'js-xxx';
import { h } from 'vue';

/**
 * 自定义渲染日期时间数据
 * @param value
 * @param format
 * @returns
 */
export function customRenderDate(value: any, format: string = 'yyyy-mm-dd hh:ii:ss') {
  return h(
    'div',
    {
      class: 'empty-value',
    },
    formatDate(value, format),
  );
}
