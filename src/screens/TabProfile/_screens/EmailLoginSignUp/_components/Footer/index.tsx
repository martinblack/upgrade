import { Box } from '@/components/_essentials/Box'
import { Paragraph } from '@/components/_essentials/Text/Paragraph'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { TouchableOpacity } from 'react-native'
import TermsButton from '@/screens/TabProfile/_components/TermsButton'
import { useTheme } from 'styled-components'

interface Props {
  isSigningUp: boolean
  onSocialLogin: () => void
  onPressSwitch: () => void
}

const Footer: React.FC<Props> = ({ isSigningUp, onSocialLogin, onPressSwitch }) => {
  const { colors } = useTheme()
  const { t } = useTranslation()

  return (
    <Box fullWidth paddingHorizontal={35} alignItems={'center'} marginBottom={50}>
      <Box fullWidth alignItems={'flex-end'}>
        <Paragraph color={colors.bg5}>
          {isSigningUp ? t('screens.login.existingUser') : t('screens.login.newUser')}
        </Paragraph>
      </Box>

      <Box fullWidth marginBottom={35} flexDirection={'row'} justify={'space-between'}>
        <TouchableOpacity onPress={() => onSocialLogin()}>
          <Paragraph color={colors.secondary}>{t('screens.login.socialLogin')}</Paragraph>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressSwitch}>
          <Paragraph color={colors.secondary}>
            {isSigningUp ? t('screens.login.signIn') : t('screens.login.signUp')}
          </Paragraph>
        </TouchableOpacity>
      </Box>
      <TermsButton />
    </Box>
  )
}

export default Footer
