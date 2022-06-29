import { Box } from '@/components/_essentials/Box'
import { SectionTitle } from '@/components/_essentials/Text/SectionTitle'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import auth from '@react-native-firebase/auth'
import { Errors } from '@/screens/TabProfile/types'
import Footer from './_components/Footer'
import {
  EMPTY_SIGN_IN_INFO,
  EMPTY_SIGN_UP_INFO,
  USER_NOT_FOUND,
} from '@/screens/TabProfile/utils/constants'
import { Auth } from '@/hooks/fireAuth'
import { useNavigation } from '@react-navigation/native'
import { ROUTES } from '@/navigation/routes'
import KeyboardAvoiding from '@/components/KeyboardAvoiding'
import { FormikProvider, useFormik } from 'formik'
import { SignUpForm, SignUpValues } from './_components/Forms/SignUpForm'
import { SignInForm, SignInValues } from './_components/Forms/SignInForm'

interface Props {
  onSocialLogin: () => void
  apiError?: string
}

const EmailLoginSignUp: React.FC<Props> = ({ onSocialLogin, apiError }) => {
  const { t } = useTranslation()
  const navigation = useNavigation()

  const [isSigningUp, setIsSigningUp] = useState(true)
  const [errors, setErrors] = useState<Errors>({})

  const clearParams = () => navigation.setParams({ errorMessage: undefined })

  const registerUser = async (data: SignUpValues) => {
    navigation.navigate(ROUTES.TERMS, {
      auth: Auth.CLASSIC,
      email: data.email,
      password: data.password,
      displayName: `${data.firstName.trim()} ${data.lastName.trim()}`,
    })
    clearParams()
  }

  const loginUser = async (data: SignInValues) => {
    await auth()
      .signInWithEmailAndPassword(data.email.trim(), data.password.trim())
      .catch(error => {
        console.log('error', error)
        error.code === USER_NOT_FOUND
          ? setErrors(prevState => ({
              ...prevState,
              email: t(`errors.${error.code}`),
            }))
          : setErrors(prevState => ({
              ...prevState,
              password: t(`errors.${error.code}`),
            }))
      })
  }

  useEffect(() => {
    if (!apiError) return
    setErrors(prevState => ({
      ...prevState,
      email: t(`errors.${apiError?.substring(apiError.indexOf('[') + 1, apiError.indexOf(']'))}`),
    }))
  }, [apiError])

  const formikSignUp = useFormik<SignUpValues>({
    initialValues: EMPTY_SIGN_UP_INFO,
    onSubmit: registerUser,
  })
  const formikSignIn = useFormik<SignInValues>({
    initialValues: EMPTY_SIGN_IN_INFO,
    onSubmit: loginUser,
  })

  return (
    <Box fullHeight alignItems={'center'} justify={'center'} paddingVertical={50}>
      <SectionTitle>
        {isSigningUp ? t('screens.login.signUpTitle') : t('screens.login.title')}
      </SectionTitle>
      <Box padding={35} fullWidth>
        <KeyboardAvoiding>
          {isSigningUp ? (
            <FormikProvider value={formikSignUp}>
              <SignUpForm
                initialValues={EMPTY_SIGN_UP_INFO}
                onSubmit={registerUser}
                apiErrors={errors}
                resetApiErrors={() => setErrors({})}
              />
            </FormikProvider>
          ) : (
            <FormikProvider value={formikSignIn}>
              <SignInForm
                initialValues={EMPTY_SIGN_IN_INFO}
                onSubmit={loginUser}
                apiErrors={errors}
                resetApiErrors={() => setErrors({})}
              />
            </FormikProvider>
          )}
        </KeyboardAvoiding>
      </Box>
      <Footer
        isSigningUp={isSigningUp}
        onSocialLogin={onSocialLogin}
        onPressSwitch={() => {
          setIsSigningUp(prev => !prev)
          clearParams()
          setErrors({})
        }}
      />
    </Box>
  )
}

export default EmailLoginSignUp
