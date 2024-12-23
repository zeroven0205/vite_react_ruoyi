/*
 * @Author: zero-ven
 * @Date: 2021-03-05 16:36:31
 * @LastEditTime: 2021-12-08 15:37:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /blogreact/src/router/router.tsx
 */

import App from "../views/App/App";
import Layout from "../views/Layout";
import Login from "../views/login";
import DictData from "@/views/system/dict/data";
import AuthUser from "@/views/system/role/authUser";
import UserProfile from "@/views/system/profile";
import SysUser from "@/views/system/user";
import SysRole from "@/views/system/role";
import SysDept from "@/views/system/dept";
import SysDict from "@/views/system/dict";
import SysPost from "@/views/system/post";
import SysMenu from "@/views/system/menu";
import SysLogLogininfor from "@/views/system/log/logininfor";
import SysLogOper from "@/views/system/log/operlog";
import SysNotice from "@/views/system/notice";
import SysConfig from "@/views/system/config";
// 
import JobLog from "@/views/monitor/job/jobLog";
import Redirect from '@/views/redirect/index'

/**
 * @description: 一级路由
 * @param {*}
 * @return {*}
 */
const routers = [
  {
    path: "/login",
    exact: false,
    component: Login,
  },
  {
    path: "/",
    exact: false,
    component: App,
  },
  {
    path: "/system",
    exact: false,
    component: SysUser,
  },
  // {
  //   path:'/Resumes',
  //   exact: false,
  //   component: Resumes
  // },
  // {
  //   path: '',
  //   exact: false,
  //   component: NoMatch
  // }
];
/**
 * @description: 二级路由
 * @param {*}
 * @return {*}
 */
const subRouters = [
  // {
  //   path: "/index/layout",
  //   exact: true,
  //   meta: {
  //     title: "首页",
  //   },
  //   component: Layout,
  // },
  {
    path:'/login',
    meta: {
      title: "登录",
    },
    exact: false,
    component: Login,
  },
  {
    path:'/system/user',
    meta: {
      title: "用户管理",
    },
    exact: false,
    component: SysUser,
  },
  {
    path:'/system/role',
    meta: {
      title: "角色管理",
    },
    exact: false,
    component: SysRole
  },
  {
    path:'/system/menu',
    meta: {
      title: "菜单管理",
    },
    exact: false,
    component: SysMenu,
  },
  {
    path:'/system/dept',
    meta: {
      title: "部门管理",
    },
    exact: false,
    component: SysDept
  },
  {
    path:'/system/post',
    meta: {
      title: "岗位管理",
    },
    exact: false,
    component: SysPost
  },
  {
    path:'/system/dict',
    meta: {
      title: "字典管理",
    },
    exact: false,
    component: SysDict
  },
  {
    path:'/system/config',
    meta: {
      title: "参数设置",
    },
    exact: false,
    component: SysConfig
  },
  {
    path: "/system/notice",
    meta: {
      title: "通知公告",
    },
    exact: true,
    component: SysNotice,
  },
  {
    path: "/system/log/operlog",
    meta: {
      title: "操作日志",
    },
    exact: true,
    component: SysLogOper,
  },
  {
    path: "/system/log/logininfor",
    meta: {
      title: "操作日志",
    },
    exact: true,
    component: SysLogLogininfor,
  },
  {
    path: "/system/dict-data/:id",
    meta: {
      title: "字典数据",
    },
    exact: true,
    component: DictData,
  },
  {
    path: "/system/role-auth/:id",
    meta: {
      title: "分配用户",
    },
    exact: true,
    component: AuthUser,
  },
  {
    path: "/user/profile",
    meta: {
      title: "个人中心",
    },
    exact: true,
    component: UserProfile,
  },
  {
    path: "/monitor/job-log/:id",
    meta: {
      title: "调度日志",
    },
    exact: true,
    component: JobLog,
  },
  {
    path: "/redirect",
    exact: true,
    meta: {
      title: "空白页",
    },
    component: Redirect,
  },
];

/**
 * @description: 导出obj
 * @param {*}
 * @return {*}
 */
const obj = {
  routers,
  subRouters,
};
export default obj;
