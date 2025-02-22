/*
 * @Author: zero_ven
 * @Date: 2024-12-07 10:04:46
 * @LastEditTime: 2024-12-07 10:04:47
 * 
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /use-hooks/src/api/monitor/cache.ts
 */
import request from '@/utils/request'

// 查询缓存详细
export function getCache() {
  return request({
    url: '/monitor/cache',
    method: 'get'
  })
}
