<template>
  <Modal
    v-bind="$attrs"
    v-on="$attrs"
    :open="true"
    @cancel="hideModal"
    :footer="false"
    width="500px"
    title="撤销验收"
  >
    <div class="content">
      <Form layout="inline" :model="searchForm">
        <FormItem label="原因" :rules="[{ required: true }]">
          <Textarea v-model:value="searchForm.remark" :cols="40" />
        </FormItem>
        <FormItem>
          <Button type="primary" @click="confirm" :loading="loading">提交</Button>
        </FormItem>
      </Form>
    </div>
  </Modal>
</template>

<script lang="ts" setup>
  import { ref, defineExpose } from 'vue';
  import { Modal, Textarea, Form, FormItem, Button } from 'ant-design-vue';
  import { useMessage } from '@/hooks/web/useMessage';
  import { plasmaRevokeBag } from '@/api/inbound-management/accept-plasma.ts';

  const { createMessage } = useMessage();
  const { success, warning } = createMessage;

  const emit = defineEmits(['close', 'query']);

  const searchForm = ref({
    remark: '',
  });

  const rowInfow = ref<any>({});

  const hideModal = () => {
    emit('close', false);
  };

  const loading = ref(false);

  const confirm = async () => {
    if (!searchForm.value.remark) {
      warning('请填写原因!');
      return;
    }

    try {
      const params = {
        batchNo: rowInfow.value.batchNo,
        boxNo: rowInfow.value.boxNo,
        bagNo: rowInfow.value.bagNo,
        checker: rowInfow.value.checker,
        trayNo: rowInfow.value.trayNo,
        remark: searchForm.value.remark,
      };
      loading.value = true;
      const data = await plasmaRevokeBag(params);
      if (data === null) {
        success('撤销成功');
        emit('close', false);
        emit('query', rowInfow.value.batchNo);
      }
    } finally {
      loading.value = false;
    }
  };

  defineExpose({
    searchForm,
    rowInfow,
  });
</script>
<style lang="less" scoped>
  .content {
    padding: 0 12px 12px;
  }
</style>
