import React, { useEffect, useState } from "react";
import { ScrollView, SafeAreaView, Text, View, Dimensions, Alert, ActivityIndicator } from "react-native";
import MapView, { Marker, Polyline } from 'react-native-maps'
import styles from "./NewActivityPageStyles";
import Geolocation from "@react-native-community/geolocation";
import Button from "../../components/button/Button";
import database from '@react-native-firebase/database'
import { BarChart, } from "react-native-chart-kit";
import axios from "axios";
import Icon from "react-native-vector-icons/MaterialIcons"

const APIkey = 'd80c8ff3ae6c97309a86046f3ffd186a'

const NewActivityPage = () => {
  const [startLocation, setStartLocation] = useState()
  const [watchLocation, setWatchLocation] = useState([])
  const [finishLocation, setFinishLocation] = useState()
  const [distanceBetween, setDistanceBetween] = useState([])
  const [seconds, setSeconds] = useState(0)
  const [dt, setDt] = useState([])
  const [weatherData, setWeactherData] = useState({})

  const sum = (a, b) => a + b
  const totalDistance = distanceBetween.length >= 2 ? distanceBetween.reduce(sum) : 0

  const avarageSpeed = dt ? totalDistance / dt[dt.length - 1] : 0

  const barData = {
    labels: dt,
    datasets: [{
      data: distanceBetween
    }]
  }

  const initialRegion = {
    latitude: 41.0391683,
    longitude: 28.9982707,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  };

  const handleStart = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log('get.position', position);
        setStartLocation(position.coords);
      },
      (error) => {
        console.log(error);
      },
      {
      }
    )
    console.log(startLocation)
    console.log('hava', weatherData)
    let interval = setInterval(function (counter) {
      return function () {
        setDt([counter++, ...dt]);
        console.log(counter)
        setWatchLocation([])
      };
    }(0), 30000);
  }

  useEffect(() => { handleDistance() }, [dt])

  const handleFinish = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log('finish.position', position);
        setFinishLocation(position.coords);
      },
      (error) => {
        console.log(error);
      },
      {
      }
    )
    handlerunTime(),
      handleDistance()
  }

  const handleClear = () => {
    setStartLocation()
    setFinishLocation()
    setWatchLocation([])
    setDistanceBetween([])
    setSeconds()
  }

  const handleDistance = () => {
    if (watchLocation.length >= 2) {
      const R = 6371e3; // metres
      const φ1 = watchLocation[0].latitude * Math.PI / 180 // φ, λ in radians
      const φ2 = watchLocation[watchLocation.length - 1].latitude * Math.PI / 180
      const Δφ = (watchLocation[watchLocation.length - 1].latitude - watchLocation[0].latitude) * Math.PI / 180
      const Δλ = (watchLocation[watchLocation.length - 1].longitude - watchLocation[0].longitude) * Math.PI / 180
      const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
      const d = R * c // in metres
      setDistanceBetween([d, ...distanceBetween])
      console.log('bbbb', distanceBetween)
    } else {
      console.log("yeterli data yk ")
    }
  }

  /*Geolocation.watchPosition(
    (position) => {
      setWatchLocation([{latitude:position.coords.latitude, longitude:position.coords.longitude}, ...watchLocation])
      console.log('position',watchLocation)
    },
    (error) => {
      console.log(error);
    },
    {enableHighAccuracy:true,
    distanceFilter:10
    }
  );*/
  const handleUserTracking = async (e) => {
    console.log("aaaa", e.nativeEvent)
    console.log(distanceBetween)
    setWatchLocation([{
      time: e.nativeEvent.coordinate.timestamp,
      latitude: e.nativeEvent.coordinate.latitude,
      longitude: e.nativeEvent.coordinate.longitude
    },
    ...watchLocation])
    if (watchLocation.length < 2) {
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
  const handlerunTime = () => {
    watchLocation.length >= 2 ?
      setSeconds((watchLocation[0].time - watchLocation[watchLocation.length - 1].time) / (1000 + 10) / 60) : setSeconds(0)
    return seconds
  }

  return (
    <SafeAreaView style={styles.outerContainer}>
      <MapView
        style={styles.mapView}
        initialRegion={initialRegion}
        showsUserLocation={true}
        userLocationPriority="balanced"
        onUserLocationChange={finishLocation === undefined && startLocation && handleUserTracking}>
        {
          startLocation !== undefined && <Marker coordinate={startLocation}></Marker>
        }
        {
          finishLocation !== undefined && <Marker coordinate={finishLocation}></Marker>
        }
        {
          watchLocation !== undefined && startLocation &&
          <Polyline
            miterLimit={10}
            lineCap="square"
            strokeWidth={4}
            strokeColor="blue"
            coordinates={watchLocation}>
          </Polyline>
        }
      </MapView>
      <ScrollView
        style={styles.container}>
        <View style={styles.buttonView}>
          <Button theme="startButton" iconName="cancel" iconSize={35} iconColor="black" onPress={handleFinish}/>
          <Button theme="startButton" iconName="add-box" iconSize={35} iconColor="crimson" onPress={handleStart}/>
          <Button theme="startButton" iconName="cleaning-services" iconColor="steelblue" iconSize={35} onPress={handleClear}/>
        </View>
        <View style={styles.generalInfoView}>
          <View style={styles.distanceView}>
            <Text style={styles.text}>Total distance: {totalDistance.toFixed(2)}</Text>
            <Icon name="directions-walk" size={30} />
          </View>
          <View style={styles.distanceView}>
            <Text style={styles.text} >Total Time : {distanceBetween.length}</Text>
            <Icon name="timer" size={30} />
          </View>
          <View style={styles.distanceView}>
            <Text style={styles.text} >Average Speed: {avarageSpeed !== undefined && avarageSpeed.toFixed(2)} </Text>
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
                <Text style={styles.text} >Wind Speed: {weatherData.speed}</Text>
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