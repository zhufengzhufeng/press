import Vue from 'vue'
import App from './App.vue'

import zhuUi from './packages';
Vue.use(zhuUi)
// Vue.config.productionTip = false

import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(Element)
new Vue({
  render: h => h(App),
}).$mount('#app')