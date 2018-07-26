module.exports = [
  {
    path: 'pages/home/index',
    config: {
      enablePullDownRefresh: true,
      navigationBarTitleText: '首页'
    }
  },
  {
    path: 'pages/profile/index',
    config: {
      enablePullDownRefresh: true,
      navigationBarTitleText: '其他'
    }
  },
  {
    path: 'pages/other/index',
    config: {
      enablePullDownRefresh: true,
      navigationBarTitleText: '我的'
    }
  },
  {
    path: 'pages/index/index',
    config: {
      navigationBarTitleText: '文章详情'
    }
  },
  {
    path: 'pages/counter/index',
    config: {
      navigationBarTitleText: '评论列表'
    }
  },
  {
    path: 'pages/logs/index',
    subPackage: true,
    root: 'pages/logs/',
    config: {
      navigationBarTitleText: '日志'
    }
  },
  {
    path: 'pages/activity/index',
    subPackage: true,
    root: 'pages/activity/',
    config: {
      navigationBarTitleText: '活动页面'
    }
  }
]
