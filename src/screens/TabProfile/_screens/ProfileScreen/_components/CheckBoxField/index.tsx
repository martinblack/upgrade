import { Box } from '@/components/_essentials/Box'
import { ContentTitle } from '@/components/_essentials/Text/ContentTitle'
import { Paragraph } from '@/components/_essentials/Text/Paragraph'
import React from 'react'
import CheckBox from '@/screens/TabProfile/_components/CheckBox'
import { useTheme } from 'styled-components'

interface Props {
  isChecked: boolean
  title: string
  description: string
  onPress: () => void
}

const CheckBoxField: React.FC<Props> = ({ isChecked, title, description, onPress }) => {
  const { colors } = useTheme()

  return (
    <>
      <Box flexDirection="row">
        <CheckBox isChecked={isChecked} onPress={onPress} />
        <ContentTitle>{title}</ContentTitle>
      </Box>
      <Box paddingLeft={35}>
        <Paragraph color={colors.bg4}>{description}</Paragraph>
      </Box>
    </>
  )
}

export default CheckBoxField
