import React, { createContext, ReactNode, ReactPortal, useState } from "react";
import CartPanel from './CartPanel';

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
	const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

	const setCartOpen = (isOpen: boolean) => {
		setIsCartOpen(isOpen);
	}

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
