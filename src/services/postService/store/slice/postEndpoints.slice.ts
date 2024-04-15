import {
  ModalSteps,
  PostPhoto,
  PostSliceInitialState,
} from '@/services/postService/lib/postEndpoints.types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: PostSliceInitialState = {
  isCreatePostModal: false,
  isDeletePostModal: false,
  isEditPostModal: false,
  modalSteps: undefined,
  postPhotos: [],
}

export const postSlice = createSlice({
  initialState,
  name: 'postReducer',
  reducers: {
    setClearPostPhotos: state => {
      state.postPhotos = []
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
    setModalSteps: (state, action: PayloadAction<ModalSteps>) => {
      state.modalSteps = action.payload
    },
    setPostPhotos: (state, action: PayloadAction<string>) => {
      const tempPhoto: PostPhoto = {
        aspect: 0,
        cropImg: action.payload,
        img: action.payload,
        zoom: 0,
      }

      state.postPhotos.push(tempPhoto)
    },
    setPostPhotosAspect: (state, action: PayloadAction<{ aspect: number; img?: string }>) => {
      if (typeof action.payload.img === 'string') {
        const photo = state.postPhotos.find(p => p.img === action.payload.img)

        if (photo) {
          photo.aspect = action.payload.aspect
        }
      }
    },
  },
})

export const postActions = postSlice.actions
