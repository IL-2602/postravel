import { ErrorResponse } from '@/services/authService/lib/authEndpoints.types'

export type ModalSteps = 'cropping' | 'filters' | 'publication' | 'upload'

export type PostSliceInitialState = {
  isCloseEditPostModal: boolean
  isClosePostModal: boolean
  isCreatePostModal: boolean
  isDeletePostModal: boolean
  isEditPostModal: boolean
  isMyPostModal: boolean
  modalSteps: ModalSteps
  postPhotos: PostPhoto[]
}

export type PostPhoto = {
  aspect: number
  cropImg: string
  filterImg: string
  img: string
  zoom: number
}

// type Metadata = {
//   uploadId: string | undefined
// }

export type PublishPostParams = {
  childrenMetadata: Array<{ uploadId: string }>
  description: string
  lastPostId?: number | undefined
}

export type EditPostParams = {
  description: null | string
  postId: number
}

export type getUserPostsParams = {
  endCursorPostId?: number | undefined
  pageSize?: number
  sortDirection?: 'asc' | 'desc'
  userId: number
}

export type PostImageResponse = {
  createdAt: string
  fileSize: number
  height: number
  uploadId: string
  url: string
  width: number
}

export type PublishPostImageResponse = {
  images: PostImageResponse[]
} & Partial<ErrorResponse>

export type PublishPostResponse = {
  avatarOwner: string
  createdAt: string
  description: string
  id: number
  images: PostImageResponse[]
  location: null | string
  owner: { firstName: string; lastName: string }
  ownerId: number
  updatedAt: string
  userName: string
} & Partial<ErrorResponse>

export type getUserPostsResponse = {
  items: PublishPostResponse[]
  pageSize: number
  totalCount: number
  totalUsers: number
}
export type PostImage = {
  createdAt: string
  fileSize: number
  height: number
  uploadId: string
  url: string
  width: number
}
export type GetCurrentPostResponse = {
  avatarOwner: string
  createdAt: string
  description: string
  id: number
  images: PostImage[]
  likesCount: number
  location: string
  owner: {
    firstName: string
    lastName: string
  }
  ownerId: number
  updatedAt: string
  userName: string
}

export type PostLikesResponse = {
  items: PostLikesResponseItems[]
  pageSize: number
  totalCount: number
}
export type PostLikesResponseItemsAvatars = {
  createdAt: string
  fileSize: number
  height: number
  url: string
  width: number
}
export type PostLikesResponseItems = {
  avatars: PostLikesResponseItemsAvatars[]
  createdAt: string
  id: number
  isFollowedBy: boolean
  isFollowing: boolean
  userId: number
  userName: string
}

export type PostLikesRequest = {
  cursor?: number
  pageNumber?: number
  pageSize?: number
  postId: string
  search?: string
}
