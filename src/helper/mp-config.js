export default Object.assign({}, {
  path: 'http://127.0.0.1:8089/api', // mockjs
  codeVersion: '2.3.1.9', // 代码版本 用于审核
}, process.env.NODE_ENV === 'production' ? {
  path: 'http://127.0.0.1:8089/api'
} : {})
