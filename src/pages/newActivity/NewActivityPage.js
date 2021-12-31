import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import MapView from 'react-native-maps'
import styles from "./NewActivityPageStyles";

const NewActivityPage = () => {
  return(
    <SafeAreaView style={styles.outerContainer}>
      <MapView 
        showUserLocation={true}
        style={styles.mapView}></MapView>
      <View style={styles.container}></View>
    </SafeAreaView>
  )
}

export default NewActivityPage