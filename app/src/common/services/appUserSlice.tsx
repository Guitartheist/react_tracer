import { api } from './api';
import { AppUser } from '../types'

const appUserSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getUserByUserName: builder.query<AppUser, string>({
            query: (name) => `user/${name}`,
        }),
        registerAppUser: builder.mutation<AppUser, AppUser>({
            query(body) {
                return {
                    url: `user/register`,
                    method: 'POST',
                    body,
                }
            },
        }),
        LoginAppUser: builder.mutation<AppUser, AppUser>({
            query(body) {
                return {
                    url: `user/login`,
                    method: 'POST',
                    body,
                }
            },
        }),
    }),
    overrideExisting: false
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetUserByUserNameQuery, useRegisterAppUserMutation, useLoginAppUserMutation } = appUserSlice
