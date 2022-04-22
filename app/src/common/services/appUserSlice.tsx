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
                    responseHandler: (response) => {
                        // let t = response.headers.get('authorization')

                        //     response.json().then(data => {
                        //         auth.user = data
                        // store the token and logged in user info in local storage

                        return response.json()
                    }
                }
            },
        }),
        //LogoutAppUser
        //invalidate token, remove token from storage, remove user info from storage
    }),
    overrideExisting: false
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetUserByUserNameQuery, useRegisterAppUserMutation, useLoginAppUserMutation } = appUserSlice
