import { Box } from '@/components/_essentials/Box'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useTheme } from 'styled-components'
import ElipseButton from '../ElipseButton'

interface Props {
  onPress: () => void
  isLoading: boolean
}

const LoadMoreButton: React.FC<Props> = ({ onPress, isLoading }: Props) => {
  const { colors } = useTheme()
  const { t } = useTranslation()

  return (
    <Box fullWidth alignItems={'center'} marginTop={30}>
      <ElipseButton
        width={120}
        color={colors.bg3}
        label={t('screens.clips.loadMore')}
        labelColor={colors.bg0}
        onPress={onPress}
        isLoading={isLoading}
      />
    </Box>
  )
}

export default LoadMoreButton
