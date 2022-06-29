import { useZudStore } from '../store'
import auth from '@react-native-firebase/auth'
import { hasConnectionForUpload } from '../utils/hasConnectionForUpload'

type CheckTaskAvailability = { isAvailable: boolean; error?: Error | unknown }
export const checkTaskAvailability = async (): Promise<CheckTaskAvailability> => {
  try {
    const hasConnection = await hasConnectionForUpload()

    // * Check mobile network connection
    if (!hasConnection) {
      return { isAvailable: false, error: new Error('[BackgroundTaskEvent:No:Connection]') }
    }

    // * Check if user session exists
    const user = auth()?.currentUser
    if (!user) {
      return { isAvailable: false, error: new Error('[BackgroundTaskEvent:Missing:User]') }
    }

    // * Check if user is anonymous
    if (user.isAnonymous) {
      return { isAvailable: false, error: new Error('[BackgroundTaskEvent:User:Is:Anonymous]') }
    }

    // * Check if the id token exits and force refreshing a session
    const idToken = await user.getIdToken(true)
    if (!idToken) {
      return { isAvailable: false, error: new Error('[BackgroundTaskEvent:Not:Id:Token]') }
    }

    const uploadQueue = useZudStore.getState().queue

    // * Check if the queue is empty
    if (uploadQueue.length === 0) {
      return { isAvailable: false, error: new Error('[BackgroundTaskEvent:Queue:Is:Empty]') }
    }

    return { isAvailable: true }
  } catch (error) {
    // * Handle random async error
    return { isAvailable: false, error }
  }
}
