import React from 'react'
import { Box } from '@/components/_essentials/Box'
import { MemberStatus } from '@/constants/events'
import { useTheme } from 'styled-components'
import { useTranslation } from 'react-i18next'
import { Paragraph } from '@/components/_essentials/Text/Paragraph'

interface Props {
  status: MemberStatus
  disabled?: boolean
}

const UserStatus: React.FC<Props> = ({ status, disabled }: Props) => {
  const theme = useTheme()
  const { t } = useTranslation()

  const memberStatusObject = {
    [MemberStatus.MEMBER]: {
      color: theme.colors.status.blue,
      text: t('user.statuses.member'),
    },
    [MemberStatus.INVITED]: {
      color: theme.colors.status.yellow,
      text: t('user.statuses.invited'),
    },
    [MemberStatus.NONE]: {
      color: theme.colors.disabled,
      text: t('user.statuses.none'),
    },
  }

  return (
    <Box flexDirection="row" alignItems="center">
      <Box
        width={10}
        height={10}
        roundness={5}
        backgroundColor={memberStatusObject[status].color}
        marginRight={5}
      />
      <Paragraph color={disabled ? theme.colors.disabled : theme.colors.white}>
        {memberStatusObject[status].text}
      </Paragraph>
    </Box>
  )
}

export default UserStatus
