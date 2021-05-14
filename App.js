import { StatusBar } from "expo-status-bar"
import React, { useEffect, useState } from "react"
import { StyleSheet, Text, SafeAreaView } from "react-native"
import * as Location from "expo-location"
import { WEATHER_API_KEY } from "react-native-dotenv"

const baseWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?`

export default function App() {
  const [errorMessage, setErrorMessage] = useState()
  const [currentWeather, setCurrentWeather] = useState()

  const getCurrentWeather = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== "granted") {
        setErrorMessage("Access to location is needed to run the app")
        alert(errorMessage)
      }
      const currentLocation = await Location.getCurrentPositionAsync()
      const { latitude, longitude } = currentLocation.coords

      const currentLocationWeatherUrl = `${baseWeatherUrl}lat=${latitude}&lon=${longitude}&units=metric&appid=${WEATHER_API_KEY}`

      const response = await fetch(currentLocationWeatherUrl)
      if (response.ok) {
        const weatherData = await response.json()
        setCurrentWeather(weatherData)
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  useEffect(() => {
    getCurrentWeather()
  }, [])

  if (currentWeather) {
    const tempCelsius = Math.floor(currentWeather.main.temp)
    const tempFahrenheit = Math.floor((tempCelsius * 1.8) + 32)


    return (
      <SafeAreaView style={styles.container}>
        <Text>{tempCelsius}°C {"         "}{tempFahrenheit}°F</Text>
        <StatusBar style="auto" />
      </SafeAreaView>
    )
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Oh no! Something went wrong.</Text>
        <StatusBar style="auto" />
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center"
  },
})
