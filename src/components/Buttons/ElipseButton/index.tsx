import { Box } from '@/components/_essentials/Box'
import React from 'react'
import { ActivityIndicator, TouchableOpacity } from 'react-native'
import { useTheme } from 'styled-components'
import { Label } from './styled'

interface Props {
  width: number
  color: string
  label: string
  labelColor: string
  onPress: () => void
  isLoading?: boolean
  loaderColor?: string
  isDisabled?: boolean
}

const ElipseButton: React.FC<Props> = ({
  width,
  color,
  label,
  labelColor,
  onPress,
  isLoading,
  loaderColor,
  isDisabled,
}) => {
  const { colors } = useTheme()
  return (
    <TouchableOpacity onPress={onPress} disabled={isDisabled} activeOpacity={0.6}>
      <Box
        height={40}
        width={width}
        roundness={100}
        backgroundColor={!isDisabled ? color : colors.disabled}
        justify={'center'}
        alignItems={'center'}>
        {isLoading && <ActivityIndicator color={loaderColor || colors.bg0} />}
        {!isLoading && (
          <Label labelColor={labelColor} allowFontScaling={false}>
            {label}
          </Label>
        )}
      </Box>
    </TouchableOpacity>
  )
}

export default ElipseButton
