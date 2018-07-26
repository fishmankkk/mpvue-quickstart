# mpvue-quickstart

> mpvue-quickstart

## 目录

├── /dist/                # 项目输出目录
├── /mocks/               # 模拟数据
├── /static/              # 静态文件
├── /src/                 # 项目源码目录
│ ├── /components/        # 组件
│ ├── /help/              # 其他相关配置
│ ├── /pages/             # 页面
│ │ ├── home              # 主页
## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# mock serve with hot reload at localhost:8089
npm run mock
```

## 开发须知

开发框架  MPVUE

页面引入方式: 分别在src/main.js、src/pages.js中引入页面。

src/pages.js
普通页面引入方式eg:
``` bash
  {
    path: 'pages/home/index',
    config: {
      enablePullDownRefresh: true,
      navigationBarTitleText: '首页'
    }
  },
```

分包页面引入方式eg:
``` bash
  {
    path: 'pages/activity/index',
    subPackage: true,
    root: 'pages/activity/',
    config: {
      navigationBarTitleText: '活动页面'
    }
  }
```
