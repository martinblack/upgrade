import * as React from 'react'
import { KeyboardAvoidingView, KeyboardAvoidingViewProps } from 'react-native'
import Layout from '@/constants/Layout'

interface Props extends KeyboardAvoidingViewProps {}

const KeyboardAvoiding: React.FC<Props> = ({ children, ...keyboardProps }) => {
  return (
    <KeyboardAvoidingView behavior={Layout.isIos ? 'padding' : 'height'} {...keyboardProps}>
      {children}
    </KeyboardAvoidingView>
  )
}

export default KeyboardAvoiding
