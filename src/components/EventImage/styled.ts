import Layout from '@/constants/Layout'
import { View } from 'react-native'
import styled from 'styled-components'

export const ImageContainer = styled(View)<{ height: number; sizeDividedBy: number }>`
  height: ${({ height, sizeDividedBy }) => height / sizeDividedBy}px;
  width: ${({ sizeDividedBy }) => Layout.window.width / sizeDividedBy}px;
`
