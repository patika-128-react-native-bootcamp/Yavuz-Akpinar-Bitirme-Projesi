import MapView, { Marker, Polyline } from 'react-native-maps'
import React from 'react'
import { ScrollView, SafeAreaView, Text, View, Dimensions, ActivityIndicator } from "react-native";
import { BarChart, } from "react-native-chart-kit";
import Icon from "react-native-vector-icons/MaterialIcons"

import Button from "../../../components/button/Button";
import styles from "./../NewActivityPageStyles";

const NewActivityLayout = ({
  chartTime, distanceBetweenLocations, finishLocation, isActive,
  handleUserTracking, startLocation, watchLocation,
  handleFinish, handleStart, handleClear,
  firestoreData, weatherData }) => {

  const initialRegion = {
    latitude: 41.0391683,
    longitude: 28.9982707,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  };

  const barData = {
    labels: chartTime,
    datasets: [{
      data: distanceBetweenLocations
    }]
  }

  return (
    <SafeAreaView style={styles.outerContainer}>
      <MapView
        style={styles.mapView}
        initialRegion={initialRegion}
        showsUserLocation={true}
        userLocationPriority="balanced"
        onUserLocationChange={finishLocation === undefined && isActive ? handleUserTracking : null}>
        {isActive === 1 && <Marker coordinate={startLocation} />}
        {finishLocation !== undefined && <Marker coordinate={{
          latitude: watchLocation[watchLocation.length - 1].latitude,
          longitude: watchLocation[watchLocation.length - 1].latitude
        }}
        />}
        {
          watchLocation !== undefined &&
          <Polyline
            miterLimit={10}
            lineCap="square"
            strokeWidth={4}
            strokeColor="blue"
            coordinates={watchLocation}
          />
        }
      </MapView>
      <View style={styles.buttonView}>
        <Button
          theme={isActive ? "startButton" : "startButtonDisabled"} title="Stop" disabled={isActive ? false : true}
          onPress={handleFinish} />
        <Button
          theme={isActive ? "startButtonDisabled" : "startButton"} title="Start" disabled={isActive && true}
          onPress={handleStart} />
        <Button
          theme="startButton" title="Clear" onPress={handleClear} />
      </View>
      <View style={styles.generalInfoView}>
        <View style={styles.distanceView}>
          <Icon name="directions-walk" size={40} color="white" />
          <Text style={styles.text}>{firestoreData.totalDistance.toFixed(2)} m</Text>
        </View>
        <View style={styles.distanceView}>
          <Icon name="timer" size={40} color="white" />
          <Text style={styles.text} >{distanceBetweenLocations.length} min</Text>
        </View>
        <View style={styles.distanceView}>
          <Icon name="shutter-speed" size={40} color="white" />
          <Text style={styles.text} >{firestoreData.avarageSpeed && firestoreData.avarageSpeed.toFixed(2)} m/min </Text>
        </View>
      </View>
      <View style={styles.container}>
        <ScrollView>
          {
            weatherData !== undefined ?
              <View style={styles.weatherView}>
                <View style={styles.skyInfoView}>
                  <Icon name="wb-cloudy" size={40} color="white"></Icon>
                  <Text style={styles.text} >Weather: {weatherData.weather[0].description}</Text>
                </View>
                <View style={styles.tempreture}>
                  <Icon name="device-thermostat" size={40} color="white"></Icon>
                  <Text style={styles.text} >Tempreture: {(weatherData.main.temp - 273.15).toFixed(2)}</Text>
                  <Text style={styles.text} >Feels Like: {(weatherData.main.feels_like - 273.15).toFixed(2)}</Text>
                  <Text style={styles.text} >Humidity: {weatherData.main.humidity}</Text>
                </View>
                <View style={styles.wind}>
                  <Icon name="waves" size={40} color="white"></Icon>
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
              width={
                barData.labels.length >= 6 ?
                  barData.labels.length * Dimensions.get("screen").width / 7
                  : Dimensions.get("screen").width
              }
              height={220}
              yAxisSuffix=" m"
              yAxisInterval={1}
              chartConfig={styles.chartBarConfig}
              bezier
              style={styles.chartBarStyle}
            />
          </ScrollView>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default NewActivityLayout

