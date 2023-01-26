export type ProductCategories = {
  id: number,
  parent_id: number,
  image_url: string,
  catelog_position: number,
  size: string,
  title: string,
}

export type ProductDataResponse  = {
  //productData: string,
  //productVariants: string[],
  product: ProductData,
  variants: ProductVariantData[],
}

export type ProductData = {
id: number,                      // <---
main_category_id: number,        // <---
type: string,                    // <---
type_name: string,               // <---
title: string,                   // <---
//brand: string,
//model: string,
image: string,
variant_count: number,
//currency: string,
//options: string[],
dimensions: string,
is_discontinued: boolean,
//avg_fulfillment_time: string,
techniques: Techniques[],
files: Files[],
description: string,
}

export type Techniques = {
  key: string,
	display_name: string,
	is_default: boolean,
}

export type Files = {
  id: string,
	type: string,
	title: string,
	additional_price: string,
}

export type ProductVariantData = {
  id: number,
  product_id: number,
  name: string,
  size: string,
  //color: string,
  //color_code: string,
  //color_code2: string,
  image: string,
  price: string,
  in_stock: boolean,
  availability_regions: string,
  availability_status: AvailabilityStatus,
  description: string,
}

export type AvailabilityStatus = {
  region: string,
  in_stock: string,
}
