import { CheckIcon } from '@/components/SvgIcons/CheckIcon'
import { Box } from '@/components/_essentials/Box'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { useTheme } from 'styled-components'

interface Props {
  isChecked: boolean
  onPress: () => void
}

const CheckBox: React.FC<Props> = ({ isChecked, onPress }) => {
  const theme = useTheme()

  return (
    <TouchableOpacity onPress={onPress}>
      <Box
        width={20}
        height={20}
        borderWidth={1}
        borderColor={isChecked ? theme.colors.secondary : theme.colors.bg3}
        backgroundColor={isChecked ? theme.colors.secondary : theme.colors.transparent}
        alignItems={'center'}
        justify={'center'}
        marginRight={15}>
        {isChecked && <CheckIcon />}
      </Box>
    </TouchableOpacity>
  )
}

export default CheckBox
