import React from "react"
import { View, Text, StyleSheet } from "react-native"

import colors from "../utils/index"

export default function WeatherDetails({ currentWeather }) {
  const feelsLikeCelsius = Math.floor(currentWeather.main.feels_like)
  const feelsLikeFahrenheit = Math.floor(feelsLikeCelsius * 1.8 + 32)
  const humidity = currentWeather.main.humidity

  console.log(currentWeather)

  return (
    <View style={styles.weatherDetailsContainer}>
      <View style={styles.weatherDetailsRow}>
        <View
          style={{
            ...styles.weatherDetailsBox,
            borderRightWidth: 1,
            borderRightColor: colors.borderColor,
          }}
        >
          <Text style={{marginRight: 15}}>{feelsLikeCelsius}°C</Text>
          <Text>
            {feelsLikeFahrenheit}°F
          </Text>
        </View>
        <View style={styles.weatherDetailsBox}>
          <Text>{humidity}%</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  weatherDetailsContainer: {
    marginTop: "auto",
    margin: 15,
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: 10,
  },
  weatherDetailsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  weatherDetailsBox: {
    flexDirection: "row",
    flex: 1,
    padding: 20,
  },
})
