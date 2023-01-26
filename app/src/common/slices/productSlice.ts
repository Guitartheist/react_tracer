import { createSlice } from '@reduxjs/toolkit';
import { ProductDataResponse } from "../../components//displays/product/types";
import { CartItem } from '../../components/displays/checkout/type';

interface ProductState {
  wallArtProducts:  ProductDataResponse[] | null,
	currentProduct: CartItem,
}

const initialState:ProductState = {
  wallArtProducts: null,
	currentProduct: {
		cartItemId: -1,
    userId: -1,
    cartId: "",
    name: "",
    size: "",
		description: "",
    price: "",
    in_stock: false,
    selectedImage: "",
    imageWidthInPixels: -1,
    imageHeightInPixels: -1,
    rotated: false,
		prompt: "",
		productId: -1,
	},
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    storeWallArtProductData(state, action) {
      return{ 
        ...state,
        wallArtProducts: action.payload,
      }
    },
		storeCurrentProduct(state, action) {
			return{
				...state,
				currentProduct: action.payload,
			}
		}
  }
});

export const { 
  storeWallArtProductData,
	storeCurrentProduct
} = productSlice.actions;

export default productSlice.reducer;
