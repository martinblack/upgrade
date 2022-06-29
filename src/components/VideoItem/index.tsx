import { Box } from '@/components/_essentials/Box'
import React, { useRef } from 'react'
import { SideTag } from './styled'
import { useTranslation } from 'react-i18next'
import { Swipeable } from 'react-native-gesture-handler'
import { DeletePanel } from './_components/DeletePanel'
import { useTheme } from 'styled-components'
import { Alert, Dimensions } from 'react-native'
import VideoBox from './_components/VideoBox'
import { selectorIsRunning, useZudStore } from '@/store'

interface Props {
  isMine?: boolean
  title: string
  updatedDate: Date
  length: string
  isLoading?: boolean
  isUploaded?: boolean
  onDelete?: () => void
  thumbnail?: any
  uri: string
  sharedUri: string
  sharedTitle: string
}

const VideoItem: React.FC<Props> = ({
  isMine,
  title,
  updatedDate,
  length,
  isLoading,
  onDelete,
  isUploaded,
  thumbnail,
  uri,
  sharedUri,
  sharedTitle,
}: Props) => {
  const theme = useTheme()
  const { t } = useTranslation()
  const swipeableRef = useRef(null)
  const isTaskRunning = useZudStore(selectorIsRunning)

  const handleDelete = () => {
    ;(swipeableRef.current as any).close()
    if (isTaskRunning) {
      Alert.alert(t('alert.cannotDelete'), t('alert.cannotDeleteDesc'))
    } else {
      onDelete?.()
      isMine && useZudStore.getState().removeVideo(uri)
    }
  }

  return (
    <Box flex={1} justify={'center'} width={Dimensions.get('window').width}>
      {isMine && (
        <Swipeable
          ref={swipeableRef}
          renderRightActions={() => (
            <DeletePanel onPress={handleDelete} backgroundColor={theme.colors.primary} />
          )}>
          {isMine && <SideTag isMine={isMine} />}
          <VideoBox
            isMine
            title={title}
            updatedDate={updatedDate}
            length={length}
            uri={uri}
            sharedUri={sharedUri}
            sharedTitle={sharedTitle}
            isLoading={isLoading}
            isUploaded={isUploaded}
            thumbnail={thumbnail}
          />
        </Swipeable>
      )}
      {!isMine && (
        <VideoBox
          isFinalCut
          title={title}
          updatedDate={updatedDate}
          length={length}
          uri={uri}
          sharedUri={sharedUri}
          sharedTitle={sharedTitle}
          thumbnail={thumbnail}
        />
      )}
    </Box>
  )
}

export default VideoItem
