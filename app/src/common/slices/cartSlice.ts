import { createSlice } from '@reduxjs/toolkit';
import { Cart, CartData, CartItem } from '../../components/displays/cart/type';

interface CartState {
  cartData: CartData,
	cartItems: CartItem[]
};

const initialState:CartState = {
	cartData: {
		userId: -1,
    cartId: "",
    costPreTotal: "0.00",
	},
	cartItems: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
		storeCartData(state, action) {
			return{
				...state,
				cartData: action.payload,
			}
		},
		storeCartItems(state, action) {
			return{
				...state,
				cartItems: action.payload,
			}
		},
    /*removeFromCartByItemId(state, action) { // send index of item to remove
			return{
        ...state,
				cartItems: state.cartItems.splice(action.payload, 1)
      }
    },*/
    clearCart(state, action) {
      return{
        ...state,
        cartData: {
					userId: -1,
					cartId: "",
					costPreTotal: "0.00",
				},
				cartItems: [],
      }
    },
  }
});

export const {
	storeCartData,
  storeCartItems,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
