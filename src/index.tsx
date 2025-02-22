/*
 * @Author: zero_ven
 * @Date: 2024-10-09 09:36:54
 * @LastEditTime: 2022-01-04 09:52:15
 * 
 * @Description: 
 * @FilePath: /use-hooks/src/index.tsx
 */
import ReactDOM from "react-dom";
import "./index.less";
import { HashRouter, Switch, Route } from "react-router-dom";
import routers from "./router";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";
// import "moment/locale/zh-cn";
import '@/assets/icons/index'

// 引入 redux test
import store from "./store";

ReactDOM.render(
  // <React.StrictMode> 关闭严格模式
  <ConfigProvider locale={zhCN}>
    <Provider store={store}>
      <HashRouter>
        <Switch>
          {routers.routers.map((v) => (
            <Route key={v.path} path={v.path} exact={v.exact} component={v.component} />
          ))}
        </Switch>
      </HashRouter>
    </Provider>
  </ConfigProvider>,
  // </React.StrictMode>
  document.getElementById("root")
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
