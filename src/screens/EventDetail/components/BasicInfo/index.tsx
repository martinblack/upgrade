import React from 'react'
import { Box } from '@/components/_essentials/Box'
import { Wrapper } from './styled'
import { LocationIcon } from '@/components/SvgIcons/LocationIcon'
import { useTranslation } from 'react-i18next'
import { LockIcon } from '@/components/SvgIcons/LockIcon'
import { Paragraph } from '@/components/_essentials/Text/Paragraph'
import { useTheme } from 'styled-components'
import { formatDate, LOCALIZE } from '@/utils/getDateLanguage'
import { parseISO } from 'date-fns'

interface Props {
  location: { city: string; address: string }
  date: string
  isPrivate: boolean
}

const BasicInfo: React.FC<Props> = ({ location, date, isPrivate }: Props) => {
  const { t } = useTranslation()
  const theme = useTheme()

  return (
    <Wrapper>
      <Box flexDirection="row">
        <Box marginLeft={10} marginRight={20} justify={'center'}>
          <LocationIcon />
        </Box>

        <Box>
          <Paragraph color={theme.colors.white}>
            {location.address}, {location.city}
          </Paragraph>
          <Paragraph color={theme.colors.white}>
            {date && formatDate(parseISO(date), t('dateFormats.full'), LOCALIZE)}
          </Paragraph>
        </Box>
      </Box>
      {isPrivate && <LockIcon />}
    </Wrapper>
  )
}

export default BasicInfo
