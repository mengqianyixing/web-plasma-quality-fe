<template>
  <div class="flex w-full">
    <div style="width: calc(50% - 10px)">
      <component
        style="min-width: unset"
        :is="component"
        v-bind="attrs"
        v-model:value="leftValue"
        :max="state.max"
      />
    </div>
    <span class="mr-3px ml-3px" style="color: rgb(0 0 0 / 25%)">
      <SwapRightOutlined />
    </span>
    <div style="width: calc(50% - 10px)">
      <component
        style="min-width: unset"
        :is="component"
        v-bind="attrs"
        v-model:value="rightValue"
        :min="state.min"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { computed, type PropType, reactive } from 'vue';
  import { useAttrs } from '@vben/hooks';
  import { InputNumber, Input } from 'ant-design-vue';
  import { propTypes } from '@/utils/propTypes';
  import { SwapRightOutlined } from '@ant-design/icons-vue';

  const emit = defineEmits(['change', 'update:value']);
  const props = defineProps({
    value: { type: Array as PropType<Array<string | number>>, default: () => [void 0, void 0] },
    isBetween: propTypes.bool.def(true),
  });
  const state = reactive<{ min: string | number | undefined; max: string | number | undefined }>({
    min: void 0,
    max: void 0,
  });
  const component = computed(() => (props.isBetween ? InputNumber : Input));
  const leftValue = computed({
    get: (): string | number => props.value[0],
    set: async (value) => {
      state.min = value;
      if (props.isBetween && rightValue.value !== undefined && value > rightValue.value) {
        emit('change', props.value);
      } else {
        emit('change', [value === '' ? void 0 : value, rightValue.value]);
      }
    },
  });
  const rightValue = computed({
    get: (): string | number => props.value[1],
    set: async (value) => {
      state.max = value;
      if (props.isBetween && leftValue.value !== undefined && value < leftValue.value) {
        emit('change', props.value);
      } else {
        emit('change', [leftValue.value, value === '' ? void 0 : value]);
      }
    },
  });
  const attrs = useAttrs();
</script>
