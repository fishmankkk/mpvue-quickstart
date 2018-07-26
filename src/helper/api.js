import mpConfig from '@/helper/mp-config'

const path = mpConfig.path
const codeVersion = mpConfig.codeVersion

const projectId = 10
function _fetch (url, params, config = {}) {
  console.log('fetch请求发起', url, params)
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${path}/${url}`,
      data: {
        data: params
      },
      method: 'GET',
      header: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    }).then(({ data }) => {
      console.log('fetch请求返回', url, params, data)
      if (data.result === 10000) {
        resolve(data.data)
      } else {
        reject(data)
      }
    })
  })
}

function _post (url, params, config = {}) {
  console.log('post请求发起', url, params)
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${path}/${url}`,
      data: {
        data: JSON.stringify(params)
      },
      method: 'POST',
      header: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    }).then(({ data }) => {
      console.log('post请求返回', url, params, data)
      if (data.result === 10000) {
        resolve(data.data)
      } else {
        reject(data)
      }
    })
  })
}

function fetch (url, params, config) {
  return _fetch(url, {
    ...params,
    projectId,
    codeVersion
  }, config)
}
function post (url, params, config) {
  return _post(url, {
    ...params,
    projectId,
    codeVersion
  }, config)
}
// function fetch (url, params, config) {
//   return Promise.all([getProjectIdPromise(), getOpenIdOnlyPromise()]).then((result) => {
//     const [projectId, { openid }] = result
//     return getGetCustomerPromise().then(() => {
//       return _fetch(url, {
//         ...params,
//         projectId,
//         openId: openid,
//         codeVersion
//       }, config)
//     })
//   })
// }

// function post (url, params, config) {
//   return Promise.all([getProjectIdPromise(), getOpenIdOnlyPromise()]).then((result) => {
//     const [projectId, { openid }] = result
//     return getGetCustomerPromise().then(() => {
//       return _post(url, {
//         ...params,
//         projectId,
//         openId: openid,
//         codeVersion
//       }, config)
//     })
//   })
// }

export default {
  fetch,
  post
}
