import throttle from 'lodash/throttle'
const getScrollContainer = (el)=>{
    let parent = el;
    while(parent){
        if(document.documentElement == parent){
            return window;
        }
        const overflow = getComputedStyle(parent)['overflow-y'];
        if(overflow.match(/scroll|auto/)){
            return parent;
        }
        parent = parent.parentNode;
    }
    return parent;
}
const attributes = {
    delay:{
        default:200
    },
    immediate:{
        default:true
    },
    disabled:{
        default:false
    },
    distance:{
        default:10
    }
}
const getScrollOptions = (el,vm)=>{
    return Object.entries(attributes).reduce((map,[key,option])=>{
        let defaultValue = option.default;
        let value = el.getAttribute(`infinite-scroll-${key}`);
        value = vm[value] ? vm[value]:defaultValue;
        map[key] = value;
        return map;
    },{})
}
const handleScroll =function (cb){
    let {
        el,container,vm,observer
    } = this.scope;
    // 填满容器
    const {distance,disabled} = getScrollOptions(el,vm);
    if(disabled) return ;

    let client = container.getBoundingClientRect();
    const scrollBottom = container.scrollTop + container.clientHeight;
    if(container.scrollHeight - scrollBottom <= distance){
        cb();
    }else if(observer){
        observer.disconnect();
        this.scope.observer = null;
    }
}
export default {
    name:'infinite-scroll',
    inserted(el,bindings,vnode){
        const cb = bindings.value;
        const vm = vnode.context;
        const container = getScrollContainer(el);
        //  有滚动盒子
        if(container !== window){
            let {delay,immediate} = getScrollOptions(el,vm);
            el['scope'] = {
                container,
                el,
                vm,
                onScroll
            }
            let onScroll = throttle(handleScroll.bind(el,cb),delay)
            container.addEventListener('scroll',onScroll);
            if(immediate){
                const observer = el.scope.observer= new MutationObserver(onScroll);
                observer.observe(container,{
                     childList:true,
                     subtree:true
                });
                onScroll();
            }

        }
    },
    unbind(el){
        const {
            container,
            onScroll
        } = el.scroll;
        if (container) {
            container.removeEventListener('scroll', onScroll)
        }
    }
}
