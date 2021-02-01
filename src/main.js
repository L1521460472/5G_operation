// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import "babel-polyfill";
import 'element-ui/lib/theme-chalk/index.css'
import './assets/icon/iconfont.css'
import App from './App'
import router from './router'
import dayjs from 'dayjs'

Vue.config.productionTip = false
Vue.use(ElementUI)



// 控制按钮权限指令
Vue.directive('has', {
  bind: function(el, binding) {
    if(!Vue.prototype.$_has(binding.value)) {
      el.style.display = 'none'
    }
  }
})
Vue.prototype.$_has = function (value) {
  const btnList = JSON.parse(sessionStorage.getItem("btnList"))
  let isExist = false
  if (btnList.indexOf(value) > -1) {
    isExist = true
  }
  return isExist
}


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',

})
