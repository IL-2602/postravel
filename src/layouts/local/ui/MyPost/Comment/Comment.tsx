import { useGetProfileQuery } from '@/services/profileService/profileEndpoints'
import { Heart } from '@/shared/assets/icons/Heart'
import { TimeDifference } from '@/shared/components/TimeDifference/TimeDifference'
import { Profile } from '@/shared/types/profile'
import { Typography } from '@/shared/ui/Typography'
import Image from 'next/image'

import s from '@/layouts/local/ui/MyPost/MyPostModal/ui/PostSide/PostSide.module.scss'

import noPhoto from '../../../../../../public/assets/noPhoto.svg'

export const Comment = ({
  changeIsLikedStatus,
  createdAt,
  photo,
  postDescription,
  postId,
  profile,
  uAvatar,
  uComment,
  uId,
  uIsLiked,
  uName,
}: Props) => {
  const comment = uComment

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
              src={profile?.avatars[0].url! ?? uAvatar}
              width={36}
            />
          )}
        </div>
        <div className={s.commentText}>
          <Typography as={'b'} variant={'bold14'}>
            {profile?.userName ? profile.userName : uName}
            <Typography variant={'regular14'}>
              {postDescription ? postDescription : uComment}
            </Typography>
          </Typography>
          <Typography className={'commentTime'} color={'tertiary'} variant={'small'}>
            {createdAt ? <TimeDifference postTime={createdAt} /> : '2 hours ago'}
          </Typography>
        </div>
        <div className={s.commentLike}>
          <Heart
            changeIsLikedStatus={changeIsLikedStatus}
            commentId={Number(uId)}
            isLiked={uIsLiked}
            postId={postId}
          />
        </div>
      </div>
    </div>
  )
}

type Props = {
  changeIsLikedStatus: (commentId: number, isLiked: boolean, postId: number) => void
  createdAt?: string
  photo?: string
  postDescription?: null | string
  postId?: number
  profile?: Profile
  uAvatar?: string
  uComment?: string
  uId?: string
  uIsLiked?: boolean
  uName?: number
}
