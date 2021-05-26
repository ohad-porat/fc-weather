import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import {
  faTemperatureHigh,
  faTint,
  faWind,
  faCloudShowersHeavy,
} from "@fortawesome/free-solid-svg-icons"

import colors from "../utils/index"

export default function WeatherDetails({
  currentWeather,
  currentPrecipitation,
}) {
  const feelsLike = {
    celsius: Math.floor(currentWeather.main.feels_like),
    fahrenheit: Math.floor(currentWeather.main.feels_like * 1.8 + 32),
  }
  const humidity = currentWeather.main.humidity
  const windSpeed = {
    kilometersPerHour: Math.floor(currentWeather.wind.speed * 3.6),
    milesPerHour: Math.floor(currentWeather.wind.speed * 2.236936),
  }
  let precipitation
  if (currentPrecipitation === 1) {
    precipitation = 100
  } else {
    precipitation = currentPrecipitation * 100
  }

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
          <View style={styles.weatherDetailsRow}>
            <FontAwesomeIcon
              icon={faTint}
              size={25}
              color={colors.primaryColor}
            />
            <View style={styles.weatherDetailsItem}>
              <Text>Humidity</Text>
              <View style={styles.weatherDetailsRow}>
                <Text style={styles.dataText}>{humidity}%</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.weatherDetailsBox}>
          <View style={styles.weatherDetailsRow}>
            <FontAwesomeIcon
              icon={faTemperatureHigh}
              size={25}
              color={colors.primaryColor}
            />
            <View style={styles.weatherDetailsItem}>
              <Text>Feels Like</Text>
              <View style={styles.weatherDetailsRow}>
                <Text style={{ ...styles.dataText, marginRight: 15 }}>
                  {feelsLike.celsius}°C
                </Text>
                <Text style={styles.dataText}>
                  {feelsLike.fahrenheit}°F
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          ...styles.weatherDetailsRow,
          borderTopWidth: 1,
          borderTopColor: colors.borderColor,
        }}
      >
        <View
          style={{
            ...styles.weatherDetailsBox,
            borderRightWidth: 1,
            borderRightColor: colors.borderColor,
          }}
        >
          <View style={styles.weatherDetailsRow}>
            <FontAwesomeIcon
              icon={faCloudShowersHeavy}
              size={25}
              color={colors.primaryColor}
            />
            <View style={styles.weatherDetailsItem}>
              <Text>Precipitation</Text>
              <View style={styles.weatherDetailsRow}>
                <Text style={styles.dataText}>{precipitation}%</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.weatherDetailsBox}>
          <View style={styles.weatherDetailsRow}>
            <FontAwesomeIcon
              icon={faWind}
              size={25}
              color={colors.primaryColor}
            />
            <View style={styles.weatherDetailsItem}>
              <Text>Winds Speed</Text>
              <View style={styles.weatherDetailsRow}>
                <Text style={{ ...styles.dataText, marginRight: 10 }}>
                  {windSpeed.kilometersPerHour}k/h
                </Text>
                <Text style={styles.dataText}>
                  {windSpeed.milesPerHour}mph
                </Text>
              </View>
            </View>
          </View>
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
  },
  weatherDetailsBox: {
    flex: 1,
    padding: 20,
  },
  weatherDetailsItem: {
    marginLeft: 15,
  },
  dataText: {
    fontSize: 15,
    color: colors.primaryColor,
    fontWeight: "700",
    marginTop: 7,
  },
})
