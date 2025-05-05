'use client'

import { useSession, signOut } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

import { getUserAnalysisUsage } from '@/actions/userAnalysis'
import { LimitReachedDialog } from '@/components/limit-reached-dialog'
import LoginForm from '@/components/login/login-form'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'

const TOTAL_TIMES = 10

interface UserContextType {
  // Authentication
  isAuthenticated: boolean
  userId: string | undefined

  // Login dialog
  isLoginModalOpen: boolean
  showLoginModal: () => void
  hideLoginModal: () => void

  // Usage limits
  usageCount: number
  loading: boolean
  isLimitReached: boolean
  totalCredits: number
  remainingCredits: number

  // Limit reached dialog
  isLimitReachedDialogOpen: boolean
  showLimitReachedDialog: () => void
  hideLimitReachedDialog: () => void

  // Actions
  login: () => void
  logout: () => void
  refreshUsage: () => void

  // Utility functions
  checkLimitAndAuthentication: () => boolean
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const t = useTranslations('userProvider')
  const { data: session, status } = useSession()
  const userId = session?.user?.id

  // Login modal state
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  // Usage state
  const [usageCount, setUsageCount] = useState<number>(0)
  const [loading, setLoading] = useState(true)

  // Limit reached dialog state
  const [isLimitReachedDialogOpen, setIsLimitReachedDialogOpen] = useState(false)

  const isAuthenticated = status === 'authenticated' && !!userId
  const isLimitReached = usageCount >= TOTAL_TIMES
  const remainingCredits = Math.max(0, TOTAL_TIMES - usageCount)

  // Fetch usage data when user is authenticated
  useEffect(() => {
    if (isAuthenticated && userId) {
      fetchUsage(userId)
    } else {
      setLoading(false)
    }
  }, [isAuthenticated, userId])

  const fetchUsage = async (id: string) => {
    try {
      setLoading(true)
      const count = await getUserAnalysisUsage(id)
      setUsageCount(count)
    } catch (error) {
      console.error(t('errorFetchingUsage'), error)
    } finally {
      setLoading(false)
    }
  }

  // Dialog control functions
  const showLoginModal = () => setIsLoginModalOpen(true)
  const hideLoginModal = () => setIsLoginModalOpen(false)
  const showLimitReachedDialog = () => setIsLimitReachedDialogOpen(true)
  const hideLimitReachedDialog = () => setIsLimitReachedDialogOpen(false)

  // Authentication actions
  const login = async () => {
    showLoginModal()
  }

  const logout = async () => {
    await signOut()
  }

  // Refresh usage data
  const refreshUsage = async () => {
    if (userId) {
      await fetchUsage(userId)
    }
  }

  // Utility function to check if user can perform an action
  const checkLimitAndAuthentication = () => {
    if (!isAuthenticated) {
      showLoginModal()
      return false
    }

    if (isLimitReached) {
      showLimitReachedDialog()
      return false
    }

    return true
  }

  return (
    <UserContext.Provider
      value={{
        // Authentication
        isAuthenticated,
        userId,

        // Login dialog
        isLoginModalOpen,
        showLoginModal,
        hideLoginModal,

        // Usage limits
        usageCount,
        loading,
        isLimitReached,
        totalCredits: TOTAL_TIMES,
        remainingCredits,

        // Limit reached dialog
        isLimitReachedDialogOpen,
        showLimitReachedDialog,
        hideLimitReachedDialog,

        // Actions
        login,
        logout,
        refreshUsage,

        // Utility functions
        checkLimitAndAuthentication
      }}
    >
      {children}

      {/* Global modals */}
      <LoginModalWrapper open={isLoginModalOpen} onOpenChange={setIsLoginModalOpen} />

      <LimitReachedDialog open={isLimitReachedDialogOpen} onOpenChange={setIsLimitReachedDialogOpen} />
    </UserContext.Provider>
  )
}

// Custom hook to use the user context
export const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

// Wrapper component for the login modal
function LoginModalWrapper({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const t = useTranslations('userProvider.loginModal')

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">{t('title')}</DialogTitle>
          <DialogDescription className="text-center">{t('description')}</DialogDescription>
        </DialogHeader>
        <LoginForm onSuccess={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  )
}
