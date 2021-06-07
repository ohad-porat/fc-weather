import { StatusBar } from "expo-status-bar"
import React, { useEffect, useState } from "react"
import { StyleSheet, Text, SafeAreaView, View, Image } from "react-native"
import { WEATHER_API_KEY } from "react-native-dotenv"
import PTRView from "react-native-pull-to-refresh"

import getCurrentLocation from "../services/getCurrentLocation"
import colors from "../services/colors"

import WeatherMainInfo from "./WeatherMainInfo"
import WeatherDetails from "./WeatherDetails"

const baseWeatherUrl = `https://api.openweathermap.org/data/2.5/`

export default function MainPage({ navigation }) {
  const [currentWeather, setCurrentWeather] = useState()
  const [currentPrecipitation, setCurrentPrecipitation] = useState()
  const [hourlyWeather, setHourlyWeather] = useState()
  const [dailyWeather, setDailyWeather] = useState()
  const [timezoneOffset, setTimezoneOffset] = useState()

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
        setHourlyWeather(weatherData.hourly)
        setDailyWeather(weatherData.daily)
        setTimezoneOffset(weatherData.timezone_offset)
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
                onPress={() =>
                  navigation.push("HourlyWeather", { hourlyWeather, timezoneOffset })
                }
              >
                Hourly Weather
              </Text>
            </View>
            <View style={styles.buttonView}>
              <Text
                style={styles.button}
                onPress={() =>
                  navigation.push("DailyWeather", { dailyWeather, timezoneOffset })
                }
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
    marginTop: 10,
  },
  weatherInfoContainer: {
    flex: 1,
    justifyContent: "flex-start",
    marginTop: 10,
    marginBottom: 25,
  },
  buttonsContainer: {
    justifyContent: "center",
    flexDirection: "row",
    marginBottom: 20,
  },
  buttonView: {
    marginTop: 5,
    backgroundColor: colors.primaryColor,
    padding: 8,
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
