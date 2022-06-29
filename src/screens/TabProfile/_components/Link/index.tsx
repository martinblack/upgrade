import { Paragraph } from '@/components/_essentials/Text/Paragraph'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { useTheme } from 'styled-components'

interface Props {
  label: string
  onPress: () => void
  color?: string
}

const Link: React.FC<Props> = ({ label, onPress, color }) => {
  const theme = useTheme()

  return (
    <TouchableOpacity onPress={onPress}>
      <Paragraph color={color ? color : theme.colors.bg4}>{label}</Paragraph>
    </TouchableOpacity>
  )
}

export default Link
