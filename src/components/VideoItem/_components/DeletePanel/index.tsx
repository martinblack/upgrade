import React from 'react'
import { TouchableOpacity } from 'react-native'
import { TrashIcon } from '../../../SvgIcons/TrashIcon'
import { Panel } from './styled'

interface Props {
  onPress: () => void
  backgroundColor: string
}

export const DeletePanel = ({ onPress, backgroundColor }: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Panel
        backgroundColor={backgroundColor}
        height={100}
        width={95}
        justify={'center'}
        alignItems={'center'}
      >
        <TrashIcon />
      </Panel>
    </TouchableOpacity>
  )
}
