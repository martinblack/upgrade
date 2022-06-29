import { TouchableOpacity } from 'react-native'
import styled from 'styled-components'
import { hexToRGBA } from '@/utils/hexToRGBA'

export const OvalBtnWrapper = styled(TouchableOpacity)`
  background-color: ${({ theme }) => {
    const alphaBlack = hexToRGBA(theme.colors.black)
    return alphaBlack(0.5)
  }};
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50px;
`
