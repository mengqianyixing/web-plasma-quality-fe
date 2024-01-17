/*
 * @Author: HxB
 * @Date: 2023-12-25 16:23:01
 * @LastEditors: DoubleAm
 * @LastEditTime: 2024-01-17 17:00:52
 * @Description: oauth casdoor
 * @FilePath: \psms-fe\src\api\oauth\oauth.ts
 */
// @TODO: 稳定版待补充类型声明+替换 fetch

function goToCasDoorLogin() {
  return fetch(`/api/sys/casdoor/login?redirectUri=${encodeURIComponent(window.location.origin)}`, {
    method: 'GET',
  }).then((res) => {
    return res.json();
  });
}

function signIn(authStr) {
  return fetch(`/api/sys/casdoor/signin?${authStr}`, {
    method: 'GET',
  }).then((res) => {
    console.log(res);
    return res.json();
  });
}

function refresh(refreshToken) {
  return fetch(`/api/sys/casdoor/refresh_token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refreshToken }),
  }).then((res) => {
    return res.json();
  });
}

export default {
  // config,
  signIn,
  goToCasDoorLogin,
  refresh,
};
