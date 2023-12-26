/*
 * @Author: HxB
 * @Date: 2023-12-25 16:23:01
 * @LastEditors: DoubleAm
 * @LastEditTime: 2023-12-26 14:40:15
 * @Description: oauth casdoor
 * @FilePath: \psms-fe\src\api\oauth\oauth.ts
 */
const config = {
  serverUrl: 'http://192.168.110.13:7000',
  clientId: '2bf3139c50199ee0f07d',
  organizationName: 'organization_psms',
  appName: 'psms',
  redirectPath: '/#/login',
};

function getAccount() {
  return fetch(`/casdoor/api/get-account`, {
    method: 'GET',
    credentials: 'include',
  }).then((res) => {
    console.log(res);
    return res.json();
  });
}

function signin(authStr) {
  return fetch(`/api/sys/casdoor/sigin?${authStr}`, {
    method: 'POST',
  }).then((res) => {
    console.log(res);
    return res.json();
  });
}

function logOut() {
  return fetch(`/casdoor/api/signout`, {
    method: 'POST',
    credentials: 'include',
  }).then((res) => {
    return res.json();
  });
}

export default {
  signin,
  getAccount,
  logOut,
  config,
};
