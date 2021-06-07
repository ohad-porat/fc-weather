import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"

import MainPage from "./components/MainPage"
import DailyWeatherInfo from "./components/DailyWeatherInfo"
import HourlyWeatherInfo from "./components/HourlyWeatherInfo"

const AuthStack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <AuthStack.Navigator>
        <AuthStack.Screen
          name="MainPage"
          component={MainPage}
          options={{ title: "Main Page" }}
        />
        <AuthStack.Screen
          name="DailyWeather"
          component={DailyWeatherInfo}
          options={{ title: "Daily Weather" }}
        />
        <AuthStack.Screen
          name="HourlyWeather"
          component={HourlyWeatherInfo}
          options={{ title: "Hourly Weather" }}
        />
      </AuthStack.Navigator>
    </NavigationContainer>
  )
}
