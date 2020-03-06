import {
    shallowMount
} from '@vue/test-utils';
import {
    expect
} from 'chai'
import Button from '@/packages/button/button.vue'
import Icon from '@/packages/icon'

describe('button.vue', () => {
    it('1.测试slot是否能正常显示', () => {
        const wrapper = shallowMount(Button, {
            slots: {
                default: 'zhu-ui'
            }
        })
        expect(wrapper.text()).to.equal('zhu-ui')
    })

    it('2.测试传入icon属性', () => {
        const wrapper = shallowMount(Button, {
            stubs: {
                'zh-icon': Icon
            },
            propsData: {
                icon: 'edit' // 传入的是edit 测试一下 edit是否ok
            }
        })
        expect(wrapper.find('use').attributes('href')).to.equal('#icon-edit')
    })

    it('3.测试传入loading,是否能，控制loading属性', () => {
        const wrapper = shallowMount(Button, {
            stubs: {
                'zh-icon': Icon
            },
            propsData: {
                loading: true // 传入的是edit 测试一下 edit是否ok
            }
        })
        expect(wrapper.find('use').attributes('href')).to.eq('#icon-loading');
        expect(wrapper.find('button').attributes('disabled')).to.eq('disabled');
    })
    it('4.测试点击按钮', () => {
        const wrapper = shallowMount(Button, {
            stubs: ['zh-icon']
        })
        wrapper.find('button').trigger('click')
        expect(wrapper.emitted('click').length).to.eq(1);
    });

    // 5.测试前后图标
    it('5.测试前后图标', () => {
        const wrapper = shallowMount(Button, {
            stubs: {
                'zh-icon': Icon
            },
            slots:{
                default:'hello'
            },
            attachToDocument: true,
            propsData: {
                iconPosition: 'left',
                icon: 'edit'
            }
        });
        let ele = wrapper.vm.$el.querySelector('span');
        expect(getComputedStyle(ele, null).order).to.eq('2');
        wrapper.setProps({
            iconPosition: 'right'
        });
        return wrapper.vm.$nextTick().then(() => {
            expect(getComputedStyle(ele, null).order).to.eq('1');
        });
    });
})