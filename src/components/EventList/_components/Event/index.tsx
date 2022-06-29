import React, { memo } from 'react'
import { EventCard, Subject, Wrapper } from './styled'
import { LockIcon } from '@/components/SvgIcons/LockIcon'
import { Box } from '@/components/_essentials/Box'
import { Paragraph } from '@/components/_essentials/Text/Paragraph'
import { useTheme } from 'styled-components'
import { hexToRGBA } from '@/utils/hexToRGBA'
import EventImage from '@/components/EventImage'

interface Props {
  isPrivate?: boolean
  location: string
  subject: string
  year?: string
  imgUrl: string
  onClick?: () => void
  eventWidth?: number
}

const Event = ({
  isPrivate = false,
  location,
  subject,
  year,
  imgUrl,
  onClick,
  eventWidth,
}: Props) => {
  const theme = useTheme()
  return (
    <EventCard width={eventWidth} onPress={() => onClick?.()}>
      <Box flex={1} backgroundColor={theme.colors.black}>
        <EventImage imageUrl={imgUrl} sizeDividedBy={2.24} />
      </Box>

      <Wrapper colors={[theme.colors.transparent, hexToRGBA(theme.colors.black)(0.8)]}>
        <Box fullWidth justify={'space-between'}>
          <Box alignItems="flex-end" height={30}>
            {isPrivate && <LockIcon />}
          </Box>

          <Box>
            <Subject allowFontScaling={false}>{subject}</Subject>
          </Box>

          <Box justify="flex-end">
            <Paragraph lineHeight={16}>{location}</Paragraph>
            <Paragraph lineHeight={16}>{year}</Paragraph>
          </Box>
        </Box>
      </Wrapper>
    </EventCard>
  )
}

export default memo(Event, (prevProps, nextProps) => {
  return (
    prevProps.imgUrl === nextProps.imgUrl &&
    prevProps.isPrivate === nextProps.isPrivate &&
    prevProps.location === nextProps.location &&
    prevProps.subject === nextProps.subject &&
    prevProps.year === nextProps.year
  )
})
