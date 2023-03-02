import { api } from './api';
import { CreateMockRequest, CreateMockResponse } from '../types';
import { ProductCategories, ProductDataResponse } from '../../components/displays/product/types';

const pageSize = 10;

const productSlice = api.injectEndpoints({
	endpoints: (builder) => ({
		createMockup: builder.mutation<CreateMockResponse, CreateMockRequest>({
			query(body) {
				return {
					url: `product/mock`,
					method: 'POST',
					body
				}
			},
		}),
		createOrder: builder.mutation<string, string>({
			query(body) {
				return {
					url: `product/order/create`,
					method: 'POST',
					body
				}
			},
		}),
		getAvailableProducts: builder.query<ProductCategories[], void>({
			query: () => '/product/available'
		}),
		getProductData: builder.query<ProductDataResponse, string>({
			query: (productId) => `/product/data/${productId}`
		}),
		getWallArtProductsData: builder.query<ProductDataResponse[], void>({
			query: () => `/product/data/wall-art`
		}),
	}),
	overrideExisting: false
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { 
	useCreateMockupMutation,
	useCreateOrderMutation,
	useGetAvailableProductsQuery,
	useGetProductDataQuery,
	useGetWallArtProductsDataQuery,
} = productSlice
