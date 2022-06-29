import * as React from 'react'
import * as SplashScreen from 'expo-splash-screen'

const DELAY = 6000

export const SplashManager: React.FC<{ shouldShowSplash: boolean }> = ({ shouldShowSplash }) => {
  // * Ensure that the Splash will be hidden after delay max 6 seconds
  const [forceShow, dispatchForceShow] = React.useState(false)

  React.useEffect(() => {
    if (shouldShowSplash || forceShow) {
      void SplashScreen.hideAsync().catch(console.warn)
    }
  }, [shouldShowSplash, forceShow])

  React.useEffect(() => {
    const timeout = setTimeout(() => dispatchForceShow(true), DELAY)

    return () => clearTimeout(timeout)
  }, [])

  return null
}

export default SplashManager
