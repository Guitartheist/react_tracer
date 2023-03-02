import React, { ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { storeCartData, storeCartItems } from "../../common/slices/cartSlice";
import { RootState } from "../../common/store";
import CartDisplayer from "./cart/CartDisplayer";
import CartItemDisplayer from "./cart/CartItemDisplayer";
import OrderProcessor from "./checkout/OrderProcessor";

import { Cart, CartData, CartItem } from "./cart/type";



export const CheckoutDisplay = () => {
	const dispatch = useDispatch();
	const cartDataFromState = useSelector<RootState, CartData | null>(state => state.cart.cartData);
	const cartItemsFromState = useSelector<RootState, CartItem[]>(state => state.cart.cartItems);

	let content: ReactElement<any, any> | JSX.Element[] = [];
	let data: CartData | null = null;
	const cartId = localStorage.getItem("cartId");
	
	if (cartItemsFromState.length > 0) {
		content = 
			cartItemsFromState.map((cartItem, index) => {
				return <CartItemDisplayer index={index} cartItem={cartItem} key={cartItem.cartItemId} />
			});
		data = cartDataFromState;
	} 
	
  return (
    <div className="d-flex">
      <div className="col-6">
        <CartDisplayer />
      </div>
      <div className="col-sm-6">
        <OrderProcessor />
      </div>
    </div>
  );
}

export default CheckoutDisplay;
