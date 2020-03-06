import {
    shallowMount,
    mount
} from '@vue/test-utils'
import Switch from '@/packages/switch'
import {
    expect
} from 'chai';
describe('row.vue', () => {
    it('1.测试switch组件能否双向绑定', async () => {
        let wrapper = shallowMount(Switch,{
            attachToDocument:true,
            propsData:{
                value:true
            }
        });
        expect(wrapper.find('.zh-switch').classes()).to.contain('is-checked');
        wrapper.vm.$on('input',(value)=>{
            wrapper.setProps({value})
        });
        wrapper.trigger('click');
        await wrapper.vm.$nextTick();
        expect(wrapper.find('.zh-switch').classes()).not.to.contain('is-checked');
    });

    it('2.测试传入的颜色是否正常',async ()=>{
        let wrapper = shallowMount(Switch,{
            propsData:{
                value:true,
                "active-color":"red",
                "inactive-color":"green"
            }
        });
        let core =wrapper.vm.$el.querySelector('.zh-switch-core')
        expect(core.style['borderColor']).to.eq('red')
        expect(core.style['backgroundColor']).to.eq('red');

        wrapper.vm.$on('input',(value)=>{
            wrapper.setProps({value})
        });
        wrapper.trigger('click');
        await wrapper.vm.$nextTick();
        expect(core.style['borderColor']).to.eq('green')
        expect(core.style['backgroundColor']).to.eq('green');
    });
    it('3.测试disabled属性是否正常',()=>{
        let wrapper = shallowMount(Switch,{
            propsData:{
                disabled:true
            }
        });
        expect(wrapper.find('input').attributes('disabled')).to.eq('disabled')
        expect(wrapper.classes('is-disabled')).to.true;
    });
})