import { useNavigation } from '@react-navigation/core'
import { Paragraph } from '@/components/_essentials/Text/Paragraph'
import { ROUTES } from '@/navigation/routes'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { TouchableOpacity } from 'react-native'
import { useTheme } from 'styled-components'

const TermsButton: React.FC = () => {
  const { colors } = useTheme()
  const { navigate } = useNavigation()
  const { t } = useTranslation()

  return (
    <TouchableOpacity onPress={() => navigate(ROUTES.TERMS, {})}>
      <Paragraph color={colors.bg4}>{t('screens.login.terms')}</Paragraph>
    </TouchableOpacity>
  )
}

export default TermsButton
