import { defineConfig } from "vite";
import path from 'path';
import react from "@vitejs/plugin-react";
import legacy from "@vitejs/plugin-legacy";
import babel from '@rollup/plugin-babel';

export default defineConfig({
  plugins: [
    react(),
    legacy({
      targets: ["ie>=10"],
    }),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      presets: [
        ['@babel/preset-env', { targets: { ie: '10' }, useBuiltIns: 'usage', corejs: 3 }],
        '@babel/preset-react'
      ],
      plugins: [
        ["@babel/plugin-proposal-class-properties", { "loose": true }]
      ]
    }),
  ],
  build: {
    target: "es5", // 设置构建目标为 ES5
    rollupOptions: {
      output: {
        format: "iife", // 使用立即执行函数表达式（IIFE）格式
      },
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          // 这里可以修改 Ant Design 的默认主题
          'primary-color': '#1DA57A',  // 示例：修改主题色
        },
        javascriptEnabled: true,  // 启用 JavaScript 支持，Ant Design 使用了 JavaScript 来动态设置样式
      },
    },
  },
  resolve: {
    alias: {
      // 如果需要，可以在这里添加别名
      '@': path.resolve(__dirname, 'src'),
      '~antd': path.resolve(__dirname, 'node_modules/antd'), // 将 `~` 映射到 `node_modules` 目录
    },
  },
  optimizeDeps: {
    exclude: ['fsevents'], // 排除 fsevents
  },
  server: {
    host: "0.0.0.0", // 或者使用 '0.0.0.0' 监听所有网络接口
    port: 3000,
  },
});
