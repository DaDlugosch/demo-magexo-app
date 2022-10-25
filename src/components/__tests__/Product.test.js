import {mount} from '@vue/test-utils'
import Product from '@/components/products/Product.vue'

describe('Product.vue', () => {
    let wrapper

    beforeEach(() => {
        wrapper = mount(Product, {
            props: {
                product: {
                    "id": 3360,
                    "image": {
                        "url": "https://jnz3dtiuj77ca.dummycachetest.com/media/catalog/product/cache/6e1cf7b8bcbe772e1a0e2f5447e60359/v/s/vsw01-rn_main.jpg"
                    },
                    "name": "Carina Cardigan",
                    "price_range": {
                        "minimum_price": {
                            "final_price": {
                                "value": 62.4
                            }
                        },
                        "maximum_price": {
                            "final_price": {
                                "value": 62.4
                            }
                        }
                    }
                }
            }
        })
    })

    test('Display different text if product price is various', async () => {
        expect(wrapper.get('p').text()).toContain(wrapper.props('product')?.price_range?.minimum_price?.final_price?.value)

        await wrapper.setProps({
            product: {
                ...wrapper.props('product'),
                "price_range": {
                    "minimum_price": {
                        "final_price": {
                            "value": 62.4
                        }
                    },
                    "maximum_price": {
                        "final_price": {
                            "value": 65.4
                        }
                    }
                }
            }
        })

        expect(wrapper.get('p').text()).toContain(wrapper.props('product')?.price_range?.minimum_price?.final_price?.value)
        expect(wrapper.get('p').text()).toContain(wrapper.props('product')?.price_range?.maximum_price?.final_price?.value)
    })

    test('Product card displays photo, name and price', () => {
        expect(wrapper.get('img').attributes('src')).toBe(wrapper.props('product')?.image?.url)
        expect(wrapper.html()).toContain(wrapper.props('product')?.name)
        expect(wrapper.html()).toContain(wrapper.props('product')?.price_range?.minimum_price?.final_price?.value)
        expect(wrapper.html()).toContain(wrapper.props('product')?.price_range?.maximum_price?.final_price?.value)
    })
})