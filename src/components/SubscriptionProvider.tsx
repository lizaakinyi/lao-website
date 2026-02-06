'use client'

import { createContext, useCallback, useContext, useEffect, useState } from 'react'

type SubscriptionContextType = {
  isSubscribed: boolean
  subscribe: () => void
  showModal: () => void
  hideModal: () => void
  isModalOpen: boolean
}

const SubscriptionContext = createContext<SubscriptionContextType>({
  isSubscribed: false,
  subscribe: () => {},
  showModal: () => {},
  hideModal: () => {},
  isModalOpen: false,
})

const STORAGE_KEY = 'lao_subscribed'

export function useSubscription() {
  return useContext(SubscriptionContext)
}

export function SubscriptionProvider({ children }: { children: React.ReactNode }) {
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    setIsSubscribed(localStorage.getItem(STORAGE_KEY) === 'true')
  }, [])

  const subscribe = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, 'true')
    setIsSubscribed(true)
    setIsModalOpen(false)
  }, [])

  const showModal = useCallback(() => setIsModalOpen(true), [])
  const hideModal = useCallback(() => setIsModalOpen(false), [])

  return (
    <SubscriptionContext.Provider
      value={{ isSubscribed, subscribe, showModal, hideModal, isModalOpen }}
    >
      {children}
    </SubscriptionContext.Provider>
  )
}
