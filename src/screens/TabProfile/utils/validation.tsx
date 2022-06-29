import { TFunction } from 'react-i18next'
import { object, string } from 'yup'

const PASSWORD = `^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,20}$`

const getProfileFields = (t: TFunction) => ({
  firstName: string().required(t('errors.firstNameRequired')),
  lastName: string().required(t('errors.lastNameRequired')),
})

const getEmailField = (t: TFunction) => ({
  email: string().required(t('errors.emailRequired')).email(t('errors.emailInvalid')),
})

export const signInValidationSchema = (t: TFunction) =>
  object({
    password: string()
      .required(t('errors.passwordRequired'))
      .matches(new RegExp(PASSWORD), t('errors.passwordInvalid')),
    ...getEmailField(t),
  })

export const signUpValidationSchema = (t: TFunction) =>
  object({
    password: string()
      .required(t('errors.passwordRequired'))
      .matches(new RegExp(PASSWORD), t('errors.passwordWeak')),
    ...getEmailField(t),
    ...getProfileFields(t),
  })

export const profileValidationSchema = (t: TFunction) =>
  object({
    ...getProfileFields(t),
  })
