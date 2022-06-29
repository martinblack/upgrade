import { View } from 'react-native'
import styled, { css } from 'styled-components'

const SIDE_PANEL_SIZE = 110

const landScapeCss = css`
  flex-direction: column-reverse;
  height: 100%;
  width: ${SIDE_PANEL_SIZE}px;
  right: 0px;
  align-items: center;
  justify-content: space-between;
`

const portraitCss = css`
  height: ${SIDE_PANEL_SIZE}px;
  width: 100%;
  bottom: 0px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

export const ButtonsContainer = styled(View)<{
  isLandscape: boolean
  useBackground: boolean
}>`
  background-color: ${({ useBackground }) => (useBackground ? 'black' : 'transparent')};
  opacity: 0.4;
  z-index: 30;

  ${({ isLandscape }) => (isLandscape ? landScapeCss : portraitCss)}
`

export const Container = styled(View)`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: black;
`

export const CameraBox = styled(View)`
  position: absolute;
  z-index: 30;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`

export const TopPanel = styled(View)<{
  isLandscape: boolean
  isRecording: boolean
}>`
  background-color: ${({ isRecording, isLandscape }) =>
    !isRecording || !isLandscape ? 'black' : 'transparent'};
  position: absolute;
  z-index: 31;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${({ isLandscape, isRecording }) =>
    isLandscape
      ? css`
          left: 0px;
          height: 100%;
          width: ${isRecording ? 0 : SIDE_PANEL_SIZE}px;
        `
      : css`
          top: 0px;
          width: 100%;
          height: ${isRecording ? 100 : SIDE_PANEL_SIZE}px;
        `}
`

export const PortraitWrapper = styled(View)`
  height: 100%;
  display: flex;
  justify-content: space-between;
`

export const LandscapeControlsWrapper = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`

export const HeaderAndTimeWrapper = styled(View)`
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
  flex: 1;
  align-items: flex-start;
`
