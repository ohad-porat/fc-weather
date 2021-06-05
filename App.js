import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"

import MainPage from "./components/MainPage"
import DailyWeather from "./components/DailyWeather"
import HourlyWeather from "./components/HourlyWeather"

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
          component={DailyWeather}
          options={{ title: "Daily Weather" }}
        />
        <AuthStack.Screen
          name="HourlyWeather"
          component={HourlyWeather}
          options={{ title: "Hourly Weather" }}
        />
      </AuthStack.Navigator>
    </NavigationContainer>
  )
}
