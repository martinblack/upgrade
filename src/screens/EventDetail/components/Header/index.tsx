import React, { memo } from 'react'
import { Box } from '@/components/_essentials/Box'
import TopSafeAreaSpacing from '@/components/TopSafeAreaSpacing'
import { GradientWrapper, NavigationTouchable } from './styled'
import { ChevronLeft } from '@/components/SvgIcons/ChevronLeft'
import { useTheme } from 'styled-components'
import { useNavigation } from '@react-navigation/core'
import { ContentTitle } from '@/components/_essentials/Text/ContentTitle'
import { hexToRGBA } from '@/utils/hexToRGBA'
import { ROUTES } from '@/navigation/routes'

interface Props {
  title?: string
  previousParams?: string
}

const Header: React.FC<Props> = ({ title, previousParams }: Props) => {
  const theme = useTheme()
  const { navigate } = useNavigation()
  const alphaBlack = hexToRGBA(theme.colors.black)

  return (
    <Box position="absolute" fullWidth zIndex={10}>
      <TopSafeAreaSpacing color={theme.colors.black} />
      <GradientWrapper
        colors={[alphaBlack(0.9), alphaBlack(0.7), alphaBlack(0.3), theme.colors.transparent]}
        locations={[0.3, 0.5, 0.7, 0.95]}>
        <Box paddingLeft={22.5} paddingRight={22.5} paddingTop={22.5}>
          {title && (
            <NavigationTouchable
              onPress={() => {
                navigate(ROUTES.ROOT, {
                  screen: ROUTES.SHARED_STACK,
                  params: {
                    screen: ROUTES.EVENTS,
                  },
                })
                previousParams &&
                  navigate(ROUTES.ROOT, {
                    screen: ROUTES.HOME,
                  })
              }}>
              <ChevronLeft />
              <Box paddingLeft={20}>
                <ContentTitle size={15} lineHeight={18}>
                  {title}
                </ContentTitle>
              </Box>
            </NavigationTouchable>
          )}
        </Box>
      </GradientWrapper>
    </Box>
  )
}

export default memo(Header)
