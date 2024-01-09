<template>
  <BasicModal v-bind="$attrs" @register="registerModal" title="详情" width="70%">
    <template #footer>
      <a-button @click="handleClose">关闭</a-button>
    </template>
    <Description @register="registerPlasmaDetail" class="enter-y" :data="detailRef" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { Description, useDescription } from '@/components/Description';
  import { detailSchema } from './manage.data';
  import { ref } from 'vue';
  import { nonconformityPlasmaDetail } from '@/api/nonconformity/plasma-manage';

  defineOptions({ name: 'PickPlasmaModal' });

  const detailRef = ref<Recordable>({});

  const [registerPlasmaDetail] = useDescription({
    title: '不合格血浆详情',
    schema: detailSchema,
    column: 2,
  });

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    detailRef.value = await nonconformityPlasmaDetail(data.record);
    setModalProps({ confirmLoading: false });
  });

  function handleClose() {
    closeModal();
  }
</script>
