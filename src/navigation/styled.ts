import { Box } from '@/components/_essentials/Box'
import styled from 'styled-components'

export const IconBox = styled(Box)<{ isActive: boolean }>`
  border-top-width: 3px;
  border-top-color: ${({ isActive, theme }) => (isActive ? theme.colors.bg3 : theme.colors.bg0)};
`
