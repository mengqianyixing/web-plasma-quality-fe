/*
 * @Author: HxB
 * @Date: 2023-12-25 16:23:01
 * @LastEditors: DoubleAm
 * @LastEditTime: 2023-12-27 18:03:02
 * @Description: oauth casdoor
 * @FilePath: \psms-fe\src\api\oauth\oauth.ts
 */
// const config = {
//   serverUrl: 'http://192.168.110.13:7000',
//   clientId: '2bf3139c50199ee0f07d',
//   organizationName: 'organization_psms',
//   appName: 'psms',
//   redirectPath: '/#/login',
// };

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
