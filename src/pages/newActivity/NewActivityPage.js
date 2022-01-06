import React, { useEffect, useState } from "react";
import { ScrollView, SafeAreaView, Text, View, Dimensions, Alert, ActivityIndicator } from "react-native";
import MapView, { Marker, Polyline } from 'react-native-maps'
import styles from "./NewActivityPageStyles";
import Geolocation from "@react-native-community/geolocation";
import Button from "../../components/button/Button";
import { BarChart, } from "react-native-chart-kit";
import axios from "axios";
import Icon from "react-native-vector-icons/MaterialIcons"
import firestore from '@react-native-firebase/firestore';

const APIkey = 'd80c8ff3ae6c97309a86046f3ffd186a'
let interval = null;

const NewActivityPage = () => {
  const [startLocation, setStartLocation] = useState()
  const [watchLocation, setWatchLocation] = useState([])
  const [finishLocation, setFinishLocation] = useState()
  const [distanceBetweenLocations, setDistanceBetweenLocations] = useState([])
  const [distancePerMinute, setDistancePerMinute] = useState([])
  const [dt, setDt] = useState([])
  const [weatherData, setWeactherData] = useState({})
  const [a, setA] = useState({
    totalDistance: 0,
    avarageSpeed: 0
  })

  const barData = {
    labels: dt,
    datasets: [{
      data: distanceBetweenLocations
    }]
  }

  const initialRegion = {
    latitude: 41.0391683,
    longitude: 28.9982707,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  };

  const sum = (a, b) => a + b

  const runningData = {
    AvarageSpeed: a.avarageSpeed ? a.avarageSpeed : 1,
    TotalDistance: a.totalDistance ? a.totalDistance : 1,
    TotalTime: dt ? dt.length : 1,
    StartLocation: {
      Latitude: startLocation ? startLocation.latitude : 1,
      longitude: startLocation ? startLocation.longitude : 1
    },
    watchLocation: watchLocation ? watchLocation : 1
  }

  const handleFiresoreData = async () => {
    try {
      await firestore().collection('RunningData').add(runningData)
    } catch (error) {
      console.log(error)
    }
  }

  const handleAvarageSpeedTotalDistance = () => {
    setA({
      totalDistance: distanceBetweenLocations.length >= 1 ? distanceBetweenLocations.reduce(sum) : 0,
      avarageSpeed: a.totalDistance / dt[dt.length - 1]
    })
  }

  const handleStart = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log('get.position', position);
        setStartLocation(position.coords);
      },
      (error) => {
        console.log(error);
      },
    )
    interval = setInterval(function (counter) {
      return function () {
        dt.push(counter++);
        setDt([counter, ...dt])
        console.log(dt)
        setDistancePerMinute([])
      };
    }(0), 20000);
  }

  useEffect(() => {
    handleDistance(), handleAvarageSpeedTotalDistance()
  }, [dt])

  const handleFinish = () => {
    setFinishLocation(watchLocation[watchLocation.length - 1])
    clearInterval(interval)
    handleFiresoreData()
  }

  const handleClear = () => {
    setStartLocation()
    setFinishLocation()
    setWatchLocation([])
    setDistanceBetweenLocations([])
    setDistancePerMinute([])
    setDt([])
  }

  const handleDistance = () => {
    if (distancePerMinute.length >= 2) {
      const R = 6371e3; // metres
      const φ1 = distancePerMinute[0].latitude * Math.PI / 180 // φ, λ in radians
      const φ2 = distancePerMinute[distancePerMinute.length - 1].latitude * Math.PI / 180
      const Δφ = (distancePerMinute[distancePerMinute.length - 1].latitude - distancePerMinute[0].latitude) * Math.PI / 180
      const Δλ = (distancePerMinute[distancePerMinute.length - 1].longitude - distancePerMinute[0].longitude) * Math.PI / 180
      const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
      const d = R * c // in metres
      setDistanceBetweenLocations([d, ...distanceBetweenLocations])
      console.log('bbbb', distanceBetweenLocations)
    } else {
      console.log("yeterli data yk ")
    }
  }

  const handleUserTracking = async (e) => {
    console.log("aaaa", e.nativeEvent)
    console.log(distanceBetweenLocations)
    setWatchLocation([{
      time: e.nativeEvent.coordinate.timestamp,
      latitude: e.nativeEvent.coordinate.latitude,
      longitude: e.nativeEvent.coordinate.longitude
    },
    ...watchLocation])
    setDistancePerMinute([{
      time: e.nativeEvent.coordinate.timestamp,
      latitude: e.nativeEvent.coordinate.latitude,
      longitude: e.nativeEvent.coordinate.longitude
    },
    ...distancePerMinute])
    if (watchLocation.length = 1) {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${e.nativeEvent.coordinate.latitude
          }&lon=${e.nativeEvent.coordinate.longitude
          }&appid=${APIkey}`)
        setWeactherData(response.data)
        console.log('response', weatherData)
      } catch (error) {
        Alert.alert(error.message)
      }
    }
  }

  return (
    <SafeAreaView style={styles.outerContainer}>
      <MapView
        style={styles.mapView}
        initialRegion={initialRegion}
        showsUserLocation={true}
        userLocationPriority="balanced"
        onUserLocationChange={finishLocation === undefined && startLocation && handleUserTracking}>
        {startLocation !== undefined && <Marker coordinate={startLocation} />}
        {finishLocation !== undefined && <Marker coordinate={watchLocation[watchLocation.length - 1]} />}
        {
          watchLocation !== undefined && startLocation &&
          <Polyline
            miterLimit={10}
            lineCap="square"
            strokeWidth={4}
            strokeColor="blue"
            coordinates={watchLocation}
          />
        }
      </MapView>
      <ScrollView
        style={styles.container}>
        <View style={styles.buttonView}>
          <Button theme="startButton" iconName="cancel" iconSize={35} iconColor="black" onPress={handleFinish} />
          <Button theme="startButton" iconName="add-box" iconSize={35} iconColor="crimson" onPress={handleStart} />
          <Button theme="startButton" iconName="cleaning-services" iconColor="steelblue" iconSize={35} onPress={handleClear} />
        </View>
        <View style={styles.generalInfoView}>
          <View style={styles.distanceView}>
            <Text style={styles.text}>Total distance: {a.totalDistance.toFixed(2)}</Text>
            <Icon name="directions-walk" size={30} />
          </View>
          <View style={styles.distanceView}>
            <Text style={styles.text} >Total Time : {distanceBetweenLocations.length}</Text>
            <Icon name="timer" size={30} />
          </View>
          <View style={styles.distanceView}>
            <Text style={styles.text} >Average Speed: {a.avarageSpeed && a.avarageSpeed.toFixed(2)} </Text>
            <Icon name="shutter-speed" size={30} />
          </View>
        </View>
        {
          weatherData.base ?
            <View style={styles.weatherView}>
              <View>
                <Icon name="wb-cloudy" size={30}></Icon>
                <Text style={styles.text} >Weather: {weatherData.weather[0].description}</Text>
              </View>
              <View>
                <Icon name="device-thermostat" size={30}></Icon>
                <Text style={styles.text} >Tempreture: {(weatherData.main.temp - 273.15).toFixed(2)}</Text>
                <Text style={styles.text} >Feels Like: {(weatherData.main.feels_like - 273.15).toFixed(2)}</Text>
                <Text style={styles.text} >Humidity: {weatherData.main.humidity}</Text>
              </View>
              <View>
                <Icon name="waves" size={30}></Icon>
                <Text style={styles.text} >Wind Speed: {weatherData.wind.speed}</Text>
                <Text style={styles.text} >Wind Degree: {weatherData.wind.deg}</Text>
              </View>
            </View>
            : <ActivityIndicator />
        }
        <ScrollView horizontal={true}
          contentOffset={{ x: 10000, y: 0 }}>
          <BarChart
            data={barData}
            width={barData.labels.length >= 6 ? barData.labels.length * Dimensions.get("screen").width / 7 : Dimensions.get("screen").width}
            height={220}
            yAxisSuffix=" m"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: "#e26a00",
              backgroundGradientFrom: "black",
              backgroundGradientTo: "#ffa726",
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "silver"
              }
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16
            }}
          />
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  )
}

export default NewActivityPage