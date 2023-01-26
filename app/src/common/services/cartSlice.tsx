import { CartItem, CartItemId } from '../../components/displays/checkout/type';
import { api } from './api';

const cartSlice = api.injectEndpoints({
	endpoints: (builder) => ({
    findCart: builder.query<CartItem[], string | null>({
      query: (cartId) => `cart/find/${cartId}`
    }),

		findCartItem: builder.query<CartItem, number>({
      query: (itemId) => `find/item/${itemId}`
    }),
    createCartItem: builder.mutation<CartItem[], CartItem>({
			query(body) {
        return {
          url: '/cart/create/item',
          method: 'POST',
          body,
				}
      },
    }),
    updateCartItem: builder.mutation<CartItem, CartItem>({
      query(body) {
        return {
          url: '/cart/update/item',
          method: 'POST',
          body,
        }
      },
    }),
		//deleteCart: builder.query<CartItem[], string>({
		//	query: (cartId) => `cart/delete/${cartId}`
    //}),  
    deleteCartItem: builder.mutation<null, CartItemId>({
			query(body) {
        return {
          url: 'cart/delete/item/',
          method: 'POST',
					contentType: "application/json; charset=utf-8",
          body,
        }
      },
    }),
  }),
  overrideExisting: false
})

export const {
  useFindCartQuery,
  useFindCartItemQuery,
  useCreateCartItemMutation,
  useUpdateCartItemMutation,
  //useDeleteCartQuery,
	useDeleteCartItemMutation,
} = cartSlice
