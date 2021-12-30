import React from "react";
import { Text, TextInput, View } from "react-native";
import styles from "./InputStyles";

const Input = ({placeholder,onChangeText,value, title}) => {
  return(
    <View>
      <Text style={styles.title}>{title}</Text>
      <TextInput
        style={styles.container}
        placeholder={placeholder} 
        onChangeText={onChangeText}
        value={value}/>
    </View>
  )
}

export default Input