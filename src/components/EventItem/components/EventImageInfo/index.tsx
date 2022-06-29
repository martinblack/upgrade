import React from 'react'
import { SubjectText, Wrapper } from './styled'
import { Box } from '@/components/_essentials/Box'
import { LockIcon } from '@/components/SvgIcons/LockIcon'
import { useTheme } from 'styled-components'
import { useTranslation } from 'react-i18next'
import { Paragraph } from '@/components/_essentials/Text/Paragraph'
import { formatDate, LOCALIZE } from '@/utils/getDateLanguage'
import { parseISO } from 'date-fns'

interface Props {
  subject: string
  date: string
  isPrivate: boolean
}

const EventImageInfo: React.FC<Props> = ({ subject, date, isPrivate }: Props) => {
  const { t } = useTranslation()
  const theme = useTheme()

  return (
    <Wrapper colors={[theme.colors.transparent, 'rgba(0, 0, 0, 0.8)']}>
      <Box fullWidth alignItems={'flex-end'}>
        {isPrivate && <LockIcon />}
      </Box>

      <Box flex={1} justify="flex-end" marginBottom={-25}>
        <SubjectText allowFontScaling={false}>{subject}</SubjectText>
        <Paragraph size={20}>{date && formatDate(parseISO(date), t('dateFormats.year'))}</Paragraph>
      </Box>

      <Box flexDirection="row" justify="flex-end">
        <Box marginRight={5}>
          <Paragraph allowFontScaling={false}>
            {date && formatDate(parseISO(date), t('dateFormats.date'), LOCALIZE)}
          </Paragraph>
        </Box>
        <Paragraph allowFontScaling={false} color={theme.colors.disabled}>
          {date && formatDate(parseISO(date), t('dateFormats.time'))}
        </Paragraph>
      </Box>
    </Wrapper>
  )
}

export default EventImageInfo
