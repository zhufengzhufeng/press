import Vue from 'vue'
import App from './App.vue'

import zhuUi from  './packages';
Vue.use(zhuUi)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
