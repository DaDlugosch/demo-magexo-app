import {mount} from '@vue/test-utils'
import App from '@/App.vue'

describe('App.vue', () => {
    const wrapper = mount(App)

    test('Logo is visible on page', () => {
        expect(wrapper.get('svg').isVisible()).toBe(true)
    })

    test('Logo is pointing to homepage', () => {
        expect(wrapper.get('router-link').html()).toContain('svg')
        expect(wrapper.get('router-link').attributes('to')).toBe('/')
    })
})