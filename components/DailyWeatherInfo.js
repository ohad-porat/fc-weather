import React from "react"
import { Text } from "react-native"

import colors from "../services/colors"

export default function DailyWeatherInfo({ route }) {
  const { hourlyWeather, timezoneOffset } = route.params

  return <Text>Daily Weather Screen</Text>
}
