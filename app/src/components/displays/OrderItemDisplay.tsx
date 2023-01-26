import React from "react";
import OrderItemInformation from "./order/OrderItemInformation";

export const OrderItemDisplay = () => {
  return (
    <div className="d-flex">
      <div>
        <OrderItemInformation />
      </div>
    </div>
  );
}

export default OrderItemDisplay;
