import { Camera } from 'expo-camera'
import { useEffect, useState } from 'react'

export const usePermissions = () => {
  const [hasAudioPermission, setHasAudioPermission] = useState(false)
  const [hasCameraPermission, setHasCameraPermission] = useState(false)
  const [isAudioPermissionUndetermined, setIsAudioPermissionUndetermined] = useState(true)
  const [isCameraPermissionUndetermined, setIsCameraPermissionUndetermined] = useState(true)

  useEffect(() => {
    ;(async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync()
      const audioStatus = await Camera.requestMicrophonePermissionsAsync()

      setHasCameraPermission(cameraStatus.status === 'granted')
      setHasAudioPermission(audioStatus.status === 'granted')
      setIsCameraPermissionUndetermined(cameraStatus.status !== 'undetermined' && false)
      setIsAudioPermissionUndetermined(audioStatus.status !== 'undetermined' && false)
    })()
  }, [])

  return {
    hasAudioPermission,
    hasCameraPermission,
    isAudioPermissionUndetermined,
    isCameraPermissionUndetermined,
  }
}
