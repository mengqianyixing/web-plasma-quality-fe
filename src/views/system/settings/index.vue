<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="p-4" v-loading="wrapperLoading">
    <div class="flex items-center justify-center h-full bg-white">
      <div class="w-600px">
        <BasicForm @register="registerForm" @submit="submit" />
      </div>
    </div>
  </PageWrapper>
</template>
<script setup lang="tsx">
  import { PageWrapper } from '@/components/Page';
  import { BasicForm, useForm } from '@/components/Form';
  import { getCasdoorApplicationConfig, setCasdoorApplication } from '@/api/systemServer/settings';
  import { PostApiSysCasdoorApplicationConfigRequest } from '@/api/type/systemSettings';
  import { onMounted, ref } from 'vue';
  import { useMessage } from '@/hooks/web/useMessage';
  import { useGlobalApiStoreWithOut } from '@/store/modules/globalApi';
  import { SysParamsEnum } from '@/enums/sysParamsEnum';
  import { COMPANY } from '@/enums/company';

  const globalApiStore = useGlobalApiStoreWithOut();
  const iskm = globalApiStore.getSysParams(SysParamsEnum.BloodProductionCompany) === COMPANY.KM;
  const { createMessage } = useMessage();

  defineOptions({ name: 'CasConfig' });

  const wrapperLoading = ref(false);
  onMounted(async () => {
    await setFormValues();
  });

  async function setFormValues() {
    try {
      wrapperLoading.value = true;
      const originRes = await getCasdoorApplicationConfig();
      setFieldsValue({
        ...originRes,
      });
    } finally {
      wrapperLoading.value = false;
    }
  }

  const [registerForm, { validate, setProps, setFieldsValue }] = useForm({
    labelWidth: 150,
    size: 'large',
    baseColProps: { span: 24 },
    schemas: [
      {
        field: 'expireInHours',
        component: 'Input',
        componentProps: {
          'addon-after': '小时',
        },
        label: 'Access Token过期',
        ifShow: false,
      },
      {
        field: 'refreshExpireInHours',
        component: 'Input',
        componentProps: {
          'addon-after': '小时',
        },
        label: 'Refresh Token过期',
        ifShow: false,
      },
      {
        field: 'failedSigninLimit',
        component: 'Input',
        componentProps: {
          'addon-after': '次数',
        },
        label: '登入错误次数限制',
      },
      {
        field: 'failedSigninfrozenTime',
        component: 'Input',
        componentProps: {
          'addon-after': '分钟',
        },
        label: '登入重试等待时间',
      },
      {
        field: 'passwordExpiredDays',
        component: 'Input',
        componentProps: {
          'addon-after': '天',
        },
        label: '密码过期天数',
      },
      {
        field: 'validLoginDuration',
        component: 'Input',
        componentProps: {
          'addon-after': '秒',
        },
        label: '登陆有效时长',
      },
      {
        field: 'rule',
        label: '验证码规则',
        component: 'Select',
        componentProps: {
          options: [
            {
              label: '无',
              value: 'None',
            },
            {
              label: '始终开启',
              value: 'Always',
            },
            {
              label: '动态开启',
              value: 'Dynamic',
            },
          ].slice(0, iskm ? 2 : 3),
        },
      },
    ],
    showActionButtonGroup: true,
    showResetButton: false,
    submitButtonOptions: { text: '确认' },
    actionColOptions: { span: 4, push: 3 },
  });

  async function submit() {
    try {
      const values = await validate();
      await setProps({ submitButtonOptions: { loading: true } });
      await setCasdoorApplication(values as PostApiSysCasdoorApplicationConfigRequest);

      await setFormValues();

      createMessage.success('保存成功');
    } finally {
      await setProps({ submitButtonOptions: { loading: false } });
    }
  }
</script>
