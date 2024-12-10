/*
 * @Author: zero_ven
 * @Date: 2024-10-20 11:00:02
 * @LastEditTime: 2024-11-24 09:57:55
 * 
 * @Description: 
 * @FilePath: /use-hooks/src/compoents/RuoYiPagination/index.tsx
 */
import React, { useEffect } from "react";
import "./index.less";
import { Pagination } from "antd";
function RuoYiPagination(props: any) {
  useEffect(() => {}, []);
  return (
    <div className="RuoYiPagination">
      <Pagination
        current={props.current}
        total={props.total}
        onChange={(page, pageSize) => {
          props.onChange(page === 0 ? 1 : page, pageSize);
        }}
        showSizeChanger
        showQuickJumper
      />
    </div>
  );
}
export default RuoYiPagination;
