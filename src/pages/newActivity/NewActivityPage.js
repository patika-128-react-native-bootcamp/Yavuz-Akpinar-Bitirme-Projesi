import React, { useEffect, useState } from "react";
import { Dimensions, SafeAreaView, Text, View } from "react-native";
import MapView, { Marker } from 'react-native-maps'
import styles from "./NewActivityPageStyles";
import Geolocation from "@react-native-community/geolocation";
import Button from "../../components/button/Button";



const NewActivityPage = () => {
  const [location, setLocation] = useState()
  const [watchLocation, setWatchLocation] = useState()

  const initialRegion = {
    latitude: 41.0391683,
    longitude: 28.9982707,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  };

 
  Geolocation.watchPosition(
    (position) => {
      console.log('watch.position', position);
      setWatchLocation(position.coords);
    },
    (error) => {
      console.log(error);
    },
  );

  const handleLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log('get.position', position);
        setLocation(position.coords);
      },
      (error) => {
        console.log(error);
      })
  }


  return (
    <SafeAreaView style={styles.outerContainer}>
      <MapView
        style={styles.mapView}
        initialRegion={initialRegion}
        showsUserLocation={true}>
          {location !== undefined && <Marker coordinate={location}></Marker>}
      </MapView>
      <View style={styles.container}>
        <Button onPress={handleLocation}></Button>
      </View>
    </SafeAreaView>
  )
}

export default NewActivityPage