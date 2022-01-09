import React from "react";
import { FlatList, SafeAreaView, Text } from "react-native";
import useFetchFirestoreData from "../../hooks/useFetchFirestoreData";

import styles from "./LeaderboardPageStyles";
import LeaderboardCard from "../../components/cards/LeaderboardCard/LeaderboardCard";


const LeaderboardPage = () => {
  const {firestoreDataAll} = useFetchFirestoreData()

  const handleRenderItem = ({item, index}) => (
    <LeaderboardCard item={item} index={index + 1} onPress={null}/>
  )

  return(
    <SafeAreaView style={styles.container}>
      <FlatList 
        data={firestoreDataAll.sort((a, b) => b.TotalDistance - a.TotalDistance)} 
        renderItem={handleRenderItem} 
      />
    </SafeAreaView>
  )
}

export default LeaderboardPage