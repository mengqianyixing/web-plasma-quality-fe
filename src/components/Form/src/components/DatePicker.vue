<template>
  <Form.ItemRest>
    <DatePicker
      class="w-full"
      v-bind="attrs"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="handleChange"
    />
  </Form.ItemRest>
</template>
<script lang="ts" setup>
  import { useAttrs } from '@vben/hooks';
  import { Form, DatePicker } from 'ant-design-vue';
  import { ref } from 'vue';
  import Dayjs from 'dayjs';

  const emit = defineEmits(['change', 'update:value']);

  const attrs = useAttrs();
  const inputValue = ref('');
  const check = (str: string) => Dayjs(str, 'YYYY-MM-DD', true).isValid();

  const inputEvent = (e) => (inputValue.value = e.target.value);
  const on = (dom: EventTarget) => dom.addEventListener('input', inputEvent);
  const remove = (dom: EventTarget) => dom.removeEventListener('input', inputEvent);
  function handleFocus(e: FocusEvent) {
    on(e.target!);
  }
  function handleBlur(e: FocusEvent) {
    remove(e.target!);
    if (check(inputValue.value)) {
      emit('change', Dayjs(inputValue.value));
    }
  }
  function handleChange(e) {
    emit('change', e);
  }
</script>
