/*
 * @Author: zero-ven
 * @Date: 2021-11-18 10:46:48
 * @LastEditTime: 2021-11-18 14:18:27
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /use-hooks/src/utils/loadable.ts
 */
import Loadable from "react-loadable";

const loadable = (url: any) => {
  return Loadable({
    loader: () => import(/* @vite-ignore */`views/${url}`),
    loading() {
      // TODO 正在加载...
      return <div>.</div>;
    },
  });
};

export default loadable;
