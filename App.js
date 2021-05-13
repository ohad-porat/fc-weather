import { StatusBar } from "expo-status-bar"
import React, { useEffect, useState } from "react"
import { StyleSheet, Text, SafeAreaView } from "react-native"
import * as Location from "expo-location"

export default function App() {
  const [errorMessage, setErrorMessage] = useState(null)
  console.log("yoo")
  const load = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== "granted") {
        setErrorMessage("Access to location is needed to run the app")
        return
      }
      const location = await Location.getCurrentPositionAsync()
      const { latitude, longitude } = location.coords
      alert(`latitude: ${latitude} longitude: ${longitude}`)
    } catch (error) {}
  }

  useEffect(() => {
    load()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <Text>FC Weather</Text>
      <StatusBar style="auto" />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#32a8f0",
    alignItems: "center",
  },
})
