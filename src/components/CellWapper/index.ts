import { withInstall } from '@/utils';
import cellWapper from './src/index.vue';

export * from './src/type';

export const CellWapper = withInstall(cellWapper);
