import React, { Dispatch, ReactElement, ReactNode, SetStateAction, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Panel from "../../popupWindows/panel/Panel";
import { CartItem } from '../../displays/checkout/type';
import { RootState } from '../../../common/store';
import { Button } from 'bootstrap';
import { 
	useDeleteCartItemMutation,
} from '../../../common/services/cartSlice';
import { UserData } from '../../displays/user/types';
import { removeFromCartByItemId } from '../../../common/slices/cartSlice';

interface ICartPanel {
  showCartPanel: boolean,
  setShowCartPanel: Dispatch<SetStateAction<boolean>>,
}

export const CartItemDisplayer = ({index, cartItem}: {
	index: number,
	cartItem: CartItem
}) => {
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
		//removeFromCartByItemId(cartItemId);
		deleteCartItem({cartItemId});
		dispatch(
			removeFromCartByItemId(index)
		);
		console.log("DELETING CART ITEM")		
		console.log(deleteCartItemResult);
	}
	return (
		<>
		{
			itemExists ?
			
			<div style={{ display: 'flex', justifyContent: 'space-between', }}>
			<div style={{ display: 'inline-flex', alignSelf: 'flex-start', }}>
				<p
					onClick={() => removeCartItem(cartItemId)}
					style={{
						cursor: 'pointer',
						margin: 'auto 12px auto 0',							
					}}
				> x 
				</p>
				<img 
					src={selectedImage}
					width="50px"
					height="50px"
				/>
				<div>
					<p
						style={{
							margin: '0 0 0 10px',
							textAlign: 'left',
						}}
					>
						{name} {size}
					</p>
					<p
						style={{
							marginBottom: 0,
						}}
					>
						Prompt: {prompt}
					</p>
				</div>
			</div>
			<div
				style={{
					display: 'inline-flex',
				}}					
			>
				<p>${price}</p>
			</div>
</div>



: null
}</>
	);
}

export const CartPanel = ( props: ICartPanel ) => {
  const {
    showCartPanel,
    setShowCartPanel,
  } = props;
	
	const dispatch = useDispatch();
	const cart = useSelector<RootState, CartItem[]>(state => state.cart.cart);
	
	const cartDisplay = cart.map((cartItem, index) => {
		return <CartItemDisplayer index={index} cartItem={cartItem} key={cartItem.cartItemId} />
	});

	const navigateToCheckout = () => {
		console.log("GO TO CHECKOUT");
	}

  return (
    <Panel
      showPanel={showCartPanel}
      setShowPanel={setShowCartPanel}
    >
			<div>
				<p>Cart</p>
				<div>
					{cartDisplay ? cartDisplay : null}
				</div>
			</div>
			<button
				className="btn btn-primary"
				onClick={navigateToCheckout}
			>
				Checkout
			</button>
    </Panel>
  );
};

export default CartPanel;
