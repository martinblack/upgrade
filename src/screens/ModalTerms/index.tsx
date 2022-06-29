import { Box } from '../../components/_essentials/Box'
import React from 'react'
import i18next from 'i18next'
import { ActivityIndicator, Linking, SafeAreaView, StatusBar } from 'react-native'
import { ROUTES } from '../../navigation/routes'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../navigation/types'
import { useTheme } from 'styled-components'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/core'
import ElipseButton from '../../components/Buttons/ElipseButton'
import { LogoBasic } from '../../components/SvgIcons/LogoBasic'
import { BodyText, ScrollViewWrapper, Title } from './styled'
import { UOOU_CZ, UOOU_EN } from '../../constants/links'
import { CZECH } from '../../constants/languages'
import { AuthAction, useFireAuth } from '../../hooks/fireAuth'
import { useZudStore } from '../../store'
import { firebase } from '@react-native-firebase/analytics'
import Layout from '../../constants/Layout'
import { useToast } from 'react-native-toast-notifications'

type Props = NativeStackScreenProps<RootStackParamList, ROUTES.TERMS>

const ModalTerms: React.FC<Props> = ({ route }) => {
  const { auth, ...actions } = route.params

  const { colors } = useTheme()
  const { t } = useTranslation()
  const navigation = useNavigation()
  const [{ isLoading }, dispatchAuth] = useFireAuth()
  const setUser = useZudStore.getState().setUser

  const toast = useToast()

  const handleAccept = () => {
    if (auth === undefined) return

    const hasAction = [actions?.email, actions?.password, actions?.displayName].every(
      action => !!action,
    )

    const action = hasAction ? (actions as AuthAction) : undefined
    const params = action ? { displayName: action.displayName } : {}

    dispatchAuth({
      auth,
      action,
      onSuccess: user => {
        console.log('Auth success', user)

        if (user) {
          setUser(user)
        }

        toast.show(t('screens.login.success'), { style: { marginBottom: 75 } })

        firebase
          .analytics()
          .setAnalyticsCollectionEnabled(true)
          .catch(console.warn)
          .finally(() => navigation.navigate(ROUTES.ROOT, { screen: ROUTES.HOME }))
      },
      onError: (error: any) => {
        console.error('Auth error', error.message)
        console.error('Auth error code', error.code)

        if (error.code === 'auth/account-exists-with-different-credential') {
          toast.show(t(`errors.${error.code}`), { type: 'danger', style: { marginBottom: 75 } })
        }

        navigation.navigate(ROUTES.PROFILE, { errorMessage: error.message })
      },
    })
  }
  const handleCancel = () => navigation.goBack()
  const goToExternalUrl = async (url: string) => {
    const supported = await Linking.canOpenURL(url)
    if (supported) await Linking.openURL(url)
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.status.blue,
        paddingTop: StatusBar.currentHeight,
      }}>
      <Box
        top={0}
        fullWidth
        height={60}
        backgroundColor={colors.status.blue}
        flexDirection={'row'}
        justify={'space-between'}
        alignItems={'center'}
        padding={10}>
        <ElipseButton
          color={colors.black}
          labelColor={colors.white}
          label={t('screens.terms.cancel')}
          width={90}
          onPress={handleCancel}
        />
        {(auth || auth === 0) && (
          <ElipseButton
            color={colors.black}
            labelColor={colors.white}
            label={t('screens.terms.accept')}
            width={90}
            onPress={handleAccept}
          />
        )}
      </Box>
      <Box
        fullHeight
        alignItems="center"
        justify="center"
        backgroundColor={colors.bg0}
        paddingBottom={30}>
        {isLoading && <ActivityIndicator color={colors.bg3} size="small" />}
        {!isLoading && (
          <ScrollViewWrapper>
            <Box marginLeft={11} marginTop={25} marginBottom={30}>
              <LogoBasic />
            </Box>
            <Box paddingHorizontal={35} marginBottom={40}>
              <Title>{t('screens.terms.introTitle')}</Title>
              <BodyText>{t('screens.terms.introBody')}</BodyText>

              <Title>{t('screens.terms.title1')}</Title>
              <BodyText>
                {Layout.isIos ? t('screens.terms.body1iOS') : t('screens.terms.body1Android')}
              </BodyText>

              <Title>{t('screens.terms.title2')}</Title>
              <BodyText>{t('screens.terms.body2')}</BodyText>

              <Title>{t('screens.terms.title3')}</Title>
              <BodyText>{t('screens.terms.body3')}</BodyText>

              <BodyText>
                <BodyText>{t('screens.terms.body3withLink1')}</BodyText>
                <BodyText
                  isLink
                  onPress={() => goToExternalUrl(i18next.language === CZECH ? UOOU_CZ : UOOU_EN)}>
                  {t('screens.terms.body3withLink2')}
                </BodyText>
                <BodyText>{t('screens.terms.body3withLink3')}</BodyText>
              </BodyText>

              <Title>{t('screens.terms.title4')}</Title>
              <BodyText>{t('screens.terms.body4')}</BodyText>

              <Title>{t('screens.terms.title5')}</Title>
              <BodyText>{t('screens.terms.body5')}</BodyText>
            </Box>
          </ScrollViewWrapper>
        )}
      </Box>
    </SafeAreaView>
  )
}

export default ModalTerms
