import { Image, TouchableOpacity } from 'react-native'
import * as React from 'react'
import styled from 'styled-components'
import { useNavigation } from '@react-navigation/core'
import { ROUTES } from '@/navigation/routes'
import { useZudStore } from '@/store'
import { useCallback } from 'react'

const StyledImage = styled(Image)`
  width: 50px;
  height: 50px;
  border-width: 1px;
  border-color: white;
  border-radius: 3px;
`

export const LastVideoPreview = () => {
  const { navigate } = useNavigation()

  // TODO: This is also weird
  const lastRecordings = useZudStore(
    useCallback(state => state.getRecordings()[state.recordings.length - 1], []),
  )

  if (!lastRecordings) {
    return null
  }
  return (
    <TouchableOpacity onPress={() => navigate(ROUTES.PLAYER, { uri: lastRecordings.uri })}>
      <StyledImage source={lastRecordings.thumbnail} />
    </TouchableOpacity>
  )
}
