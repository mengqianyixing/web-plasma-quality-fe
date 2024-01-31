<!--
 * @Descripttion: 
 * @version: 
 * @Author: zcc
 * @Date: 2023-12-21 17:21:16
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-31 18:02:44
-->
<script setup lang="ts">
  import { Card } from 'ant-design-vue';
  import NonconformityRegistration from '@/__components/nonconformity-registration/index.vue';
</script>

<template>
  <div class="p-16px">
    <Card title="登记" class="p-5">
      <nonconformity-registration />
    </Card>
  </div>
</template>
