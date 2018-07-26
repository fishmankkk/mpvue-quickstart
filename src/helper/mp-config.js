export default Object.assign({}, {
  path: 'http://172.16.140.65:8040/wechat-api', // 杜建雄
  // path: 'http://127.0.0.1:8089/api', // mockjs
  codeVersion: '2.3.1.9', // 代码版本 用于审核
  reportAnalysisBaseUrl: 'https://enterapp.sunlands.com/datacenter_app/dataService' // 数据上报的地址
}, process.env.NODE_ENV === 'production' ? {
  path: 'https://wechatapi.sunlands.com/wechat-api',
  reportAnalysisBaseUrl: 'https://datacenter.sunlands.com/datacenter_app/dataService'
} : {})
