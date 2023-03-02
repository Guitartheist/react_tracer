import { JsonWebKeyInput } from "crypto";
import { CartItem } from "../components/displays/cart/type";

export interface AppUser {
	id?: number,
	email: string,
	username: string,
	password?: string,
	profileImage?: string,
	profilePreviewImage?: string
}

export interface AppUserListEntry {
	username: string,
	profilePreviewImage: string
}

export interface CreateImageRequest {
	prompt: string,
	width: number,
	height: number,
}

export interface CreateImageResponse {
	images: string[];
}

export interface CreateMockRequest {
	imageData: string;
	itemId: number;
	variantId: number;
}

export interface CreateMockResponse {
	placement: string;
	variant_id: number[];
	mockup_url: string;
}

export interface WallArtProduct {
	id: number;
	main_category: number;
	type: string;
	title: string;
	dimensions: string[];
}
