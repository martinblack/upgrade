import { ApolloError } from '@apollo/client'
import { ContentTitle } from '@/components/_essentials/Text/ContentTitle'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { ActivityIndicator } from 'react-native'
import { useTheme } from 'styled-components'

interface Props {
  isLoading: boolean
  error: ApolloError | undefined
}

const NotLoadedContent: React.FC<Props> = ({ isLoading, error }: Props) => {
  const { t } = useTranslation()
  const { colors } = useTheme()

  return (
    <>
      {isLoading && <ActivityIndicator color={colors.bg3} size={'large'} />}
      {error && (
        <ContentTitle textAlign="center">
          {error.networkError ? t('errors.connectToInternet') : t('errors.something')}
        </ContentTitle>
      )}
    </>
  )
}

export default NotLoadedContent
