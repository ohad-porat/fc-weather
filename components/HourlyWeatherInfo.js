import React from "react"
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
} from "react-native"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import {
  faTint,
  faCloudShowersHeavy,
} from "@fortawesome/free-solid-svg-icons"

import colors from "../services/colors"
import daysName from "../services/daysName"

export default function HourlyWeatherInfo({ route }) {
  const { hourlyWeather, timezoneOffset } = route.params

  const weatherTiles = hourlyWeather.map((hour) => {
    const tempCelsius = Math.floor(hour.temp)
    const tempFahrenheit = Math.floor(tempCelsius * 1.8 + 32)
    const precipitation = Math.floor(hour.pop * 100)

    const iconUrl = `https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`

    const date = new Date((hour.dt + timezoneOffset) * 1000)
    const hours = date.getUTCHours()

    let hoursOutput
    let dayOutput

    const month = date.getUTCMonth() + 1
    const day = date.getUTCDate()
    const dayName = daysName[date.getDay() + 1]
    console.log(dayName)

    if (hours === 0) {
      hoursOutput = `12 AM`
      dayOutput = <Text style={styles.dayText}>{`${month}/${day}`} {dayName}</Text>
    } else if (hours > 12) {
      hoursOutput = `${hours - 12} PM`
    } else if (hours === 12) {
      hoursOutput = `12 PM`
    } else {
      hoursOutput = `${hours} AM`
    }
    return (
      <View key={hour.dt}>
        {dayOutput}
        <View style={styles.weatherContainer}>
          <Text style={styles.timeText}>{hoursOutput}</Text>
          <Image style={styles.weatherIcon} source={{ uri: iconUrl }} />
          <View style={styles.tempContainer}>
            <Text style={{ ...styles.tempText, marginRight: 15 }}>
              {tempCelsius}°C
            </Text>
            <Text style={styles.tempText}>{tempFahrenheit}°F</Text>
          </View>
          <View>
            <View style={{ ...styles.dataContainer, marginTop: 10 }}>
              <FontAwesomeIcon
                icon={faTint}
                size={20}
                color={colors.primaryColor}
              />
              <Text style={styles.dataText}>{hour.humidity}%</Text>
            </View>
            <View style={styles.dataContainer}>
              <FontAwesomeIcon
                icon={faCloudShowersHeavy}
                size={20}
                color={colors.primaryColor}
              />
              <Text style={styles.dataText}>{precipitation}%</Text>
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
          <Text style={styles.header}>Hourly Weather</Text>
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
    alignItems: "center"
  },
  header: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 20,
    color: colors.primaryColor
  },
  dayText: {
    marginBottom: 15,
    fontSize: 20,
  },
  weatherContainer: {
    marginBottom: 15,
    padding: 5,
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  timeText: {
    fontSize: 20,
  },
  weatherIcon: {
    width: 60,
    height: 60,
    marginLeft: 10,
  },
  tempContainer: {
    flexDirection: "row",
    marginLeft: 10,
  },
  tempText: {
    fontSize: 25,
    fontWeight: "600",
  },
  dataContainer: {
    flexDirection: "row",
    marginLeft: 20,
    marginBottom: 10,
  },
  dataText: {
    marginLeft: 10,
    fontSize: 16,
  },
})
