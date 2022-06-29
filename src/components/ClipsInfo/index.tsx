import React from 'react'
import { Box } from '@/components/_essentials/Box'
import { VideoIcon } from '@/components/SvgIcons/VideoIcon'
import { useTranslation } from 'react-i18next'
import { useTheme } from 'styled-components'
import { Paragraph } from '@/components/_essentials/Text/Paragraph'

interface Props {
  isUploaded?: boolean
  clipsCount: number
}

const ClipsInfo: React.FC<Props> = ({ isUploaded, clipsCount }: Props) => {
  const { t } = useTranslation()
  const theme = useTheme()
  return (
    <Box flexDirection="row" alignItems="center">
      {isUploaded && (
        <Box
          width={10}
          height={10}
          roundness={5}
          backgroundColor={theme.colors.status.green}
          marginRight={8}
        />
      )}
      <VideoIcon color={clipsCount > 0 ? theme.colors.white : theme.colors.disabled} />
      <Box marginLeft={5}>
        {clipsCount > 0 ? (
          <Paragraph lineHeight={17}>
            {clipsCount} {t('screens.events.clips')}
          </Paragraph>
        ) : (
          <Paragraph color={theme.colors.disabled} lineHeight={17}>
            {t('screens.events.noClips')}
          </Paragraph>
        )}
      </Box>
    </Box>
  )
}

export default ClipsInfo
