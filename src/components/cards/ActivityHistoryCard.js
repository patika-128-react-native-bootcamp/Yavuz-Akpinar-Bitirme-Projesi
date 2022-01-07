import React from "react";
import { SafeAreaView, Text, TouchableOpacity } from "react-native";
import styles from "./ActivityHistoryCardStyle";

const ActivityHistoryCard = ({item, onPress}) => {
  return(
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.text}>Activity Date :{item.date}</Text>
      <Text style={styles.text}>Activity Location:{item.location}</Text>
      <Text style={styles.text}>Total Distance : {item.TotalDistance}</Text>
      <Text style={styles.text}>Total Time : {item.TotalTime}</Text>

    </TouchableOpacity>
  )
}

export default ActivityHistoryCard