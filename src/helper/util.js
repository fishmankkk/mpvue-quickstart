const formatTime = (date, fmt) => {
 
  if (!date) return ''
  if (typeof date === 'number') {
    date = new Date(date)
  }
  var o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (var k in o) { if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length))); }

  return fmt
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
/**
 * 验证wechat号码
 */

const validateWechat = n => {
  // var wxreg = /^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$/;
  // return wxreg.test(n);
  return true
}

/*获取当前页url */
function getCurrentPageUrl() {
  var pages = getCurrentPages()    // 获取加载的页面
  var currentPage = pages[pages.length - 1]    // 获取当前页面的对象
  var url = currentPage.route    // 当前页面url
  return url
}

/*获取当前页带参数的url */
function getCurrentPageUrlWithArgs() {
  var app = getApp()
  var pages = getCurrentPages()    // 获取加载的页面
  var currentPage = pages[pages.length - 1]    // 获取当前页面的对象
  var url = currentPage.route    // 当前页面url
  var options = currentPage.options    // 如果要获取url中所带的参数可以查看options

  if (!options.siteId) {
    options.siteId = app.globalData.siteId
  }
  // 拼接url的参数
  var urlWithArgs = url + '?'
  for (var key in options) {
    var value = options[key]
    urlWithArgs += key + '=' + value + '&'
  }
  urlWithArgs = urlWithArgs.substring(0, urlWithArgs.length - 1)

  return urlWithArgs
}

/**
 * 只保留中文英文数字, 删除字符
 */
function removeCharacter(str) {
  return str.replace(/[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?|\？|\，|\！|\。]/g, '')
}

function parseUrlToArgs(url) {
  var args = {};
  if(url){
    url = decodeURIComponent(url);
    var qs = url.substring(url.lastIndexOf("?") + 1);
    var items = qs.length > 0 ? qs.split('&') : [];
    var item = null;
    var name = null;
    var value = null;
    for (var i = 0; i < items.length; i++) {
      item = items[i].split("=");
      //用decodeURIComponent()分别解码name 和value（因为查询字符串应该是被编码过的）。
      name = decodeURIComponent(item[0]);
      value = name === 'paramSkynet' ? item[1] : decodeURIComponent(item[1]);
      if (name.length) {
        args[name] = value;
      }
    }
  }

  return args;
}

function createComparionFun(propertyName) {
  return function (object1, object2) {
    var value1 = object1[propertyName]
    var value2 = object2[propertyName]
    if (value1 < value2) {
      return -1
    } else if (value1 > value2) {
      return 1
    } else {
      return 0
    }
  }
}


 
function getCorrectResult(type, num1, num2, result) {
  var temp_result = 0;
  switch (type) {
      case "add":
          temp_result = num1 + num2;
          break;
      case "sub":
          temp_result = num1 - num2;
          break;
      case "div":
          temp_result = num1 / num2;
          break;
      case "mul":
          temp_result = num1 * num2;
          break;
  }
  if (Math.abs(result - temp_result) > 1) {
      return temp_result;
  }
  return result;
}

function countDecimals(num) {
    var len = 0;
    try {
        num = Number(num);
        var str = num.toString().toUpperCase();
        if (str.split('E').length === 2) { // scientific notation
            var isDecimal = false;
            if (str.split('.').length === 2) {
                str = str.split('.')[1];
                if (parseInt(str.split('E')[0]) !== 0) {
                    isDecimal = true;
                }
            }
            let x = str.split('E');
            if (isDecimal) {
                len = x[0].length;
            }
            len -= parseInt(x[1]);
        } else if (str.split('.').length === 2) { // decimal
            if (parseInt(str.split('.')[1]) !== 0) {
                len = str.split('.')[1].length;
            }
        }
    } catch(e) {
        throw e;
    } finally {
        if (isNaN(len) || len < 0) {
            len = 0;
        }
        return len;
    }
};

function convertToInt(num) {
  num = Number(num);
  var newNum = num;
  var times = countDecimals(num);
  var temp_num = num.toString().toUpperCase();
  if (temp_num.split('E').length === 2) {
      newNum = Math.round(num * Math.pow(10, times));
  } else {
      newNum = Number(temp_num.replace(".", ""));
  }
  return newNum;
};


function accMul(num1, num2) {
  num1 = Number(num1);
  num2 = Number(num2);
  var times = 0, s1 = num1.toString(), s2 = num2.toString();
  try { times += countDecimals(s1); } catch (e) { }
  try { times += countDecimals(s2); } catch (e) { }
  var result = convertToInt(s1) * convertToInt(s2) / Math.pow(10, times);

  let res = getCorrectResult("mul", num1, num2, result);
  // res = res.replace(/([0-9]+.[0-9]{2})[0-9]*/, '$1')
  return res
  
  // return result;
}

// const qrCodeUrl = 'http://static.sunlands.com/wechat-management/gzmp/mplive'
// const ASSETS_PREFIX = 'https://static.sunlands.com/wechat-management/prod/openCourse'
export default {
  formatTime,
  formatNumber,
  getCurrentPageUrl,
  getCurrentPageUrlWithArgs,
  removeCharacter,
  parseUrlToArgs,
  // qrCodeUrl,
  // ASSETS_PREFIX,
  createComparionFun,
  accMul
}
