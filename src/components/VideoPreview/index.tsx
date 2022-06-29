import React, { useRef, useState, useEffect } from 'react'
import { ActionWrapper, VideoTag, TagText, VideoThumbnail, Wrapper } from './styled'
import placeholder from '../../assets/images/placeholder.png'
import PlayButton from '@/components/Buttons/PlayButton'
import CancelButton from '@/components/Buttons/CancelButton'
import { Circle } from 'react-native-progress'
import { Video, VideoFullscreenUpdateEvent } from 'expo-av'
import * as ScreenOrientation from 'expo-screen-orientation'

import { useTheme } from 'styled-components'
import { hexToRGBA } from '@/utils/hexToRGBA'
import { Platform } from 'react-native'
import { useTranslation } from 'react-i18next'

interface Props {
  length: string
  isLoading?: boolean
  progress?: number
  onCancel: () => void
  isUploading?: boolean
  thumbnail?: any
  uri?: string
  isFinalCut?: boolean
}

const VideoPreview: React.FC<Props> = ({
  length,
  isLoading,
  progress,
  onCancel,
  isUploading,
  thumbnail,
  uri,
  isFinalCut,
}: Props) => {
  const { t } = useTranslation()
  const theme = useTheme()
  const [videoMounted, setVideoMounted] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const alphaBlack = hexToRGBA(theme.colors.black)
  const videoRef = useRef<Video>(null)

  useEffect(() => {
    if (videoMounted && videoLoaded) videoRef.current!.presentFullscreenPlayer()
  }, [videoMounted, videoLoaded])

  const onFullscreenUpdate = async ({ fullscreenUpdate }: VideoFullscreenUpdateEvent) => {
    switch (fullscreenUpdate) {
      case Video.FULLSCREEN_UPDATE_PLAYER_DID_PRESENT:
        await videoRef.current!.playAsync()
        if (Platform.OS === 'android') await ScreenOrientation.unlockAsync()
        break
      case Video.FULLSCREEN_UPDATE_PLAYER_WILL_DISMISS:
        if (Platform.OS === 'android')
          await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
        await videoRef.current!.pauseAsync()
        break
      case Video.FULLSCREEN_UPDATE_PLAYER_DID_DISMISS:
        setVideoMounted(false)
        setVideoLoaded(false)
        break
    }
  }

  return (
    <Wrapper>
      <VideoThumbnail source={{ uri: thumbnail } || placeholder} resizeMode="cover" />
      {isFinalCut && (
        <VideoTag height={21} backgroundColor={alphaBlack(0.7)} top={5} left={5}>
          <TagText allowFontScaling={false} font={'inter400'} size={10} height={12}>
            {t('video.finalCut')}
          </TagText>
        </VideoTag>
      )}

      <VideoTag height={26} bottom={4} right={4} backgroundColor={alphaBlack(0.7)}>
        <TagText allowFontScaling={false} font={'inter300'} size={15} height={18}>
          {length}
        </TagText>
      </VideoTag>
      {!isLoading && !isUploading ? (
        <ActionWrapper>
          <PlayButton
            onPress={() => {
              if (!uri) return alert('Video not found')
              setVideoMounted(true)
            }}
          />
        </ActionWrapper>
      ) : (
        <>
          <ActionWrapper>
            <Circle
              color={'white'}
              size={48}
              strokeCap={'square'}
              progress={progress}
              borderWidth={0}
            />
          </ActionWrapper>
          <ActionWrapper>
            <CancelButton onPress={onCancel} />
          </ActionWrapper>
        </>
      )}
      {videoMounted && (
        <Video
          ref={videoRef}
          source={{
            uri: uri!,
          }}
          resizeMode="contain"
          useNativeControls
          onFullscreenUpdate={onFullscreenUpdate}
          onPlaybackStatusUpdate={playbackStatus => setVideoLoaded(playbackStatus.isLoaded)}
        />
      )}
    </Wrapper>
  )
}

export default VideoPreview
