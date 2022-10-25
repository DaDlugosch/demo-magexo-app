import {mount, config} from '@vue/test-utils'
import {VueRouterMock, createRouterMock, injectRouterMock} from 'vue-router-mock'
import axios from 'axios'
import CategoryList from '@/components/categories/CategoryList.vue'
import router from '@/router'

config.plugins.VueWrapper.install(VueRouterMock)

describe('CategoryList.vue', async () => {
    const mockRouter = createRouterMock({
        initialLocation: '/',
        routes: router.getRoutes()
    })

    let wrapper;
    const {data: {categoryList: [{children: categories}]}} = await axios.get('https://api.venia.hosts.sk/api/prd/categories/all');

    beforeEach(() => {
        injectRouterMock(mockRouter)

        wrapper = mount(CategoryList, {
            props: {
                categories,
            }
        });
    })

    afterEach(() => {
        mockRouter.reset()
    })

    test('List all categories links', () => {
        const getAllCatLength = () => {
            const catLength = wrapper.props('categories').length
            const subCatLength = () => {
                let length = 0
                for (const cat of wrapper.props('categories')) {
                    length += cat.children.length
                }
                return length
            }

            return catLength + subCatLength()
        }
        
        expect(wrapper.findAll('li')).toHaveLength(getAllCatLength())
    })

    test('All categories are clickable', () => {
        wrapper.props('categories').forEach(cat => {
            cat.children?.forEach(child => {
                expect(wrapper.get(`router-link-stub[to="/${cat.url_key}/${child.url_key}"]`)).toBeDefined()
            })
            expect(wrapper.get(`router-link-stub[to="/${cat.url_key}"]`)).toBeDefined()
        })
    })

    test('Set color on parent category link if on category page', async () => {
        const firstCatUrl = wrapper.props('categories')[0]?.url_key
        expect(firstCatUrl).toBeDefined()

        await wrapper.router.push(firstCatUrl)

        expect(wrapper.get('router-link-stub').classes()).toContain('active')
    })

    test('Set color on parent and child category link if on subcategory page', async () => {
        const allRouterLinks = wrapper.findAll('router-link-stub')
        const catWithSubCats = wrapper.props('categories').find(cat => cat.children.length > 0)

        expect(allRouterLinks).not.toHaveLength(0)
        expect(catWithSubCats).toBeDefined()

        await wrapper.router.push(catWithSubCats.url_key + '/' + catWithSubCats.children[0].url_key)

        expect(allRouterLinks[0].classes()).toContain('active')
        expect(allRouterLinks[1].classes()).toContain('active')
    })
})