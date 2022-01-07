import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { Alert, SafeAreaView, Text, View } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import Button from "../../components/button/Button";
import firestore from '@react-native-firebase/firestore';

const DetailPage = () => {
  const route = useRoute()
  const item = route.params.item
  const navigation = useNavigation()

  const initialRegion = {
    latitude: item.StartLocation.Latitude,
    longitude: item.StartLocation.longitude,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  };

  const handleRemoveActivity = () => {
    firestore()
  .collection('RunningData')
  .doc(item.id)
  .delete()
  .then(() => {
    Alert.alert("Activity Removed !");
  });
  navigation.goBack()
  }

  return (
    <SafeAreaView style={{ flex: 2 }}>
      <MapView
        initialRegion={initialRegion}
        style={{ flex: 1 }}>
        {item.StartLocation && <Marker coordinate={{
          latitude: item.StartLocation.Latitude,
          longitude: item.StartLocation.longitude
        }}></Marker>}
        {item.watchLocation && <Polyline coordinates={item.watchLocation}></Polyline>}
      </MapView>
      <View style={{ flex: 1 }}>
        <View>
          <Text>{item.date}</Text>
        </View>
        <View>
          <Text>{item.location}</Text>
        </View>
        <View>
          <Text>{item.TotalTime}</Text>
        </View>
        <View>
          <Text>{item.TotalDistance.toFixed(2)}</Text>
        </View>
        <View>
          <Text>{item.AvarageSpeed.toFixed(2)}</Text>
        </View>
      </View>
      <Button title="Remove Activity" onPress={handleRemoveActivity}/>
    </SafeAreaView>
  )
}

export default DetailPage