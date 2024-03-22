import React, { useState } from 'react'
import { Crop, ReactCrop } from 'react-image-crop'

import { Button } from '@/shared/ui/Button'
import Image from 'next/image'

import s from './userPhotoCrop.module.scss'

export const UserPhotoCrop = ({ userPhoto }: Props) => {
  const [crop, setCrop] = useState<Crop>()

  const onImageLoaded = () => {
    setCrop({
      height: 95,
      unit: '%',
      width: 95,
      x: 3,
      y: 3,
    })
  }

  return (
    <div className={s.wrapper}>
      <ReactCrop aspect={1} circularCrop crop={crop} locked onChange={c => setCrop(c)}>
        <Image
          alt={'User Photo'}
          className={s.image}
          height={332}
          onLoad={onImageLoaded}
          src={userPhoto}
          width={332}
        />
      </ReactCrop>
      <div className={s.button}>
        <Button>Save</Button>
      </div>
    </div>
  )
}

type Props = {
  userPhoto: string
}
