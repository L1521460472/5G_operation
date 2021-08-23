

//设置cookie,按时间
function setCookie(key, value, iDay) {
  var oDate = new Date();
  oDate.setTime(oDate.getTime() + iDay * 24 * 60 * 60 * 1000); //设置过期时间,getTime()设置时间
  document.cookie = key + "=" + value + ";expires=" + oDate.toGMTString();
}

//获取指定的key的cookie值
function getCookie(key) {
  var arr = document.cookie.split(";"); //获取当前域名的所有cookie，以;分割成数组。
  for (var i = 0; i < arr.length; i++) {
    var brr = arr[i].split("=");
    if (brr[0].trim() == key) {
      return brr[1];
    }
  }
  return ""; //没有找到返回值
}

//移除cookie
function removeCookie(key) {
  setCookie(key, 1, -1);
}

// 账号正则校验（账号构成英文小写字母、数字或特殊字符构成）
function regexpAccount(value) {
  // let reg =  /^[0-9a-z]*$/g
  // let reg = /^(?![0-9]+$)(?![a-z]+$)[0-9a-z]{6,20}$/
  let reg  =  /^[^\u4e00-\u9fa5]*$/
  return reg.test(value)
}


// 密码正则校验（有数字和字母组成）
function regexpPassword(value) {
  let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/
  return reg.test(value)
}

// 账号名字正则校验（中文或字母组成）
function regexpName(value) {
  let reg = /^[\u4e00-\u9fa5a-zA-Z]{1,12}$/
  return reg.test(value)
}

// 联系电话验证
function regexpMobile(value) {
  let reg = /^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$|(^134\d{4})|((13[0-3|5-9]|14[1|5-9]|15[0-9]|16[2|5|6|7]|17[0-8]|18[0-9]|19[0-2|5-9])\d{8}$)/
  return reg.test(value)
}

//验证是否拥有菜单权限
function permissionMenuList(menuList, path) {
  let isPermission = false
  menuList.map(item => {
    if (item.url == path) {
      isPermission = true
      return
    }
    item.children.map(item2 => {
      if (item2.url == path) {
        isPermission = true
        return
      }
      item2.children.map(item3 => {
        if (item3.url == path) {
          isPermission = true
          return
        }
      })
    })
  })
  return isPermission
}

//获取页面拥有的按钮列表
function getButtonList(menuList, path) {
  let arr = []
  menuList.map(item => {
    if (item.url == path) {
      arr = item.children
      return
    }
    item.children.map(item2 => {
      if (item2.url == path) {
        arr=item2.children
        return
      }
    })
  })
  return arr
}
// 防抖函数
function debounce(fn, delay) {
  let timer = null;
  return function () {
    let context = this;   
    let args = arguments;
    clearTimeout(timer);  //清除定时器
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  }
}
// 下载附件
function download(url,fileName) {
  var x = new XMLHttpRequest();
  x.open("GET",`${url}`, true);
  x.responseType = 'blob';
  x.onload=function(e) {
    var url = window.URL.createObjectURL(x.response)
    var a = document.createElement('a');
    a.href = url
    a.download = fileName;
    a.click()
  }
  x.send(null);
}
//验证白名单格式
function whitePhone(value){
  // 不区分中英文逗号
  let mobileWhiteList = value.replace(/[\uff0c]/g,",")
  // 字符串以逗号分开
  mobileWhiteList = mobileWhiteList.split(',').filter(item => {
    if (item != '' || item != null) {
      return item
    }
  })
  // 验证元素是否全为合格手机号码
  let result = mobileWhiteList.every(item => {
    return (/^1[3|4|5|6|7|8|9][0-9]{9}$/.test(item))
  })
  return result
}
// 时间大小比较
function comparisonTime(date1,date2){
  var oDate1 = new Date(date1);
  var oDate2 = new Date(date2);
  if(oDate1.getTime() > oDate2.getTime()){
    return false
  } else {
    return true
  }
}

// 价格保留四位小数，不足自动补全 
function toFixedRrice(value){
  var xsd=value.toString().split(".");
  if(xsd.length == 1){
    return (value.toString()+'.0000')
  }else if(xsd.length > 1){
    if(xsd[1].length == 1) return (value.toString()+'000')
    if(xsd[1].length == 2) return (value.toString()+'00')
    if(xsd[1].length == 3) return (value.toString()+'0')
    if(xsd[1].length == 4) return (value.toString())
  }
}

module.exports = {
  setCookie,
  getCookie,
  removeCookie,
  regexpAccount,
  regexpPassword,
  regexpName,
  regexpMobile,
  permissionMenuList,
  getButtonList,
  debounce,
  download,
  whitePhone,
  comparisonTime,
  toFixedRrice
}
