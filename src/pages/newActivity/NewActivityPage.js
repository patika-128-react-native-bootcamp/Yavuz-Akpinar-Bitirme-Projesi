import React, { useEffect, useState } from "react";
import { Dimensions, SafeAreaView, Text, View } from "react-native";
import MapView, { Marker, Polyline } from 'react-native-maps'
import styles from "./NewActivityPageStyles";
import Geolocation from "@react-native-community/geolocation";
import Button from "../../components/button/Button";
import database from '@react-native-firebase/database'


const NewActivityPage = () => {
  const [location, setLocation] = useState()
  const [watchLocation, setWatchLocation] = useState([])
  const [finish, setFinish] = useState()

  const initialRegion = {
    latitude: 41.0391683,
    longitude: 28.9982707,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  };


  const handleStart = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log('get.position', location);
        setLocation(position.coords);
      },
      (error) => {
        console.log(error);
      })
    console.log(watchLocation)

  }

  const handleFinish = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log('finish.position', position);
        setFinish(position.coords);
      },
      (error) => {
        console.log(error);
      })
  }

  const handleClear = () => {
    setLocation()
    setFinish()
    setWatchLocation([])
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

  const handleUserTracking = (e) => {
    console.log("aaaa", e.nativeEvent)
          setWatchLocation([{ 
            latitude: e.nativeEvent.coordinate.latitude, 
            longitude: e.nativeEvent.coordinate.longitude }, 
            ...watchLocation])
  }

  return (
    <SafeAreaView style={styles.outerContainer}>
      <MapView
        style={styles.mapView}
        initialRegion={initialRegion}
        showsUserLocation={true}
        userLocationPriority="high"
        onUserLocationChange={finish === undefined && location && handleUserTracking}>
        {location !== undefined && <Marker coordinate={location}></Marker>}
        {finish !== undefined && <Marker coordinate={finish}></Marker>}
        {watchLocation !== undefined && location && <Polyline
        miterLimit={10}
        lineCap="square" strokeWidth={4} strokeColor="blue" coordinates={watchLocation}></Polyline>}
      </MapView>
      <View style={styles.container}>
        <Button title="Start" onPress={handleStart} ></Button>
        <Button title="Finish" onPress={handleFinish}></Button>
        <Button title="Clear" onPress={handleClear}></Button>
        <Button title="Clear" onPress={e => console.log("aaaa", e.onUserLocationChange)}></Button>
      </View>
    </SafeAreaView>
  )
}

export default NewActivityPage