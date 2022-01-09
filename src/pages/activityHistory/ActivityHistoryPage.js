import { useNavigation } from "@react-navigation/native";
import React from "react";
import { FlatList, SafeAreaView } from "react-native";
import ActivityHistoryCard from "../../components/cards/ActivityHistoryCard/ActivityHistoryCard";
import useFetchFirestoreData from "../../hooks/useFetchFirestoreData";
import styles from "./ActivityHistoryPageStyles";


const ActivityHistoryPage = () => {
  const { firestoreData } = useFetchFirestoreData()

  const navigation = useNavigation()

  const handleRenderItem = ({ item, index }) => (
    <ActivityHistoryCard
      item={item} index={index + 1}
      onPress={() => navigation.navigate('Detail', { item: item })}
    />
  )

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={firestoreData}
        renderItem={handleRenderItem}
      />
    </SafeAreaView>
  )
}

export default ActivityHistoryPage