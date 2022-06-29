import React from 'react'
import { Box } from '@/components/_essentials/Box'
import ClipsInfo from '@/components/ClipsInfo'
import { ContentTitle } from '@/components/_essentials/Text/ContentTitle'
import { Paragraph } from '@/components/_essentials/Text/Paragraph'

interface Props {
  title: string
  location: string
  clipsCount: number
  isUploaded?: boolean
}

const EventInfo: React.FC<Props> = ({ title, location, clipsCount, isUploaded }: Props) => {
  return (
    <Box
      justify="space-between"
      paddingHorizontal={20}
      marginTop={10}
      marginBottom={20}
      height={70}>
      <Box>
        <ContentTitle allowFontScaling={false}>{title}</ContentTitle>
        <Paragraph allowFontScaling={false}>{location}</Paragraph>
      </Box>
      <Box flexDirection="row" justify="space-between">
        <Box>{/* {<UserStatus status={userStatus} disabled />} */}</Box>
        <ClipsInfo isUploaded={isUploaded} clipsCount={clipsCount} />
      </Box>
    </Box>
  )
}

export default EventInfo
