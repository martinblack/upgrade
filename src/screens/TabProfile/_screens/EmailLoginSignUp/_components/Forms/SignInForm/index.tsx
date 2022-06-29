import ElipseButton from '@/components/Buttons/ElipseButton'
import TextInput, { PasswordInput } from '@/components/TextInput'
import { Box } from '@/components/_essentials/Box'
import { Formik, useFormikContext } from 'formik'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { TextInput as ReactTextInput } from 'react-native'
import { Errors } from '@/screens/TabProfile/types'
import { signInValidationSchema } from '@/screens/TabProfile/utils/validation'
import { useTheme } from 'styled-components'

export interface SignInValues {
  email: string
  password: string
}

interface FormProps {
  isLoading: boolean
  apiErrors?: Errors
  resetApiErrors: () => void
}

interface SignInFormProps {
  initialValues: SignInValues
  onSubmit: (data: SignInValues) => Promise<void>
  apiErrors?: Errors
  resetApiErrors: () => void
}

const Form: React.FC<FormProps> = ({ isLoading, apiErrors, resetApiErrors }) => {
  const { t } = useTranslation()
  const { colors } = useTheme()

  const lastNameInputRef = React.createRef<ReactTextInput>()

  const {
    values,
    setFieldValue,
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    setErrors,
    isSubmitting,
    setSubmitting,
  } = useFormikContext<SignInValues>()

  const onChange = () => {
    setErrors({})
    resetApiErrors()
  }

  const onHandleSubmit = () => {
    handleSubmit()
    setSubmitting(false)
  }

  return (
    <React.Fragment>
      <Box marginBottom={30}>
        <TextInput
          name="email"
          placeholder={t('screens.login.email')}
          onChangeText={handleChange('email')}
          onChange={onChange}
          onBlur={() => {
            handleBlur('email')
            setFieldValue('email', values.email.trim())
          }}
          onSubmitEditing={() => lastNameInputRef?.current?.focus()}
          blurOnSubmit={false}
          returnKeyType="next"
          keyboardType="email-address"
          error={errors.email || apiErrors?.email}
        />
      </Box>

      <Box marginBottom={45}>
        <PasswordInput
          name="password"
          placeholder={t('screens.login.password')}
          onChangeText={handleChange('password')}
          onChange={onChange}
          onBlur={handleBlur('password')}
          onSubmitEditing={onHandleSubmit}
          blurOnSubmit={false}
          returnKeyType="done"
          ref={lastNameInputRef}
          error={errors.password || apiErrors?.password}
        />
      </Box>

      <Box fullWidth alignItems={'center'}>
        <ElipseButton
          width={150}
          color={colors.bg3}
          label={t('screens.login.login')}
          labelColor={colors.bg0}
          onPress={onHandleSubmit}
          isLoading={isLoading}
          loaderColor={colors.bg0}
          isDisabled={isSubmitting}
        />
      </Box>
    </React.Fragment>
  )
}

export const SignInForm: React.FC<SignInFormProps> = ({
  initialValues,
  onSubmit,
  apiErrors,
  resetApiErrors,
}) => {
  const { t } = useTranslation()
  const validation = signInValidationSchema(t)

  const [isLoading, setIsLoading] = React.useState(false)

  const signInHandler = (data: SignInValues) => {
    setIsLoading(true)
    onSubmit(data).finally(() => setIsLoading(false))
  }

  return (
    <Formik<SignInValues>
      initialValues={initialValues}
      onSubmit={values => signInHandler(values)}
      validateOnBlur={false}
      validateOnChange={false}
      validationSchema={validation}>
      <Form isLoading={isLoading} apiErrors={apiErrors} resetApiErrors={resetApiErrors} />
    </Formik>
  )
}
