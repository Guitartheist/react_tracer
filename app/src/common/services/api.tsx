import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:8080/',
		prepareHeaders: (headers) => {
			const token = localStorage.getItem('token');
			if (token) {
				if (token.length > 0) {
					headers.append('authorization', `Bearer ${token}`)
				}
			}
			return headers
		},
	}),
	endpoints: () => ({})
})
