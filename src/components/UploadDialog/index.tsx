import { Box } from '@/components/_essentials/Box'
import { ContentTitle } from '@/components/_essentials/Text/ContentTitle'
import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { ActivityIndicator, Dimensions } from 'react-native'
import { Bar } from 'react-native-progress'
import { selectorForegroundProgress, selectorIsForegroundRunning, useZudStore } from '@/store'
import { useTheme } from 'styled-components'
import { Bubble, Button, ButtonLabel, Container } from './styled'

const BAR_WIDTH = Dimensions.get('window').width - 60

const UploadDialog: React.FC = () => {
  const { colors } = useTheme()
  const { t } = useTranslation()
  const [showBubble, dispatchShowBubble] = React.useState(false)

  const progress = useZudStore(selectorForegroundProgress)
  const isForegroundRunning = useZudStore(selectorIsForegroundRunning)

  const toggleShowBubble = () => dispatchShowBubble(state => !state)

  return (
    <React.Fragment>
      {isForegroundRunning && (
        <React.Fragment>
          {!showBubble ? (
            <Container>
              <Box marginTop={30} alignItems={'center'}>
                <ContentTitle>
                  {t('dialog.uploadTitle', {
                    value: (progress * 100).toFixed(2),
                  })}
                </ContentTitle>
                <Box marginTop={17}>
                  <Bar
                    height={3}
                    color={colors.secondary}
                    progress={progress}
                    unfilledColor={colors.bg7}
                    borderWidth={0}
                    borderRadius={100}
                    width={BAR_WIDTH}
                  />
                </Box>
              </Box>
              <Button onPress={toggleShowBubble}>
                <ButtonLabel>{t('dialog.hide')}</ButtonLabel>
              </Button>
            </Container>
          ) : (
            <Bubble onPress={toggleShowBubble}>
              <ActivityIndicator size={'small'} color={colors.bg3} />
            </Bubble>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  )
}
export default UploadDialog
