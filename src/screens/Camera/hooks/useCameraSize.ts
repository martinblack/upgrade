import { useWindowDimensions } from 'react-native'

const BOTTOM_SPACE = 100

const calculateLandscapeWidth = (deviceHeight: number) => {
  const availableLandscapeWidth = Math.round((deviceHeight * 16) / 9)
  return {
    width: availableLandscapeWidth,
    height: deviceHeight,
  }
}

export const useCameraSize = () => {
  const { width: deviceWidth, height: deviceHeight } = useWindowDimensions()
  const isLandscape = deviceWidth > deviceHeight

  const dimensions = isLandscape
    ? calculateLandscapeWidth(deviceHeight)
    : calculateLandscapeWidth(deviceWidth)

  const swtich = !isLandscape

  return {
    width: swtich ? dimensions.height : dimensions.width,
    height: swtich ? dimensions.width : dimensions.height,
    previewWidth: isLandscape ? deviceWidth - 220 : deviceWidth,
    previewHeight: isLandscape ? deviceHeight : deviceHeight - 220,
    isLandscape,
  }
}
