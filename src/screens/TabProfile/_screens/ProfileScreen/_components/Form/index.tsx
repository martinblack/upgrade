import ElipseButton from '@/components/Buttons/ElipseButton'
import Divider from '@/components/Divider'
import TextInput from '@/components/TextInput'
import { Box } from '@/components/_essentials/Box'
import { Formik } from 'formik'
import React from 'react'
import { TextInput as ReactTextInput } from 'react-native'
import { useTranslation } from 'react-i18next'
import { profileValidationSchema } from '@/screens/TabProfile/utils/validation'
import { useTheme } from 'styled-components'
import CheckBoxField from '../CheckBoxField'
import { selectorCanUseData, useZudStore } from '@/store'

export interface ProfileFormValues {
  firstName: string
  lastName: string
}

interface ProfileFormProps {
  initialValues: ProfileFormValues
  onSubmit: (data: ProfileFormValues) => Promise<void>
}

const ProfileForm: React.FC<ProfileFormProps> = ({ initialValues, onSubmit }) => {
  const { t } = useTranslation()
  const { colors } = useTheme()
  const validation = profileValidationSchema(t)

  const canUseData = useZudStore(selectorCanUseData)
  const setCanUseData = useZudStore.getState().setCanUseData

  const lastNameInputRef = React.createRef<ReactTextInput>()

  const [isTextChanged, setIsTextChanged] = React.useState(false)
  const [isSaved, setIsSaved] = React.useState(true)
  const [isLoading, setIsLoading] = React.useState(false)

  const isButtonDisabled = isSaved && !isTextChanged

  const submitHandler = (data: ProfileFormValues) => {
    setIsLoading(true)
    onSubmit(data)
      .then(() => {
        setIsTextChanged(false)
        setIsSaved(true)
      })
      .finally(() => setIsLoading(false))
  }

  const handleTextChange = () => {
    setIsTextChanged(true)
    setIsSaved(false)
  }

  return (
    <Formik<ProfileFormValues>
      enableReinitialize
      initialValues={initialValues}
      onSubmit={values => submitHandler(values)}
      validationSchema={validation}>
      {({ handleChange, handleBlur, handleSubmit, errors }) => (
        <React.Fragment>
          <Box margin={35}>
            <Box marginBottom={20}>
              <TextInput
                name="firstName"
                onChangeText={handleChange('firstName')}
                onChange={handleTextChange}
                onBlur={handleBlur('firstName')}
                onSubmitEditing={() => lastNameInputRef?.current?.focus()}
                blurOnSubmit={false}
                returnKeyType="next"
                error={errors.firstName}
              />
            </Box>
            <Box marginBottom={20}>
              <TextInput
                name="lastName"
                onChangeText={handleChange('lastName')}
                onChange={handleTextChange}
                onBlur={handleBlur('lastName')}
                onSubmitEditing={() => handleSubmit()}
                blurOnSubmit={false}
                returnKeyType="done"
                error={errors.lastName}
                ref={lastNameInputRef}
              />
            </Box>
          </Box>

          <Divider />

          <Box margin={35}>
            <CheckBoxField
              isChecked={canUseData}
              title={t(`screens.profile.data`)}
              description={t(`screens.profile.dataDescription`)}
              onPress={() => setCanUseData(!canUseData)}
            />
          </Box>

          <Divider />

          <Box fullWidth alignItems="center" marginTop={30} opacity={isButtonDisabled ? 0 : 1}>
            <ElipseButton
              label={t(`screens.profile.save`)}
              onPress={handleSubmit}
              labelColor={colors.bg0}
              width={90}
              color={colors.bg3}
              isLoading={isLoading}
              loaderColor={colors.bg0}
              isDisabled={isButtonDisabled}
            />
          </Box>
        </React.Fragment>
      )}
    </Formik>
  )
}

export default ProfileForm
