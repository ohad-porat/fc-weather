import React from "react"
import { Text, View, SafeAreaView, StyleSheet, Image } from "react-native"

import colors from "../utils/colors"

export default function WeatherMainInfo({ currentWeather }) {
  const tempCelsius = Math.floor(currentWeather.main.temp)
  const tempFahrenheit = Math.floor(tempCelsius * 1.8 + 32)

  const iconUrl = `https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@4x.png`

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.locationName}>{currentWeather.name}</Text>
      <Image style={styles.weatherIcon} source={{ uri: iconUrl }} />
      <View style={styles.tempContainer}>
        <Text style={{...styles.tempText, marginRight: 40}}>{tempCelsius}°C</Text>
        <Text style={styles.tempText}>{tempFahrenheit}°F</Text>
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
    marginTop: -15
  },
  tempText: {
    fontSize: 40,
    color: colors.primaryColor,
  },
  weatherDescription: {
    textTransform: "capitalize",
    marginTop: 10,
    fontSize: 18,
  },
})
