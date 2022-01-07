import { useNavigation } from "@react-navigation/native";
import React from "react";
import { FlatList, SafeAreaView, Text } from "react-native";
import MapView, { Marker, Polyline } from 'react-native-maps'
import ActivityHistoryCard from "../../components/cards/ActivityHistoryCard";
import useFetchFirestoreData from "../../hooks/useFetchFirestoreData";


const ActivityHistoryPage = () => {
  const {firestoreData} = useFetchFirestoreData()
  console.log(firestoreData)

  const navigation = useNavigation()

  const handleRenderItem = ({item}) => (
    <ActivityHistoryCard item={item} onPress={() =>  navigation.navigate('Detail', {item:item}) }/>
  )

  return(
    <SafeAreaView>
      <FlatList data={firestoreData} renderItem={handleRenderItem} ></FlatList>
    </SafeAreaView>
  )
}

export default ActivityHistoryPage