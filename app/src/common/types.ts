export interface AppUser {
    id?: number,
    email: string,
    username: string,
    password?: string,
    profileImage?: string,
    profilePreviewImage?: string,
}

export interface AppUserListEntry {
    username: string,
    profilePreviewImage: string
}