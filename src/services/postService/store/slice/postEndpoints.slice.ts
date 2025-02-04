import {
  ModalSteps,
  PostPhoto,
  PostSliceInitialState,
} from '@/services/postService/lib/postEndpoints.types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: PostSliceInitialState = {
  isCloseEditPostModal: false,
  isClosePostModal: false,
  isCreatePostModal: false,
  isDeletePostModal: false,
  isEditPostModal: false,
  isMyPostModal: false,
  modalSteps: 'upload',
  postPhotos: [],
}

export const postSlice = createSlice({
  initialState,
  name: 'postReducer',
  reducers: {
    delPostPhotos: (state, action: PayloadAction<Pick<PostPhoto, 'img'>>) => {
      state.postPhotos = state.postPhotos.filter((p, idx) => p.img !== action.payload.img)
    },
    setClearPostPhotos: state => {
      state.postPhotos = []
    },
    setCropPostPhotos: (
      state,
      action: PayloadAction<Partial<Pick<PostPhoto, 'aspect' | 'cropImg' | 'img' | 'zoom'>>>
    ) => {
      const tempPhoto = state.postPhotos.find(p => p.img === action.payload.img)

      if (tempPhoto) {
        if (action.payload.cropImg) {
          tempPhoto.cropImg = action.payload.cropImg
        }
      }
    },
    setFilterPostPhotos: (state, action: PayloadAction<{ filterImg: string; img: string }>) => {
      const currentPhoto = state.postPhotos.find(p => p.img === action.payload.img)

      if (currentPhoto) {
        currentPhoto.filterImg = action.payload.filterImg
      }
    },
    setIsCloseEditPostModal: (state, action: PayloadAction<boolean>) => {
      state.isCloseEditPostModal = action.payload
    },
    setIsClosePostModal: (state, action: PayloadAction<boolean>) => {
      state.isClosePostModal = action.payload
    },
    setIsCreatePostModal: (state, action: PayloadAction<boolean>) => {
      state.isCreatePostModal = action.payload
    },
    setIsDeletePostModal: (state, action: PayloadAction<boolean>) => {
      state.isDeletePostModal = action.payload
    },
    setIsEditPostModal: (state, action: PayloadAction<boolean>) => {
      state.isEditPostModal = action.payload
    },
    setIsMyPostModal: (state, action: PayloadAction<boolean>) => {
      state.isMyPostModal = action.payload
    },
    setModalSteps: (state, action: PayloadAction<ModalSteps>) => {
      state.modalSteps = action.payload
    },
    setPostPhotos: (state, action: PayloadAction<string>) => {
      const tempPhoto: PostPhoto = {
        aspect: 0,
        cropImg: action.payload,
        filterImg: action.payload,
        img: action.payload,
        zoom: 1,
      }

      state.postPhotos.push(tempPhoto)
    },
    updatePostPhoto: (
      state,
      action: PayloadAction<Partial<Pick<PostPhoto, 'aspect' | 'img' | 'zoom'>>>
    ) => {
      const tempPhoto = state.postPhotos.find((p, idx) => p.img === action.payload.img)

      if (tempPhoto) {
        if (typeof action.payload.aspect === 'number') {
          tempPhoto.aspect = action.payload.aspect
        }
        if (action.payload.zoom) {
          tempPhoto.zoom = action.payload.zoom
        }
      }
    },
  },
})

export const postActions = postSlice.actions
