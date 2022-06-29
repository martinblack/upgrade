import BackgroundFetch from 'react-native-background-fetch'
import { TASKS } from './types'

export const backgroundFetchConfig = {
  minimumFetchInterval: 15,
  stopOnTerminate: false,
  enableHeadless: true,
  startOnBoot: true,
  forceAlarmManager: true,
  requiredNetworkType: BackgroundFetch.NETWORK_TYPE_ANY,
  requiresCharging: false,
  requiresDeviceIdle: false,
  requiresBatteryNotLow: false,
  requiresStorageNotLow: false,
}

export const scheduleTaskConfig = {
  taskId: TASKS.VIDEO_UPLOAD,
  delay: 15 * 60 * 1000,
  forceAlarmManager: true,
  periodic: true,
}
