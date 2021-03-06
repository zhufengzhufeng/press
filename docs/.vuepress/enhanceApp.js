import Vue from 'vue';
import hljs from 'highlight.js'
import 'highlight.js/styles/googlecode.css' //样式文件
import 'zhu-ui/dist/zhu-ui.css'

Vue.directive('highlight',function (el) {
  let blocks = el.querySelectorAll('pre code');
  blocks.forEach((block)=>{
    hljs.highlightBlock(block)
  })
})
let lazy = true;
Vue.mixin({
  mounted(){
    if(lazy){
      import('zhu-ui').then(module=>{
        Vue.use(module.default)
      });
      lazy = !lazy;
    }
  }
})
export default ({
  Vue,

}) => {
}