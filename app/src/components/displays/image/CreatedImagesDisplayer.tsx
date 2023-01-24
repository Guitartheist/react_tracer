import React from "react";
import { useDispatch, useSelector } from 'react-redux'
import { storeSelectedImage } from "../../../common/slices/imageSlice";
import { RootState } from "../../../common/store";
import { ImagesData, WidthHeight } from "./types";

export const CreatedImagesDisplayer = ({images, prompt}: ImagesData) => {
  const dispatch = useDispatch();
  const imageFromState = useSelector<RootState, string>(state => state.image.selectedImage.image);

  // temp for testing
  const selectedDimensions = useSelector<RootState, WidthHeight>(state => state.image.imageSizeData.productDimensions);
    
  const selectImage = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    const target = event.target as HTMLImageElement;
    const image = target.src;
    dispatch(
      storeSelectedImage({
        image,
        prompt,
      })
    );
  }
  const deselectImage = () => {
    const image = "";
    const prompt = "";
    dispatch(
      storeSelectedImage({
        image,
        prompt,
      })
    );
  }

  const ImagesHolder = () => {
      return(
      <div>
        <div className="">
          <img 
            src={`data:image/png;base64, ${images[0]}`} alt={`Top-Left Image`}
            className="justify-content-center"
            style={{
              width: '30%',
              height: 'auto',
              margin: '0px',
              padding: '0px',
              display: 'inline',
              cursor: 'pointer',
            }}
            onClick={selectImage}/>
          <img
            src={`data:image/png;base64, ${images[1]}`} alt={`Top-Right Image`}
            className="justify-content-center"
            style={{
              width: '30%',
              height: 'auto',
              margin: '0px',
              padding: '0px',
              display: 'inline',
              cursor: 'pointer',
            }}
            onClick={selectImage}/>
          </div>
        <div className="">
          <img 
            src={`data:image/png;base64, ${images[2]}`} alt={`Bottom-Left Image`}
            className="justify-content-center"
            style={{
              width: '30%',
              height: 'auto',
              margin: '0px',
              padding: '0px',
              display: 'inline',
              cursor: 'pointer',
            }}
            onClick={selectImage}/>
          <img 
            src={`data:image/png;base64, ${images[3]}`} alt={`Bottom-Right Image`}
            className="justify-content-center"
            style={{
              width: '30%',
              height: 'auto',
              margin: '0px',
              padding: '0px',
              display: 'inline',
              cursor: 'pointer',
            }}
            onClick={selectImage}/>
        </div>
      </div>);
  }

  return (
    (!imageFromState) ?
      <ImagesHolder />
      : 
      <div>
      <p
        style={{
          color: '#fff',
          backgroundColor: '#000',
          position: 'absolute',
          display: 'inline',
          padding: '0px 6px 0px 1px',
          cursor: 'pointer',
        }}
        onClick={deselectImage}
      >&larr;Go Back</p>
      <img 
        src={imageFromState}
        alt={`Selected Image`}
        
        style={{
          width: '60%',
          height: 'auto',
          boxShadow: '0 5px 5px #000',
        }}
      />
      </div>
  );
  //const buf = Buffer.from(image, 'base64');
  //console.log(buf.toString('base64'));
}

export default CreatedImagesDisplayer;
