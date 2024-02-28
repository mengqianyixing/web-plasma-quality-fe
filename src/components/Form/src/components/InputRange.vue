<template>
  <div class="flex w-full">
    <div style="width: calc(50% - 10px)">
      <component
        style="min-width: unset"
        :is="component"
        v-bind="attrs"
        v-model:value="leftValue"
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
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { computed, type PropType } from 'vue';
  import { useAttrs } from '@vben/hooks';
  import { InputNumber, Input } from 'ant-design-vue';
  import { propTypes } from '@/utils/propTypes';
  import { SwapRightOutlined } from '@ant-design/icons-vue';

  const emit = defineEmits(['change', 'update:value']);
  const props = defineProps({
    value: { type: Array as PropType<Array<string | number>>, default: () => [] },
    isBetween: propTypes.bool.def(true),
  });
  const component = computed(() => (props.isBetween ? InputNumber : Input));
  const leftValue = computed({
    get: (): string | number => props.value[0],
    set: async (value) => {
      if (props.isBetween && value > rightValue.value) {
        emit('change', props.value);
      } else {
        emit('change', [value, rightValue.value]);
      }
    },
  });
  const rightValue = computed({
    get: (): string | number => props.value[1],
    set: async (value) => {
      if (props.isBetween && value < leftValue.value) {
        emit('change', props.value);
      } else {
        emit('change', [leftValue.value, value]);
      }
    },
  });
  const attrs = useAttrs();
</script>
