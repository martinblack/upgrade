import React, { useState } from 'react'
import Logo from '@/components/Logo/index'
import { Box } from '@/components/_essentials/Box'
import Layout from '@/constants/Layout'
import { ROUTES } from '@/navigation/routes'
import { RootStackParamList } from '@/navigation/types'
import { selectorUser, useZudStore } from '@/store'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ImageBackground, SafeAreaView, ScrollView } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTheme } from 'styled-components'
import EmailLoginSignUp from './_screens/EmailLoginSignUp'
import LoginScreen from './_screens/LoginScreen'
import ProfileScreen from './_screens/ProfileScreen'

interface Props extends NativeStackScreenProps<RootStackParamList, ROUTES.PROFILE> {}

const TabProfile: React.FC<Props> = ({ route }) => {
  const { colors, images } = useTheme()
  const { top } = useSafeAreaInsets()
  const user = useZudStore(selectorUser)
  const [isEmailLogin, setIsEmailLogin] = useState(false)
  const isUserLogin = !user?.isAnonymous

  return (
    <SafeAreaView
      style={{ flex: 1, marginTop: isUserLogin ? 0 : -top, backgroundColor: colors.black }}>
      {isUserLogin && <ProfileScreen />}
      {!isUserLogin && (
        <ImageBackground
          source={images.profileBG}
          resizeMode="cover"
          style={{
            flex: 1,
            width: Layout.window.width,
            height: Layout.window.height + top,
          }}>
          <ScrollView style={{ flex: 1 }}>
            <Box paddingTop={30 + top}>
              <Logo />
            </Box>
            {isEmailLogin ? (
              <EmailLoginSignUp
                onSocialLogin={() => setIsEmailLogin(false)}
                apiError={route.params && route.params.errorMessage}
              />
            ) : (
              <LoginScreen onEmailLogin={() => setIsEmailLogin(true)} />
            )}
          </ScrollView>
        </ImageBackground>
      )}
    </SafeAreaView>
  )
}

export default TabProfile
