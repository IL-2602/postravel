import { Control } from 'react-hook-form'

import { PostPhoto } from '@/services/postService/lib/postEndpoints.types'
import { Close } from '@/shared/assets/icons/Close'
import { ImageIcon } from '@/shared/assets/icons/Image'
import { Button } from '@/shared/ui/Button'
import { DropMenu } from '@/shared/ui/DropMenu'
import { ControlledFileUploader } from '@/shared/ui/controlledInsta/ControlledFileUploader/ControlledFileUploader'
import Image from 'next/image'

import s from './addMoreImages.module.scss'

export const AddMoreImages = ({
  control,
  delPostPhoto,
  extraAction,
  onChangeCurrPhoto,
  photos,
}: Props) => {
  return (
    <DropMenu.Menu
      align={'end'}
      forceMount
      side={'top'}
      sideOffset={2}
      trigger={
        <Button className={s.button} variant={'link'}>
          <ImageIcon />
        </Button>
      }
    >
      <DropMenu.Item onSelect={(e: Event) => e.preventDefault()}>
        <div className={s.container}>
          {photos?.map((photo, idx) => (
            <div className={s.imgWrapper} key={idx}>
              <div onClick={() => onChangeCurrPhoto(idx)}>
                <Image alt={'Photo Preview'} height={80} src={photo.img} width={80} />
              </div>
              <Button
                className={s.delbtn}
                onClick={() => delPostPhoto(photo.img)}
                variant={'secondary'}
              >
                <Close />
              </Button>
            </div>
          ))}
          <ControlledFileUploader
            className={s.fileBtn}
            control={control}
            extraActions={extraAction}
            key={photos?.length}
            name={'postPhoto'}
            variant={'outlined'}
          >
            +
          </ControlledFileUploader>
        </div>
      </DropMenu.Item>
    </DropMenu.Menu>
  )
}

type Props = {
  control: Control<{ postPhoto?: File | undefined }, any>
  delPostPhoto: (img: string) => void
  extraAction: () => void
  onChangeCurrPhoto: (currPhoto: number) => void
  photos?: PostPhoto[]
}