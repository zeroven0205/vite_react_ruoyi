/*
 * @Author: zero_ven
 * @Date: 2024-11-24 09:06:12
 * @LastEditTime: 2024-11-25 16:26:54
 * 
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /use-hooks/src/api/monitor/job.ts
 */
import request from "@/utils/request";
// 查询定时任务调度列表
export function listJob(query: any) {
  return request({
    url: "/monitor/job/list",
    method: "get",
    params: query,
  });
}

// 查询定时任务调度详细
export function getJob(jobId: string) {
  return request({
    url: "/monitor/job/" + jobId,
    method: "get",
  });
}

// 新增定时任务调度
export function addJob(data: any) {
  return request({
    url: "/monitor/job",
    method: "post",
    data: data,
  });
}

// 修改定时任务调度
export function updateJob(data: any) {
  return request({
    url: "/monitor/job",
    method: "put",
    data: data,
  });
}

// 删除定时任务调度
export function delJob(jobId: string) {
  return request({
    url: "/monitor/job/" + jobId,
    method: "delete",
  });
}

// 导出定时任务调度
export function exportJob(query: any) {
  return request({
    url: "/monitor/job/export",
    method: "get",
    params: query,
  });
}

// 任务状态修改
export function changeJobStatus(jobId: any, status: any) {
  const data = {
    jobId,
    status,
  };
  return request({
    url: "/monitor/job/changeStatus",
    method: "put",
    data: data,
  });
}

// 定时任务立即执行一次
export function runJob(jobId: any, jobGroup: any) {
  const data = {
    jobId,
    jobGroup,
  };
  return request({
    url: "/monitor/job/run",
    method: "put",
    data: data,
  });
}
