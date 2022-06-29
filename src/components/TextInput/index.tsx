import { Box } from '@/components/_essentials/Box'
import { SectionTitle } from '@/components/_essentials/Text/SectionTitle'
import * as React from 'react'
import { useTheme } from 'styled-components'
import { ErrorMessage, StyledInput } from './styled'
import { useField } from 'formik'
import { Fragment, useCallback, useState } from 'react'
import { TextInput as ReactTextInput, TextInputProps } from 'react-native'
import Eye from '@/screens/TabProfile/_screens/EmailLoginSignUp/_components/Eye'

interface InputProps extends TextInputProps {
  name: string
  label?: string
  error?: string | undefined
}

const Input = React.forwardRef<ReactTextInput, InputProps>(
  ({ label, error, name, ...inputProps }, ref) => {
    const theme = useTheme()
    const [field, _, form] = useField(name)
    const onChangeText = useCallback((text: string) => form.setValue(text), [])

    return (
      <Box>
        {label && (
          <Box paddingBottom={10}>
            <SectionTitle>{label}</SectionTitle>
          </Box>
        )}
        <StyledInput
          value={field.value}
          allowFontScaling={false}
          onChangeText={onChangeText}
          {...inputProps}
          ref={ref}
        />
        {error && (
          <Box
            roundness={3}
            left={20}
            top={40}
            backgroundColor={theme.colors.primary}
            padding={6}
            zIndex={20}
            position="absolute"
            justify="center"
            alignItems="center">
            <ErrorMessage>{error}</ErrorMessage>
          </Box>
        )}
      </Box>
    )
  },
)

const TextInput = React.forwardRef<ReactTextInput, InputProps>(({ ...inputProps }, ref) => {
  return <Input ref={ref} {...inputProps} />
})

export const PasswordInput = React.forwardRef<ReactTextInput, InputProps>(
  ({ ...inputProps }, ref) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)

    const handleOnPress = useCallback(() => setIsPasswordVisible(prev => !prev), [])

    return (
      <Fragment>
        <Input ref={ref} secureTextEntry={!isPasswordVisible} {...inputProps} />
        <Box fullHeight position="absolute" justify="center" right={10} paddingTop={6}>
          <Eye onPress={handleOnPress} isOpen={isPasswordVisible} />
        </Box>
      </Fragment>
    )
  },
)

export default TextInput
