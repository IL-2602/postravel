import { useEffect, useState } from 'react'

import { useAppSelector } from '@/app/store/hooks/useAppSelector'
import { useTranslation } from '@/shared/hooks/useTranslation'
import getFromLocalStorage from '@/shared/utils/localStorage/getFromLocalStorage'
import saveToLocalStorage from '@/shared/utils/localStorage/saveToLocalStorage'

export const useContainer = () => {
  const { t } = useTranslation()

  const [selectedTab, setSelectedTab] = useState(getFromLocalStorage('selectedTab', 'tab1'))

  const handleTabChange = (value: string) => {
    setSelectedTab(value)
    saveToLocalStorage('selectedTab', value)
  }

  const isPrivacyPolicy = useAppSelector(state => state.profileReducer.isPrivacyPolicy)

  useEffect(() => {
    const storedTab = getFromLocalStorage('selectedTab', 'tab1')

    if (storedTab) {
      setSelectedTab(storedTab)
    }
  }, [])

  return { handleTabChange, isPrivacyPolicy, selectedTab, t }
}
