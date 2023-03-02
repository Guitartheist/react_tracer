import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../common/store";
import PayButtons from "../../paypal/PayButtons";
import { CartData } from "../cart/type";
import { AddressCollector } from "./AddressCollector";


export const OrderProcessor = () => {
	//const adressData = useSelector
	const [hasAdressData, setHasAddressData] = useState<boolean>(false);
	const cartData = useSelector<RootState, CartData>(state => state.cart.cartData);
	const {
		userId,
    cartId,
    costPreTotal,
	} = cartData;


  return (
		<>
		hasAdressData ?
			<PayButtons price={costPreTotal} />
		:
			<AddressCollector />
		</>

  );
}

export default OrderProcessor;