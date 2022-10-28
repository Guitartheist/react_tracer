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
        loginAppUser: builder.mutation<AppUser, AppUser>({
            query(body) {
                return {
                    url: `user/login`,
                    method: 'POST',
                    body,
                    responseHandler: async (response) => {
                        let token = await response.headers.get('authorization')

                        if (token) {
                            localStorage.setItem('token',token)
                        }

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
