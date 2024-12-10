/*
 * @Author: zero_ven
 * @Date: 2024-10-11 16:25:10
 * @LastEditTime: 2024-11-23 11:33:48
 * 
 * @Description: 
 * @FilePath: /use-hooks/src/reducers/reducer.js
 */

const defaultState = {
  number: 0,
  sidebarRoutes: [],
  rewriteRoutes: [],
  routerMenu: [],
  userInfo: JSON.parse(window.localStorage.getItem("ruoyi_user") as any) || {},
};
const reducer = (state = { ...defaultState }, action: any) => {
  switch (action.type) {
    case "ADD":
      return { ...state, number: (state.number += action.number) };
    case "DEL":
      return { ...state, number: (state.number -= action.number) };
    case "MENU":
      return { ...state, sidebarRoutes: action.sidebarRoutes, rewriteRoutes: action.rewriteRoutes, routerMenu: action.routerMenu };
    case "USERINFO":
      return { ...state, userInfo: action.userInfo };
    default:
      return state;
  }
};

export default reducer;
