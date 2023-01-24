import { createSlice } from '@reduxjs/toolkit';
import {
  ImageData,
  ImageSizeData
} from "../../components/displays/image/types";

interface ImageState {
    imageSizeData: ImageSizeData,
    selectedImage: ImageData,
    rotated: boolean,
};

const initialState:ImageState = {
  imageSizeData: {
    productDimensions: {
      width: 8,
      height: 10
    },
    ratio: 0.8,
    imagePixels: {
      width: 512,
      height: 640,
    },
  },
  selectedImage: {
    image:"",
    prompt:""
  },
  rotated: false,
};

const imageSlice = createSlice({
  name: 'image',
  initialState,
  reducers: {
    storeImageSizeData(state, action) {
      return{ 
        ...state,
        imageSizeData: action.payload
      }
    },
    storeSelectedImage(state, action) {
      return{ 
        ...state,
        selectedImage: action.payload
      }
    },
    storeRotated(state, action) {
      return{
        ...state,
        rotated: action.payload
      }
    },
  }
});

export const {
  storeImageSizeData,
  storeSelectedImage,
  storeRotated,
} = imageSlice.actions;

export default imageSlice.reducer;
