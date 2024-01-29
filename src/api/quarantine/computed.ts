import { defHttp } from '@/utils/http/axios';

export const submitComputed = () => defHttp.get({ url: '/api/core/bag/quarantine' });
