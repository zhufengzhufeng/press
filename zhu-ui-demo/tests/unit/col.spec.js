import {
    shallowMount,
    mount
} from '@vue/test-utils'
import Col from '@/packages/layout/col.vue';
import {
    expect
} from 'chai';
describe('col.vue', () => {
    it('1.测试span', () => {
        let wrapper = shallowMount(Col, {
            attachToDocument: true,
            propsData: {
                span: 2
            }
        });
        expect(wrapper.classes('zh-col-2')).to.true
    });
    it('2.测试offset属性', () => {
        let wrapper = shallowMount(Col, {
            attachToDocument: true,
            propsData: {
                offset: 3
            }
        });
        expect(wrapper.classes('zh-col-offset-3')).to.true
    });
    it('3.测试xs,sm,md,lg,xl属性', () => {
        let wrapper = shallowMount(Col, {
            attachToDocument: true,
            propsData: {
                xs: 3,
                sm: 4,
                md: 5,
                lg: 6,
                xl: 12
            }
        });
        expect(wrapper.classes('zh-col-res-xs-3')).to.true;
        expect(wrapper.classes('zh-col-res-sm-4')).to.true
        expect(wrapper.classes('zh-col-res-md-5')).to.true
        expect(wrapper.classes('zh-col-res-lg-6')).to.true
        expect(wrapper.classes('zh-col-res-xl-12')).to.true
    });
});