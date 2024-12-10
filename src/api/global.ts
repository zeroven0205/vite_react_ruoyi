/*
 * @Author: zero_ven
 * @Date: 2024-10-13 15:14:08
 * @LastEditTime: 2024-10-25 15:02:35
 * 
 * @Description: 
 * @FilePath: /use-hooks/src/api/global.ts
 */
import request from "../utils/request";
// 根据字典类型查询字典数据信息
export function getDicts(dictType: string) {
  return request({
    url: "/system/dict/data/type/" + dictType,
    method: "get",
  });
}

// 根据字典类型查询字典数据信息
export function uploadImage(data: any) {
  return request({
    url: "/common/upload",
    method: "post",
    data,
  });
}
