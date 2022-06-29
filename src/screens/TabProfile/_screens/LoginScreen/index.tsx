import { TouchableOpacity } from 'react-native'
import * as React from 'react'
import { Box } from '@/components/_essentials/Box'
import { useTheme } from 'styled-components'
import { Auth } from '@/hooks/fireAuth'
import AuthButton from '@/components/Buttons/AuthButton'
import { GoogleIcon } from '@/components/SvgIcons/GoogleIcon'
import { FacebookIcon } from '@/components/SvgIcons/FacebookIcon'
import { Paragraph } from '@/components/_essentials/Text/Paragraph'
import { useTranslation } from 'react-i18next'
import { SectionTitle } from '@/components/_essentials/Text/SectionTitle'
import TermsButton from '@/screens/TabProfile/_components/TermsButton'
import { useNavigation } from '@react-navigation/native'
import { ROUTES } from '@/navigation/routes'

import { AppleButton } from '@invertase/react-native-apple-authentication'
import Layout from '@/constants/Layout'

interface Props {
  onEmailLogin: () => void
}

const LoginScreen: React.FC<Props> = ({ onEmailLogin }) => {
  const { navigate } = useNavigation()
  const { colors } = useTheme()
  const { t } = useTranslation()

  const [isAppleLoginAvailable] = React.useState(Layout.isIos)

  const handleNavigateTerms = (auth: Auth) => navigate(ROUTES.TERMS, { auth })

  return (
    <Box flex={1} justify="center" alignItems="center" paddingTop={100}>
      <SectionTitle>{t('screens.login.title')}</SectionTitle>
      <Box padding={35} fullWidth>
        <Box marginBottom={20}>
          <AuthButton
            title={t('signInButtons.facebook')}
            onPress={() => handleNavigateTerms(Auth.FACEBOOK)}
            icon={<FacebookIcon />}
          />
        </Box>
        <Box marginBottom={20}>
          <AuthButton
            title={t('signInButtons.google')}
            onPress={() => handleNavigateTerms(Auth.GOOGLE)}
            icon={<GoogleIcon />}
          />
        </Box>
        {isAppleLoginAvailable && (
          <AppleButton
            buttonStyle={AppleButton.Style.WHITE}
            buttonType={AppleButton.Type.SIGN_IN}
            cornerRadius={6}
            onPress={() => handleNavigateTerms(Auth.APPLE)}
            style={{ width: '100%', height: 50 }}
          />
        )}
      </Box>
      <Box marginBottom={35}>
        <TouchableOpacity onPress={onEmailLogin}>
          <Paragraph color={colors.secondary}>{t('screens.login.emailLogin')}</Paragraph>
        </TouchableOpacity>
      </Box>
      <TermsButton />
    </Box>
  )
}

export default LoginScreen
