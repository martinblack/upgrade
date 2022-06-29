import { FlipPhoneIcon } from '@/components/SvgIcons/FlipPhoneIcon'
import { Box } from '@/components/_essentials/Box'
import { Paragraph } from '@/components/_essentials/Text/Paragraph'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Container } from './styled'

const MS_TO_DISAPPEAR = 7000

const FlipPhoneMessage = () => {
  const { t } = useTranslation()
  const [isShown, setIsShown] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsShown(false), MS_TO_DISAPPEAR)

    return () => {
      clearTimeout(timer)
      setIsShown(true)
    }
  }, [])

  return (
    <Container>
      {isShown && (
        <>
          <FlipPhoneIcon />
          <Box paddingLeft={10}>
            <Paragraph allowFontScaling={false} size={12} lineHeight={14.5}>
              {t('screens.camera.flipPhoneMessage')}
            </Paragraph>
          </Box>
        </>
      )}
    </Container>
  )
}

export default FlipPhoneMessage
