import { api } from '@/services/api'
import {
  EditPostLikeStatusRequest,
  EditPostParams,
  GetCurrentPostResponse,
  GetPostsResponse,
  PostLikesRequest,
  PostLikesResponse,
  PublishPostImageResponse,
  PublishPostParams,
  PublishPostResponse,
} from '@/services/postService/lib/postEndpoints.types'
import { publicEndpoints } from '@/services/publicService/publicEndpoints'

export const postEndpoints = api.injectEndpoints({
  endpoints: builder => ({
    deletePost: builder.mutation<void, { postId: number; profileId: number }>({
      onQueryStarted: async (args, { dispatch }) => {
        try {
          dispatch(
            publicEndpoints.util.updateQueryData(
              'getUserPosts',
              { endCursorPostId: undefined, userId: args.profileId },
              draft => {
                const delIdx = draft.items.findIndex(item => item.id === args.postId)

                if (delIdx > -1) {
                  draft.items.splice(delIdx, 1)
                }
              }
            )
          )
        } catch (e) {
          console.log(e)
        }
      },
      query: ({ postId }) => {
        return {
          method: 'DELETE',
          url: `posts/${postId}`,
        }
      },
    }),
    editPost: builder.mutation<void, EditPostParams>({
      invalidatesTags: ['Post'],
      query: ({ description, postId }) => {
        return {
          body: { description },
          method: 'PUT',
          params: { postId },
          url: `posts/${postId}`,
        }
      },
    }),
    editPostLikeStatus: builder.mutation<void, EditPostLikeStatusRequest>({
      invalidatesTags: ['LikesPost'],
      query: params => {
        const { postId, ...body } = params

        return {
          body,
          method: 'PUT',
          url: `posts/${postId}/like-status`,
        }
      },
    }),
    getCurrentPost: builder.query<GetCurrentPostResponse, number>({
      providesTags: ['Post'],
      query: postId => {
        return {
          method: 'GET',
          url: `public-posts/${postId}`,
        }
      },
    }),
    getLikesPost: builder.query<PostLikesResponse, PostLikesRequest>({
      providesTags: ['LikesPost'],
      query: params => {
        const { postId, ...rest } = params

        return {
          method: 'GET',
          params: rest,
          url: `posts/${postId}/likes`,
        }
      },
    }),
    getPosts: builder.query<GetPostsResponse, { username: string }>({
      query: ({ username }) => {
        return {
          method: 'GET',
          url: `posts/${username}`,
        }
      },
    }),
    publishPost: builder.mutation<PublishPostResponse, PublishPostParams>({
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled

          dispatch(
            publicEndpoints.util.updateQueryData(
              'getUserPosts',
              { endCursorPostId: undefined, userId: data.ownerId },
              draft => {
                draft.items.unshift(data)
              }
            )
          )
        } catch (e) {
          console.log(e)
        }
      },
      query: body => {
        return {
          body: body,
          method: 'POST',
          url: `posts`,
        }
      },
    }),
    publishPostImage: builder.mutation<PublishPostImageResponse, FormData>({
      query: file => {
        return {
          body: file,
          method: 'POST',
          url: `posts/image`,
        }
      },
    }),
  }),
})

export const {
  useDeletePostMutation,
  useEditPostLikeStatusMutation,
  useEditPostMutation,
  useGetCurrentPostQuery,
  useGetLikesPostQuery,
  useGetPostsQuery,
  usePublishPostImageMutation,
  usePublishPostMutation,
} = postEndpoints

export const { getCurrentPost } = postEndpoints.endpoints
