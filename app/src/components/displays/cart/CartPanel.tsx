import React, { Dispatch, ReactElement, SetStateAction, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Panel from "../../popupWindows/panel/Panel";
import { CartData, CartItem } from './type';
import { RootState } from '../../../common/store';
import { UserData } from '../user/types';
import { CartItemDisplayer } from './CartItemDisplayer';
import { useNavigate } from 'react-router-dom';

interface ICartPanel {
  showCartPanel: boolean,
  setShowCartPanel: Dispatch<SetStateAction<boolean>>,
}

export const CartPanel = (props: ICartPanel) => {
  const {
    showCartPanel,
    setShowCartPanel,
  } = props;
	
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const userInfo = useSelector<RootState, UserData>(state => state.user.userData);
	const cartDataFromState = useSelector<RootState, CartData>(state => state.cart.cartData);
	const cartItemsFromState = useSelector<RootState, CartItem[]>(state => state.cart.cartItems);

	//console.log("CART PANEL STUFF:");
	//console.log(cartItemsFromState);
	//console.log(cartItems);
	//console.log(cartItems.length);

	//let content: ReactElement<any, any> | JSX.Element[] = [];
	//let data: CartData | null = null;

	const content = 
		cartItemsFromState.map((cartItem, index) => {		
			return (
				<CartItemDisplayer 
					index={index}
					cartItem={cartItem}
					key={cartItem.cartItemId}
				/>
			);
		})
	
	const data = cartDataFromState;
	const navigateToCheckout = () => {
		setShowCartPanel(false);
		navigate("/checkout");	
	}

  return (
    <Panel
      showPanel={showCartPanel}
			setShowPanel={setShowCartPanel}
    >
			<div>
				<p>Cart</p>
				<div>
					{content}
				</div>
			</div>
			<p>{data.cartId}</p>
			<p>{data.costPreTotal}</p>
			<p>{data.userId}</p>
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
