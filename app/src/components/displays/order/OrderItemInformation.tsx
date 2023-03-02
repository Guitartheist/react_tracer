import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from "../../../common/store";
import { CartItem } from "../cart/type";
import CartPanel from "../cart/CartPanel";
import { useCreateCartItemMutation } from "../../../common/services/cartSlice";
import UserDisplay from "../UserListDisplay";
import { checkCookieExists } from "../../../common/utils/cookies";
import { Cart } from "../cart/type";
import { UserData } from "../user/types";
import { storeCartData, storeCartItems } from "../../../common/slices/cartSlice";
import { CartContext } from "../cart/CartContext";

export const OrderItemInformation = () => {
	const dispatch = useDispatch();
  const navigate = useNavigate();
	const { setCartOpen } = useContext(CartContext);
  const [createCartItem, createCartItemResult] = useCreateCartItemMutation({});
	const userInfo = useSelector<RootState, UserData>(state => state.user.userData);
	const currentProductItem = useSelector<RootState, CartItem>(state => state.product.currentProduct);
	
	const {
    userId,
    username,
    userEmail,
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
				userId: userId || -1,
				cartId: localStorage.getItem("cartId"),
			}).unwrap()
			.then(cart => {
				const {
					cartData,
					cartItems,
				} = cart;
				
				if (localStorage.getItem("cartId")) {
					if (localStorage.getItem("cartId") !== cartData.cartId) {
						console.log("Cart ID's don't match");
						// handle this later
					}
				} else {
					if (cartData.cartId) {
						localStorage.setItem("cartId", cartData.cartId);
					} else {
						console.log("Didn't recieve cart id from server");
						
					}
				}
				dispatch(storeCartData(cartData));
				dispatch(storeCartItems(cartItems));
			});
    } catch (error) {
      console.log("");
      console.log(error);
    }

    
    setCartOpen(true);
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
    </>
  );
}

export default OrderItemInformation;
