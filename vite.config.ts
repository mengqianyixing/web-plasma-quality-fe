/*
 * @Descripttion:
 * @version:
 * @Author: zcc
 * @Date: 2023-12-08 09:39:00
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-13 16:49:07
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
        // '/basic-api/api/core/bank/tr': {
        //   target:"http://192.168.1.81:8888",
        //   // target: 'http://192.168.1.133:7001',
        //   // target: 'https://yapi.sharing8.cn/mock/529',
        //   changeOrigin: true,
        //   rewrite: (p) => p.replace(new RegExp(`^/basic-api`), ''),
        // },
        // '/basic-api/api/sys': {
        //   target: 'http://192.168.1.67:7002',
        //   // target: 'http://192.168.1.133:7001',
        //   // target: 'https://yapi.sharing8.cn/mock/529',
        //   changeOrigin: true,
        //   rewrite: (p) => p.replace(new RegExp(`^/basic-api`), ''),
        // },
        '/api/sys/': {
          target: 'http://192.168.1.133:7100',
          changeOrigin: true,
          ws: true,
        },
        '/basic-api/api/core': {
          // target: 'http://192.168.1.67:7001',
          target: 'http://192.168.1.133:7100',
          changeOrigin: true,
          rewrite: (p) => p.replace(new RegExp(`^/basic-api`), ''),
        },
        '/basic-api/api/product': {
          // target: 'http://192.168.1.67:7003',
          target: 'http://192.168.1.133:7100',
          changeOrigin: true,
          rewrite: (p) => p.replace(new RegExp(`^/basic-api`), ''),
        },
        '/basic-api/api/sys': {
          // target: 'http://192.168.1.67:7002',
          target: 'http://192.168.1.133:7100',
          changeOrigin: true,
          rewrite: (p) => p.replace(new RegExp(`^/basic-api`), ''),
        },
        '/basic-api': {
          target: 'http://192.168.1.133:7100',
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(new RegExp(`^/basic-api`), ''),
        },
        // '/basic-api': {
        //   target: 'http://192.168.1.133:7100',
        //   changeOrigin: true,
        //   ws: true,
        //   rewrite: (path) => path.replace(new RegExp(`^/basic-api`), ''),
        //   // only https
        //   // secure: false
        // },
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
