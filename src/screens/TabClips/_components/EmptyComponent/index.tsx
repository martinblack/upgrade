import * as React from 'react'
import { ContentTitle } from '@/components/_essentials/Text/ContentTitle'
import { useTranslation } from 'react-i18next'
import { ApolloError } from '@apollo/client'
import ErrorMessage from '@/components/ErrorMessage'
import Loading from '@/components/Loading'

interface EmptyComponentProps {
  isLoading: boolean
  error: ApolloError | undefined
  videosLength: number | undefined
}

const EmptyComponent: React.FC<EmptyComponentProps> = ({ isLoading, error, videosLength }) => {
  const { t } = useTranslation()
  const noVideos = videosLength === 0

  if (error && !isLoading) return <ErrorMessage error={error} />
  if (isLoading && !noVideos) return <Loading />
  if (noVideos) return <ContentTitle textAlign="center">{t('screens.clips.noClips')}</ContentTitle>

  return null
}

export default EmptyComponent
