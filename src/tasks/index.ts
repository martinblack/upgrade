import BackgroundFetch from 'react-native-background-fetch'
import { backgroundFetchConfig, scheduleTaskConfig } from './config'
import { isBackgroundFetchAvailable, onEvent, onTimeout } from './backgroundFetch'
import { isScheduleTaskAvailable } from './scheduleTask'

export * from './videoUploader'
export * from './checkTaskAvailability'
export * from './setTaskStoreState'
export * from './types'

export const initBackgroundTasks = () => {
  void BackgroundFetch.configure(backgroundFetchConfig, onEvent, onTimeout).then(
    isBackgroundFetchAvailable,
  )
  void BackgroundFetch.scheduleTask(scheduleTaskConfig).then(isScheduleTaskAvailable)
}
