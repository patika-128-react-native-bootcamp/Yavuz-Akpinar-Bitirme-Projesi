import React from "react";
import {Text, TouchableOpacity, View } from "react-native";
import styles from "./LeaderboardCardStyles";

const LeaderboardCard = ({ item, onPress, index }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.indexView}>
        <Text style={styles.index}>{index}</Text>
      </View>
      <View style={styles.textView}>
        <Text style={styles.text}>User :  {item.user}</Text>
        <Text style={styles.text}>Total Distance : {item.TotalDistance.toFixed(2)} m</Text>
      </View>
    </TouchableOpacity>
  )
}

export default LeaderboardCard