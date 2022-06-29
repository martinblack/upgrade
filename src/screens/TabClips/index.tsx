import { SafeAreaView, ScrollView } from 'react-native'
import * as React from 'react'
import { Box } from '../../components/_essentials/Box'
import Header from '../../components/Header'
import { useTheme } from 'styled-components'
import { hexToRGBA } from '../../utils/hexToRGBA'
import { TabClipsHeaders } from '../../constants/headers'
import { useState } from 'react'
import AllVideos from './_components/AllVideos.ts'
import MyVideos from './_components/MyVideos.ts'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Layout from '../../constants/Layout'

const TabClips = () => {
  const { colors } = useTheme()
  const alphaBlue = hexToRGBA(colors.secondary)
  const { top } = useSafeAreaInsets()

  const headerOptions = Object.values(TabClipsHeaders)
  const [selectedClips, setSelectedClips] = useState(TabClipsHeaders.MY_VIDEOS)
  const isMyVideos = selectedClips === TabClipsHeaders.MY_VIDEOS
  const isAllVideos = selectedClips === TabClipsHeaders.ALL_VIDEOS

  return (
    <SafeAreaView
      style={{ flex: 1, marginTop: Layout.isIos ? -top : 0, backgroundColor: colors.bg6 }}>
      <Header
        options={headerOptions}
        colors={[alphaBlue(0.25), colors.transparent]}
        setSelected={setSelectedClips}
      />

      <ScrollView>
        <Box marginBottom={40}>
          {isAllVideos && <AllVideos />}
          {isMyVideos && <MyVideos />}
        </Box>
      </ScrollView>
    </SafeAreaView>
  )
}

export default TabClips
