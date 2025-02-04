import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { useLogOutMutation } from '@/services/authService/authEndpoints'
import {
  useDeleteAllOtherSessionsMutation,
  useDeleteSessionMutation,
  useGetSessionsQuery,
} from '@/services/devicesService/devicesEndpoints'
import { ROUTES } from '@/shared/constants/routes'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { useRouter } from 'next/router'

export const useContainer = () => {
  const { t } = useTranslation()
  const router = useRouter()

  const [ip, setIp] = useState('')
  const [isLoadingIp, setIsLoadingIp] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [sessionLoadingState, setSessionLoadingState] = useState<{ [key: number]: boolean }>({})

  const { data: sessions, isLoading: isLoadingSessions } = useGetSessionsQuery()
  const [deleteSession] = useDeleteSessionMutation()
  const [deleteAllOtherSessions] = useDeleteAllOtherSessionsMutation()
  const [logOut, { isLoading: isLoadingLogOut }] = useLogOutMutation()

  const browser = sessions?.current?.browserName || 'Unknown'

  const isLoading = isLoadingSessions || isLoadingIp

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    const fetchIp = async () => {
      setIsLoadingIp(true)
      try {
        const resp = await fetch('https://api.ipify.org?format=json', { signal })
        const res = await resp.json()

        if (res?.ip) {
          setIp(res.ip)
        }
      } catch {
        console.log('')
      } finally {
        setIsLoadingIp(false)
      }
    }

    void fetchIp()

    return () => abortController.abort()
  }, [])

  const handleDeleteSession = async (deviceId: number | undefined) => {
    if (!deviceId) {
      return null
    }

    try {
      setSessionLoadingState({ ...sessionLoadingState, [deviceId]: true })
      if (deviceId === sessions?.current.deviceId) {
        handleLogOut()
      } else {
        await deleteSession({ deviceId }).unwrap()
      }
    } catch (err) {
      console.log(err)
    } finally {
      setSessionLoadingState({ ...sessionLoadingState, [deviceId]: false })
    }
  }

  const handleTerminateAllOtherSessions = () => {
    deleteAllOtherSessions()
      .unwrap()
      .then(() => toast.success('All other sessions have been deleted.'))
      .catch(err => toast.error(err.message))
  }

  const handleLogOut = async () => {
    try {
      await logOut().unwrap()

      void router.push(ROUTES.LOGIN)
      localStorage.clear()
    } catch (e) {
      console.error(e)
    } finally {
      setIsOpen(false)
    }
  }

  return {
    browser,
    handleDeleteSession,
    handleLogOut,
    handleTerminateAllOtherSessions,
    ip,
    isLoading,
    isLoadingLogOut,
    isOpen,
    sessionLoadingState,
    sessions,
    setIsOpen,
    t,
  }
}
