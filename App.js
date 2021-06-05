import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"

import MainPage from "./components/MainPage"
import DailyWeather from "./components/DailyWeather"
import HourlyWeather from "./components/HourlyWeather"

const AuthStack = createStackNavigator()

export default () => (
  <NavigationContainer>
    <AuthStack.Navigator>
      <AuthStack.Screen name="Main Page" component={MainPage} />
      <AuthStack.Screen name="Daily Weather" component={DailyWeather} />
      <AuthStack.Screen name="Hourly Weather" component={HourlyWeather} />
    </AuthStack.Navigator>
  </NavigationContainer>
)