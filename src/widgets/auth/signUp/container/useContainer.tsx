import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { useSignUpMutation } from '@/services/authService/authEndpoints'
import { FRONTEND_URL } from '@/shared/constants/frontendUrl'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { passwordRegExp, userNameRegExp } from '@/shared/regexps'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const signUpSchema = z
  .object({
    email: z.string().trim().email('The email must match the format example@example.com'),
    password: z
      .string()
      .trim()
      .min(6, 'Minimum number of characters 6')
      .max(20, 'Maximum number of characters 20')
      .regex(
        passwordRegExp,
        'Password must contain 0-9, a-z, A-Z, ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _` { | } ~'
      ),
    passwordConfirmation: z
      .string()
      .regex(passwordRegExp)
      .trim()
      .min(6, 'Minimum number of characters 6')
      .max(20, 'Maximum number of characters 20'),
    termsAgreement: z.boolean(),
    userName: z
      .string()
      .regex(userNameRegExp, 'UserName must contain a-z, A-Z, 0-9')
      .trim()
      .min(6, 'Minimum number of characters 6')
      .max(30, 'Maximum number of characters 30'),
  })
  .refine(data => data.password === data.passwordConfirmation, {
    message: 'Passwords must match',
    path: ['passwordConfirmation'],
  })

export type SignUpFormSchema = z.infer<typeof signUpSchema>

export const useContainer = () => {
  const [isOpen, setIsOpen] = useState(false)
  const savedEmail = localStorage.getItem('savedEmail')
  const savedPassword = localStorage.getItem('savedPassword')
  const savedPasswordConfirmation = localStorage.getItem('savedPasswordConfirmation')
  const savedUserName = localStorage.getItem('savedUserName')

  const {
    control,
    formState: { dirtyFields, errors, isDirty },
    getValues,
    handleSubmit,
    setError,
  } = useForm<SignUpFormSchema>({
    defaultValues: {
      email: savedEmail || '',
      password: savedPassword || '',
      passwordConfirmation: savedPasswordConfirmation || '',
      termsAgreement: false,
      userName: savedUserName || '',
    },
    mode: 'onBlur',
    resolver: zodResolver(signUpSchema),
  })

  const { email, password, passwordConfirmation, userName } = getValues()

  localStorage.setItem('savedEmail', email)
  localStorage.setItem('savedPassword', password)
  localStorage.setItem('savedPasswordConfirmation', passwordConfirmation)
  localStorage.setItem('savedUserName', userName)

  const userNameErrorMessage = errors.userName?.message
  const emailErrorMessage = errors.email?.message
  const passwordErrorMessage = errors.password?.message
  const passwordConfirmationErrorMessage = errors.passwordConfirmation?.message

  const allErrors =
    userNameErrorMessage ||
    emailErrorMessage ||
    passwordErrorMessage ||
    passwordConfirmationErrorMessage

  const [signUp, { isLoading }] = useSignUpMutation()
  const isFormValid =
    (Object.keys(errors).length === 0 && isDirty && dirtyFields.termsAgreement) || isLoading

  const { t } = useTranslation()

  const onSubmit = handleSubmit((data: SignUpFormSchema) => {
    const { email, password, userName } = data

    signUp({ baseUrl: FRONTEND_URL, email, password, userName })
      .unwrap()
      .then(() => {
        setIsOpen(true)
        localStorage.removeItem('savedEmail')
        localStorage.removeItem('savedPassword')
        localStorage.removeItem('savedUserName')
        localStorage.removeItem('savedPasswordConfirmation')
      })
      .catch(err => {
        setError(err.data.messages[0].field, {
          message: err?.data?.messages[0].message,
        })
      })
  })

  const handleCloseModal = (isOpen: boolean) => {
    setIsOpen(isOpen)
  }

  const pointerOutsideClickHandler = () => setIsOpen(false)

  return {
    allErrors,
    control,
    email,
    emailErrorMessage,
    handleCloseModal,
    isFormValid,
    isLoading,
    isOpen,
    onSubmit,
    passwordConfirmationErrorMessage,
    passwordErrorMessage,
    pointerOutsideClickHandler,
    t,
    userNameErrorMessage,
  }
}
