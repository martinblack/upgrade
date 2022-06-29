import { ThemedStatusBar } from '@/components/ThemedStatusBar'
import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native'

// GENERATED
export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modal</Text>
      <View style={styles.separator} />

      {/* Use a light status bar on iOS to account for the black space above the modal
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} /> */}
      <ThemedStatusBar />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
})
