import React from 'react'
import { useRouter } from 'expo-router'
import * as Notifications from 'expo-notifications'

export function Notification() {
  const router = useRouter()

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldPlaySound: true,
      shouldSetBadge: true,
      shouldShowAlert: true,
    }),
  })

  React.useEffect(() => {
    const subReceived = Notifications.addNotificationReceivedListener((notification) => {
      console.log(notification.request.content.data)
    })
    const subResponseReceived = Notifications.addNotificationResponseReceivedListener(
      (notification) => {
        const alias = notification.notification.request.content.data.alias
        router.push(`/(app)/course/${alias}`)
      },
    )

    return () => {
      subReceived.remove()
      subResponseReceived.remove()
    }
  }, [])
  return <></>
}
