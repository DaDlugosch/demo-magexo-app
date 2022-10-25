import {mount, config, flushPromises} from '@vue/test-utils'
import {defineComponent} from "vue";
import {VueRouterMock, createRouterMock, injectRouterMock} from 'vue-router-mock'
import Products from '@/components/products/Products.vue'
import router from '@/router'

config.plugins.VueWrapper.install(VueRouterMock)

describe('Products.vue', () => {
    const mockRouter = createRouterMock({
        initialLocation: '/',
        routes: router.getRoutes()
    })

    let wrapper

    beforeEach(async () => {
        injectRouterMock(mockRouter)
    })

    afterEach(() => {
        mockRouter.reset()
    })

    test('If no category, show an alertbox', async () => {
        const SusComponent = defineComponent({
            components: {
                Products
            },
            template: '<Suspense><Products category=""/></Suspense>'
        })

        wrapper = mount(SusComponent)
        await flushPromises()

        expect(wrapper.classes()).toContain('alert')
    })

    test('Load products when category provided', async () => {
        const SusComponent = defineComponent({
            data() {
                return {
                    category: [{
                        "uid": "MTg=",
                        "name": "Tops",
                        "url_key": "venia-tops",
                        "children": [
                            {
                                "uid": "MjE=",
                                "name": "Blouses & Shirts",
                                "url_key": "venia-blouses"
                            },
                            {
                                "uid": "MjQ=",
                                "name": "Sweaters",
                                "url_key": "venia-sweaters"
                            }
                        ]
                    }]
                }
            },
            components: {
                Products
            },
            template: '<Suspense><Products :category="category"/></Suspense>'
        })

        wrapper = mount(SusComponent)

        await flushPromises()

        expect(wrapper.classes()).not.toContain('alert')
    })

    test('Show progress-bar while loading and hide alertbox', async () => {
        const SusComponent = defineComponent({
            components: {
                Products
            },
            template: '<Suspense><Products/></Suspense>'
        })

        wrapper = mount(SusComponent)

        await flushPromises()

        expect(wrapper.get('progress')).toBeDefined()
        expect(wrapper.classes()).not.toContain('alert')
    })
})