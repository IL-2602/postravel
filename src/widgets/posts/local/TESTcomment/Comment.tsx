import { useGetProfileQuery } from '@/services/profileService/profileEndpoints'
import { Heart } from '@/shared/assets/icons/Heart'
import { Profile } from '@/shared/types/profile'
import { Typography } from '@/shared/ui/Typography'
import Image from 'next/image'

import s from '@/widgets/posts/local/CommentsAnswers/ui/CommentsAnswers.module.scss'

import noPhoto from '../../../../../public/assets/noPhoto.svg'

export const TestComment = ({ photo, postDescription, profile }: Props) => {
  const comment =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temporincididunt ut labore et dolore magna aliqua.'

  return (
    <div className={s.userCommentContainer}>
      <div className={s.userPhotoWrapper}>
        <div className={s.photo}>
          {(profile && profile?.avatars[0] === undefined) || !photo ? (
            <Image alt={'noUserPhoto'} height={22} src={noPhoto} width={22} />
          ) : (
            <Image
              alt={'userPhoto'}
              height={36}
              src={profile?.avatars[0].url! ?? photo}
              width={36}
            />
          )}
        </div>
        <div className={s.commentText}>
          <Typography as={'b'} variant={'bold14'}>
            {profile?.userName}
            <Typography variant={'regular14'}>
              {postDescription ? postDescription : comment}
            </Typography>
          </Typography>
          <Typography className={'commentTime'} color={'form'} variant={'small'}>
            2 Hours ago
          </Typography>
        </div>
        <div className={s.commentLike}>
          <Heart />
        </div>
      </div>
    </div>
  )
}

type Props = {
  photo?: string
  postDescription?: null | string
  profile?: Profile
}