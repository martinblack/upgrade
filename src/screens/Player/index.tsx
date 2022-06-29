import { StatusBar } from 'react-native'
import * as React from 'react'
import { Box } from '../../components/_essentials/Box'
import { RouteProp, useRoute } from '@react-navigation/core'
import { Video } from 'expo-av'
import { RootStackParamList } from '../../navigation/types'
import styled from 'styled-components'

const StyledVideo = styled(Video)`
  align-self: center;
  width: 100%;
  height: 100%;
`

const Player = () => {
  const { params } = useRoute<RouteProp<{ params: RootStackParamList['Player'] }>>()

  const uri = params?.uri

  return (
    <Box flex={1} justify={'center'} alignItems={'center'} backgroundColor="black">
      <StatusBar hidden />
      {uri && (
        <StyledVideo
          onLoad={data => console.log('loaded', data)}
          source={{
            uri,
          }}
          useNativeControls
        />
      )}
    </Box>
  )
}

export default Player
