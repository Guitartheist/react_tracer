import React, { createContext, ReactNode, ReactPortal, useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import CartPanel from './CartPanel';
import { useLazyFindCartByCartIdQuery } from '../../../common/services/cartSlice';
import { storeCartData, storeCartItems } from '../../../common/slices/cartSlice';

export type CartContextProps = {
	children?: React.ReactNode
}

export type CartContextType = {
	setCartOpen: (isOpen: boolean) => void,
}

export const CartContext = createContext<CartContextType>({
	setCartOpen: () => {},
});

export const CartContextProvider: React.FC<CartContextProps>
  = ({children}) => {
	const dispatch = useDispatch();
	const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

	const setCartOpen = (isOpen: boolean) => {
		setIsCartOpen(isOpen);
	}

	const [getCart, cartResults, lastPromiseInfo] = useLazyFindCartByCartIdQuery();
		
	const cartId = localStorage.getItem("cartId");
	if (cartId && cartId !== lastPromiseInfo.lastArg) {
		getCart(cartId);
	}

	useEffect(() => {
		if (cartResults && cartResults.data) {
			const {
				cartData,
				cartItems
			} = cartResults.data;
			dispatch(storeCartData(cartData));
			dispatch(storeCartItems(cartItems));
		}
	}, [cartResults])	

	return (
		<CartContext.Provider value={{ setCartOpen }}>
			{children}
			<CartPanel
				showCartPanel={isCartOpen}
				setShowCartPanel={setIsCartOpen}
			/>
		</CartContext.Provider>

	);
}

export default CartContextProvider;
