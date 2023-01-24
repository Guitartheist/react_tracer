import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../common/store";

export const OrderItemDisplayer = () => {
  const image = useSelector<RootState, string>(state => state.image.selectedImage.image);
  const prompt = useSelector<RootState, string>(state => state.image.selectedImage.prompt);

  return (
    <img src={image} />
  );
}

export default OrderItemDisplayer;
