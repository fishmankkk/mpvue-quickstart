/**
 * 获取配置信息
 * @url common/getConfig
 */
module.exports = function () {
  return {
    result: 10000,
    msg: 'ok',
    data: {
      appName: '公开课小程序',
      groupToken: '@id',
      appId: '@id',
      eventId: '@id',
      appImage: '@image("750x600")',
      isAuditing: false
    }
  }
}
