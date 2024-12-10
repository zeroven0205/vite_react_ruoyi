/*
 * @Author: zero_ven
 * @Date: 2024-10-15 11:47:36
 * @LastEditTime: 2024-10-15 13:43:47
 * 
 * @Description: 
 * @FilePath: /use-hooks/src/compoents/HeaderBar/index.tsx
 */
import { Tooltip, Button } from "antd";
import { SearchOutlined, SyncOutlined } from "@ant-design/icons";

const HeaderBar = (props: any) => {
    
  return (
    <div style={{float:"right"}}>
      <Tooltip title="隐藏搜索">
        <Button onClick={props.onSeachShow} style={{ marginRight: 10 }} icon={<SearchOutlined />} shape="circle"></Button>
      </Tooltip>
      <Tooltip title="刷新">
        <Button onClick={props.onGetList}  icon={<SyncOutlined />} shape="circle"></Button>
      </Tooltip>
    </div>
  );
};

export default HeaderBar