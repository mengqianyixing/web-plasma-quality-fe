import { defineConfig } from 'yapi-to-typescript';

export default defineConfig([
  {
    serverUrl: 'https://yapi.sharing8.cn/',
    typesOnly: true,
    target: 'typescript',
    reactHooks: {
      enabled: false,
    },
    prodEnvName: 'prod',
    dataKey: 'data',
    projects: [
      {
        token: 'f0f0126eab8919370ddb13cc60a57a0168822e1fa16995c8830f565f845f1d61',
        categories: [
          {
            id: 4416,
            getRequestFunctionName(interfaceInfo, changeCase) {
              // 以接口全路径生成请求函数名
              return changeCase.camelCase(`${interfaceInfo.method}${interfaceInfo.path}`);
            },
            outputFilePath: 'src/api/type/login.d.ts',
          },
          {
            id: 4368,
            getRequestFunctionName(interfaceInfo, changeCase) {
              // 以接口全路径生成请求函数名
              return changeCase.camelCase(`${interfaceInfo.method}${interfaceInfo.path}`);
            },
            outputFilePath: 'src/api/type/deptManage.d.ts',
          },
          {
            id: 4376,
            getRequestFunctionName(interfaceInfo, changeCase) {
              // 以接口全路径生成请求函数名
              return changeCase.camelCase(`${interfaceInfo.method}${interfaceInfo.path}`);
            },
            outputFilePath: 'src/api/type/userManage.d.ts',
          },
          {
            id: 4400,
            getRequestFunctionName(interfaceInfo, changeCase) {
              // 以接口全路径生成请求函数名
              return changeCase.camelCase(`${interfaceInfo.method}${interfaceInfo.path}`);
            },
            outputFilePath: 'src/api/type/roleManage.d.ts',
          },
          {
            id: 4408,
            getRequestFunctionName(interfaceInfo, changeCase) {
              // 以接口全路径生成请求函数名
              return changeCase.camelCase(`${interfaceInfo.method}${interfaceInfo.path}`);
            },
            outputFilePath: 'src/api/type/menuManage.d.ts',
          },
          {
            id: 4392,
            getRequestFunctionName(interfaceInfo, changeCase) {
              // 以接口全路径生成请求函数名
              return changeCase.camelCase(`${interfaceInfo.method}${interfaceInfo.path}`);
            },
            outputFilePath: 'src/api/type/resourcesManage.d.ts',
          },
          {
            id: 5208,
            getRequestFunctionName(interfaceInfo, changeCase) {
              // 以接口全路径生成请求函数名
              return changeCase.camelCase(`${interfaceInfo.method}${interfaceInfo.path}`);
            },
            outputFilePath: 'src/api/type/tagManage.d.ts',
          },
          {
            id: 5250,
            getRequestFunctionName(interfaceInfo, changeCase) {
              // 以接口全路径生成请求函数名
              return changeCase.camelCase(`${interfaceInfo.method}${interfaceInfo.path}`);
            },
            outputFilePath: 'src/api/type/dictionary.d.ts',
          },
        ],
      },
      {
        token: '0e3af5e8e5c3aed5f64ece4117850a4ba87b4644975e6343f3091f537a0e7a85',
        categories: [
          {
            id: 5173,
            getRequestFunctionName(interfaceInfo, changeCase) {
              // 以接口全路径生成请求函数名
              return changeCase.camelCase(`${interfaceInfo.method}${interfaceInfo.path}`);
            },
            outputFilePath: 'src/api/type/productionOrder.d.ts',
          },
          {
            id: 5187,
            getRequestFunctionName(interfaceInfo, changeCase) {
              // 以接口全路径生成请求函数名
              return changeCase.camelCase(`${interfaceInfo.method}${interfaceInfo.path}`);
            },
            outputFilePath: 'src/api/type/plasmaStoreManage.d.ts',
          },
          {
            id: 5229,
            getRequestFunctionName(interfaceInfo, changeCase) {
              // 以接口全路径生成请求函数名
              return changeCase.camelCase(`${interfaceInfo.method}${interfaceInfo.path}`);
            },
            outputFilePath: 'src/api/type/trayManage.d.ts',
          },
        ],
      },
    ],
  },
]);
