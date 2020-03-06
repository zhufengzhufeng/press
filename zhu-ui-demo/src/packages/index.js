import Icon from './icon.vue';
import Button from './button/button.vue';
import ButtonGroup from './button/button-group.vue';
import Row from './layout/row.vue'
import Col from './layout/col.vue';
import Container from './container/container.vue';
import Main from './container/main.vue';
import Aside from './container/aside.vue';
import Header from './container/header.vue';
import Footer from './container/footer.vue';
import Switch from './switch.vue';
import Input from './input.vue';
const install = (Vue) =>{
    Vue.component(Button.name,Button);
    Vue.component(Icon.name,Icon);
    Vue.component(ButtonGroup.name,ButtonGroup);
    Vue.component(Row.name,Row);
    Vue.component(Col.name,Col);
    Vue.component(Container.name,Container);
    Vue.component(Main.name,Main);
    Vue.component(Aside.name,Aside);
    Vue.component(Header.name,Header);
    Vue.component(Input.name,Input);
    Vue.component(Switch.name,Switch);
}
if(typeof window.Vue !== 'undefined'){
    install(Vue);
}
export default {
    install
}