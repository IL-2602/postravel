import { useGetMeQuery } from '@/services/authService/authEndpoints'
import { useGetProfileQuery } from '@/services/profileService/profileEndpoints'
import { useGetPublicUserProfileQuery } from '@/services/publicProfileSerice/publicProfileEndpoints'
import { useRouter } from 'next/router'

export const useContainer = () => {
  const { data: me } = useGetMeQuery()
  const { query } = useRouter()
  const profileId = query?.id as string

  const {
    data: profile,
    isError: isProfileError,
    isLoading: isProfileLoading,
  } = useGetProfileQuery(undefined, { skip: !me })

  const {
    data: publicProfile,
    isError: isPublicProfileError,
    isLoading: isPublicProfileLoading,
  } = useGetPublicUserProfileQuery({ profileId: +profileId }, { skip: !!me })

  const data = profile || publicProfile
  const isError = isProfileError || isPublicProfileError
  const isLoading = isProfileLoading || isPublicProfileLoading

  return { data, isError, isLoading, me }
}
