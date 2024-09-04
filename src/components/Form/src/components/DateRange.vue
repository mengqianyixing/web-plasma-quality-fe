<template>
  <div class="w-full">
    <Form.ItemRest>
      <RangePicker
        v-bind="attrs"
        value-format="YYYY-MM-DD"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="handleChange"
      />
    </Form.ItemRest>
  </div>
</template>
<script lang="ts" setup>
  import { useAttrs } from '@vben/hooks';
  import { Form, RangePicker } from 'ant-design-vue';
  import { ref } from 'vue';
  import DayJs from 'dayjs';

  const emit = defineEmits(['change', 'update:value']);

  const attrs = useAttrs();
  const inputValue = ref('');
  const rangeValue = ref(['', '']);
  const isFirstInput = ref(false);
  const beforeInput = ref<Array<string>>([]);

  const check = (str: string) => DayJs(str, 'YYYY-MM-DD', true).isValid();

  function isBetweenDates(dateToCheck: string, startDate = '1000-01-01', endDate = '9999-12-31') {
    return (
      DayJs(dateToCheck).isAfter(DayJs(startDate)) && DayJs(dateToCheck).isBefore(DayJs(endDate))
    );
  }

  const inputEvent = (e) => (inputValue.value = e.target.value);
  const on = (dom: EventTarget) => dom.addEventListener('input', inputEvent);
  const remove = (dom: EventTarget) => dom.removeEventListener('input', inputEvent);
  function handleFocus(e: FocusEvent) {
    const { target } = e;
    const nextDom = (target as HTMLElement).parentElement!.nextElementSibling!;
    isFirstInput.value = nextDom.classList.contains('ant-picker-range-separator');
    on(target!);
  }
  function handleBlur(e: FocusEvent) {
    const { target } = e;
    const value = inputValue.value || (target as HTMLInputElement).value;
    inputValue.value = '';
    rangeValue.value[~~!isFirstInput.value] = value;
    remove(target!);
    rangeValue.value = rangeValue.value.map((it, i) => it || beforeInput.value[i]);
    const isDate = rangeValue.value.every((it) => check(it) && isBetweenDates(it));
    if (!isDate) return;
    if (
      DayJs(rangeValue.value[0]).isBefore(rangeValue.value[1]) ||
      rangeValue.value[0] === rangeValue.value[1]
    ) {
      emit('change', rangeValue.value);
      beforeInput.value = rangeValue.value.map((it) => it);
    }
    rangeValue.value = ['', ''];
  }
  function handleChange(e) {
    beforeInput.value = e || [];
    emit('change', e || []);
  }
</script>
