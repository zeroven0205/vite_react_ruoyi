/*
 * @Author: zero_ven
 * @Date: 2024-10-09 09:36:54
 * @LastEditTime: 2024-12-10 13:56:43
 * 
 * @Description: 
 * @FilePath: /use-hooks/src/views/App/App.tsx
 */
import "./App.less";
import "antd/dist/antd.variable.min.css";
import React, { useEffect, useState, useRef, createContext } from "react";
import { Layout, Menu, Avatar, Dropdown, Modal } from "antd";
import HeaderScroll from "@/compoents/HeaderScroll";
import { MenuUnfoldOutlined, MenuFoldOutlined, AppstoreOutlined, CaretDownOutlined, FullscreenOutlined, FullscreenExitOutlined, BgColorsOutlined } from "@ant-design/icons";
import routers from "../../router";
import { Route, NavLink } from "react-router-dom";
import { connect } from "react-redux";
//从redux中引入一个方法用于将actionCreators中的方法进行绑定 就是用  dispatch({actions暴露方法})
import { bindActionCreators } from "redux";
import actions from "../../store/actions";
import SvgIcon from "@/compoents/SvgIcon";
import { requestFullScreen, exitFullScreen, isFullscreenElement } from "@/utils/ruoyi";
import AvatarImg from "@/assets/images/profile.jpg";
import { SketchPicker } from "react-color";
import { ConfigProvider } from "antd";

