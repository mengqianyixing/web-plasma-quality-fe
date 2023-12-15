/*
 * @Descripttion:
 * @version:
 * @Author: zcc
 * @Date: 2023-12-08 09:39:00
 * @LastEditors: zcc
 * @LastEditTime: 2023-12-14 17:54:23
 */
import { defineApplicationConfig } from '@vben/vite-config';

export default defineApplicationConfig({
  overrides: {
    base: './',
    optimizeDeps: {
      include: [
        'echarts/core',
        'echarts/charts',
        'echarts/components',
        'echarts/renderers',
        'qrcode',
        '@iconify/iconify',
        'ant-design-vue/es/locale/zh_CN',
        'ant-design-vue/es/locale/en_US',
      ],
    },
    server: {
      proxy: {
        '/basic-api/mock': {
          // target:"http://192.168.1.81:8888",
          target: 'http://192.168.1.133:7001',
          // target:"https://yapi.sharing8.cn/mock/529",
          changeOrigin: true,
          rewrite: (p) => p.replace(new RegExp(`^/basic-api/mock`), ''),
        },
        '/basic-api': {
          target: 'http://192.168.1.67:7002',
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(new RegExp(`^/basic-api`), ''),
          // only https
          // secure: false
        },
        '/upload': {
          target: 'http://localhost:3300/upload',
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(new RegExp(`^/upload`), ''),
        },
      },
    },
  },
});
