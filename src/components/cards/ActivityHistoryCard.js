import React from "react";
import {Text, TouchableOpacity, View } from "react-native";
import styles from "./ActivityHistoryCardStyle";

const ActivityHistoryCard = ({ item, onPress, index }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.indexView}>
        <Text style={styles.index}>{index}</Text>
      </View>
      <View style={styles.textView}>
        <Text style={styles.text}>Activity Date : {item.date}</Text>
        <Text style={styles.text}>Activity Location: {item.location}</Text>
        <Text style={styles.text}>Total Distance : {item.TotalDistance.toFixed(2)} m</Text>
        <Text style={styles.text}>Total Time : {item.TotalTime} min</Text>
      </View>
    </TouchableOpacity>
  )
}

export default ActivityHistoryCard