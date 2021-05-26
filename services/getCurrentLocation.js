import * as Location from "expo-location"

const getCurrentLocation = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync()
  if (status !== "granted") {
    alert("Access to location is needed to run the app")
  }
  try {
    const fetchedLocation = await Location.getCurrentPositionAsync()
    const { latitude, longitude } = fetchedLocation.coords
    return { latitude: latitude, longitude: longitude }
  } catch (error) {
    console.error(`Error in fetch: ${error.message}`)
  }
}

export default getCurrentLocation
