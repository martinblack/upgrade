import React from 'react'
import { ArtistImage } from './styled'
import { Box } from '@/components/_essentials/Box'
import HashtagList from '@/components/HashtagList'
import { useTranslation } from 'react-i18next'
import { ContentTitle } from '@/components/_essentials/Text/ContentTitle'
import { Paragraph } from '@/components/_essentials/Text/Paragraph'

interface Props {
  subject: { name: string; image: string }
  title: string
  description: string
  hashtags: Array<string>
}

const ArtistSection: React.FC<Props> = ({ subject, title, description, hashtags }: Props) => {
  const { t } = useTranslation()

  return (
    <Box padding={20}>
      <Box flexDirection="row" alignItems="center" marginBottom={20}>
        <ArtistImage source={{ uri: subject.image }} />
        <Box marginLeft={10} marginRight={10}>
          <ContentTitle size={20} lineHeight={24}>
            {title}
          </ContentTitle>
          <Paragraph>
            {t('screens.events.by')} {subject.name}
          </Paragraph>
        </Box>
      </Box>

      {hashtags.length > 0 && <HashtagList hashtags={hashtags} />}

      <Box marginTop={5}>
        <Paragraph>{description}</Paragraph>
      </Box>
    </Box>
  )
}

export default ArtistSection