export const Context = createContext<any>(null);
const ReachableContext = React.createContext(window.localStorage.getItem("bgColor") || "#1890ff");
const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;
function App(props: any) {
  /**
   * @description: 是否第一次加载组件
   * @param {*}
   * @return {*}
   */
  const initComponent = useRef(true);
  const [modal, contextHolder] = Modal.useModal();
  const [panes, setPanes] = useState<any>([{ title: "首页", key: "/index/layout" }]);
  const [activeKey, setActiveKey] = useState<any>("0");
  const [collapsed, setCollapsed] = useState(false);

  const [fullScreen, setFullScreen] = useState(false);
  const [originResizeFunc, setOriginResizeFunc] = useState<any>(null);
  const [defaultSelectedKeys, setDefaultSelectedKeys] = useState("");
  const [isOpen, setIsOpen] = useState<any>([]);
  let [color, setColor] = useState(window.localStorage.getItem("bgColor") || "#1890ff");

  useEffect(() => {
    if (initComponent.current) return;
    /**
     * @description: 判断是否为 hash 模式  路由高亮判断
     * @param {*} test
     * @return {*}
     */
    if (/#/.test(window.location.href)) {
      const arr = window.location.href.split("#");
      let pathObj = props.routerMenu.filter((item: any) => {
        return item.path === arr[1];
      });
      if (pathObj.length > 0) {
        let open = pathObj[0].path.split("/") || [];
        open.forEach((element: any, index: number) => {
          open[index] = "/" + open[index];
        });
        setIsOpen([...open]);
        setDefaultSelectedKeys(pathObj[0].path);
        add({ title: pathObj[0].meta.title, key: pathObj[0].path });
      } else {
        pathObj = routers.subRouters.filter((item: any) => {
          return item.path === arr[1];
        });
        if (pathObj.length > 0) {
          let open = pathObj[0].path.split("/") || [];
          open.forEach((element: any, index: number) => {
            open[index] = "/" + open[index];
          });
          setIsOpen([...open]);
          setDefaultSelectedKeys(pathObj[0].path);
          if (pathObj[0].path !== "/index/layout") {
            add({ title: pathObj[0].meta.title, key: pathObj[0].path });
          }
        }
        // 判断长度是否>1 如果 >1的话相当于是进入了三级菜单
        if (panes.length === 2) {
          if (panes[1].key.includes("/monitor/job-log") || panes[1].key.includes("/system/role-auth") || panes[1].key.includes("/system/dict-data")) {
            // 分配用户  // 字典数据  // 调度日志
            let arr = panes[1].key.split("-") || [];
            let open = arr[0].split("/") || [];
            open.forEach((element: any, index: number) => {
              open[index] = "/" + open[index];
            });
            setIsOpen([...open]);
            setDefaultSelectedKeys(arr[0]);
          }
        }
      }
    }
  }, [props.routerMenu]); // eslint-disable-line react-hooks/exhaustive-deps
  // 生命周期执行副作用
  useEffect(() => {
    initComponent.current = false;
    // 变更主题颜色 方法
    ConfigProvider.config({
      theme: {
        primaryColor: window.localStorage.getItem("bgColor") || "#1890ff",
      },
    });
    props.getMenu();
    // 判断如果第一次进来不是首页就不用跳了
    if (props.location.pathname === "/index/layout" || props.location.pathname === "/") {
      props.history.push("/index/layout");
      setActiveKey(() => {
        return panes[0].key;
      });
    }

    // 监听esc退出全屏
    if (window.addEventListener) {
      window.addEventListener("resize", onEscCancelFull, false);
    } else {
      setOriginResizeFunc(window.onresize);
      window.onresize = onEscCancelFull;
    }
    return () => {
      if (window.removeEventListener) {
        window.removeEventListener("resize", onEscCancelFull, false);
      } else {
        window.onresize = originResizeFunc;
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  function onEscCancelFull() {
    setFullScreen(isFullscreenElement());
  }
  // 变换展开模式
  const toggle = () => {
    setCollapsed(!collapsed);
  };
  const onHeaderMenuChange = (key: any) => {
    setDefaultSelectedKeys(() => {
      return key;
    });
    setActiveKey(key);
    let open = key.split("/") || [];
    open.forEach((element: any, index: number) => {
      open[index] = "/" + open[index];
    });
    setIsOpen([...open]);
  };
  const onOpenChange = (keys: any) => {
    const latestOpenKey = keys.find((key: any) => isOpen.indexOf(key) === -1);
    const openMenu = props.sidebarRoutes.map((item: any) => item.path);
    if (openMenu.indexOf(latestOpenKey) === -1) {
      setIsOpen(keys);
    } else {
      setIsOpen(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  function add(obj: any) {
    setPanes((data: any) => {
      data.push({ title: obj.title, key: obj.key });
      return [...data];
    });

    setActiveKey(() => {
      return obj.key;
    });
  }
  function remove(targetKey: any) {
    console.log(targetKey);

    let lastIndex = 0;
    let activeKeyStr = "";
    panes.forEach((pane: { key: any }, i: number) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const arr = panes.filter((pane: { key: any }) => pane.key !== targetKey);
    if (panes.length && activeKey === targetKey) {
      if (lastIndex >= 0) {
        activeKeyStr = panes[lastIndex].key;
      } else {
        activeKeyStr = panes[0].key;
      }
    }
    if (activeKeyStr) {
      setActiveKey(activeKeyStr);
      props.history.push(activeKeyStr);
      // 如果是3级菜单的话  直接走对应的2级侧边栏高亮
      if (activeKeyStr.includes("/monitor/job-log") || activeKeyStr.includes("/system/role-auth") || activeKeyStr.includes("/system/dict-data")) {
        // 分配用户  // 字典数据  // 调度日志
        let arr = activeKeyStr.split("-") || [];
        let open = arr[0].split("/") || [];
        open.forEach((element: any, index: number) => {
          open[index] = "/" + open[index];
        });
        setIsOpen([...open]);
        setDefaultSelectedKeys(arr[0]);
      } else {
        // 如果是普通菜单直接跳转 高亮侧边栏即可
        let open = activeKeyStr.split("/") || [];
        open.forEach((element: any, index: number) => {
          open[index] = "/" + open[index];
        });
        setIsOpen([...open]);
        setDefaultSelectedKeys(activeKeyStr);
      }
    }
    setPanes((data: any) => {
      data = arr;
      return [...data];
    });
  }
  // menu 右键点击行为事件
  function onMenuContextMenuClick(tabDetail: any, index: number, tabName: string) {
    if (tabName === "刷新页面") {
      // 跳转到空白页，在模拟一下navMenu点击行为
      props.history.push("/redirect");
      onHeaderMenuChange(tabDetail.key);
      setTimeout(() => {
        props.history.push(tabDetail.key);
      }, 0);
    } else if (tabName === "关闭当前") {
      remove(tabDetail.key);
    } else if (tabName === "关闭其他") {
      // 首先是跳转到对应的当前点击的页面
      onHeaderMenuChange(tabDetail.key);
      props.history.push(tabDetail.key);
      // 清掉排除 首页和当前点击项的 所有tabNavs
      const newPanes = panes.filter((item: any) => {
        return tabDetail.key === item.key || item.key === "/index/layout";
      });
      setPanes(() => {
        return [...newPanes];
      });
    } else if (tabName === "关闭左侧") {
      // 首先是跳转到对应的当前点击的页面
      onHeaderMenuChange(tabDetail.key);
      props.history.push(tabDetail.key);
      // 清掉排除 首页 所有左侧项
      const newPanes = panes.slice(index, panes.length);
      newPanes.unshift({ title: "首页", key: "/index/layout" });
      setPanes(() => {
        return [...newPanes];
      });
    } else if (tabName === "关闭右侧") {
      // 首先是跳转到对应的当前点击的页面
      onHeaderMenuChange(tabDetail.key);
      props.history.push(tabDetail.key);
      // 清掉所有右侧项
      const newPanes = panes.slice(0, index + 1);
      setPanes(() => {
        return [...newPanes];
      });
    } else if (tabName === "全部关闭") {
      // 首先是跳转到对应的当前点击的页面
      onHeaderMenuChange("/index/layout");
      props.history.push("/index/layout");
      const newPanes = panes.slice(0, 1);
      setPanes(() => {
        return [...newPanes];
      });
    }
  }
  /**
   * @description: 退出方法
   * @param {*} void
   * @return {*}
   */
  const clickLogOut = (): void => {
    props.getLogout(props);
  };

  // navLink点击事件
  function toClickNavLink(link: any, title: any) {
    // 如果是三级菜单的点击行为
    if (link.includes("/monitor/job-log") || link.includes("/system/role-auth") || link.includes("/system/dict-data")) {
      // 分配用户  // 字典数据  // 调度日志
      let arr = link.split("-") || [];
      let open = arr[0].split("/") || [];
      open.forEach((element: any, index: number) => {
        open[index] = "/" + open[index];
      });
      // 截取的三级菜单特殊 地址
      let openLink = link.split("/") || [];
      openLink.pop();
      openLink = openLink.join("/");
      const isYes = panes.some((item: any) => {
        return item.key.includes(openLink);
      });
      if (!isYes) {
        add({ title, key: link });
      } else {
        // 找到对应的nav 进行替换
        setPanes((data: any) => {
          const index = data.findIndex((item: any) => {
            return item.key.includes(openLink);
          });
          data[index] = { title, key: link };
          return [...data];
        });
        setActiveKey(link);
      }
      setIsOpen([...open]);
      setDefaultSelectedKeys(arr[0]);
    } else {
      // 如果是正常的点击行为
      setDefaultSelectedKeys(link);
      const isYes = panes.some((item: any) => {
        return item.key === link;
      });
      if (!isYes) {
        add({ title, key: link });
      } else {
        setActiveKey(link);
      }
    }
  }
  let temporaryColor = "#1890ff";
  const config = {
    title: "主题颜色",
    icon: <BgColorsOutlined />,
    content: (
      <>
        <ReachableContext.Consumer>
          {(color) => {
            return (
              <SketchPicker
                presetColors={["#1890ff", "#25b864", "#ff6f00"]}
                color={color}
                onChange={({ hex }: any) => {
                  // 变更主题颜色 方法
                  ConfigProvider.config({
                    theme: {
                      primaryColor: hex,
                    },
                  });
                  temporaryColor = hex;
                  setColor(() => {
                    return hex;
                  });
                }}
              />
            );
          }}
        </ReachableContext.Consumer>
      </>
    ),
    onOk() {
      window.localStorage.setItem("bgColor", temporaryColor);
    },
    onCancel() {
      console.log("err");
    },
  };
  // menu 下选菜单
  const menu = (
    <Menu>
      <Menu.Item key="PersonalCenter">
        <NavLink
          onClick={() => {
            toClickNavLink("/user/profile", "个人中心");
          }}
          style={{ textDecoration: "none" }}
          to={"/user/profile"}
        >
          个人中心
        </NavLink>
      </Menu.Item>

      <Menu.Item
        key="Color"
        onClick={() => {
          modal.confirm(config);
        }}
      >
        主题颜色
      </Menu.Item>

      <Menu.Item key="LogOut" onClick={clickLogOut}>
        退出登录
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="App">
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo">
            <img src="/logopng.png" alt="" /> <span>管理系统</span>
          </div>

          <Menu theme="dark" mode="inline" openKeys={isOpen} onOpenChange={onOpenChange} selectedKeys={[...[defaultSelectedKeys]]}>
            <Menu.Item key="/index/layout" icon={<AppstoreOutlined />}>
              <NavLink
                onClick={() => {
                  toClickNavLink("/index/layout", "首页");
                }}
                style={{ textDecoration: "none" }}
                to="/index/layout"
              >
                首页
              </NavLink>
            </Menu.Item>
            {props.sidebarRoutes.map((item: any) => {
              if (!item.hidden && item.alwaysShow) {
                return (
                  <SubMenu key={item.path} title={item.meta.title} icon={<SvgIcon style={{ marginRight: "10px" }} iconClass={item.meta.icon}></SvgIcon>}>
                    {item.children &&
                      item.children.map((e: any) => {
                        if (!e.hidden) {
                          if (e.children) {
                            return (
                              <SubMenu key={"/" + e.path} title={e.meta.title}>
                                {e.children.map((i: any) => {
                                  return (
                                    <Menu.Item key={item.path + "/" + e.path + "/" + i.path}>
                                      <NavLink
                                        onClick={() => {
                                          console.log();
                                          toClickNavLink(item.path + "/" + e.path + "/" + i.path, i.meta.title);
                                        }}
                                        style={{ textDecoration: "none" }}
                                        to={item.path + "/" + e.path + "/" + i.path}
                                      >
                                        {i.meta.title}
                                      </NavLink>
                                    </Menu.Item>
                                  );
                                })}
                              </SubMenu>
                            );
                          } else {
                            return (
                              <Menu.Item key={item.path + "/" + e.path}>
                                <NavLink
                                  onClick={() => {
                                    toClickNavLink(item.path + "/" + e.path, e.meta.title);
                                  }}
                                  style={{ textDecoration: "none" }}
                                  to={item.path + "/" + e.path}
                                >
                                  {e.meta.title}
                                </NavLink>
                              </Menu.Item>
                            );
                          }
                        }
                        return null;
                      })}
                  </SubMenu>
                );
              }
              // 如果是外链
              if (!item.hidden && !item.alwaysShow) {
                return (
                  <Menu.Item key={item.path} icon={<SvgIcon style={{ marginRight: "10px" }} iconClass={item.meta.icon}></SvgIcon>}>
                    <a style={{ textDecoration: "none" }} href={item.path} target="_blank" rel="noreferrer">
                      {item.meta.title}
                    </a>
                  </Menu.Item>
                );
              }
              return null;
            })}
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            <div>
              {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: "trigger",
                onClick: toggle,
              })}
              <div className="rightheader">
                {fullScreen ? (
                  <FullscreenExitOutlined
                    onClick={() => {
                      exitFullScreen();
                    }}
                    style={{ fontSize: "24px", marginRight: "10px" }}
                  />
                ) : (
                  <FullscreenOutlined
                    onClick={() => {
                      requestFullScreen(document.body);
                    }}
                    style={{ fontSize: "24px", marginRight: "10px" }}
                  />
                )}
                <ReachableContext.Provider value={color}>
                  <Dropdown overlay={menu} placement="bottomCenter" arrow trigger={["click"]}>
                    <div>
                      <Avatar key={"userInfoAvatar" + props.userInfo.avatar} shape="square" src={props.userInfo.avatar || AvatarImg} />
                      <CaretDownOutlined className="righticondown" />
                    </div>
                  </Dropdown>
                  {contextHolder}
                </ReachableContext.Provider>
              </div>
            </div>
            <HeaderScroll {...props} add={add} remove={remove} onHeaderMenuChange={onHeaderMenuChange} onMenuContextMenuClick={onMenuContextMenuClick} activeKey={activeKey} panes={panes}></HeaderScroll>
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: "12px 24px",
              padding: 24,
              minHeight: 280,
              overflowY: "auto",
            }}
          >
            <Context.Provider value={{ toClickNavLink, add }}>
              {routers.subRouters.map((v) => (
                <Route key={v.path} path={v.path} exact={v.exact} component={v.component} />
              ))}
              {props.routerMenu.map((v: any) => {
                return <Route key={v.path} path={v.path} exact={v.exact} component={v.component} />;
              })}
            </Context.Provider>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}
const mapDispatchToProps = (dispatch: any) => bindActionCreators(actions, dispatch);
export default connect(
  (state: any) => state,
  (dispatch: any) => mapDispatchToProps
)(App);
