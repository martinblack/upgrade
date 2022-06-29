import ElipseButton from '@/components/Buttons/ElipseButton'
import { ChevronIcon } from '@/components/SvgIcons/ChevronIcon'
import { Box } from '@/components/_essentials/Box'
import { ContentTitle } from '@/components/_essentials/Text/ContentTitle'
import React, { useEffect, useRef } from 'react'
import { Animated, TouchableOpacity } from 'react-native'
import { useTheme } from 'styled-components'

interface Props {
  buttonLabel: string
  title: string
  onPressChevron: () => void
  onPressBtn: () => void
  shouldHide: boolean
}

const BlueHeader: React.FC<Props> = ({
  buttonLabel,
  title,
  onPressChevron,
  onPressBtn,
  shouldHide,
}) => {
  const theme = useTheme()

  const animatedHeight = useRef(new Animated.Value(shouldHide ? 100 : 0)).current

  useEffect(() => {
    Animated.timing(animatedHeight, {
      toValue: shouldHide ? 0 : 100,
      duration: 1000,
      useNativeDriver: false,
    }).start()
  }, [shouldHide])

  return (
    <Animated.View
      style={{
        height: animatedHeight,
        position: 'absolute',
        top: 0,
        width: '100%',
      }}>
      <Box
        backgroundColor={theme.colors.secondary}
        fullHeight
        fullWidth
        zIndex={10}
        paddingLeft={20}
        paddingRight={10}
        flexDirection={'row'}
        justify={'space-between'}
        alignItems={'flex-end'}>
        <Box marginBottom={16.5} flexDirection={'row'}>
          <TouchableOpacity onPress={onPressChevron}>
            <Box flexDirection={'row'}>
              <Box height={20} width={20} justify={'center'} alignItems={'center'} marginRight={10}>
                <ChevronIcon />
              </Box>

              <ContentTitle size={15} lineHeight={18.15}>
                {title}
              </ContentTitle>
            </Box>
          </TouchableOpacity>
        </Box>

        <Box marginBottom={5}>
          <ElipseButton
            color={theme.colors.bg1}
            labelColor={theme.colors.bg3}
            label={buttonLabel}
            width={90}
            onPress={onPressBtn}
          />
        </Box>
      </Box>
    </Animated.View>
  )
}

export default BlueHeader
