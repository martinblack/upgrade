import React from 'react'
import { ApolloError } from '@apollo/client'
import { ContentTitle } from '@/components/_essentials/Text/ContentTitle'
import { useTranslation } from 'react-i18next'

interface Props {
  error: ApolloError | undefined
}

const ErrorMessage: React.FC<Props> = ({ error }: Props) => {
  const { t } = useTranslation()

  return (
    <ContentTitle textAlign="center">
      {error && error.networkError ? t('errors.connectToInternet') : t('errors.something')}
    </ContentTitle>
  )
}

export default ErrorMessage
