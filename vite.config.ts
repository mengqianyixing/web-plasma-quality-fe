/*
 * @Descripttion:
 * @version:
 * @Author: zcc
 * @Date: 2023-12-08 09:39:00
 * @LastEditors: DoubleAm
 * @LastEditTime: 2023-12-27 18:11:11
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
        '/basic-api/api/core/bank/tr': {
          // target:"http://192.168.1.81:8888",
          // target: 'http://192.168.1.133:7001',
          target: 'https://yapi.sharing8.cn/mock/529',
          changeOrigin: true,
          rewrite: (p) => p.replace(new RegExp(`^/basic-api`), ''),
        },
        '/basic-api/api/sys/dict': {
          target: 'http://192.168.120.192:7002',
          changeOrigin: true,
          rewrite: (p) => p.replace(new RegExp(`^/basic-api`), ''),
        },
        '/basic-api/sys': {
          target: 'http://192.168.120.192:7002/api',
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(new RegExp(`^/basic-api`), ''),
        },
        '/api/sys/': {
          target: 'http://192.168.120.192:7002',
          changeOrigin: true,
          ws: true,
        },
        '/basic-api': {
          target: 'http://192.168.120.192:7002',
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
