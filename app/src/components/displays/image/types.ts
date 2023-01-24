export type ImagesData = {
  images: string[],
  prompt: string,
}

export type ImageData  = {
  image: string,
  prompt: string,
}

export type ImageSizeData  = {
  productDimensions: WidthHeight
  ratio: number,
  imagePixels: WidthHeight
}

export type WidthHeight = {
  width: number,
  height: number,
}