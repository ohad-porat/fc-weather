import React from "react"
import {
  Text,
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import {
  faTint,
  faCloudShowersHeavy,
} from "@fortawesome/free-solid-svg-icons"

import colors from "../services/colors"
import dayNamesArray from "../services/dayNamesArray"

export default function DailyWeatherInfo({ route }) {
  const { dailyWeather, timezoneOffset } = route.params

  const weatherTiles = dailyWeather.map((day) => {
    const tempCelsiusMin = Math.floor(day.temp.min)
    const tempFahrenheitMin = Math.floor(tempCelsiusMin * 1.8 + 32)
    const tempCelsiusMax = Math.floor(day.temp.max)
    const tempFahrenheitMax = Math.floor(tempCelsiusMax * 1.8 + 32)
    const precipitation = Math.floor(day.pop * 100)
    const uvi = Math.floor(day.uvi)

    const iconUrl = `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`

    const date = new Date((day.dt + timezoneOffset) * 1000)
    const month = date.getUTCMonth() + 1
    const dayNumber = date.getUTCDate()
    const dayName = dayNamesArray[1][date.getDay()]
    return (
      <View key={day.dt}>
        <View style={styles.weatherContainer}>
          <View style={styles.dayContainer}>
            <Text style={styles.dayText}>
              {`${month}/${dayNumber}`} {dayName}
            </Text>
          </View>
          <View style={styles.dataContainer}>
            <Image style={styles.weatherIcon} source={{ uri: iconUrl }} />
            <View style={styles.tempContainer}>
              <Text style={{ ...styles.tempText, marginBottom: 10 }}>
                {tempCelsiusMax}°C
              </Text>
              <Text style={styles.tempText}>{tempFahrenheitMax}°F</Text>
            </View>
            <Text style={styles.slash}>/</Text>
            <View>
              <Text style={{ ...styles.tempText, marginBottom: 10 }}>
                {tempCelsiusMin}°C
              </Text>
              <Text style={styles.tempText}>{tempFahrenheitMin}°F</Text>
            </View>
            <View style={{ marginLeft: 20 }}>
              <View style={{ ...styles.dataContainer, marginBottom: 10 }}>
                <FontAwesomeIcon
                  icon={faCloudShowersHeavy}
                  size={20}
                  color={colors.primaryColor}
                />
                <Text style={styles.dataText}>{precipitation}%</Text>
              </View>
              <View style={styles.dataContainer}>
                <FontAwesomeIcon
                  icon={faTint}
                  size={20}
                  color={colors.primaryColor}
                />
                <Text style={styles.dataText}>{day.humidity}%</Text>
              </View>
            </View>
            <View style={styles.uvContainer}>
              <Text style={styles.uvText}>UVI</Text>
              <Text style={styles.uvText}>{uvi}</Text>
            </View>
          </View>
        </View>
      </View>
    )
  })

  return (
    <SafeAreaView style={styles.pageContainer}>
      <ScrollView style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Daily Weather</Text>
        </View>
        {weatherTiles}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  mainContainer: {
    marginLeft: 25,
    marginRight: 25,
  },
  headerContainer: {
    alignItems: "center",
  },
  header: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 20,
    color: colors.primaryColor,
  },
  weatherContainer: {
    marginBottom: 15,
    padding: 5,
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  dayContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  dayText: {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  weatherIcon: {
    width: 60,
    height: 60,
  },
  tempContainer: {
    marginLeft: 5,
  },
  slash: {
    fontSize: 50,
    fontWeight: "200",
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5,
  },
  tempText: {
    fontSize: 17,
    fontWeight: "600",
    color: colors.primaryColor,
  },
  dataContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dataText: {
    marginLeft: 10,
    fontSize: 13,
  },
  uvContainer: {
    alignItems: "center"
  },
  uvText: {
    fontSize: 15,
    marginLeft: 15,
    marginRight: 15
  },
})
