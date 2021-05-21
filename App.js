import { StatusBar } from "expo-status-bar"
import React, { useEffect, useState } from "react"
import { StyleSheet, Text, SafeAreaView, View, Image } from "react-native"
import * as Location from "expo-location"
import { WEATHER_API_KEY } from "react-native-dotenv"
import PTRView from "react-native-pull-to-refresh"

import WeatherInfo from "./components/WeatherInfo"
import WeatherDetails from "./components/WeatherDetails"

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
        return true
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  useEffect(() => {
    getCurrentWeather()
  }, [])

  const refreshHandler = () => {
    return new Promise((resolve) => {
      if (getCurrentWeather()) {
        resolve()
      }
    })
  }

  if (currentWeather) {
    return (
      <SafeAreaView style={styles.container}>
        <PTRView onRefresh={refreshHandler}>
          <StatusBar style="auto" />
          <View style={styles.logoContainer}>
            <Image
              style={styles.mainLogo}
              source={require("./assets/fc-weather-logo.png")}
            ></Image>
          </View>
          <View style={styles.weatherInfoContainer}>
            <WeatherInfo currentWeather={currentWeather} />
          </View>
          <WeatherDetails currentWeather={currentWeather} />
        </PTRView>
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
  },
  logoContainer: {
    alignItems: "center",
  },
  mainLogo: {
    height: 110,
    width: 100,
    marginTop: 60,
  },
  weatherInfoContainer: {
    flex: 1,
    justifyContent: "flex-start",
    marginTop: 30,
    marginBottom: 40
  },
})
