/*
 * @Author: zero_ven
 * @Date: 2024-10-27 14:24:40
 * @LastEditTime: 2024-10-27 14:24:40
 * 
 * @Description: 
 * @FilePath: /use-hooks/src/api/system/operlog.ts
 */
import request from "@/utils/request"

// 查询操作日志列表
export function list(query: any) {
  return request({
    url: '/monitor/operlog/list',
    method: 'get',
    params: query
  })
}

// 删除操作日志
export function delOperlog(operId: string) {
  return request({
    url: '/monitor/operlog/' + operId,
    method: 'delete'
  })
}

// 清空操作日志
export function cleanOperlog() {
  return request({
    url: '/monitor/operlog/clean',
    method: 'delete'
  })
}

// 导出操作日志
export function exportOperlog(query: any) {
  return request({
    url: '/monitor/operlog/export',
    method: 'get',
    params: query
  })
}