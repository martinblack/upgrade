import { useNavigation } from '@react-navigation/native'
import ElipseButton from '@/components/Buttons/ElipseButton'
import TextInput, { PasswordInput } from '@/components/TextInput'
import { Box } from '@/components/_essentials/Box'
import { Formik, useFormikContext } from 'formik'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { TextInput as ReactTextInput } from 'react-native'
import { Errors } from '@/screens/TabProfile/types'
import { signUpValidationSchema } from '@/screens/TabProfile/utils/validation'
import { useTheme } from 'styled-components'

export interface SignUpValues {
  email: string
  password: string
  firstName: string
  lastName: string
}

interface FormProps {
  isLoading: boolean
  apiErrors?: Errors
  resetApiErrors: () => void
}

interface SignUpFormProps {
  initialValues: SignUpValues
  onSubmit: (data: SignUpValues) => Promise<void>
  apiErrors?: Errors
  resetApiErrors: () => void
}

const Form: React.FC<FormProps> = ({ resetApiErrors, apiErrors, isLoading }) => {
  const { t } = useTranslation()
  const { colors } = useTheme()
  const navigation = useNavigation()

  const passwordInputRef = React.createRef<ReactTextInput>()
  const firstNameInputRef = React.createRef<ReactTextInput>()
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
    validateForm,
  } = useFormikContext<SignUpValues>()

  const onHandleSubmit = () => {
    validateForm()
    handleSubmit()
    setSubmitting(false)
  }

  const onChange = () => {
    setErrors({})
    resetApiErrors()
    navigation.setParams({ errorMessage: undefined })
  }

  return (
    <React.Fragment>
      <Box marginBottom={20}>
        <TextInput
          name="email"
          placeholder={t('screens.login.email')}
          onChangeText={handleChange('email')}
          onChange={onChange}
          onBlur={() => {
            handleBlur('email')
            setFieldValue('email', values.email.trim())
          }}
          onSubmitEditing={() => passwordInputRef?.current?.focus()}
          blurOnSubmit={false}
          returnKeyType="next"
          error={errors.email || apiErrors?.email}
          keyboardType="email-address"
        />
      </Box>

      <Box marginBottom={20}>
        <PasswordInput
          name="password"
          placeholder={t('screens.login.password')}
          onChangeText={handleChange('password')}
          onChange={onChange}
          onBlur={handleBlur('password')}
          onSubmitEditing={() => firstNameInputRef?.current?.focus()}
          blurOnSubmit={false}
          returnKeyType="next"
          ref={passwordInputRef}
          error={errors.password || apiErrors?.password}
        />
      </Box>

      <Box marginBottom={20}>
        <TextInput
          name="firstName"
          placeholder={t('screens.login.firstName')}
          onChangeText={handleChange('firstName')}
          onChange={() => setErrors({})}
          onBlur={handleBlur('firstName')}
          onSubmitEditing={() => lastNameInputRef?.current?.focus()}
          blurOnSubmit={false}
          returnKeyType="next"
          ref={firstNameInputRef}
          error={errors.firstName}
        />
      </Box>

      <Box marginBottom={20}>
        <TextInput
          name="lastName"
          placeholder={t('screens.login.lastName')}
          onChangeText={handleChange('lastName')}
          onChange={() => setErrors({})}
          onBlur={handleBlur('lastName')}
          onSubmitEditing={() => onHandleSubmit()}
          ref={lastNameInputRef}
          error={errors.lastName}
        />
      </Box>

      <Box fullWidth alignItems={'center'}>
        <ElipseButton
          width={150}
          color={colors.bg3}
          label={t('screens.login.signUpNow')}
          labelColor={colors.bg0}
          onPress={() => onHandleSubmit()}
          isLoading={isLoading}
          loaderColor={colors.bg0}
          isDisabled={isSubmitting}
        />
      </Box>
    </React.Fragment>
  )
}

export const SignUpForm: React.FC<SignUpFormProps> = ({
  initialValues,
  onSubmit,
  apiErrors,
  resetApiErrors,
}) => {
  const { t } = useTranslation()
  const validation = signUpValidationSchema(t)

  const [isLoading, setIsLoading] = React.useState(false)

  const signUpHandler = (data: SignUpValues) => {
    setIsLoading(true)
    onSubmit(data).finally(() => setIsLoading(false))
  }

  return (
    <Formik<SignUpValues>
      initialValues={initialValues}
      onSubmit={values => signUpHandler(values)}
      validateOnBlur={false}
      validateOnChange={false}
      validationSchema={validation}>
      <Form isLoading={isLoading} apiErrors={apiErrors} resetApiErrors={resetApiErrors} />
    </Formik>
  )
}
