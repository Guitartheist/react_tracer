import React, { useState, useEffect, ChangeEventHandler } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../../../common/store";
import { useCreateImageMutation } from '../../../common/services/imageSlice';
import { storeImageSizeData, storeRotated } from "../../../common/slices/imageSlice";
import CreatedImagesDisplayer from "./CreatedImagesDisplayer";
import { ImageSizeData, WidthHeight } from "./types";

import { IconRotate } from "../../../common/icons/IconRotate";
import './styles/ImageCreator.css';

const sizeOptions = [
"8x10",
"10x10",
"12x12",
"12x16",
"12x18",
"14x14",
"16x16",
"16x20",
"18x18",
"18x24",
"24x36"
];

export const getDimensionsInPixels = (ratio: number) => {
  let dimensionsInPixels: WidthHeight = {width: 0, height: 0};
  switch(ratio) {
    case 1.5:
      dimensionsInPixels = {width: 768, height: 512};    
      break;
    case (4/3):
      dimensionsInPixels = {width: 768, height: 576};
      break;
    case 1.25:
      dimensionsInPixels = {width: 640, height: 512};
      break;
    case 1:
      dimensionsInPixels = {width: 512, height: 512};
      break;
    case .8:
      dimensionsInPixels = {width: 512, height: 640};
      break;
    case .75:
      dimensionsInPixels = {width: 576, height: 768};
      break;
    case 2/3:
      dimensionsInPixels = {width: 512, height: 768};
      break;
    default:
      // log default case later
      dimensionsInPixels = {width: 512, height: 512};
      break;
  }
  return dimensionsInPixels;
}

export const ImageCreator = () => {
  const dispatch = useDispatch();
  const [createImage, createImageResult] = useCreateImageMutation({});
  const [prompt, setPrompt] = useState("");
  const [imageSize, setImageSize ] = useState(sizeOptions[0]);
  const [imagePixels, setImagePixels] = useState<WidthHeight>({width:512, height:640});

  const [displayError, setDisplayError] = useState("")
  const [displayImages, setDisplayImages] = useState(false); // false
  const [images, setImages] = useState([""]);
  const [numberImages, setNumberImages] = useState(0);
  const [isImageRotated, setIsImageRotated] = useState(false);

  const [productSizeOptions, setProductSizeOptions] = useState<string[]>(['']);

  //const selectedDimensions = useSelector<RootState, ImageSizeData>(state => state.image.imageSizeData);

  useEffect(() => {
    setProductSizeOptions(sizeOptions);
  }, []);

  const CreateImage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const width = imagePixels.width;
    const height = imagePixels.height;
    console.log("Sending...");
    console.log(width);
    console.log(height);
    console.log(prompt);
    try {
      const payload = createImage({
        prompt,
        width,
        height,
      }).unwrap();
      console.log('fulfilled', payload.then(images=>{
        setImages(images.images);
        setNumberImages(images.images.length);
        setDisplayImages(true);
    }))
    } catch (error) {
      setDisplayError('Create Image Failed')
      console.log('Create Image Failed');
      console.log(error);
    }
  }

  const onChangeImageSize = (event: any ) => {
    const imageSizeString = String(event.target.value);
    setImageSize(imageSizeString);
    
    const productDimensions = {
      width: Number(imageSizeString.slice(0, imageSizeString.indexOf("x"))),
      height: Number(imageSizeString.slice(imageSizeString.indexOf("x")+1)),
    };
    const ratio = productDimensions.width / productDimensions.height;
    const imagePixels = getDimensionsInPixels(ratio);
    setImagePixels(imagePixels);
    dispatch(
      storeImageSizeData({
        productDimensions,
        ratio,
        imagePixels,
      })
    );
  }

  const onRotateImage = () => {
    let sizeOptionArray = [];
    for(let option of productSizeOptions) {
      const reversedSizeOption = option.split('x').reverse().join('x');
      if (option === imageSize) {
        setImageSize(reversedSizeOption);
        const productDimensions = {
          width: Number(reversedSizeOption.slice(0, reversedSizeOption.indexOf("x"))),
          height: Number(reversedSizeOption.slice(reversedSizeOption.indexOf("x")+1)),
        };
        const ratio = productDimensions.width / productDimensions.height;
        const imagePixels = getDimensionsInPixels(ratio);
        setImagePixels(imagePixels);
        dispatch(
          storeImageSizeData({
            productDimensions,
            ratio,
            imagePixels,
          })
        );
      }
      sizeOptionArray.push(reversedSizeOption);
    }
    setProductSizeOptions(sizeOptionArray);
    dispatch(storeRotated(!isImageRotated));
    setIsImageRotated(!isImageRotated);    
  }

  const sizeOptionsInput = productSizeOptions.map(sizeOption =>
    <label
      key={sizeOption}
      style={{margin: "0 4px"}}>
      <input 
        style={{margin: "0 2px"}}
        type="radio"
        value={sizeOption}
        checked={imageSize === sizeOption}
        onChange={onChangeImageSize}
        key={sizeOption}
      />
      {sizeOption}
    </label>
  );


  return (   
    <div>
      <form onSubmit={CreateImage}>
        <input type="text"
          className="form-control" 
          placeholder="Prompt" 
          aria-label="Prompt"
          onChange={(e) => {
              setPrompt(e.target.value);
          }}
          style={{
            width: '75%',
            maxWidth: '5000px',
            height: '35px',
            margin: '10px',
            display: 'inline',
          }}
        />
        <input 
          type="submit"
          className="btn btn-primary"
          value="Create Image"
          style={{backgroundColor: '#1A56B0'}}
          />
        <div style={{margin: "4px 0px"}}>
          <p style={{display: "inline-flex"}}>Image Size:</p>
          {sizeOptionsInput}
          <span className="image-rotate-icon">
            <IconRotate setRotatedInParent={onRotateImage} />
          </span>
        </div>
      </form>
      {displayImages ? <CreatedImagesDisplayer images={images} prompt={prompt} /> : null}
    </div>
  );
}

export default ImageCreator;
