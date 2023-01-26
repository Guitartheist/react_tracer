import { api } from './api';
import { CreateImageRequest, CreateImageResponse } from '../types'

const imageSlice = api.injectEndpoints({

    endpoints: (builder) => ({
        getImageCreateHealthCheck: builder.query<string, void>({
            query: () => '/image/healthCheck'
        }),
        createImage: builder.mutation<CreateImageResponse, CreateImageRequest>({
            query(body) {
                return {
                    url: `image/create`,
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
export const { 
    useGetImageCreateHealthCheckQuery,
    useCreateImageMutation,
} = imageSlice
