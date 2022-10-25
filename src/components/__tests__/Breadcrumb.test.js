import { mount } from '@vue/test-utils'
import Breadcrumb from '@/components/essentials/components/Breadcrumb.vue'

describe('Breadcrumb.vue', () => {
    const wrapper = mount(Breadcrumb, {
        props: {
            paths: [
                {
                    "uid": 'category',
                    "name": 'Category',
                    "url_key": 'category'
                }, {
                    "uid": 'subcategory',
                    "name": 'Subcategory',
                    "url_key": 'subcategory'
                }
            ]
        },
        global: {
            stubs: ["router-link"],
        }
    })

    const liArr = wrapper.findAll('li')
    const routerArr = wrapper.findAll('router-link-stub')

    test('Home link is present as a first item and is clickable', () => {
        expect(routerArr[0].attributes('to')).toBe('/home')
        expect(liArr[0].html()).toContain(routerArr[0].html())
    })

    test('Links are shown properly', () => {
        expect(liArr).toHaveLength(wrapper.props('paths').length + 1)
        expect(routerArr).toHaveLength(wrapper.props('paths').length)
    })

    test('Last link is not clickable', () => {
        expect(liArr.at(-1).html()).not.toContain('router-link')
        expect(wrapper.get('span').text()).toBe(wrapper.props('paths').at(-1).name)
    })
})