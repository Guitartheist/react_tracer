import React, { FC, ReactElement, ReactNode, useEffect, useState, } from "react";
import { useDispatch, useSelector } from 'react-redux';
import ProductExample from "./ProductExample";
import { useGetWallArtProductsDataQuery } from "../../../common/services/productSlice";
import { storeWallArtProductData } from "../../../common/slices/productSlice";
import { RootState } from "../../../common/store";
import { ImageData, ImageSizeData } from "../image/types";
import { ProductVariantData, ProductDataResponse } from "./types";

const setDisplayProducts = (
	productsData:ProductDataResponse[],
	imageSize:ImageSizeData,
	image:string,
	rotated:boolean,
	prompt: string,
) => {
	let availableProducts:ProductVariantData[] = [];  
  productsData.forEach(product => {
    product.variants.forEach(variant => {
      const variantWidth = Number(variant.size.slice(0, variant.size.indexOf("×")-1)); // that is not an 'x'
      const variantHeight = Number(variant.size.slice(variant.size.indexOf("×")+1, -1));
      if ( rotated &&
        imageSize.ratio === variantHeight / variantWidth
      ){
        if (imageSize.productDimensions.width === variantHeight && imageSize.productDimensions.height === variantWidth) {
          availableProducts.unshift(
						Object.assign({
              description: product.product.description},
              variant
          ));
        } else {
          availableProducts.push(
            Object.assign({
              description: product.product.description},
              variant
          ));
        }
      } else if (
          imageSize.ratio === variantWidth / variantHeight
        ) {
          if (imageSize.productDimensions.width === variantWidth && imageSize.productDimensions.height === variantHeight) {
            availableProducts.unshift(
              Object.assign({
                description: product.product.description},
                variant
            ));
          } else {            
            availableProducts.push(
              Object.assign({
                description: product.product.description},
                variant
            ));
          }
        }
    });
  });

  const numberProductsToShow = availableProducts.length-1;
  const productDisplayOrder:number[] = Array.from({ length: availableProducts.length }, (_, i) => i)
  
  let content:JSX.Element[] = [];
  for (const index in productDisplayOrder) {
    const orderIndex = productDisplayOrder[index];

    const nameArray = availableProducts[orderIndex].name.split(' ');
    if(nameArray[0] === "Enhanced" || nameArray[0] === "Premium") {
      nameArray.shift();
    }
    nameArray.pop();
    const productName = nameArray.join(' ');

    content.push(
      <ProductExample 
        name={productName}
        size={availableProducts[orderIndex].size.replace('×','x')}
        description={availableProducts[orderIndex].description}
        price={availableProducts[orderIndex].price}
        in_stock={availableProducts[orderIndex].in_stock}
        selectedImage={image}
        imageSize={imageSize}
        rotated={rotated}
				prompt={prompt}
        id={availableProducts[orderIndex].id}
        key={availableProducts[orderIndex].name}
      />
    );  
  }
  return content;
}

export const CreateProductDisplay = () => {
  const dispatch = useDispatch();
  const imageSize = useSelector<RootState, ImageSizeData>(state => state.image.imageSizeData);
	const rotated = useSelector<RootState, boolean>(state => state.image.rotated);
	const seledctedImage = useSelector<RootState, ImageData>(state => state.image.selectedImage);

	const {
		image,
		prompt,
	} = seledctedImage;

  let content: ReactElement<any, any> | JSX.Element[] = [];
  const {
    data: resp,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetWallArtProductsDataQuery();

  if (isLoading) {
    content = <h1>Loading</h1>
  } else if (isError) {
    content = <h1>Error</h1>
  } else if (isSuccess) {
    dispatch(
      storeWallArtProductData({
        resp,
    }));
    content = setDisplayProducts(resp, imageSize, image, rotated, prompt);
  }
    
  return (
    <div>
      {content}  
    </div>
  );
}

export default CreateProductDisplay;
