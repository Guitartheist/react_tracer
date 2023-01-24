import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from "../../../common/store";
import { CartItem } from "../checkout/type";
import CartPanel from "../../displays-mini/cart/CartPanel";
import { useCreateCartItemMutation } from "../../../common/services/cartSlice";
import UserDisplay from "../UserListDisplay";
import { checkCookieExists } from "../../../common/utils/cookies";
import { UserData } from "../user/types";
import { addToCart, storeCart } from "../../../common/slices/cartSlice";

export const OrderItemInformation = () => {
	const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showCartPanel, setShowCartPanel] = useState(false);
  const [createCartItem, createCartItemResult] = useCreateCartItemMutation({})
	const userInfo = useSelector<RootState, UserData>(state => state.user.userData);
	const currentProductItem = useSelector<RootState, CartItem>(state => state.product.currentProduct);
	
	const {
    id,
    username,
    email,
	} = userInfo;

	const {
		name,
		size,
		description,
		price,
		in_stock,
		selectedImage,
		imageWidthInPixels,
		imageHeightInPixels,
		rotated,
		productId,
		prompt,
	} = currentProductItem;

  /*console.log(orderInfo.in_stock);
  console.log(orderInfo.selectedImage);
  console.log(orderInfo.imageSize);
  console.log(orderInfo.rotated);
  console.log(orderInfo.id);
  */

  const AddToCart = () => {
		try {
			const cartItemPayload = createCartItem({
				...currentProductItem,
				cartItemId: -1,
				userId: id || -1,
				cartId: localStorage.getItem("cartId"),
			}).unwrap()
			.then(cart => {
				console.log("WWWWWWWWWWWWHHHHHHHHHHHHHAAAAAAAAAATTTTTTTTTT");
				console.log(cart);
				if (localStorage.getItem("cartId")) {

					if (localStorage.getItem("cartId") !== cart[0].cartId) {
						console.log("Cart ID's don't match");
						/*

						*/
					}
				} else {

					if (cart[0].cartId) {
						localStorage.setItem("cartId", cart[0].cartId);
					} else {
						console.log("Didn't recieve cart id from server");
						/* 

						*/
					}
				}
				dispatch(
					storeCart(cart)
				);
			});
    } catch (error) {
      console.log("");
      console.log(error);
    }

    
    setShowCartPanel(true);
    console.log("Add to Cart");
  }

  const BuyNow = () => {
    navigate('/checkout');
    console.log("Buy Now");
  }

  return (
    <>
      <div className="d-flex">
        <div>
          <img
            src={selectedImage}
          />
        </div>
        <div>
          <div>
            <p>{name}</p>
            <p>{size}</p>
            <p>${price}</p>
						<p>{prompt}</p>
						<p>{description}</p>
          </div>
          <div>
            <button className="btn btn-primary" onClick={AddToCart}>Add to Cart</button>
            <button className="btn btn-primary" onClick={BuyNow}>Buy Now</button>
          </div>
        </div>
      </div>
      <CartPanel
        showCartPanel={showCartPanel}
        setShowCartPanel={setShowCartPanel}
      />
    </>
  );
}

export default OrderItemInformation;
