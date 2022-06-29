import React, { Dispatch, SetStateAction } from 'react'
import { Box } from '@/components/_essentials/Box'
import { ChevronDownIcon } from '@/components/SvgIcons/ChevronDownIcon'
import { LinearGradient } from 'expo-linear-gradient'
import SelectDropdown from 'react-native-select-dropdown'
import { useTheme } from 'styled-components'
import { TabClipsHeaders } from '@/constants/headers'
import { useTranslation } from 'react-i18next'
import { ScreenTitle } from '@/components/_essentials/Text/ScreenTitle'

interface Props {
  options: string[]
  colors: string[]
  setSelected?: Dispatch<SetStateAction<TabClipsHeaders>>
}

const Header: React.FC<Props> = ({ options, colors, setSelected }: Props) => {
  const { t } = useTranslation()
  const theme = useTheme()

  const isOneOption = options.length === 1

  return (
    <Box>
      <LinearGradient colors={colors}>
        <Box
          paddingHorizontal={20}
          flexDirection="row"
          justify="space-between"
          marginTop={50}
          marginBottom={12}
          alignItems="center">
          {isOneOption && (
            <Box flexDirection="row" alignItems="center" marginLeft={15}>
              <ScreenTitle>{t(`header.${options[0]}`)}</ScreenTitle>
            </Box>
          )}

          {!isOneOption && (
            <SelectDropdown
              data={options}
              onSelect={selected => setSelected && setSelected(selected)}
              defaultButtonText={t(`header.${options[0]}`)}
              buttonTextAfterSelection={selected => t(`header.${selected}`)}
              rowTextForSelection={item => t(`header.${item}`)}
              renderDropdownIcon={() => (
                <Box paddingTop={10}>
                  <ChevronDownIcon />
                </Box>
              )}
              dropdownStyle={{
                backgroundColor: theme.colors.bg5,
                borderRadius: 6,
              }}
              rowTextStyle={{
                color: theme.colors.bg6,
                fontFamily: 'inter400',
              }}
              rowStyle={{ borderBottomColor: theme.colors.transparent }}
              buttonStyle={{
                backgroundColor: theme.colors.transparent,
                height: 55,
                width: '100%',
              }}
              buttonTextStyle={{
                fontSize: 40,
                fontFamily: 'inter300',
                color: theme.colors.bg5,
                textAlign: 'left',
              }}
            />
          )}
        </Box>
      </LinearGradient>
    </Box>
  )
}

export default Header
