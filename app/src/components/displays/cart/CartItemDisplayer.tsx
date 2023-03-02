import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDeleteCartItemMutation } from "../../../common/services/cartSlice";
import { storeCartData, storeCartItems } from "../../../common/slices/cartSlice";
import { RootState } from "../../../common/store";
import { CartItem } from "./type";

export const CartItemDisplayer = ({index, cartItem}: {
	index: number,
	cartItem: CartItem
}) => {
	const cartItemsFromState = useSelector<RootState, CartItem[]>(state => state.cart.cartItems);
	const [deleteCartItem, deleteCartItemResult] = useDeleteCartItemMutation();
	const [itemExists, setItemExists] = useState<boolean>(true);
	const dispatch = useDispatch();

	const [isDeleting, setIsDeleting] = useState<boolean>(false);
	const [isDeleted, setIsDeleted] = useState<boolean>(false);

	const {
		cartItemId,
    userId,
    cartId,
    name,
    size,
    description,
    price,
    in_stock,
    selectedImage,
    imageWidthInPixels,
    imageHeightInPixels,
    rotated,
		prompt,
		productId,
	} = cartItem;

	const removeCartItem = (cartItemId:number) => {
		try {
			const cartDataPayload = deleteCartItem({cartItemId})
			.unwrap()
			.then(cartData => {
				dispatch(
					storeCartData(cartData)
				);
				dispatch(
					storeCartItems(
						cartItemsFromState.slice(0, index).concat(cartItemsFromState.slice(index+1))
					)
				);
			})
		} catch (error) {
			console.log("");
			console.log(error);
		}
	}
	return (
		<>
		{
			itemExists ?
			<div style={{ display: 'flex', justifyContent: 'space-between', }}>
				<div style={{ display: 'inline-flex', alignSelf: 'flex-start', }}>
					<p
						onClick={() => removeCartItem(cartItemId)}
						style={{ cursor: 'pointer', margin: 'auto 12px auto 0', }}
					> x 
					</p>
					<img 
						src={selectedImage}
						width="50px"
						height="50px"
					/>
					<div>
						<p style={{ margin: '0 0 0 10px', textAlign: 'left', }} >
							{name} {size}
						</p>
						<p style={{ marginBottom: 0, }} >
							Prompt: {prompt}
						</p>
					</div>
				</div>
				<div style={{ display: 'inline-flex', }}>
					<p>${price}</p>
				</div>
			</div>
			: null
		}</>
	);
}

export default CartItemDisplayer;
