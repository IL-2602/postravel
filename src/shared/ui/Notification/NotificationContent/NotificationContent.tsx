import { forwardRef } from 'react'

import {
  GetNotificationsResponse,
  NotificationItem,
} from '@/services/notificationService/lib/notificationEndpoints.types'
import { useChangeNotificationMutation } from '@/services/notificationService/notificationEndpoints'
import { SpinnerThreePoints } from '@/shared/ui/SpinnerThreePoints'
import { Typography } from '@/shared/ui/Typography'

import s from './NotificationContent.module.scss'

export const NotificationContent = forwardRef<HTMLDivElement, Props>(
  ({ inView, isFetching, notifications }, ref) => {
    const customNot = [
      {
        clientId: 'ZGl2NHugowmOgpgNAAjT',
        eventType: 1,
        id: 1824,
        isRead: false,
        message: 'Your subscription has been activated and is valid until 07/05/2024.',
        notifyAt: '2024-06-17T15:21:57.395Z',
      },
      {
        clientId: 'ZGl2NHugowmOgpgNAAjT',
        eventType: 1,
        id: 1825,
        isRead: false,
        message: 'Your subscription has been activated and is valid until 07/05/2024.',
        notifyAt: '2024-06-17T15:21:57.395Z',
      },
    ]
    const [changeNotification] = useChangeNotificationMutation()
    const readingNotification = (notification: NotificationItem) => {
      if (!notification.isRead) {
        changeNotification({ ids: [notification.id] })
      }
    }

    return (
      <div className={s.content}>
        <div className={!notifications.items.length ? s.mainTitle : ''}>
          <Typography as={'h3'} className={s.title} variant={'medium16'}>
            Уведомления
          </Typography>
        </div>
        <>
          {notifications.items.length ? (
            notifications.items.map(n => {
              const notifyAtUtil = (date: string) => {
                return new Date(date).toLocaleDateString()
              }

              return (
                <div className={s.element} key={n.id} onMouseEnter={() => readingNotification(n)}>
                  <div className={s.newNotificationContainer}>
                    <div>{n.id}</div>
                    <Typography as={'h4'} className={s.title} variant={'medium16'}>
                      Новое уведомление!
                    </Typography>
                    {!n.isRead && (
                      <>
                        <Typography className={s.new} variant={'regular14'}>
                          Новое
                        </Typography>
                      </>
                    )}
                  </div>
                  <Typography>{n.message}</Typography>
                  <Typography className={s.notifyAt}>{notifyAtUtil(n.notifyAt)}</Typography>
                </div>
              )
            })
          ) : (
            <Typography as={'h3'} className={s.not} variant={'h1'}>
              Уведомлений нет
            </Typography>
          )}
        </>
        {isFetching && (
          <div className={s.spinner}>
            <SpinnerThreePoints />
          </div>
        )}
        <div className={s.inView} ref={ref}></div>
      </div>
    )
  }
)
type Props = {
  inView: boolean
  isFetching: boolean
  notifications: GetNotificationsResponse
}
