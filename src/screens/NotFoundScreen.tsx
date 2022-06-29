import * as React from 'react'
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native'

import { RootStackScreenProps } from '../navigation/types'
import { ROUTES } from '../navigation/routes'

// GENERATED
export default function NotFoundScreen({ navigation }: RootStackScreenProps<ROUTES.NOT_FOUND>) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>This screen doesn't exist.</Text>
      <TouchableOpacity onPress={() => navigation.replace(ROUTES.ROOT)} style={styles.link}>
        <Text style={styles.linkText}>Go to home screen!</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
})
