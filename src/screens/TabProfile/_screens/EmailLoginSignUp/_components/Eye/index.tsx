import { EyeClosedIcon } from '@/components/SvgIcons/EyeClosedIcon'
import { EyeIcon } from '@/components/SvgIcons/EyeIcon'
import React from 'react'
import { TouchableOpacity } from 'react-native'

interface Props {
  onPress: () => void
  isOpen: boolean
}

const Eye: React.FC<Props> = ({ onPress, isOpen }) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ padding: 5 }}>
      {isOpen ? <EyeIcon /> : <EyeClosedIcon />}
    </TouchableOpacity>
  )
}

export default Eye
