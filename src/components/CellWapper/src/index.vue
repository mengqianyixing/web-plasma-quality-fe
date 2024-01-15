<!--
 * @Descripttion: 
 * @version: 
 * @Author: zcc
 * @Date: 2024-01-02 13:43:33
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-13 17:19:45
-->
<template>
  <div
    :class="['cell-wapper', 'flex', 'flex-wrap']"
    :style="{
      margin: gap + 'px',
      width: `calc(100% - ${gap}px)`,
    }"
  >
    <div :class="`item  flex`" v-for="(cell, i) in cellList" :key="cell.field + '.' + i">
      <div :class="['label', 'shrink-0', labelWidthClass]" :style="{ width: labelWidth }">
        {{ cell.label }}
      </div>
      <div class="value">
        <template v-if="cell.slot">
          <slot :name="cell.slot"></slot>
        </template>
        <template v-else>
          {{ cell.format?.(data) || get(data, cell.field) }}
        </template>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { PropType } from 'vue';
  import { Cell } from './type';
  import { get } from 'lodash-es';

  const { data, cellList, labelWidth, labelWidthClass } = defineProps({
    data: {
      type: Object as PropType<any>,
    },
    cellList: {
      type: Array as PropType<Cell[]>,
      default: () => [],
    },
    labelWidth: {
      type: String as PropType<string>,
    },
    labelWidthClass: {
      type: [String, Object] as PropType<string | object>,
      default: 'w-1/2',
    },
    cellWidth: {
      type: [Number, String] as PropType<number | string>,
      default: '25%',
    },
    gap: {
      type: Number as PropType<number>,
      default: 16,
    },
  });
</script>
<style scoped>
  .cell-wapper {
    width: calc(100% - 32px);
    border-left-width: 1px;
    border-color: #f0f0f0;
  }

  .item {
    border-top-width: 1px;
    border-right-width: 1px;
    border-bottom-width: 1px;
    border-color: #f0f0f0;
  }

  .label,
  .value {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
  }

  .value {
    width: 200px;
  }

  .label {
    width: 120px;
    height: 40px;
    border-right-width: 1px;
    border-color: #f0f0f0;
    background: #fafafa;
    color: #666;
  }
</style>
