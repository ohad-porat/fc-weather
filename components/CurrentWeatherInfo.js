import React from "react"
import { Text, View, SafeAreaView, StyleSheet, Image } from "react-native"

import colors from "../utils/index"

export default function CurrentWeatherInfo({ currentWeather }) {
  const tempCelsius = Math.floor(currentWeather.main.temp)
  const tempFahrenheit = Math.floor(tempCelsius * 1.8 + 32)

  const iconUrl = `https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@4x.png`

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.locationName}>{currentWeather.name}</Text>
      <Image style={styles.weatherIcon} source={{ uri: iconUrl }} />
      <View style={styles.tempContainer}>
        <Text style={styles.celsiusText}>{tempCelsius}°C</Text>
        <Text style={styles.fahrenheitText}>{tempFahrenheit}°F</Text>
      </View>
      <Text style={styles.weatherDescription}>
        {currentWeather.weather[0].description}
      </Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  locationName: {
    fontSize: 22,
    fontWeight: "500"
  },
  weatherIcon: {
    width: 120,
    height: 120,
  },
  tempContainer: {
    flexDirection: "row",
  },
  celsiusText: {
    marginRight: 30,
    fontSize: 40,
    color: colors.primaryColor,
  },
  fahrenheitText: {
    fontSize: 40,
    color: colors.primaryColor,
  },
  weatherDescription: {
    textTransform: "capitalize",
    marginTop: 10,
    fontSize: 18,
  },
})
