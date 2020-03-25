import throttle from 'lodash/throttle'
const attributes = {
    delay: { // 节流时间
        default: 20
    },
    immediate: { // 立即撑满容器 
        default: true
    },
    disabled: { // 是否禁用
        default: false
    },
    distance: { // 距离多少触发
        default: 10
    }
}
const getScrollOptions = (el, vm) => {
    return Object.entries(attributes).reduce((map, [key, option]) => {
        let defaultValue = option.default;
        // 获取属性 替换默认值
        let value = el.getAttribute(`infinite-scroll-${key}`);
        value = vm[value] ? vm[value] : defaultValue;
        map[key] = value;
        return map;
    }, {})
}

const getScrollContainer = (el) => {
    let parent = el;
    while (parent) {
        if ([document, document.documentElement].includes(parent)) {
            return window;
        }
        const overflow = getComputedStyle(parent)['overflow-y'];
        if (overflow.match(/scroll|auto/)) {
            return parent;
        }
        parent = parent.parentNode;
    }

    return parent;
}
const handleScroll = function (cb) {
    let {
        el,
        vm,
        container,
        observer
    } = this[scope];

    const {
        distance,
        disabled
    } = getScrollOptions(el, vm);


    if (disabled) return;

    let client = container.getBoundingClientRect();
    // 卷去的高度 + 容器高度
    const scrollBottom = container.scrollTop + container.clientHeight;
    //  总高- 底部高度 小于距离
    if (container.scrollHeight - scrollBottom <= distance) {
        cb();
    } else if (observer) {
        observer.disconnect();
        this[scope].observer = null;
    }

}
const scope = 'infinite-scroll'
export default {
    name: 'InfiniteScroll',
    inserted(el, bindings, vnode) {
        const cb = bindings.value; // 获取用户传入的加载函数 
        const vm = vnode.context;
        // 获取果冻容器
        const container = getScrollContainer(el);

        const {
            delay,
            immediate
        } = getScrollOptions(el, vm);

        let onScroll = throttle(handleScroll.bind(el, cb), delay);

        el[scope] = {
            el,
            vm,
            container,
            onScroll
        }

        if (container !== window) {
            container.addEventListener('scroll', onScroll);
            if (immediate) {
                const observer = el[scope].observer = new MutationObserver(onScroll);
                observer.observe(container, {
                    childList: true,
                    subtree: true
                })
                onScroll()
            }
        }
    },
    unbind(el) {
        const {
            container,
            onScroll
        } = el[scope];
        if (container) {
            container.removeEventListener('scroll', onScroll)
        }
    }
}