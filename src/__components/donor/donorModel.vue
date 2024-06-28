<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    showFooter
    title="浆员信息"
    defaultFullscreen
    :showOkBtn="false"
    cancelText="关闭"
  >
    <div class="relative h-inherit max-h-inherit min-h-inherit">
      <div class="absolute w-full h-full">
        <Donor :cardNo="state.cardNo" />
      </div>
    </div>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { reactive } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import Donor from './index.vue';

  const state = reactive({ cardNo: '' });

  const [registerModal] = useModalInner(async ({ cardNo }) => {
    state.cardNo = cardNo;
  });
</script>
