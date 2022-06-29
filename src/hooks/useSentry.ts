import * as Sentry from '@sentry/react-native'
import { Primitive } from '@sentry/types'

type Tags = {
  [key: string]: Primitive
}
type Extras = Record<string, unknown>
type Message = string
interface UseSentryLoggerProps {
  error?: Error | unknown
  extras?: Extras
  tags?: Tags
  message?: Message
}

export const useSentryLogger = ({ error, extras, tags, message }: UseSentryLoggerProps) => {
  !__DEV__ &&
    Sentry.withScope(scope => {
      tags && scope.setTags(tags)
      extras && scope.setExtras(extras)
      message && Sentry.captureMessage(message)
      error && Sentry.captureException(error)
    })
}
