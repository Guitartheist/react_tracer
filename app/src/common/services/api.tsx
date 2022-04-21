import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../store'
import { selectToken } from './authSlice'

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/',
        prepareHeaders: (headers) => {
            let token = selectToken

            // if (token.length>0) {
            //   headers.append('authorization', `Bearer ${token}`)
            // }
        
            return headers
          },
    }),
    endpoints: () => ({})
})
