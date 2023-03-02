import React, { Dispatch, SetStateAction, useContext } from 'react';
import { CartContext } from './CartContext';
import './styles/CartIcon.css';

/*interface ICartIcon {
  setShowCartPanel: () => void,
}*/

export const CartIcon = () => {
	
	const { setCartOpen } = useContext(CartContext);

	return (
		<img
			className="cart-icon"
			src="./icon_images/cart-icon.png"
			width="25px"
			height="25px"
			onClick={() => {
					setCartOpen(true);
				}
			}
			style={{marginRight: "5px"}}
		/>
	);
}

export default CartIcon;