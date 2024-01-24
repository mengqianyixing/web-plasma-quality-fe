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
  import { genderMap, genderValueEnum } from '@/enums/commonEnum';
  import { donorStatusMap, donorStatusValueEnum } from '@/enums/callbackEnum';
  import {
    nonconformityPlasmaMap,
    NonconformityPlasmaStatusValueEnum,
  } from '@/enums/nonconforityEnum';

  defineOptions({ name: 'PickPlasmaModal' });

  const detailRef = ref<Recordable>({});

  const [registerPlasmaDetail] = useDescription({
    title: '不合格血浆详情',
    schema: detailSchema,
    column: 3,
  });

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    const detailData = await nonconformityPlasmaDetail(data.record.bagNo);

    detailRef.value = {
      ...detailData,
      gender: genderMap.get(detailData.gender as genderValueEnum),
      unqReason: data.record.plasmaUnqualifiedDictionary?.find(
        (it: Recordable) => it.value === detailData.unqReason,
      )?.label,
      donorStatus: donorStatusMap.get(detailData.donorStatus as donorStatusValueEnum),
      plasmaState: nonconformityPlasmaMap.get(
        detailData.plasmaState as NonconformityPlasmaStatusValueEnum,
      ),
    };

    setModalProps({ confirmLoading: false });
  });

  function handleClose() {
    closeModal();
  }
</script>
