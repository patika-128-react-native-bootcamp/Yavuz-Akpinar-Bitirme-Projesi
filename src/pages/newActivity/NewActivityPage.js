import React, { useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import MapView, { Marker } from 'react-native-maps'
import styles from "./NewActivityPageStyles";
import Geolocation from "@react-native-community/geolocation";


const NewActivityPage = () => {
  const [location, setLocation] = useState()

  const initialRegion = {
    latitude: 41.0391683,
    longitude: 28.9982707,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  };
  
  Geolocation.getCurrentPosition(
    (info) => setLocation(info.coords),
    (error) => console.log(error),
    {
      enableHighAccuracy: true,
    },
  );
  
  return(
    <SafeAreaView style={styles.outerContainer}>
      <MapView 
        showUserLocation={true}
        style={styles.mapView}
        initialRegion={initialRegion}>
          {location !== undefined && <Marker
            coordinate={location} ></Marker>}
        </MapView>
      <View style={styles.container}></View>
    </SafeAreaView>
  )
}

export default NewActivityPage