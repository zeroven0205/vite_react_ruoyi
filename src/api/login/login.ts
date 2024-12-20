/*
 * @Author: zero_ven
 * @Date: 2024-10-11 10:02:40
 * @LastEditTime: 2024-10-11 14:43:55
 * 
 * @Description: 
 * @FilePath: /use-hooks/src/api/login/login.ts
 */
import request from "../../utils/request";

// 登录方法
export function login(username: any, password: any, code: any, uuid: any) {
  const data = {
    username,
    password,
    code,
    uuid,
  };
  return request({
    url: "/login",
    method: "post",
    data: data,
  });
}


// 获取用户详细信息
export function getInfo() {
  return request({
    url: "/getInfo",
    method: "get",
  });
}

// 退出方法
export function logout() {
  return request({
    url: "/logout",
    method: "post",
  });
}

// 获取验证码
export function getCodeImg() {
  return request({
    url: "/captchaImage",
    method: "get",
  });
}
