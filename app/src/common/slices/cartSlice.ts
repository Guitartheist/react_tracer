import { createSlice } from '@reduxjs/toolkit';
import { CartItem } from '../../components/displays/checkout/type';

interface CartState {
  cart: CartItem[],
};

const initialState:CartState = {
	cart: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
		storeCart(state, action) {
			return{
				...state,
				cart: action.payload,
			}
		},
    addToCart(state, action) {
      return{
        ...state,
        cart: [...state.cart, action.payload],
      }
    },
    removeFromCartByItemId(state, action) { // send index of item to remove
      return{
        ...state,
        cart: [
          ...state.cart.slice(0, action.payload),
          ...state.cart.slice(action.payload + 1),
        ],
      }
    },
    clearCart(state, action) {
      return{
        ...state,
        cart: [],
      }
    },
  }
});

export const {
	storeCart,
  addToCart,
  removeFromCartByItemId,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
