/*
 * @Author: zero_ven
 * @Date: 2024-10-11 15:25:18
 * @LastEditTime: 2024-10-11 17:37:39
 * 
 * @Description: 
 * @FilePath: /use-hooks/src/store/index.ts
 */
import {createStore,applyMiddleware} from 'redux'
import reducer from "../reducers/reducer";
import thunk from 'redux-thunk'

const store  = createStore(reducer,applyMiddleware(thunk))//创建仓库

export  default  store //暴露store