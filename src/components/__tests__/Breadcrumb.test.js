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
            stubs: ["routerlink"],
        }
    })

    const liArr = wrapper.findAll('li')
    const routerArr = wrapper.findAll('router-link')

    test('Home link is present as a first item and is clickable', () => {
        expect(routerArr[0].attributes('to')).toBe('/home')
        expect(routerArr[0].text()).toBe('Home')
        expect(liArr[0].html().includes(routerArr[0].html())).toBe(true)
    })

    test('Links are showed properly', () => {
        expect(liArr).toHaveLength(3)
        for (const [index, li] of liArr.entries()) {
            if (index === liArr.length -1) break;
            expect(li.html()).toContain('router-link')
        }
    })

    test('Last link is not clickable', () => {
        expect(liArr.at(-1).html()).not.toContain('router-link')
        expect(wrapper.find('span').text()).toBe(wrapper.props('paths').at(-1).name)
    })
})