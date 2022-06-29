import { Box } from '@/components/_essentials/Box'
import React from 'react'
import { UploadedDate, Label } from './styled'
import VideoPreview from '@/components/VideoPreview'
import { ContentTitle } from '@/components/_essentials/Text/ContentTitle'
import { useTranslation } from 'react-i18next'
import { Shadow } from 'react-native-shadow-2'
import { hexToRGBA } from '@/utils/hexToRGBA'
import { useTheme } from 'styled-components'
import { Alert, TouchableOpacity } from 'react-native'
import ShareButton from '@/components/Buttons/ShareButton'
import { resolveVideoDate } from '@/utils/resolveVideoDate'
import { getFixedLength } from '@/utils/getFixedLength'
import { useManualUpload } from '@/components/VideoItem/_upload/useManualUpload'
import { DoneIcon } from '@/components/SvgIcons/DoneIcon'
import { ROUTES } from '@/navigation/routes'
import { useNavigation } from '@react-navigation/native'
import {
  selectorIsAnonymous,
  selectorIsForegroundRunning,
  selectorIsRunning,
  useZudStore,
} from '../../../../store'

interface Props {
  isMine?: boolean
  title: string
  updatedDate: Date
  length: string
  isLoading?: boolean
  progress?: number
  isUploaded?: boolean
  isUploading?: boolean
  thumbnail?: any
  uri: string
  sharedUri: string
  sharedTitle: string
  isFinalCut?: boolean
}

const VideoBox: React.FC<Props> = ({
  isMine,
  title,
  updatedDate,
  length,
  isLoading,
  isUploaded,
  thumbnail,
  uri,
  sharedUri,
  sharedTitle,
  isFinalCut,
}: Props) => {
  const isAnonymous = useZudStore(selectorIsAnonymous)
  const theme = useTheme()
  const { t } = useTranslation()
  const { navigate } = useNavigation()
  const isTaskRunning = useZudStore(selectorIsRunning)
  const isForegroundTaskRunning = useZudStore(selectorIsForegroundRunning)
  const { isUploading, progress, start, cancel } = useManualUpload(uri, title)

  const alphaBlue = hexToRGBA(theme.colors.secondary)

  return (
    <Box marginLeft={15} marginRight={15} marginTop={7.5} marginBottom={7.5}>
      <Shadow
        startColor={isMine ? alphaBlue(0.25) : theme.colors.transparent}
        finalColor={theme.colors.transparent}
        radius={6}
        viewStyle={{ alignSelf: 'stretch' }}
        distance={10}>
        <Box
          roundness={6}
          height={100}
          backgroundColor={theme.colors.bg0}
          flex={1}
          flexDirection={'row'}
          overflow={'hidden'}>
          <VideoPreview
            length={getFixedLength(length)}
            isLoading={isLoading}
            progress={progress / 100}
            onCancel={cancel}
            isUploading={isUploading}
            thumbnail={thumbnail}
            uri={uri}
            isFinalCut={isFinalCut}
          />
          <Box
            flex={1}
            flexDirection="column"
            justify="space-between"
            paddingLeft={10}
            paddingRight={10}
            paddingTop={10}>
            <ContentTitle allowFontScaling={false}>{title}</ContentTitle>
            <Box
              flexDirection="row"
              justify="space-between"
              alignItems={'center'}
              paddingBottom={6}>
              <Box flexDirection="row" justify="center">
                {isMine && isUploaded && (
                  <Box paddingTop={3}>
                    <DoneIcon />
                  </Box>
                )}
                {isMine && !isUploaded && !isUploading && (
                  <TouchableOpacity
                    disabled={isTaskRunning || isForegroundTaskRunning}
                    onPress={() =>
                      !isAnonymous
                        ? start()
                        : Alert.alert(t('alert.cannotUpload'), t('alert.cannotUploadDesc'), [
                            {
                              text: 'OK',
                              onPress: () => navigate(ROUTES.PROFILE, {}),
                            },
                          ])
                    }>
                    <Label
                      allowFontScaling={false}
                      isDisabled={isTaskRunning || isForegroundTaskRunning}>
                      {t(`video.upload`)}
                    </Label>
                  </TouchableOpacity>
                )}
                {isMine && !isUploaded && isUploading && (
                  <TouchableOpacity onPress={cancel}>
                    <Label allowFontScaling={false}>{t(`video.cancel`)}</Label>
                  </TouchableOpacity>
                )}
                <Box marginLeft={isMine ? 7 : 0}>
                  <ShareButton sharedUri={sharedUri} sharedTitle={sharedTitle} isMine={isMine} />
                </Box>
              </Box>
              <UploadedDate allowFontScaling={false}>
                {resolveVideoDate(new Date(updatedDate), t)}
              </UploadedDate>
            </Box>
          </Box>
        </Box>
      </Shadow>
    </Box>
  )
}

export default VideoBox
