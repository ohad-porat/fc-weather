import { StatusBar } from "expo-status-bar"
import React, { useEffect, useState } from "react"
import { StyleSheet, Text, SafeAreaView, View, Image } from "react-native"
import { WEATHER_API_KEY } from "react-native-dotenv"
import PTRView from "react-native-pull-to-refresh"

import getCurrentLocation from "../services/getCurrentLocation"
import colors from "../utils/colors"

import WeatherMainInfo from "./WeatherMainInfo"
import WeatherDetails from "./WeatherDetails"

const baseWeatherUrl = `https://api.openweathermap.org/data/2.5/`

export default function MainPage({ navigation }) {
  const [currentWeather, setCurrentWeather] = useState()
  const [currentPrecipitation, setCurrentPrecipitation] = useState()

  const getCurrentWeather = async () => {
    const currentLocation = await getCurrentLocation()
    try {
      const currentLocationWeatherUrl = `${baseWeatherUrl}weather?lat=${currentLocation.latitude}&lon=${currentLocation.longitude}&units=metric&appid=${WEATHER_API_KEY}`

      const response = await fetch(currentLocationWeatherUrl)
      if (response.ok) {
        const currentWeatherData = await response.json()
        setCurrentWeather(currentWeatherData)
        return true
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  const getHourlyAndDailyWeather = async () => {
    const currentLocation = await getCurrentLocation()
    try {
      const currentLocationWeatherUrl = `${baseWeatherUrl}onecall?lat=${currentLocation.latitude}&lon=${currentLocation.longitude}&units=metric&exclude=current,minutely,alerts&appid=${WEATHER_API_KEY}`

      const response = await fetch(currentLocationWeatherUrl)
      if (response.ok) {
        const weatherData = await response.json()
        setCurrentPrecipitation(weatherData.hourly[0].pop)
        return true
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  useEffect(() => {
    getCurrentWeather()
    getHourlyAndDailyWeather()
  }, [])

  const refreshHandler = () => {
    return new Promise((resolve) => {
      if (getCurrentWeather() && getHourlyAndDailyWeather()) {
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
              source={require("../assets/fc-weather-logo.png")}
            ></Image>
          </View>
          <View style={styles.weatherInfoContainer}>
            <WeatherMainInfo currentWeather={currentWeather} />
          </View>
          <WeatherDetails
            currentWeather={currentWeather}
            currentPrecipitation={currentPrecipitation}
          />
          <View style={styles.buttonsContainer}>
            <View style={{ ...styles.buttonView, marginRight: 30 }}>
              <Text
                style={styles.button}
                onPress={() => navigation.push("Hourly Weather")}
              >
                Hourly Weather
              </Text>
            </View>
            <View style={styles.buttonView}>
              <Text
                style={styles.button}
                onPress={() => navigation.push("Daily Weather")}
              >
                Daily Weather
              </Text>
            </View>
          </View>
        </PTRView>
      </SafeAreaView>
    )
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <PTRView onRefresh={refreshHandler}>
          <View style={styles.loadingText}>
            <Text>Loading...</Text>
          </View>
          <StatusBar style="auto" />
        </PTRView>
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
    height: 100,
    width: 85,
    marginTop: 60,
  },
  weatherInfoContainer: {
    flex: 1,
    justifyContent: "flex-start",
    marginTop: 20,
    marginBottom: 40,
  },
  buttonsContainer: {
    justifyContent: "center",
    flexDirection: "row",
  },
  buttonView: {
    marginTop: 10,
    backgroundColor: colors.primaryColor,
    padding: 7,
    borderRadius: 14,
  },
  button: {
    color: colors.borderColor,
    fontSize: 17,
  },
  loadingText: {
    alignItems: "center",
    marginTop: 80,
  },
})
