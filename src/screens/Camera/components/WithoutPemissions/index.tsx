import { CloseIcon } from '@/components/SvgIcons/CloseIcon'
import { Box } from '@/components/_essentials/Box'
import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { TouchableOpacity } from 'react-native'
import { StyledBluredView, Message } from './styled'

interface Props {
  onClose: () => void
}

const WithoutPermission: React.FC<Props> = ({ onClose }) => {
  const { t } = useTranslation()
  return (
    <StyledBluredView intensity={110} tint="dark">
      <Message>{t('screens.camera.permissions')}</Message>

      <Box position={'absolute'} bottom={40} right={25}>
        <TouchableOpacity onPress={onClose}>
          <CloseIcon />
        </TouchableOpacity>
      </Box>
    </StyledBluredView>
  )
}

export default WithoutPermission
