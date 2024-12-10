/*
 * @Author: zero_ven
 * @Date: 2024-10-27 14:25:33
 * @LastEditTime: 2024-10-27 14:25:33
 * 
 * @Description: 
 * @FilePath: /use-hooks/src/api/system/log/logininfor.ts
 */
import request from "@/utils/request"

// 查询登录日志列表
export function list(query: any) {
  return request({
    url: '/monitor/logininfor/list',
    method: 'get',
    params: query
  })
}

// 删除登录日志
export function delLogininfor(infoId: string) {
  return request({
    url: '/monitor/logininfor/' + infoId,
    method: 'delete'
  })
}

// 清空登录日志
export function cleanLogininfor() {
  return request({
    url: '/monitor/logininfor/clean',
    method: 'delete'
  })
}

// 导出登录日志
export function exportLogininfor(query: any) {
  return request({
    url: '/monitor/logininfor/export',
    method: 'get',
    params: query
  })
}