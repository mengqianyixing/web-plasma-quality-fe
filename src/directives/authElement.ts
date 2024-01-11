/**
 * Global authority directive
 * 新增 v-auth-el，保留旧的 v-auth 。
 * @Example v-auth-el="RoleEnum.TEST"
 */
import { useUserStore } from '@/store/modules/user';
import type { App, Directive, DirectiveBinding } from 'vue';

function isAuth(el: Element, binding: any) {
  const userStore = useUserStore();
  const authList = userStore.getUserInfo.menuIds ?? [];
  console.log({ authList });
  const value = binding.value;
  if (!value) {
    return;
  }
  let isAuth = false;
  if (Array.isArray(value) && value.length) {
    isAuth = value.some((i) => authList.includes(i));
  } else {
    isAuth = authList.includes(value);
  }
  if (!isAuth) {
    el.parentNode?.removeChild(el);
  }
}

const mounted = (el: Element, binding: DirectiveBinding<any>) => {
  isAuth(el, binding);
};

const authElementDirective: Directive = {
  mounted,
};

export function setupAuthElementDirective(app: App) {
  app.directive('auth-el', authElementDirective);
}

export default authElementDirective;
