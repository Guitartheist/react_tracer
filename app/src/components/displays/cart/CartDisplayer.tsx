import React, { ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../common/store";
import { CartData, CartItem } from "./type";
import { UserData } from "../user/types";
import CartItemDisplayer from "./CartItemDisplayer";
import { storeCartData, storeCartItems } from '../../../common/slices/cartSlice';

export const CartDisplayer = () => {
	const dispatch = useDispatch();
	const cartDataFromState = useSelector<RootState, CartData>(state => state.cart.cartData);
	const cartItemsFromState = useSelector<RootState, CartItem[]>(state => state.cart.cartItems);
		
	let content: ReactElement<any, any> | JSX.Element[] = [];
	let data: CartData | null = null;

	const cartId = localStorage.getItem("cartId");
	if (cartItemsFromState) {
		content =
			cartItemsFromState.map((cartItem, index) => {
				return <CartItemDisplayer index={index} cartItem={cartItem} key={cartItem.cartItemId} />
			});
		data = cartDataFromState;
	}

	return (
		<div>
			<p>Cart</p>
			<div>
				{content}
			</div>
		</div>
	);

}

export default CartDisplayer;