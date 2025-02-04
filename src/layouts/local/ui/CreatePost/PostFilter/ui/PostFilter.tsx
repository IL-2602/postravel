import React, { LegacyRef, forwardRef } from 'react'

import { FilterPreviewButton } from '@/layouts/local/ui/CreatePost/PostFilter/FilterPreviewButton/FilterPreviewButton'
import { photoFilters } from '@/layouts/local/ui/CreatePost/PostFilter/FilterPreviewButton/FilterPreviewButtonData'
import { PostFilterProps } from '@/layouts/local/ui/CreatePost/PostFilter/container'
import { capitalizeFirstLetter } from '@/layouts/local/ui/CreatePost/PostFilter/utils/capitalizeFirstLetter'
import { CreatePostModalHeader } from '@/layouts/local/ui/CreatePost/createPostModalHeader'
import { PostPhotos } from '@/shared/components/PostPhotos/PostPhotos'
import { ScrollSelect } from '@/shared/ui/ScrollSelect/ScrollSelect'
import Image from 'next/image'

import s from './PostFilter.module.scss'

export const PostFilter = forwardRef(
  (
    {
      applyFilter,
      currPhotoIndex,
      currentImage,
      modalIsOpen,
      onChangeCurrentImage,
      postPhotos,
      t,
    }: PostFilterProps,
    ref: LegacyRef<HTMLCanvasElement>
  ) => {
    if (modalIsOpen && currentImage?.filterImg && currentImage?.cropImg) {
      return (
        <>
          <CreatePostModalHeader
            btnTitle={t.button.next}
            nextStep={'publication'}
            prevStep={'cropping'}
            title={t.post.filters}
          />

          <div className={s.container}>
            <div className={s.wrapper}>
              <PostPhotos currentPhoto={currPhotoIndex} onChangeCurrentPhoto={onChangeCurrentImage}>
                {postPhotos.map((_, i) => (
                  <div className={s.imgWrapper} key={i}>
                    <Image
                      alt={'current image'}
                      className={s.croppingImage}
                      fill
                      src={currentImage.filterImg}
                    />
                  </div>
                ))}
              </PostPhotos>
              <canvas
                ref={ref}
                style={{
                  display: 'none',
                  height: '100%',
                  objectFit: 'contain',
                  width: '100%',
                }}
              />

              <ScrollSelect type={'always'}>
                <div className={s.filterPrevBtnContainer}>
                  {photoFilters.map(filter => (
                    <FilterPreviewButton
                      applyFilter={applyFilter}
                      filter={filter}
                      imageUrl={currentImage.cropImg}
                      key={filter}
                      label={capitalizeFirstLetter(filter)}
                    />
                  ))}
                </div>
              </ScrollSelect>
            </div>
          </div>
        </>
      )
    }

    return null
  }
)
