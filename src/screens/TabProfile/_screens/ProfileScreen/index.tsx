import React, { useEffect, useState } from 'react'
import { Box } from '@/components/_essentials/Box'
import { useTheme } from 'styled-components'
import { ScreenTitle } from '@/components/_essentials/Text/ScreenTitle'
import { Paragraph } from '@/components/_essentials/Text/Paragraph'
import { useTranslation } from 'react-i18next'
import Link from '../../_components/Link'
import { ActivityIndicator, Alert, ScrollView } from 'react-native'
import TermsButton from '@/screens/TabProfile/_components/TermsButton'
import auth from '@react-native-firebase/auth'
import ProfileForm, { ProfileFormValues } from './_components/Form'
import { UPDATE_ME_MUTATION } from '@/gql/mutations/updateMe'
import { useMutation } from '@apollo/client'
import { UpdateMeMutation, UpdateMeMutationVariables } from '@/types'
import KeyboardAvoiding from '@/components/KeyboardAvoiding'
import { selectorIsRunning, useZudStore } from '@/store'
import { client } from '@/gql/apollo'

const ProfileScreen: React.FC = () => {
  const { colors } = useTheme()
  const { t } = useTranslation()
  const [isLoadingSignOut, setIsLoadingSignOut] = useState(false)
  const user = auth().currentUser
  const isTaskRunning = useZudStore(selectorIsRunning)
  const setAnonymousUid = useZudStore.getState().setAnonymousUid
  const setUser = useZudStore.getState().setUser
  const clearStore = useZudStore.getState().clearStore

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const [updateMeMutation] = useMutation<UpdateMeMutation, UpdateMeMutationVariables>(
    UPDATE_ME_MUTATION,
  )

  useEffect(() => {
    if (!user?.displayName) {
      setFirstName('')
      setLastName('')
      return
    }

    const splitDisplayName = user?.displayName?.split(' ')
    const firstName = splitDisplayName?.[0]
    const lastName = splitDisplayName?.[1]

    setFirstName(firstName)
    setLastName(lastName)
  }, [user?.displayName])

  const handleSignOut = () => {
    setIsLoadingSignOut(true)
    clearStore()

    auth()
      .signOut()
      .then(() =>
        auth()
          .signInAnonymously()
          .then(async ({ user }) => {
            setUser(user)
            setAnonymousUid(user.uid)
            await client.refetchQueries({
              include: 'all',
            })
          }),
      )
      .catch(console.warn)
      .finally(() => setIsLoadingSignOut(false))
  }

  const saveChanges = async (data: ProfileFormValues) => {
    const newFirstName = data.firstName.trim()
    const newLastName = data.lastName.trim()

    if (!auth().currentUser) return
    updateMeMutation({
      variables: { firstName: newFirstName, lastName: newLastName },
    }).catch(console.warn)
    return await auth()
      .currentUser?.updateProfile({
        displayName: `${newFirstName} ${newLastName}`,
      })
      .then(() => {
        setFirstName(newFirstName)
        setLastName(newLastName)
      })
  }

  const alert = () => Alert.alert(t('alert.cannotLogout'), t('alert.cannotLogoutDesc'))

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.bg0 }}>
      <Box marginLeft={35} marginTop={50}>
        <ScreenTitle>{t(`screens.profile.title`)}</ScreenTitle>
      </Box>
      <KeyboardAvoiding>
        <ProfileForm
          initialValues={{
            firstName: firstName?.trim(),
            lastName: lastName?.trim(),
          }}
          onSubmit={saveChanges}
        />
      </KeyboardAvoiding>

      <Box fullWidth alignItems="center" justify="center" marginTop={40} marginBottom={40}>
        <Box justify="space-between" flexDirection="row">
          <TermsButton />
          <Paragraph color={colors.bg4}> • </Paragraph>
          <Box width={60} alignItems="center">
            {!isLoadingSignOut ? (
              <Link
                label={t(`screens.profile.logout`)}
                onPress={isTaskRunning ? alert : handleSignOut}
              />
            ) : (
              <ActivityIndicator color={colors.bg3} size="small" />
            )}
          </Box>
        </Box>
      </Box>
    </ScrollView>
  )
}

export default ProfileScreen
