export type  Cart = {
	cartData: CartData,
	cartItems: CartItem[],
}

export type CartData = {
	userId: number,
	cartId: string,
	costPreTotal: string,
}

export type CartItem = {
  cartItemId: number,
	userId: number,
	cartId: string | null,
	name: string,
	size: string,
	description: string,
	price: string,
	in_stock: boolean,
	selectedImage: string,
	imageWidthInPixels: number,
	imageHeightInPixels: number,
	rotated: boolean,
	prompt: string,
	productId: number,
}
