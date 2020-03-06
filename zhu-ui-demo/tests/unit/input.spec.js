import { shallowMount } from '@vue/test-utils'
import Input from '@/packages/input.vue';
import {expect} from 'chai';
import Icon from '@/packages/icon.vue'
describe('input.vue', () => {
  it('1.测试输入框是否是双向绑定的', () => {
    let wrapper = shallowMount(Input,{
        attachToDocument:true,
        stubs: {
          'zh-icon': Icon
        },
        propsData:{
            value:'hello'
        }
    })
    let input = wrapper.vm.$el.querySelector('input')
    expect(input.value).to.eq('hello');
    wrapper.find('input').setValue('world');
    return wrapper.vm.$nextTick().then(()=>{
        expect(wrapper.emitted().input.length).to.eq(1)
    })
  })

  it('2.测试disable属性',()=>{
    let wrapper = shallowMount(Input,{
        propsData:{
            disabled:false
        }
    })
    expect(wrapper.find('input').attributes('disabled')).not.exist
    wrapper.setProps({disabled:true});
    return wrapper.vm.$nextTick().then(()=>{
        expect(wrapper.find('input').attributes('disabled')).to.eq('disabled');
    })
  })

  it('3.测试清空框是否符合预期',()=>{
    let wrapper = shallowMount(Input,{
        stubs: {
          'zh-icon': Icon
        },
        attachToDocument:true,
        propsData:{
            clearable:false,
            value:'hello'
        }
    })
    expect(wrapper.find('use').exists()).to.false;
    wrapper.setProps({clearable:true});
    return wrapper.vm.$nextTick().then(()=>{
        expect(wrapper.find('use').attributes('href')).to.eq('#icon-qingkong');
        wrapper.find('svg').trigger('click');
        expect(wrapper.emitted().input.length).to.eq(1);
    })
  })    

  it('4.切换输入框type类型是否ok',(done)=>{
    let wrapper = shallowMount(Input,{
      attachToDocument:true,
      stubs: {
        'zh-icon': Icon
      },
        propsData:{
            showPassword:false,
            value:'hello'
        }
    })
    expect(wrapper.find('use').exists()).to.false
    wrapper.setProps({showPassword:true});
    wrapper.vm.$nextTick().then(()=>{
      expect(wrapper.find('svg').exists()).to.be.true;
      let input = wrapper.vm.$el.querySelector('input');
      expect(input.type).to.eq('password')
      wrapper.find('svg').trigger('click');
      input = wrapper.vm.$el.querySelector('input');
      setTimeout(() => {
           expect(input.type).to.eq('text');
           done();
      }, 0);
    })
  })
  it('5.测试输入框的组件的事件是否ok',()=>{
    let wrapper = shallowMount(Input);
      ['focus','blur','change','input'].forEach(method=>{
        wrapper.find('input').trigger(method);
        expect(wrapper.emitted()[method].length).to.eq(1)
      });
  })

  it('6.测试name属性',()=>{
    let wrapper = shallowMount(Input,{
        propsData:{
            name:'password'
        }
    });
    expect(wrapper.find('input').attributes('name')).to.eq('password')
  })
})
