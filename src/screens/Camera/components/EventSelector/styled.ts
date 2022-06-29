import styled from 'styled-components'
import { BlurView } from 'expo-blur'

export const StyledBluredView = styled(BlurView)`
  height: 100%;
  position: absolute;
  z-index: 31;
  width: 100%;
  background-color: black;
  display: flex;
  align-items: center;
`
