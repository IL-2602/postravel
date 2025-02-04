import { useRef, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { useForm } from 'react-hook-form'

import { useAppDispatch } from '@/app/store/hooks/useAppDispatch'
import { useAppSelector } from '@/app/store/hooks/useAppSelector'
import { usePasswordRecoveryMutation } from '@/services/authService/authEndpoints'
import { authActions } from '@/services/authService/store/slice/authEndpoints.slice'
import { FRONTEND_URL } from '@/shared/constants/frontendUrl'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { z } from 'zod'

const forgotPasswordFormSchema = z.object({
  email: z.string().trim().email('invalidEmailAddress').toLowerCase(),
})

export type ForgotPasswordForm = z.infer<typeof forgotPasswordFormSchema>
export const useContainer = () => {
  const publicKey = process.env.NEXT_PUBLIC_RECAPTCHA_API_KEY

  const [isOpen, setIsOpen] = useState(false)
  const [isResendLinkAgain, setIsResendLinkAgain] = useState(false)

  const token = useAppSelector(state => state.authReducer.recaptchaToken)

  const { locale } = useRouter()

  const dispatch = useAppDispatch()

  const handleSetToken = (token: string) => {
    dispatch(authActions.setRecaptchaToken(token))
  }

  const [passwordRecovery, { isLoading: isLoadingPasswordRecovery }] = usePasswordRecoveryMutation()

  const {
    control,
    formState: { errors, isValid },
    getValues,
    handleSubmit,
    setError,
  } = useForm<ForgotPasswordForm>({
    defaultValues: {
      email: '',
    },
    mode: 'onTouched',
    resolver: zodResolver(forgotPasswordFormSchema),
  })

  const { email } = getValues()
  const { t } = useTranslation()

  const emailError = errors.email?.message

  const isDisabled = !token || isLoadingPasswordRecovery || !email || !isValid

  const onSubmit = handleSubmit(async data => {
    if (typeof token === 'string') {
      const { email } = data

      passwordRecovery({
        baseUrl: FRONTEND_URL,
        email,
        recaptcha: token,
      })
        .unwrap()
        .then(() => {
          setIsOpen(true)
          dispatch(authActions.setEmail(email))
        })
        .catch(err => {
          console.log(err.data.messages)
          setError(err.data.messages[0].field, {
            message: err?.data?.messages[0].message,
          })
        })
    }
  })

  const captchaRef = useRef<ReCAPTCHA | null>(null)

  const handleCloseModal = (isOpen: boolean) => {
    setIsOpen(isOpen)
    if (captchaRef.current) {
      dispatch(authActions.setRecaptchaToken(''))
      captchaRef.current.reset()
    }
    setIsResendLinkAgain(true)
  }

  return {
    captchaRef,
    control,
    email,
    emailError,
    handleCloseModal,
    handleSetToken,
    isDisabled,
    isLoadingPasswordRecovery,
    isOpen,
    isResendLinkAgain,
    locale,
    onSubmit,
    publicKey,
    setIsOpen,
    t,
    token,
  }
}
