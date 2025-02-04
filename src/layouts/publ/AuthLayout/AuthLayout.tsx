import { PropsWithChildren } from 'react'

import { Header } from '@/shared/components/Header/Header'
import { Container } from '@/shared/ui/Container'
import { Wrapper } from '@/shared/ui/Wrapper'
import { NextPage } from 'next'

import s from './AuthLayout.module.scss'

export const AuthLayout: NextPage<PropsWithChildren> = props => {
  const { children } = props

  return (
    <Wrapper>
      <Header />
      <main className={s.main}>
        <Container className={s.container}>{children}</Container>
      </main>
    </Wrapper>
  )
}
