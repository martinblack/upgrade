import React, { useRef, useEffect, useState } from 'react'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/core'
import { useFocusEffect } from '@react-navigation/native'
import { Video } from 'expo-av'
import { Camera } from 'expo-camera'
import * as ScreenOrientation from 'expo-screen-orientation'
import { useMyEvents } from '../../hooks/useMyEvents'
import { ROUTES } from '../../navigation/routes'
import { RootStackParamList } from '../../navigation/types'
import { useTranslation } from 'react-i18next'
import { StatusBar, View } from 'react-native'
import { activateKeepAwake, deactivateKeepAwake } from 'expo-keep-awake'
import { selectorRecordingInterrupted, useZudStore } from '../../store'
import { EventObjectType } from '../../types'
import { filterUndefinedEvents } from '../../utils/filterUndefinedEvents'
import ControlButtons from './components/ControlButtons'
import EventSelector from './components/EventSelector'
import FlipPhoneMessage from './components/FlipPhoneMessage'
import Header from './components/Header'
import Time from './components/Time'
import WithoutPermission from './components/WithoutPemissions'
import { cameraConfig } from './contstants'
import { useCameraSize } from './hooks/useCameraSize'
import { usePermissions } from './hooks/usePermissions'
import {
  CameraBox,
  Container,
  HeaderAndTimeWrapper,
  LandscapeControlsWrapper,
  PortraitWrapper,
} from './styled'
import { convertOrientationToOrientationLock, getThumbnail, notifyAboutVideoAndAdd } from './utils'

