import MapView, { Marker, Polyline } from 'react-native-maps'
import React from 'react'
import Button from "../../../components/button/Button";
import { BarChart, } from "react-native-chart-kit";
import Icon from "react-native-vector-icons/MaterialIcons"
import styles from "./../NewActivityPageStyles";
import { ScrollView, SafeAreaView, Text, View, Dimensions, ActivityIndicator } from "react-native";


const NewActivityLayout = ({
  dt, distanceBetweenLocations,finishLocation,isActive, 
  handleUserTracking,startLocation, watchLocation, 
  handleFinish, handleStart, handleClear, 
  firestoreData, weatherData }) => {

  const initialRegion = {
    latitude: 41.0391683,
    longitude: 28.9982707,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  };

  const barData = {
    labels: dt,
    datasets: [{
      data: distanceBetweenLocations
    }]
  }
  return(
    <SafeAreaView style={styles.outerContainer}>
      <MapView
        style={styles.mapView}
        initialRegion={initialRegion}
        showsUserLocation={true}
        userLocationPriority="balanced"
        onUserLocationChange={finishLocation === undefined && isActive && handleUserTracking}>
        {isActive === 1 && <Marker coordinate={startLocation} />}
        {finishLocation !== undefined && <Marker coordinate={watchLocation[watchLocation.length - 1]} />}
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
      <ScrollView
        style={styles.container}>
        <View style={styles.buttonView}>
          <Button theme="startButton" iconName="cancel" iconSize={35} iconColor="black" onPress={handleFinish} />
          <Button theme="startButton" iconName="add-box" iconSize={35} iconColor="crimson" onPress={handleStart} />
          <Button theme="startButton" iconName="cleaning-services" iconColor="steelblue" iconSize={35} onPress={handleClear} />
        </View>
        <View style={styles.generalInfoView}>
          <View style={styles.distanceView}>
            <Text style={styles.text}>Total distance: {firestoreData.totalDistance.toFixed(2)}</Text>
            <Icon name="directions-walk" size={30} />
          </View>
          <View style={styles.distanceView}>
            <Text style={styles.text} >Total Time : {distanceBetweenLocations.length}</Text>
            <Icon name="timer" size={30} />
          </View>
          <View style={styles.distanceView}>
            <Text style={styles.text} >Average Speed: {firestoreData.avarageSpeed && firestoreData.avarageSpeed.toFixed(2)} </Text>
            <Icon name="shutter-speed" size={30} />
          </View>
        </View>
        {
          weatherData !== undefined  ?
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

export default NewActivityLayout

