import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { useAppDispatch } from '@/app/store/hooks/useAppDispatch'
import { useAppSelector } from '@/app/store/hooks/useAppSelector'
import { usePostPublicationSchema } from '@/layouts/local/ui/CreatePost/PostPublication/schema/postPublicationSchema'
import { PostImageResponse } from '@/services/postService/lib/postEndpoints.types'
import {
  usePublishPostImageMutation,
  usePublishPostMutation,
} from '@/services/postService/postEndpoints'
import { postActions } from '@/services/postService/store/slice/postEndpoints.slice'
import { useGetProfileQuery } from '@/services/profileService/profileEndpoints'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

export const useContainer = () => {
  const { t } = useTranslation()

  const dispatch = useAppDispatch()

  const isCreatePostModal = useAppSelector(state => state.postReducer.isCreatePostModal)
  const modalSteps = useAppSelector(state => state.postReducer.modalSteps)
  const postPhotos = useAppSelector(state => state.postReducer.postPhotos)

  const [currPhotoIndex, setCurrPhotoIndex] = useState(0)

  const [publishPostImage, { isLoading: isLoadingPostImage }] = usePublishPostImageMutation()
  const [publishPost, { isLoading: isLoadingPost }] = usePublishPostMutation()

  const { postPublicationSchema } = usePostPublicationSchema()

  const { data: getProfile, isLoading: isGetUserLoading } = useGetProfileQuery()

  type postPublicationFormSchema = z.infer<typeof postPublicationSchema>

  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<postPublicationFormSchema>({
    defaultValues: {
      postDescription: '',
    },
    mode: 'onTouched',
    resolver: zodResolver(postPublicationSchema),
  })

  const postDescription = watch('postDescription')
  const { postDescription: errorDescription } = errors

  const cropImages = postPhotos.map(({ cropImg }) => cropImg)

  const isLoading = isLoadingPostImage || isLoadingPost

  const handleCropImages = async (urlFiles: string[]) => {
    for (const url of urlFiles) {
      const response = await fetch(url)

      const blob = await response.blob()
      const file = new File([blob], 'postPhoto', { type: 'image/jpeg' })

      const formData = new FormData()

      formData.append('file', file)

      return formData
    }
  }

  const handleReceivingUploadId = async () => {
    const responseCropImages = await handleCropImages(cropImages)

    if (!responseCropImages) {
      return null
    }

    const { images } = await publishPostImage(responseCropImages).unwrap()

    return images.map((image: PostImageResponse) => image.uploadId)
  }

  const handlePublishPhotos = async () => {
    try {
      const uploadIds = await handleReceivingUploadId()

      const postBody = {
        childrenMetadata: [{ uploadId: uploadIds?.join(',') }],
        description: postDescription as string,
      }

      dispatch(postActions.setIsCreatePostModal(false))
      dispatch(postActions.setClearPostPhotos())

      return await publishPost(postBody).unwrap()
    } catch (error) {
      console.log(error)
    }
  }

  const onChangeCurrPhoto = (currPhoto: number) => setCurrPhotoIndex(currPhoto)

  const showModalSaveDraft = () => {
    dispatch(postActions.setIsClosePostModal(true))
  }

  const backToFilter = () => {
    dispatch(postActions.setModalSteps('filters'))
  }

  return {
    backToFilter,
    control,
    currPhotoIndex,
    errorDescription,
    getProfile,
    handlePublishPhotos,
    handleSubmit,
    isCreatePostModal,
    isGetUserLoading,
    isLoading,
    isLoadingPostImage,
    modalSteps,
    onChangeCurrPhoto,
    postDescription,
    postPhotos,
    showModalSaveDraft,
    t,
  }
}