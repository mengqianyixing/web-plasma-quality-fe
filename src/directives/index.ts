/**
 * Configure and register global directives
 */
import type { App } from 'vue';
import { setupPermissionDirective } from './permission';
import { setupLoadingDirective } from './loading';
import { setupEllipsisDirective } from './ellipsis';
import { setupAuthElementDirective } from './authElement';

export function setupGlobDirectives(app: App) {
  setupAuthElementDirective(app);
  setupPermissionDirective(app);
  setupLoadingDirective(app);
  setupEllipsisDirective(app);
}
