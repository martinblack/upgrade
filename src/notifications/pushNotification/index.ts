import notifee, { TimestampTrigger, TriggerType } from '@notifee/react-native'
import { differenceInHours, differenceInMinutes } from 'date-fns'
import i18next from 'i18next'
import {
  MAX_FREQUENCY_IN_HOURS,
  MIN_DELAY_IN_MINUTES,
  CHANNEL_ID_PUSH,
  CHANNEL_NAME_PUSH,
} from '@/constants/notification'
import { useZudStore } from '@/store'

const DEFAULT = 'default'

export const pushNotification = async () => {
  const { lastNotificationTime, lastRecordingTime, setLastNotificationTime } =
    useZudStore.getState()
  const now = new Date()

  if (differenceInHours(now, lastNotificationTime) < MAX_FREQUENCY_IN_HOURS) return
  if (differenceInMinutes(now, lastRecordingTime) <= MIN_DELAY_IN_MINUTES) return

  const channelId = await notifee
    .createChannel({
      id: CHANNEL_ID_PUSH,
      name: CHANNEL_NAME_PUSH,
    })
    .catch(err => console.log(err))

  const timestamp = now.getTime() + 1000
  const trigger: TimestampTrigger = {
    type: TriggerType.TIMESTAMP,
    timestamp,
  }

  await notifee.createTriggerNotification(
    {
      title: i18next.t('notification.unuploadedRecordings'),
      body: i18next.t('notification.unuploadedRecordingsDesc'),
      android: {
        channelId: channelId || DEFAULT,
        pressAction: { id: DEFAULT, launchActivity: DEFAULT },
      },
    },
    trigger,
  )
  setLastNotificationTime(timestamp)
}
