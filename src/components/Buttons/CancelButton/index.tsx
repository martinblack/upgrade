import { CancelIcon } from '@/components/SvgIcons/CancelIcon'
import React from 'react'
import { OvalBtnWrapper } from './styled'

interface Props {
  onPress: () => void
}

const CancelButton: React.FC<Props> = ({ onPress }: Props) => {
  return (
    <OvalBtnWrapper onPress={onPress}>
      <CancelIcon />
    </OvalBtnWrapper>
  )
}

export default CancelButton
