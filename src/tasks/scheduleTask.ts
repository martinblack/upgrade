import { useSentryLogger } from '../hooks/useSentry'

export const isScheduleTaskAvailable = (status: boolean) => {
  if (!!status) return
  useSentryLogger({
    error: new Error('[BackgroundFetch:ScheduleTask:Status:Failed]'),
    extras: { status },
  })
}
