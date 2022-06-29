import { SearchIcon } from '@/components/SvgIcons/Search'
import { ContentTitle } from '@/components/_essentials/Text/ContentTitle'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { useCameraSize } from '@/screens/Camera/hooks/useCameraSize'
import { Container, Title, Place } from './styled'
import { Text } from 'react-native'

interface Props {
  band: string
  place: string
  onSearchPress: () => void
  asBlackBox?: boolean
  displaySearchIcon?: boolean
}

const Header = ({ band, place, onSearchPress, asBlackBox, displaySearchIcon }: Props) => {
  const { isLandscape } = useCameraSize()
  return (
    <Container asBlackBox={asBlackBox} isLandscape={isLandscape}>
      <TouchableOpacity onPress={onSearchPress} style={{ padding: 10 }}>
        <SearchIcon />
      </TouchableOpacity>
      <Title fullWidth={asBlackBox && !displaySearchIcon}>
        <Text numberOfLines={1} ellipsizeMode="tail">
          <ContentTitle size={15} lineHeight={18.2}>
            {band}
          </ContentTitle>
          <Text> </Text>
          <Place allowFontScaling={false}>{place}</Place>
        </Text>
      </Title>
    </Container>
  )
}

export default Header
