import { Box } from '@/components/_essentials/Box'
import React from 'react'
import { DateText, InfoContainer, Wrapper } from './styled'
import { useTranslation } from 'react-i18next'
import VideoPreview from '@/components/VideoPreview'
import ShareButton from '@/components/Buttons/ShareButton'
import { resolveVideoDate } from '@/utils/resolveVideoDate'

interface Props {
  isLoading: boolean
  progress: number
  onCancel: () => void
  isUploading: boolean
  thumbnail?: any
  //creatorsCount: number;
  date: Date
  duration: number
  uri: string
}

const FinalCut: React.FC<Props> = ({
  isLoading,
  progress,
  onCancel,
  isUploading,
  thumbnail,
  //creatorsCount,
  date,
  duration,
  uri,
}: Props) => {
  const { t } = useTranslation()

  return (
    <Wrapper>
      <VideoPreview
        length={duration.toString()}
        isLoading={isLoading}
        progress={progress}
        onCancel={onCancel}
        isUploading={isUploading}
        thumbnail={thumbnail}
        uri={uri}
      />
      <InfoContainer>
        <Box paddingRight={5}>
          <ShareButton sharedUri={uri} />
        </Box>
        <Box>
          {/* <CreatorsCountText>
            {creatorsCount} {t("screens.events.creators")}
          </CreatorsCountText> */}
          <DateText allowFontScaling={false}>{resolveVideoDate(date, t)}</DateText>
        </Box>
      </InfoContainer>
    </Wrapper>
  )
}

export default FinalCut
