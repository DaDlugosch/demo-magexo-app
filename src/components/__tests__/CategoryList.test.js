import {mount} from '@vue/test-utils'
import axios from 'axios'
import CategoryList from '@/components/categories/CategoryList.vue'

describe('CategoryList.vue', async () => {
    const {data: { categoryList: [{children: categories}]}} = await axios.get('https://api.venia.hosts.sk/api/prd/categories/all');

    test('Show nav if categories are present', async () => {

        const wrapper = mount(CategoryList, {
            props: {
                categories: []
            },
            global: {
                stubs: ["router-link"],
            }
        });

        await wrapper.setProps({
            categories
        })
    })
})