/*
 * @Descripttion:
 * @version:
 * @Author: zcc
 * @Date: 2023-12-08 09:39:00
 * @LastEditors: DoubleAm
 * @LastEditTime: 2023-12-26 14:39:24
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
          target: 'http://192.168.1.67:7002',
          changeOrigin: true,
          rewrite: (p) => p.replace(new RegExp(`^/basic-api`), ''),
        },
        '/basic-api/sys': {
          target: 'http://192.168.1.133:7100/api',
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(new RegExp(`^/basic-api`), ''),
        },
        '/api/sys': {
          target: 'http://192.168.120.192:7002',
          changeOrigin: true,
          ws: true,
        },
        '/basic-api': {
          target: 'http://192.168.1.133:7100',
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(new RegExp(`^/basic-api`), ''),
          // only https
          // secure: false
        },
        '/casdoor/': {
          target:
            'http://192.168.110.13:7000/api/signin?code=6e008f8aaf607b5fe1e1&state=2jljs5huugy',
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(new RegExp(`^/casdoor/`), ''),
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
