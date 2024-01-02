<template>
  <div :class="prefixCls" class="relative w-full h-full px-4">
    <div class="absolute flex items-center right-4 top-4">
      <AppDarkModeToggle class="mr-2 enter-x" v-if="!sessionTimeout" />
      <AppLocalePicker
        class="text-white enter-x xl:text-gray-600"
        :show-text="false"
        v-if="!sessionTimeout && showLocale"
      />
    </div>

    <span class="-enter-x xl:hidden">
      <AppLogo :alwaysShowTitle="true" />
    </span>

    <div class="container relative h-full py-2 mx-auto sm:px-10">
      <div class="flex h-full">
        <div class="hidden min-h-full pl-4 mr-4 xl:flex xl:flex-col xl:w-6/12">
          <AppLogo class="-enter-x" />
        </div>
        <div
          class="relative flex flex-col items-start justify-between w-3/5 p-5 rounded-md welcome-wrapper left-17 h-2/5 enter-x"
        >
          <img class="relative top-23%" src="../../../assets/images/welcome.png" alt="" />
          <div class="relative text-white bottom-1/5"> v {{ prodVersion }} </div>
        </div>

        <div class="flex items-center w-full h-full py-5 xl:h-auto xl:py-0 xl:my-0 xl:w-6/12">
          <div
            :class="`${prefixCls}-form`"
            class="relative w-full px-5 py-8 mx-auto my-auto bg-white rounded-md shadow-md h-3/5 xl:ml-16 xl:bg-transparent sm:px-8 xl:p-4 xl:shadow-none sm:w-3/4 lg:w-2/4 xl:w-auto enter-x"
          >
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { AppLogo, AppLocalePicker, AppDarkModeToggle } from '@/components/Application';
  import LoginForm from './LoginForm.vue';
  import { useDesign } from '@/hooks/web/useDesign';
  import { useLocaleStore } from '@/store/modules/locale';
  import { version } from './../../../../package.json';

  defineProps({
    sessionTimeout: {
      type: Boolean,
    },
  });

  const prodVersion = version;

  const { prefixCls } = useDesign('login');
  const localeStore = useLocaleStore();
  const showLocale = localeStore.getShowPicker;
</script>
<style lang="less">
  /* stylelint-disable */
  @prefix-cls: ~'@{namespace}-login';
  @logo-prefix-cls: ~'@{namespace}-app-logo';
  @countdown-prefix-cls: ~'@{namespace}-countdown-input';
  @dark-bg: #293146;

  html[data-theme='dark'] {
    .@{prefix-cls} {
      background-color: @dark-bg;

      &::before {
        background-image: url('@/assets/svg/login-bg-dark.svg');
      }

      .ant-input,
      .ant-input-password {
        background-color: #232a3b;
      }

      .ant-btn:not(.ant-btn-link, .ant-btn-primary) {
        border: 1px solid #4a5569;
      }

      &-form {
        background: transparent !important;
      }

      .app-iconify {
        color: #fff;
      }
    }

    input.fix-auto-fill,
    .fix-auto-fill input {
      -webkit-text-fill-color: #c9d1d9 !important;
      box-shadow: inherit !important;
    }

    .ant-divider-inner-text {
      color: @text-color-secondary;
    }
  }

  .@{prefix-cls} {
    min-height: 100%;
    overflow: hidden;

    @media (max-width: @screen-xl) {
      background-color: #293146;

      .@{prefix-cls}-form {
        background-color: #fff;
      }
    }

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: url('@/assets/images/login-bg.png');
      background-repeat: no-repeat;
      background-position: 100%;
      background-size: 100% 100%;

      @media (max-width: @screen-xl) {
        display: none;
      }
    }

    .@{logo-prefix-cls} {
      position: absolute;
      top: 12px;
      height: 30px;

      &__title {
        color: #fff;
        font-size: 16px;
      }

      img {
        width: 32px;
      }
    }

    .container {
      .@{logo-prefix-cls} {
        display: flex;
        width: 60%;
        height: 80px;

        &__title {
          color: #fff;
          font-size: 24px;
        }

        img {
          width: 48px;
        }
      }
    }

    &-sign-in-way {
      .anticon {
        color: #888;
        font-size: 22px;
        cursor: pointer;

        &:hover {
          color: @primary-color;
        }
      }
    }

    input:not([type='checkbox']) {
      min-width: 360px;

      @media (max-width: @screen-xl) {
        min-width: 320px;
      }

      @media (max-width: @screen-lg) {
        min-width: 260px;
      }

      @media (max-width: @screen-md) {
        min-width: 240px;
      }

      @media (max-width: @screen-sm) {
        min-width: 160px;
      }
    }

    .@{countdown-prefix-cls} input {
      min-width: unset;
    }
    #ARowInput {
      min-width: 265px;

      @media (max-width: @screen-xl) {
        min-width: 250px;
      }

      @media (max-width: @screen-lg) {
        min-width: 240px;
      }

      @media (max-width: @screen-md) {
        min-width: 200px;
      }

      @media (max-width: @screen-sm) {
        min-width: 160px;
      }
    }

    .ant-divider-inner-text {
      color: @text-color-secondary;
      font-size: 12px;
    }
  }

  .welcome-wrapper {
    background-image: url('@/assets/images/welcome-bg.png');
    height: 100%;
    background-size: 100% 60%;
    background-repeat: no-repeat;
    background-position: center;
    @media (max-width: @screen-xl) {
      display: none;
    }
  }
</style>
