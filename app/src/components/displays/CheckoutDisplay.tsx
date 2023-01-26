import React from "react";
import CartDisplayer from "./checkout/CartDisplayer";
import PaymentDisplayer from "./checkout/PaymentDisplayer";

export const CheckoutDisplay = () => {
  
  return (
    <div className="d-flex">
      <div className="col-6">
        <CartDisplayer />
      </div>
      <div className="col-sm-6">
        <PaymentDisplayer />
      </div>
    </div>
  );
}

export default CheckoutDisplay;
