import React, { useState } from 'react'
import { Box } from '@/components/_essentials/Box'
import { SectionTitle } from '@/components/_essentials/Text/SectionTitle'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import FinalCut from '@/components/FinalCut'
import { Dimensions } from 'react-native'
import { useTheme } from 'styled-components'
import { useTranslation } from 'react-i18next'
import { useFinalVideos } from '@/hooks/useFinalVideos'
import { FinalVideoObjectType } from '@/types'
import NotLoadedContent from '@/components/NotLoadedContent'

interface Props {
  eventId: string
}

const FinalCuts: React.FC<Props> = ({ eventId }) => {
  const theme = useTheme()
  const { t } = useTranslation()
  const [activeSlide, setActiveSlide] = useState(0)

  const { data: finalVideosData, isLoading, error } = useFinalVideos(eventId)

  const finalCuts = finalVideosData?.finalVideos?.edges
    .map(e => e?.node)
    .filter(e => e) as FinalVideoObjectType[]

  const _renderItem = ({ item }: { item: FinalVideoObjectType }) => {
    return (
      <Box paddingHorizontal={10}>
        <FinalCut
          duration={item.length}
          isLoading={false}
          progress={1}
          onCancel={() => alert('Not implemented')}
          isUploading={false}
          //creatorsCount={0}
          date={item.created}
          uri={item.file as string}
          thumbnail={item.thumb}
        />
      </Box>
    )
  }

  return (
    <Box>
      <Box justify={'center'} alignItems={'center'} paddingBottom={20}>
        <SectionTitle>{t('screens.events.finalCuts')}</SectionTitle>
      </Box>

      <Box marginBottom={40}>
        {(isLoading || error) && (
          <Box height={150} justify={'center'}>
            <NotLoadedContent isLoading={isLoading} error={error} />
          </Box>
        )}
        {finalCuts && (
          <>
            <Carousel
              data={finalCuts}
              renderItem={_renderItem}
              onSnapToItem={index => setActiveSlide(index)}
              sliderWidth={Dimensions.get('window').width}
              itemWidth={Dimensions.get('window').width}
              inactiveSlideScale={1}
            />
            <Pagination
              dotsLength={finalCuts.length}
              activeDotIndex={activeSlide}
              dotColor={theme.colors.white}
              inactiveDotColor={theme.colors.disabled}
              inactiveDotScale={0.8}
              containerStyle={{ paddingTop: 10, paddingBottom: 0 }}
              animatedDuration={150}
              dotContainerStyle={{ marginRight: 5, marginLeft: 5 }}
              dotStyle={{ width: 10, height: 10, borderRadius: 5 }}
            />
          </>
        )}
      </Box>
    </Box>
  )
}

export default FinalCuts
