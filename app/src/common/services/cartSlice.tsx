import { Cart, CartData, CartItem } from '../../components/displays/cart/type';
import { api } from './api';

export type CartItemId = {
	cartItemId: number,
}

const cartSlice = api.injectEndpoints({
	endpoints: (builder) => ({
		findCartByUserId: builder.query<Cart, number>({
      query: (userId) => `cart/find/user/${userId}`
		}),
		findCartByCartId: builder.query<Cart, string>({
      query: (cartId) => `cart/find/cart/${cartId}`
		}),
		deleteCartByCartId: builder.query<CartItem[], string>({
			query: (cartId) => `cart/delete/cart/${cartId}`
		}),
    createCartItem: builder.mutation<Cart, CartItem>({
			query(body) {
        return {
          url: '/cart/create/item',
          method: 'POST',
          body,
				}
      },
    }),
    deleteCartItem: builder.mutation<Cart, CartItemId>({
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
	useFindCartByUserIdQuery,
	useLazyFindCartByCartIdQuery,
	useDeleteCartByCartIdQuery,
  useCreateCartItemMutation,
	useDeleteCartItemMutation,
} = cartSlice
