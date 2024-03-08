<!--
 * @Descripttion: 
 * @version: 
 * @Author: zcc
 * @Date: 2024-01-02 13:43:33
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-18 09:58:21
-->
<template>
  <div
    :class="['cell-wapper', 'flex', 'flex-wrap']"
    :style="{
      margin: gap + 'px',
      width: `calc(100% - ${gap}px)`,
    }"
  >
    <div
      :class="['item', 'flex', i === cellList.length - 1 ? 'flex-1' : '']"
      v-for="(cell, i) in cellList"
      :key="cell.field + '.' + i"
    >
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
    border-top-width: 1px;
    border-right-width: 1px;
    border-left-width: 1px;
    border-color: #f0f0f0;
  }

  .item {
    width: 25%;
    border-bottom-width: 1px;
    border-color: #f0f0f0;
  }

  .label,
  .value {
    display: flex;
    align-items: center;
    padding: 8px;
  }

  .value {
    justify-content: center;
    width: 165px;
  }

  .label {
    justify-content: flex-end;
    width: 120px;
    min-height: 40px;
    border-right-width: 1px;
    border-color: #f0f0f0;
    background: rgb(0 0 0 / 2%);
    color: #666;
    text-align: right;
  }
</style>
