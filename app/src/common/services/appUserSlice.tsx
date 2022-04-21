import { api } from './api';
import { AppUser } from '../types'
import { AuthState, setAuthState } from './authSlice'

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
                        let t = response.headers.get('authorization')
                        if (!t) {
                            t = ''
                        }
                        const auth: AuthState = {
                            token: t,
                            user: {
                                id: 0,
                                email: '',
                                username: '',
                                password: ''
                            }
                        }
                        response.json().then(data => {
                            auth.user = data
                        });
                        setAuthState(auth)
                        return response.json()
                    }
                }
            },
        }),
    }),
    overrideExisting: false
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetUserByUserNameQuery, useRegisterAppUserMutation, useLoginAppUserMutation } = appUserSlice
