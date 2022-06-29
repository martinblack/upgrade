import notifee, { AndroidLaunchActivityFlag, EventDetail, EventType } from '@notifee/react-native'
import { ActionIds } from '@/constants/notification'
import translation from 'i18next'
import { DEFAULT_THEME } from '@/constants/themes/defaultTheme'

const DEFAULT = 'default'

export const getNotification = (
  channelId: string,
  notificationId: string,
  title: string,
  body: string,
  progress: number,
) => ({
  id: notificationId,
  title,
  body,
  android: {
    channelId,
    onlyAlertOnce: true,
    progress: { max: 100, current: progress },
    color: DEFAULT_THEME.colors.primary,
    pressAction: {
      id: DEFAULT,
      launchActivity: DEFAULT,
      launchActivityFlags: [AndroidLaunchActivityFlag.SINGLE_TOP],
    },
    actions: [
      {
        title: translation.t('notification.cancel'),
        pressAction: {
          id: ActionIds.CANCEL,
        },
      },
    ],
  },
})

export const initializeNotification = async (
  channelId: string,
  channelName: string,
  notificationId: string,
  title: string,
) => {
  try {
    await notifee.createChannel({
      id: channelId,
      name: channelName,
    })

    await notifee.displayNotification(
      getNotification(channelId, notificationId, title, translation.t('notification.starting'), 0),
    )
  } catch (e) {}
}

const getProgressValue = (percentualProgress: number) =>
  Math.min(100, Number((percentualProgress * 100).toFixed(2)))

export const updateNotification = async (
  channelId: string,
  notificationId: string,
  eventName: string,
  percentualProgress: number | undefined = undefined,
) => {
  await notifee
    .displayNotification(
      getNotification(
        channelId,
        notificationId,
        eventName,
        `${translation.t('notification.uploaded')} ${getProgressValue(percentualProgress ?? 0)} %`,
        getProgressValue(percentualProgress ?? 0),
      ),
    )
    .catch(err => console.log(err))
}

export const cancelUploadNotification = (channelId: string, onSuccess: () => void) => {
  notifee
    .deleteChannel(channelId)
    .then(() => onSuccess())
    .catch(err => console.log(err))
}

export const handleEvent = async (type: EventType, detail: EventDetail, onCancel: () => void) => {
  const actionId = detail?.pressAction?.id

  if (type === EventType.ACTION_PRESS && actionId === ActionIds.CANCEL) return onCancel()
}
