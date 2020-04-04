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

import Upload from './upload/upload.vue'
import Progress from './progress.vue';
import DatePicker from './date-picker/date-picker';
import DateRangePicker from './date-picker/date-range-picker';
import InfiniteScroll from './infiniteScroll'
import Popover from './popover';
import Carousel from './carousel/carousel';
import CarouselItem from './carousel/carousel-item';
const install = (Vue) => {
    Vue.component(Button.name, Button);
    Vue.component(Icon.name, Icon);
    Vue.component(ButtonGroup.name, ButtonGroup);
    Vue.component(Row.name, Row);
    Vue.component(Col.name, Col);
    Vue.component(Container.name, Container);
    Vue.component(Main.name, Main);
    Vue.component(Aside.name, Aside);
    Vue.component(Header.name, Header);
    Vue.component(Footer.name, Footer);
    Vue.component(Input.name, Input);
    Vue.component(Switch.name, Switch);
    Vue.component(Upload.name, Upload);
    Vue.component(Progress.name, Progress);
    Vue.component(DatePicker.name, DatePicker)
    Vue.component(DateRangePicker.name, DateRangePicker)
    Vue.component(Popover.name, Popover);
    Vue.directive(InfiniteScroll.name, InfiniteScroll)
    Vue.component(Carousel.name,Carousel);
    Vue.component(CarouselItem.name,CarouselItem)
}
if (typeof window.Vue !== 'undefined') {
    install(Vue);
}
export default {
    install
}