import {
    shallowMount,
    mount
} from '@vue/test-utils'
import Row from '@/packages/layout/row.vue';
import Col from '@/packages/layout/col.vue';
import {
    expect
} from 'chai';
describe('row.vue', () => {
    it('1.测试gutter', () => {
        let wrapper = shallowMount(Row, {
            attachToDocument: true,
            stubs: {
                'zh-col': Col
            },
            slots: {
                default: `<zh-col></zh-col>`
            },
            propsData: {
                gutter: 20
            }
        })
        expect(getComputedStyle(wrapper.vm.$el).marginLeft).to.eq('-10px');
        expect(getComputedStyle(wrapper.vm.$el).marginRight).to.eq('-10px');


        return wrapper.vm.$nextTick().then(() => {
            let col = wrapper.vm.$el.querySelector('.zh-col');
            expect(getComputedStyle(col).paddingLeft).to.eq('10px');
            expect(getComputedStyle(col).paddingRight).to.eq('10px');
        })
    });
    it('2.测试justify属性',async ()=>{
        let wrapper = shallowMount(Row, {
            attachToDocument: true,
            stubs: {
                'zh-col': Col
            },
            slots: {
                default: `<zh-col></zh-col>`
            },
            propsData: {
                justify: 'start'
            }
        });
        wrapper.setProps({justify:'center'});
        await wrapper.vm.$nextTick();
        expect(getComputedStyle(wrapper.vm.$el).justifyContent).to.eq('center');
        wrapper.setProps({justify:'start'});
        await wrapper.vm.$nextTick();
        expect(getComputedStyle(wrapper.vm.$el).justifyContent).to.eq('flex-start');
        wrapper.setProps({justify:'end'});
        await wrapper.vm.$nextTick();
        expect(getComputedStyle(wrapper.vm.$el).justifyContent).to.eq('flex-end');
    })
})