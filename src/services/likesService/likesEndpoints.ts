import { api } from '@/services/api'
import { GetLikesResponse } from '@/services/likesService/lib/likesEndpoints.types'

const commentsEndpoints = api.injectEndpoints({
  endpoints: builder => ({
    getAnswerLikes: builder.query<
      GetLikesResponse,
      { answerId: number; commentId: number; postId: number }
    >({
      providesTags: ['AnswerLike'],
      query: ({ answerId, commentId, postId }) => {
        return {
          method: 'GET',
          url: `posts/${postId}/comments/${commentId}/answers/${answerId}/likes`,
        }
      },
    }),
    getCommentLikes: builder.query<GetLikesResponse, { commentId: number; postId: number }>({
      providesTags: ['CommentLike'],
      query: ({ commentId, postId }) => {
        return {
          method: 'GET',
          url: `posts/${postId}/comments/${commentId}/likes`,
        }
      },
    }),
    getPostLikes: builder.query<GetLikesResponse, { postId: number }>({
      providesTags: ['PostLike'],
      query: ({ postId }) => {
        return {
          method: 'GET',
          url: `posts/${postId}/likes`,
        }
      },
    }),
    updateAnswerLike: builder.mutation<
      void,
      {
        answerId: number
        commentId: number
        likeStatus: 'DISLIKE' | 'LIKE' | 'NONE'
        postId: number
      }
    >({
      invalidatesTags: ['AnswerLike'],
      query: ({ answerId, commentId, postId }) => {
        return {
          method: 'PUT',
          url: `posts/${postId}/comments/${commentId}/answers/${answerId}/like-status`,
        }
      },
    }),
    updateCommentLike: builder.mutation<
      void,
      { commentId: number; likeStatus: 'DISLIKE' | 'LIKE' | 'NONE'; postId: number }
    >({
      invalidatesTags: ['CommentLike'],
      query: ({ commentId, postId }) => {
        return {
          method: 'PUT',
          url: `posts/${postId}/comments/${commentId}/like-status`,
        }
      },
    }),
    updatePostLike: builder.mutation<
      void,
      { likeStatus: 'DISLIKE' | 'LIKE' | 'NONE'; postId: number }
    >({
      invalidatesTags: ['PostLike'],
      query: ({ likeStatus, postId }) => {
        return {
          body: { likeStatus },
          method: 'PUT',
          url: `posts/${postId}/like-status`,
        }
      },
    }),
  }),
})

export const {
  useGetAnswerLikesQuery,
  useGetCommentLikesQuery,
  useGetPostLikesQuery,
  useUpdateAnswerLikeMutation,
  useUpdateCommentLikeMutation,
  useUpdatePostLikeMutation,
} = commentsEndpoints
