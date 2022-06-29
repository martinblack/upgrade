import { Box } from '@/components/_essentials/Box'
import { View } from 'react-native'
import styled, { css } from 'styled-components'

const SIDE_PANEL_SIZE = 110

const landScapeCss = css`
  flex-direction: column-reverse;
  height: 100%;
  padding: 10px 0;

  width: ${SIDE_PANEL_SIZE}px;
  align-items: center;
  justify-content: space-between;
`

const portraitCss = css`
  height: ${SIDE_PANEL_SIZE}px;
  padding: 0 10px;

  width: 101%;
  bottom: 0px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

export const Wrapper = styled(View)<{
  isLandscape: boolean
  useBackground: boolean
}>`
  background-color: ${({ useBackground }) =>
    useBackground ? 'rgba(0, 0, 0, 0.5)' : 'transparent'};

  z-index: 30;

  ${({ isLandscape }) => (isLandscape ? landScapeCss : portraitCss)}
`

export const Item = styled(Box)<{
  isLandscape: boolean
  positionValue: string
}>`
  display: flex;
  justify-content: ${({ positionValue }) => positionValue};
  align-items: ${({ positionValue }) => positionValue};

  ${({ isLandscape }) =>
    isLandscape
      ? css`
          height: 33%;
        `
      : css`
          width: 33%;
        `};
`
