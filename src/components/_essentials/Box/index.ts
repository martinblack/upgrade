import * as CSS from 'csstype'
import styled from 'styled-components'
import { View } from 'react-native'
import { pipe, cond, exists, append } from './utils'

interface Props {
  flex?: CSS.Property.Flex<number>
  justify?: CSS.Property.JustifyContent
  flexDirection?: CSS.Property.FlexDirection
  alignItems?: CSS.Property.AlignItems
  padding?: number
  paddingTop?: number
  paddingBottom?: number
  paddingLeft?: number
  paddingRight?: number
  paddingHorizontal?: number
  paddingVertical?: number
  fullHeight?: boolean
  fullWidth?: boolean
  position?: CSS.Property.Position
  top?: number
  bottom?: number
  left?: number
  right?: number
  backgroundColor?: CSS.Property.BackgroundColor
  opacity?: number
  overflow?: CSS.Property.Overflow
  width?: number
  height?: number
  roundness?: number
  borderWidth?: number
  borderColor?: string
  borderBottomColor?: string
  borderBottomWidth?: number
  marginLeft?: number
  marginRight?: number
  minWidth?: number
  maxWidth?: number
  margin?: number
  marginTop?: number
  marginBottom?: number
  absoluteFill?: boolean
  zIndex?: number
}

export const Box = styled(View)<Props>`
  ${({
    justify,
    flexDirection,
    alignItems,
    flex,
    backgroundColor,
    padding,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    paddingHorizontal,
    paddingVertical,
    fullWidth,
    fullHeight,
    position,
    top,
    bottom,
    left,
    right,
    opacity,
    overflow,
    width,
    height,
    roundness,
    borderWidth,
    borderColor,
    borderBottomColor,
    borderBottomWidth,
    marginLeft,
    marginRight,
    minWidth,
    maxWidth,
    margin,
    marginTop,
    marginBottom,
    absoluteFill,
    zIndex,
  }) =>
    pipe(
      cond(exists(flex), append(`flex: ${flex}`)),
      cond(exists(padding), append(`padding: ${padding}px`)),
      cond(exists(paddingTop), append(`padding-top: ${paddingTop}px`)),
      cond(exists(paddingBottom), append(`padding-bottom: ${paddingBottom}px`)),
      cond(exists(paddingLeft), append(`padding-left: ${paddingLeft}px`)),
      cond(exists(paddingRight), append(`padding-right: ${paddingRight}px`)),
      cond(exists(paddingHorizontal), append(`padding: 0 ${paddingHorizontal}px`)),
      cond(exists(paddingVertical), append(`padding: ${paddingVertical}px 0`)),
      cond(exists(justify), append(`justify-content: ${justify}`)),
      cond(exists(flexDirection), append(`flex-direction: ${flexDirection}`)),
      cond(exists(alignItems), append(`align-items: ${alignItems}`)),
      cond(exists(fullWidth), append(`width: 100%`)),
      cond(exists(fullHeight), append(`height: 100%`)),
      cond(exists(position), append(`position: ${position}`)),
      cond(exists(top), append(`top: ${top}px`)),
      cond(exists(bottom), append(`bottom: ${bottom}px`)),
      cond(exists(left), append(`left: ${left}px`)),
      cond(exists(right), append(`right: ${right}px`)),
      cond(exists(opacity), append(`opacity: ${opacity}`)),
      cond(exists(roundness), append(`border-radius: ${roundness}px`)),
      cond(exists(overflow), append(`overflow: ${overflow}`)),
      cond(exists(width), append(`width: ${width}px`)),
      cond(exists(height), append(`height: ${height}px`)),
      cond(exists(backgroundColor), append(`background-color: ${backgroundColor}`)),
      cond(exists(borderWidth), append(`border-width: ${borderWidth}px`)),
      cond(exists(borderColor), append(`border-color: ${borderColor}`)),
      cond(exists(borderBottomColor), append(`border-bottom-color: ${borderBottomColor}`)),
      cond(exists(borderBottomWidth), append(`border-bottom-width: ${borderBottomWidth}px`)),
      cond(exists(marginLeft), append(`margin-left: ${marginLeft}px`)),
      cond(exists(marginRight), append(`margin-right: ${marginRight}px`)),
      cond(exists(minWidth), append(`min-width: ${minWidth}px`)),
      cond(exists(maxWidth), append(`max-width: ${maxWidth}px`)),
      cond(exists(margin), append(`margin: ${margin}px`)),
      cond(exists(marginTop), append(`margin-top: ${marginTop}px`)),
      cond(exists(marginBottom), append(`margin-bottom: ${marginBottom}px`)),
      cond(exists(absoluteFill), append(`position: absolute`)),
      cond(exists(absoluteFill), append(`width: 100%`)),
      cond(exists(absoluteFill), append(`height: 100%`)),
      cond(exists(zIndex), append(`zIndex: ${zIndex}`)),
    )('')};
`