const CameraPage = () => {
  const { params } = useRoute<RouteProp<{ params: RootStackParamList[ROUTES.CAMERA] }>>()
  const camera = useRef<Camera>(null)
  const { navigate } = useNavigation()
  const {
    hasAudioPermission,
    hasCameraPermission,
    isAudioPermissionUndetermined,
    isCameraPermissionUndetermined,
  } = usePermissions()
  const hasPermissions = hasAudioPermission && hasCameraPermission
  const arePermissionsUndetermined = isAudioPermissionUndetermined && isCameraPermissionUndetermined

  const [videoUri, setVideoUri] = useState<null | string>(null)

  const { data, loading: isLoading } = useMyEvents()
  const [displayEventSelector, setDisplayEventSelector] = useState(false)
  const events = filterUndefinedEvents(data)

  const [isRecording, setIsRecording] = useState(false)
  const isRecordingCurrent = useRef(isRecording)

  const recordingInterrupted = useZudStore(selectorRecordingInterrupted)
  const recordingInterruptedCurrent = useRef(recordingInterrupted)
  const setRecordingInterrupted = useZudStore.getState().setRecordingInterrupted

  useEffect(() => {
    if (!events || !params.eventId) {
      return setDisplayEventSelector(true)
    }

    const defaultEvent = events.filter(e => e).find(item => item?.node?.id === params.eventId)?.node

    if (!defaultEvent) {
      return setDisplayEventSelector(true)
    }

    setEvent(defaultEvent)
    setDisplayEventSelector(false)
  }, [isLoading])

  const [event, setEvent] = useState<EventObjectType>()

  const { width, height, isLandscape } = useCameraSize()
  const [startedAt, setStartedAt] = useState<Date | null>(null)
  const [shouldHide, setShouldHide] = useState(false)
  const { t } = useTranslation()

  useFocusEffect(() => {
    setShouldHide(false)
    return () => {
      setShouldHide(true)
    }
  })

  const processVideoData = (uri: string, duration: number, recordingInterrupted: boolean) => {
    setVideoUri(null)
    if (!event) return

    getThumbnail(uri)
      .then(async thumbnail => {
        await notifyAboutVideoAndAdd(event, uri, duration, thumbnail)
      })
      .catch(async err => {
        console.error(err)
        await notifyAboutVideoAndAdd(event, uri, duration, {
          uri: '',
          width: 0,
          height: 0,
        })
      })
      .finally(() => {
        if (!recordingInterrupted) {
          navigate(ROUTES.ROOT, {
            screen: ROUTES.SHARED_STACK,
            params: {
              screen: ROUTES.EVENT_DETAIL,
              params: { eventId: event.id, image: event.image, noAnimation: true },
            },
            initial: false,
          })
        }
      })
  }

  const lockScreen = async () => {
    const orientation = await ScreenOrientation.getOrientationAsync()
    const orientationLock = convertOrientationToOrientationLock(orientation)
    console.log(`Orientation: ${orientation} | OrientationLock: ${orientationLock}`)
    await ScreenOrientation.lockAsync(orientationLock)
    console.log('Locked', orientationLock)
  }

  const takeVideo = async () => {
    activateKeepAwake()
    setVideoUri(null)
    setIsRecording(true)
    const startAt = new Date(new Date().getTime() + 1000)
    setStartedAt(startAt)
    await lockScreen()
  }

  useEffect(() => {
    isRecordingCurrent.current = isRecording
    recordingInterruptedCurrent.current = recordingInterrupted

    const startRecording = async () => {
      if (camera.current) {
        const { uri } = await camera.current.recordAsync(cameraConfig)
        setVideoUri(uri)
        console.log('Video record end:', uri)

        if (isRecordingCurrent.current) {
          console.log(
            'Video record ended but isRecording === true => camera recording has been interrupted',
          )
          setRecordingInterrupted(true)
          stopVideo() // For updating UI / stop timer, change record button
        }
      }
    }

    if (isRecording) {
      startRecording()
    }
  }, [isRecording])

  const stopVideo = async () => {
    camera?.current?.stopRecording()
    setIsRecording(false)
    setStartedAt(null)
    await ScreenOrientation.unlockAsync()
    deactivateKeepAwake()
  }

  if (shouldHide) {
    return null
  }

  const headerProps = {
    displaySearchIcon: !isRecording,
    band: event?.name || '',
    place: event?.city || '',
    onSearchPress: () => setDisplayEventSelector(true),
  }
  const timeProps = {
    isLandscape,
    isRecording,
    startedAt,
  }
  const controlButtonsProps = {
    isRecording: isRecording,
    isCloseBtnHidden: displayEventSelector,
    onStart: takeVideo,
    onStop: stopVideo,
  }

  const navigateRoot = () => navigate(ROUTES.ROOT)

  return (
    <Container>
      <StatusBar hidden />
      {!hasPermissions && !arePermissionsUndetermined && (
        <WithoutPermission onClose={navigateRoot} />
      )}
      {displayEventSelector && (arePermissionsUndetermined || hasPermissions) && (
        <EventSelector
          onClose={() => (!event ? navigateRoot() : setDisplayEventSelector(false))}
          onEventSelect={event => {
            setEvent(event)
            setDisplayEventSelector(false)
          }}
          isLandscape={isLandscape}
        />
      )}
      <CameraBox
        style={{
          width,
          height,
        }}>
        {isLandscape ? (
          <LandscapeControlsWrapper>
            <HeaderAndTimeWrapper>
              <Header {...headerProps} />
              <Time {...timeProps} />
            </HeaderAndTimeWrapper>
            <ControlButtons {...controlButtonsProps} />
          </LandscapeControlsWrapper>
        ) : (
          <PortraitWrapper>
            <View>
              <Header {...headerProps} asBlackBox />
              {isRecording ? <Time {...timeProps} /> : <FlipPhoneMessage />}
            </View>
            <ControlButtons {...controlButtonsProps} />
          </PortraitWrapper>
        )}
      </CameraBox>
      {hasCameraPermission && (
        <Camera
          ref={camera}
          ratio="16:9"
          style={{
            width,
            height,
          }}
        />
      )}
      {videoUri && !isRecording && (
        <Video
          source={{ uri: videoUri }}
          onLoad={({ durationMillis }: any) => {
            processVideoData(videoUri, durationMillis, recordingInterruptedCurrent.current)
          }}
        />
      )}
    </Container>
  )
}

export default CameraPage
