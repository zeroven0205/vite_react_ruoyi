/*
 * @Author: zero_ven
 * @Date: 2024-10-25 14:32:35
 * @LastEditTime: 2024-10-26 15:02:33
 * 
 * @Description: 
 * @FilePath: /use-hooks/src/compoents/Editor/index.tsx
 */
import E from "wangeditor";
import { useEffect, useLayoutEffect } from "react";
import { message } from "antd";
import { uploadImage } from "../../api/global";
let editor: any = null;
let count = 0;
function Editor(props: any) {
  let { value, onChange } = props;
  useEffect(() => {
    count = 0;
    // eslint-disable-next-line
    editor = new E("#wangEditor");
    editor.config.uploadImgMaxSize = 2 * 1024 * 1024; // 上传图片大小2M
    editor.config.uploadImgServer = "/"; // 路径
    // 限制一次最多上传 1 张图片
    editor.config.uploadImgMaxLength = 1;
    editor.config.customUploadImg = function (files: (string | Blob)[], insert: (arg0: any) => void) {
      // files 是 input 中选中的文件列表
      console.log(files);
      if (files[0]) {
        const formData = new window.FormData();
        formData.append("file", files[0], "cover.jpg");
        uploadImage(formData).then((res: any) => {
          if (res.url) {
            message.success(res.msg);
            insert(res.url);
          } else {
            console.log(res.msg);
          }
        });
      } else {
        message.info("请选择要上传的图片");
      }
    };
    editor.config.menus = [
      "head", // 标题
      "bold", // 粗体
      "fontSize", // 字号
      "fontName", // 字体
      "italic", // 斜体
      "underline", // 下划线
      "strikeThrough", // 删除线
      "foreColor", // 文字颜色
      "backColor", // 背景颜色
      "link", // 插入链接
      "list", // 列表
      "justify", // 对齐方式
      "quote", // 引用
      "emoticon", // 表情
      "image", // 插入图片
      "table", // 表格
      "video", // 插入视频
      "code", // 插入代码
      "undo", // 撤销
      "redo", // 重复
    ];
    editor.config.lang = {
      设置标题: "Title",
      字号: "Size",
      文字颜色: "Color",
      设置列表: "List",
      有序列表: "",
      无序列表: "",
      对齐方式: "Align",
      靠左: "",
      居中: "",
      靠右: "",
      正文: "p",
      链接文字: "link text",
      链接: "link",
      上传图片: "Upload",
      网络图片: "Web",
      图片link: "image url",
      插入视频: "Video",
      格式如: "format",
      上传: "Upload",
      创建: "init",
    };
    editor.config.onchange = (newHtml: any) => {
      // 监听变更 value 值
      onChange(newHtml);
    };
    /**一定要创建 */
    editor.create();
    setTimeout(() => {
      editor.txt.html(value);
    }, 1000);

    return () => {
      // 组件销毁时销毁编辑器  注：class写法需要在componentWillUnmount中调用
      editor.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    // 相当于默认值
    count++;
    if (editor && count <= 2 && value !== undefined) {
      editor.txt.html(value);
    }
  }, [value]);

  return (
    <div>
      <div id="wangEditor"></div>
    </div>
  );
}

export default Editor;
