import React, { SetStateAction, useEffect, useState } from "react";
import { ImageSizeData } from "../image/types";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { storeCurrentProduct } from "../../../common/slices/productSlice";
import { RootState } from "../../../common/store";

export const ProductExample = ({name, size, description, price, in_stock, selectedImage, imageSize, rotated, prompt, id}:
  {
    name: string,
    size: string,
		description: string,
    price: string,
    in_stock: boolean,
    selectedImage: string,
    imageSize: ImageSizeData,
    rotated: boolean,
		prompt: string,
    id: number,
  }) => {

  const [productWidth, setProductWidth] = useState(0);
  const [productHeight, setProductHeight] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
	
  useEffect(() => {
    const dimensionArray = size.split('x');
    if (rotated) {
      setProductWidth( Number(dimensionArray[1].slice(0, -1)) );
      setProductHeight( Number(dimensionArray[0].slice(0, -1)) );  

    } else {
      setProductWidth( Number(dimensionArray[0].slice(0, -1)) );
      setProductHeight( Number(dimensionArray[1].slice(0, -1)) );  
    }
  }, [size, rotated]);

  const createProductItem = () => {
    dispatch(
      storeCurrentProduct({
        name,
        size,
				description,
        price,
        in_stock,
        selectedImage,
				imageWidthInPixels: imageSize.imagePixels.width,
				imageHeightInPixels: imageSize.imagePixels.height,
        rotated,
				prompt,
				id,
      })
    )
    navigate('/orderitem');
  }

  return (
    <div
      onClick={createProductItem}
      style={{
        display: 'inline-block',
        margin: '3px 2px',
        width: '48%',
        
      }}
    >
      <div
        style={{
          border: '1px solid black',
          borderBottom: '0px',
        }}
      >
        <canvas 
          style={{
            maxWidth: '50%',
            height: 'auto',
            margin: '0 0 -6px 0',
            display: 'none',
          }}
          id={`product-example-canvas-${id}`}
        />
        {selectedImage ?
          <img
            src={selectedImage}
            id={`product-example-img-${id}`}
            alt={`Awesome Example of what we sell `+id}

            style={{
              width: `${productWidth*10}px`,
              height: `${productHeight*10}px`,
              margin: '10px',
            }}
          />
          :
          <img
            src={`https://via.placeholder.com/${productWidth*5}x${productHeight*5}/${getRanHex(3)}/009900.png`}
            id={`product-example-img-${id}`}
            alt={`Awesome Example of what we sell `+id}

            style={{
              width: `${productWidth*10}px`,
              height: `${productHeight*10}px`,
              margin: '0',
            }}
          />
        }
      </div>
      <div
        style={{
          border: '1px solid black',
        }}
      >
        <p>{name}</p>
        <p>{size}</p>
        <p>{price}</p>
      </div>
    </div>
  );
}

export default ProductExample;



const getRanHex = (size: number) => {
  let result = [];
  let hexRef = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];

  for (let n = 0; n < size; n++) {
    result.push(hexRef[Math.floor(Math.random() * 16)]);
  }
  return result.join('');
}
