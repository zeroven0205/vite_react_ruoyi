/*
 * @Author: zero_ven
 * @Date: 2024-12-06 15:42:24
 * @LastEditTime: 2024-12-07 09:00:10
 * 
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /use-hooks/src/views/monitor/druid/index.tsx
 */
import { useState, useEffect, useRef } from "react";
import { REACT_APP_BASE_API } from "@/utils/const";

import "./index.less";

function Druid(props: any) {
  const [height, setHeight] = useState<any>(null);
  /**
   * @description: 生命周期初始化
   * @param {*}
   * @return {*}
   */
  useEffect(() => {
    setHeight(document.documentElement.clientHeight - 170 + "px");
    window.onresize = function temp() {
      setHeight(document.documentElement.clientHeight - 170 + "px");
    };
    return () => {
    // 清除函数
      window.onresize = null;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div style={{ height }}>
        <iframe src={REACT_APP_BASE_API + "/druid/login.html"} frameBorder="no" title="navigation" style={{ width: "100%", height: "100%" }} scrolling="auto" />
      </div>
    </>
  );
}

export default Druid;
