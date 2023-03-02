import { api } from './api';
import { AppUser, AppUserListEntry } from '../types'

const pageSize = 10;

const appUserSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getUsernameFromToken: builder.query<AppUser, string>({
			query: () => '/user/token'
    }),
    getAllUsernames: builder.query<AppUserListEntry[], string>({
      query: () => '/user/all'
    }),
    getPagedUsernames: builder.query<AppUserListEntry[], number>({
      //the API starts at page 0 but users will expect pages to start at 1
			query: (page) => `/user/${page-1}/${pageSize}`
		}),
		getUserByUserName: builder.query<AppUser, string>({
			query: (name) => `user/profile/${name}`
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
						let token = await response.headers.get('authorization');
						if (token) {
								localStorage.setItem('token',token);
						}
						return response.json();
					}
				}
			},
		}),
		updateAppUser: builder.mutation<AppUser, AppUser>({
			query(body) {
				return {
					url: 'user/profile',
					method: 'PUT',
					body,
				}
			}
		}),
		logoutAppUser: builder.query<null, string>({
			query: () => ({
				url: 'user/logout',
				responseHandler: (response) => {localStorage.setItem('token',''); return response.text()},
			})
		}),
	}),
	overrideExisting: false
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetUserByUserNameQuery, 
	useRegisterAppUserMutation, 
	useLoginAppUserMutation, 
	useUpdateAppUserMutation, 
	useGetAllUsernamesQuery,
	useGetPagedUsernamesQuery,
	useGetUsernameFromTokenQuery,
	useLogoutAppUserQuery, } = appUserSlice
