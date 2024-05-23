import { api } from '@/services/api'
import { Session } from '@/services/devicesService/lib/devicesEndpoints.types'
import { deleteCookie } from 'cookies-next'

export const devicesEndpoints = api.injectEndpoints({
  endpoints: builder => ({
    deleteSession: builder.mutation<void, { deviceId: number }>({
      invalidatesTags: ['Sessions'],
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled
          deleteCookie('accessToken')

          setTimeout(() => {
            dispatch(api.util.invalidateTags(['Me']))
          }, 50)
        } catch (e) {
          console.log(e)
        }
      },
      query: ({ deviceId }) => {
        return {
          method: 'DELETE',
          url: `sessions/${deviceId}`,
        }
      },
    }),
    getSessions: builder.query<Session[], void>({
      providesTags: ['Sessions'],
      query: () => {
        return {
          method: 'GET',
          url: `sessions`,
        }
      },
    }),
  }),
})

export const { useDeleteSessionMutation, useGetSessionsQuery } = devicesEndpoints
